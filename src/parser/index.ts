import { type BindingPowerEntry, bindingPowers, getInfixBindingPower } from "./binding-power";
import type * as Node from "./syntax-node";
import * as node from "./syntax-node";

import { type Range, copyRange } from "../util/position";

export class ParserError extends Error {
  public received: string;
  public expected: string;
  public range: Range;

  constructor(received: string, expected: string, range: Range) {
    super();
    this.received = received;
    this.expected = expected;
    this.range = range;
  }
}

export class BadNumberLiteralError extends ParserError {}
export class BadBooleanLiteralError extends ParserError {}
export class BadPrefixError extends ParserError {}
export class BadInfixError extends ParserError {}
export class BadExpressionError extends ParserError {}
export class BadGroupDelimiterError extends ParserError {}
export class BadBlockDelimiterError extends ParserError {}
export class BadListDelimiterError extends ParserError {}
export class BadAssignmentError extends ParserError {}
export class BadFunctionKeywordError extends ParserError {}
export class BadIdentifierError extends ParserError {}
export class BadSeparatorError extends ParserError {}
export class BadListSeparatorError extends ParserError {}

import type Lexer from "../lexer";
import SourceTokenReader from "./source-token-reader";

type PrefixOperator = "+" | "-" | "!";
type InfixOperator = "+" | "-" | "*" | "/" | "!=" | "==" | ">" | "<" | ">=" | "<=";

export default class Parser {
  private static readonly PREFIX_OPERATORS = ["+", "-", "!"] as const;
  private static readonly INFIX_OPERATORS = ["+", "-", "*", "/", "!=", "==", ">", "<", ">=", "<="] as const;

  private reader: SourceTokenReader;

  constructor(lexer: Lexer) {
    this.reader = new SourceTokenReader(lexer);
  }

  parseSource(): Node.ProgramNode {
    const statements: Node.StatementNode[] = [];

    while (!this.reader.isEnd()) {
      statements.push(this.parseStatement());
    }

    const firstPos = { row: 0, col: 0 };
    const posBegin = statements.length > 0 ? statements[0].range.begin : firstPos;
    const posEnd = statements.length > 0 ? statements[statements.length - 1].range.end : firstPos;

    const program = node.createProgramNode({ statements }, posBegin, posEnd);

    return program;
  }

  private parseBlock(): Node.BlockNode {
    const firstToken = this.reader.read();
    this.advanceOrThrow("block delimiter", "{", BadBlockDelimiterError);

    const statements: Node.StatementNode[] = [];
    while (true) {
      const token = this.reader.read();
      if (token.type === "block delimiter" && token.value === "}") {
        this.reader.advance();

        const range = copyRange(firstToken.range.begin, token.range.end);
        return node.createBlockNode({ statements }, range);
      }

      const statement = this.parseStatement();
      statements.push(statement);
    }
  }

  private parseStatement(): Node.StatementNode {
    const token = this.reader.read();
    const { type, value } = token;

    if (type === "keyword" && value === "만약") {
      return this.parseBranchStatement();
    }

    if (type === "keyword" && value === "결과") {
      return this.parseReturnStatement();
    }

    return this.parseExpressionStatement();
  }

  private parseBranchStatement(): Node.BranchNode {
    const firstToken = this.reader.read();
    this.reader.advance();

    const predicate = this.parseExpression(bindingPowers.lowest);
    const consequence = this.parseBlock();

    const maybeElseToken = this.reader.read();
    if (maybeElseToken.type !== "keyword" || maybeElseToken.value !== "아니면") {
      const range = { begin: firstToken.range.begin, end: consequence.range.end };
      return node.createBranchNode({ predicate, consequence }, range);
    }
    this.reader.advance();

    const alternative = this.parseBlock();
    const range = { begin: firstToken.range.begin, end: alternative.range.end };
    return node.createBranchNode({ predicate, consequence, alternative }, range);
  }

  private parseReturnStatement(): Node.ReturnNode {
    const firstToken = this.reader.read();
    this.reader.advance();

    const expression = this.parseExpression(bindingPowers.lowest);
    const range = { begin: firstToken.range.begin, end: expression.range.end };
    return node.createReturnNode({ expression }, range);
  }

  /** return expression statement node, which is just a statement wrapper for an expression */
  private parseExpressionStatement(): Node.ExpressionStatementNode {
    const expression = this.parseExpression(bindingPowers.lowest);

    const range = expression.range;
    return node.createExpressionStatementNode({ expression }, range);
  }

  private parseExpression(threshold: BindingPowerEntry): Node.ExpressionNode {
    let topNode = this.parseExpressionStart();

    while (true) {
      const nextBindingPower = getInfixBindingPower(this.reader.read().value);
      if (nextBindingPower.left <= threshold.right) {
        break;
      }

      const infixExpression = this.parseExpressionMiddle(topNode);
      if (infixExpression === null) {
        break;
      }

      topNode = infixExpression;
    }

    return topNode;
  }

  private parseExpressionStart(): Node.ExpressionNode {
    const { type, value, range } = this.reader.read();

    if (type === "number literal") {
      return this.parseNumberLiteral();
    }
    if (type === "boolean literal") {
      return this.parseBooleanLiteral();
    }
    if (type === "string literal") {
      return this.parseStringLiteral();
    }
    if (type === "identifier") {
      return this.parseIdentifier();
    }
    if (type === "operator" && this.isPrefixOperator(value)) {
      return this.parsePrefix();
    }
    if (type === "keyword" && value === "함수") {
      return this.parseFunction();
    }
    if (type === "group delimiter" && value === "(") {
      return this.parseGroupedExpression();
    }
    if (type === "list delimiter" && value === "[") {
      return this.parseListExpression();
    }

    throw new BadExpressionError(type, "expression", range);
  }

  /** return node if parsable; null otherwise **/
  private parseExpressionMiddle(left: Node.ExpressionNode): Node.ExpressionNode | null {
    const { type, value } = this.reader.read();

    if (type === "group delimiter" && value === "(") {
      if (left.type !== "function" && left.type !== "identifier" && left.type !== "call") {
        return null;
      }

      return this.parseCall(left);
    }

    if (type === "operator" && this.isInfixOperator(value)) {
      return this.parseInfix(left);
    }

    if (type === "operator" && value === "=" && left.type === "identifier") {
      return this.parseAssignment(left);
    }

    return null;
  }

  private parseCall(left: Node.FunctionNode | Node.IdentifierNode | Node.CallNode): Node.CallNode {
    this.advanceOrThrow("group delimiter", "(", BadGroupDelimiterError);

    const secondToken = this.reader.read();
    if (secondToken.type === "group delimiter" && secondToken.value === ")") {
      this.reader.advance(); // eat delimiter

      const range = copyRange(left.range.begin, secondToken.range.end);
      return node.createCallNode({ func: left, args: [] }, range);
    }

    const args = [this.parseExpression(bindingPowers.lowest)];
    while (true) {
      const token = this.reader.read();
      if (token.type !== "separator") {
        break;
      }
      this.reader.advance(); // eat comma

      args.push(this.parseExpression(bindingPowers.lowest));
    }

    const lastToken = this.reader.read();
    this.advanceOrThrow("group delimiter", ")", BadGroupDelimiterError);

    const range = copyRange(left.range.begin, lastToken.range.end);

    return node.createCallNode({ func: left, args }, range);
  }

  private parseAssignment(left: Node.IdentifierNode): Node.ExpressionNode {
    const { value, range } = this.reader.read();
    this.reader.advance();

    if (value !== "=") {
      throw new BadAssignmentError(value, "=", range);
    }
    const infix = value;

    const infixBindingPower = getInfixBindingPower(infix);
    const right = this.parseExpression(infixBindingPower);
    const assignmentRange = { begin: left.range.begin, end: right.range.end };

    return node.createAssignmentNode({ left, right }, assignmentRange);
  }

  private parseNumberLiteral(): Node.NumberNode {
    const { value, range } = this.reader.read();
    this.reader.advance();

    const parsed = Number(value);
    if (Number.isNaN(parsed)) {
      throw new BadNumberLiteralError(value, "non NaN", range);
    }

    return node.createNumberNode({ value: parsed }, range);
  }

  private parseBooleanLiteral(): Node.BooleanNode {
    const { value, range } = this.reader.read();
    this.reader.advance();

    let parsed: boolean;
    if (value === "참") {
      parsed = true;
    } else if (value === "거짓") {
      parsed = false;
    } else {
      throw new BadBooleanLiteralError(value, "참, 거짓", range);
    }

    return node.createBooleanNode({ value: parsed }, range);
  }

  private parseStringLiteral(): Node.StringNode {
    const { value, range } = this.reader.read();
    this.reader.advance();

    return node.createStringNode({ value }, range);
  }

  private parseIdentifier(): Node.IdentifierNode {
    const { type, value, range } = this.reader.read();
    this.reader.advance();

    if (type !== "identifier") {
      throw new BadIdentifierError(type, "identifier", range);
    }

    return node.createIdentifierNode({ value }, range);
  }

  private parsePrefix(): Node.PrefixNode {
    const { value, range } = this.reader.read();
    this.reader.advance();

    if (!this.isPrefixOperator(value)) {
      throw new BadPrefixError(value, "prefix operator", range);
    }

    const prefix = value;
    const right = this.parseExpression(bindingPowers.prefix);

    return node.createPrefixNode({ prefix, right }, range);
  }

  private parseInfix(left: Node.ExpressionNode): Node.InfixNode {
    const { value, range } = this.reader.read();
    this.reader.advance();

    if (!this.isInfixOperator(value)) {
      throw new BadInfixError(value, "infix operator", range);
    }
    const infix = value;

    const infixBindingPower = getInfixBindingPower(infix);
    const right = this.parseExpression(infixBindingPower);
    const infixRange = copyRange(left.range.begin, right.range.end);

    return node.createInfixNode({ infix, left, right }, infixRange);
  }

  private parseFunction(): Node.FunctionNode {
    const firstToken = this.reader.read();

    this.advanceOrThrow("keyword", "함수", BadFunctionKeywordError);

    const parameters = this.parseParameters();
    const body = this.parseBlock();

    const range = copyRange(firstToken.range.begin, body.range.end);
    return node.createFunctionNode({ parameters, body }, range);
  }

  private parseParameters(): Node.IdentifierNode[] {
    this.advanceOrThrow("group delimiter", "(", BadGroupDelimiterError);

    const groupEndOrIdentifier = this.reader.read();

    // early return if empty parameter list
    if (groupEndOrIdentifier.type === "group delimiter" && groupEndOrIdentifier.value === ")") {
      this.reader.advance();
      return [];
    }

    const parameters = [this.parseIdentifier()];

    while (true) {
      const commaOrGroupEnd = this.reader.read();
      this.reader.advance();

      if (commaOrGroupEnd.type === "group delimiter" && commaOrGroupEnd.value === ")") {
        return parameters;
      }

      if (commaOrGroupEnd.type !== "separator") {
        throw new BadSeparatorError(commaOrGroupEnd.type, ",", commaOrGroupEnd.range);
      }

      parameters.push(this.parseIdentifier());
    }
  }

  private parseGroupedExpression(): Node.ExpressionNode {
    this.advanceOrThrow("group delimiter", "(", BadGroupDelimiterError);

    const expression = this.parseExpression(bindingPowers.lowest);

    this.advanceOrThrow("group delimiter", ")", BadGroupDelimiterError);

    // range change due to group delimiters
    // TODO: just use two positions from delimiters
    const offset = { begin: { row: 0, col: -1 }, end: { row: 0, col: 1 } };
    const range = copyRange(expression.range.begin, expression.range.end, offset);

    return { ...expression, range };
  }

  private parseListExpression(): Node.ListNode {
    const { begin } = this.reader.read().range;
    this.advanceOrThrow("list delimiter", "[", BadListDelimiterError);

    const elements: Node.ExpressionNode[] = [];

    // return if empty list
    const maybeListEnd = this.reader.read();
    if (maybeListEnd.type === "list delimiter" && maybeListEnd.value === "]") {
      const { end } = this.reader.read().range;
      this.advanceOrThrow("list delimiter", "]", BadListDelimiterError);

      const range = { begin, end };
      return node.createListNode({ elements }, range);
    }

    while (true) {
      const element = this.parseExpression(bindingPowers.lowest);
      elements.push(element);

      const separatorOrListEnd = this.reader.read();
      if (separatorOrListEnd.type === "list delimiter" && separatorOrListEnd.value === "]") {
        const { end } = this.reader.read().range;
        this.advanceOrThrow("list delimiter", "]", BadListDelimiterError);

        const range = { begin, end };
        return node.createListNode({ elements }, range);
      }

      this.advanceOrThrow("separator", ",", BadListSeparatorError);
    }
  }

  private advanceOrThrow(type: string, value: string, ErrorClass: typeof ParserError): void {
    const token = this.reader.read();
    this.reader.advance();

    if (token.type !== type || token.value !== value) {
      throw new ErrorClass(token.value, value, token.range);
    }
  }

  private isPrefixOperator(operator: string): operator is PrefixOperator {
    return Parser.PREFIX_OPERATORS.some(prefix => prefix === operator);
  }

  private isInfixOperator(operator: string): operator is InfixOperator {
    return Parser.INFIX_OPERATORS.some(infix => infix === operator);
  }
}

export type * from "./syntax-node";
