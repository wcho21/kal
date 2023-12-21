import {
  makeProgram,
  makeBlock,
  makeIdentifier,
  makeAssignment,
  makeNumberNode,
  makeBooleanNode,
  makeStringNode,
  makeBranchStatement,
  makeExpressionStatement,
  makePrefixExpression,
  makeInfixExpression,
  makeFunctionExpression,
  makeCall,
} from "./syntax-tree";
import type {
  Program,
  Block,
  Statement,
  NumberNode,
  BooleanNode,
  StringNode,
  BranchStatement,
  ExpressionStatement,
  Expression,
  FunctionExpression,
  Call,
  Identifier,
  InfixExpression,
} from "./syntax-tree";
import Lexer from "../lexer";
import TokenReader from "./token-reader";

type BindingPower = number;
const bindingPower = {
  lowest: 0,
  assignment: 30,
  comparison: 40,
  summative: 50,
  productive: 60,
  prefix: 70,
  call: 80,
};
const getBindingPower = (infix: string): BindingPower => {
  switch (infix) {
    case "=":
      return bindingPower.assignment;
    case "==":
    case "!=":
    case ">":
    case "<":
    case ">=":
    case "<=":
      return bindingPower.comparison;
    case "+":
    case "-":
      return bindingPower.summative;
    case "*":
    case "/":
      return bindingPower.productive;
    case "(": // when '(' is used infix operator, it behaves as call operator
      return bindingPower.call;
    default:
      return bindingPower.lowest;
  }
};

export default class Parser {
  private buffer: TokenReader;

  constructor(lexer: Lexer) {
    this.buffer = new TokenReader(lexer);
  }

  parseProgram(): Program {
    const program = makeProgram();

    while (!this.buffer.isEnd()) {
      const statement = this.parseStatement();
      if (statement !== null) {
        program.statements.push(statement);
      }
    }

    return program;
  }

  private parseBlock(): Block {
    // eat token if block start delimiter; otherwise throw error
    const maybeBlockStart = this.buffer.read();
    if (maybeBlockStart.type !== "block delimiter" || maybeBlockStart.value !== "{") {
      throw new Error(`expected { but received ${maybeBlockStart.type}`);
    }
    this.buffer.next();

    // populate statements in block
    const statements: Statement[] = [];
    while (true) {
      const token = this.buffer.read();

      // end block delimiter token and break loop if end of block
      if (token.type === "block delimiter" && token.value === "}") {
        this.buffer.next();
        break;
      }

      // append statement to block
      const statement = this.parseStatement();
      if (statement !== null) {
        statements.push(statement);
      }
    }

    // make and return block
    const block = makeBlock(statements);
    return block;
  }

  private parseStatement(): Statement {
    const token = this.buffer.read();

    if (token.type === "keyword" && token.value === "만약") {
      this.buffer.next();

      return this.parseBranchStatement();
    }

    return this.parseExpressionStatement();
  }

  private parseBranchStatement(): BranchStatement {
    const predicate = this.parseExpression(bindingPower.lowest);
    const consequence = this.parseBlock();

    // eat token if else token; otherwise early return without else block
    const maybeElseToken = this.buffer.read();
    if (maybeElseToken.type !== "keyword" || maybeElseToken.value !== "아니면") {
      const branchStatement = makeBranchStatement(predicate, consequence);
      return branchStatement;
    }
    this.buffer.next();

    // return statement with else block
    const alternative = this.parseBlock();
    const branchStatement = makeBranchStatement(predicate, consequence, alternative);
    return branchStatement;
  }

  private parseExpressionStatement(): ExpressionStatement {
    const expression = this.parseExpression(bindingPower.lowest);

    return makeExpressionStatement(expression);
  }

  private parseExpression(threshold: BindingPower): Expression  {
    let expression = this.parsePrefixExpression();

    while (true) {
      const nextBindingPower = getBindingPower(this.buffer.read().value);
      if (nextBindingPower <= threshold) {
        break;
      }

      const infixExpression = this.parseInfixExpression(expression);
      if (infixExpression === null) {
        break;
      }

      expression = infixExpression;
    }

    return expression;
  }

  private parsePrefixExpression(): Expression {
    const token = this.buffer.read();
    this.buffer.next(); // eat token

    if (token.type === "number literal") {
      const numberNode = this.parseNumberLiteral(token.value);
      return numberNode;
    }
    if (token.type === "boolean literal") {
      const booleanNode = this.parseBooleanLiteral(token.value);
      return booleanNode;
    }
    if (token.type === "string literal") {
      const stringNode = this.parseStringLiteral(token.value);
      return stringNode;
    }
    if (token.type === "identifier") {
      const identifier = makeIdentifier(token.value);
      return identifier;
    }
    if (
      token.type === "operator" &&
      (token.value === "+" || token.value === "-" || token.value === "!")
    ) {
      const subExpression = this.parseExpression(bindingPower.prefix);
      const prefix = token.value;
      const expression = makePrefixExpression(prefix, subExpression);
      return expression;
    }
    if (token.type === "keyword" && token.value === "함수") {
      const parameters = this.parseParameters();
      const body = this.parseBlock();

      const functionExpression = makeFunctionExpression(body, parameters);
      return functionExpression;
    }
    if (token.type === "group delimiter" && token.value === "(") {
      const groupedExpression = this.parseExpression(bindingPower.lowest);

      const nextToken = this.buffer.read();
      this.buffer.next(); // eat token
      if (nextToken.type !== "group delimiter" || nextToken.value !== ")") {
        throw new Error(`expected ) but received ${nextToken.type}`);
      }

      return groupedExpression;
    }

    throw new Error(`bad token type ${token.type} (${token.value}) for prefix expression`);
  }

  private parseParameters(): Identifier[] {
    const parameters: Identifier[] = [];

    const maybeGroupStart = this.buffer.read();
    if (maybeGroupStart.type !== "group delimiter" || maybeGroupStart.value !== "(") {
      throw new Error(`expected ( but received ${maybeGroupStart.type}`);
    }
    this.buffer.next();

    // early return empty parameters if end of parameter list
    const maybeIdentifierOrGroupEnd = this.buffer.read();
    this.buffer.next();
    if (maybeIdentifierOrGroupEnd.type === "group delimiter" && maybeIdentifierOrGroupEnd.value === ")") {
      return [];
    }
    const maybeIdentifier = maybeIdentifierOrGroupEnd;

    // read first parameter
    if (maybeIdentifier.type !== "identifier") {
      throw new Error(`expected identifier but received ${maybeIdentifier}`);
    }
    const identifier = maybeIdentifier;
    parameters.push(identifier);

    // read the rest parameters
    while (true) {
      const maybeCommaOrGroupEnd = this.buffer.read();
      this.buffer.next();

      // break if end of parameter list
      if (maybeCommaOrGroupEnd.type === "group delimiter" && maybeCommaOrGroupEnd.value === ")") {
        break;
      }
      const maybeComma = maybeCommaOrGroupEnd;

      // read comma
      if (maybeComma.type !== "separator") {
        throw new Error(`expected comma but received ${maybeComma}`);
      }

      // read next identifier
      const maybeIdentifier = this.buffer.read();
      this.buffer.next();
      if (maybeIdentifier.type !== "identifier") {
        throw new Error(`expected identifier but received ${maybeIdentifier}`);
      }
      const identifier = maybeIdentifier;

      parameters.push(identifier);
    }

    return parameters;
  }

  private parseInfixExpression(left: Expression): Expression | null {
    // note: do not eat token and just return null if not parsable
    const token = this.buffer.read();

    if (token.type === "group delimiter" && token.value === "(") {
      if (left.type !== "function expression" && left.type !== "identifier") {
        return null;
      }

      this.buffer.next(); // eat infix token
      return this.parseCall(left);
    }

    if (token.type !== "operator") {
      return null;
    }

    const infix = token.value;
    if (infix === "=" && left.type === "identifier") {
      this.buffer.next(); // eat infix token
      const a=  this.parseAssignment(left);
      return a;
    }
    if (
      infix === "+" ||
      infix === "-" ||
      infix === "*" ||
      infix === "/" ||
      infix === "!=" ||
      infix === "==" ||
      infix === ">" ||
      infix === "<" ||
      infix === ">=" ||
      infix === "<="
    ) {
      this.buffer.next(); // eat infix token
      return this.parseArithmeticInfixExpression(left, infix);
    }
    return null;
  }

  private parseCall(functionToCall: Identifier | FunctionExpression): Call {
    const callArguments = this.parseCallArguments();

    return makeCall(functionToCall, callArguments);
  }

  private parseCallArguments(): Expression[] {
    const maybeExpressionOrGroupEnd = this.buffer.read();
    if (maybeExpressionOrGroupEnd.type === "group delimiter" && maybeExpressionOrGroupEnd.value === ")") {
      this.buffer.next();

      return [];
    }

    const firstArgument = this.parseExpression(bindingPower.lowest);

    const callArguments = [firstArgument];
    while (true) {
      const maybeComma = this.buffer.read();
      if (maybeComma.type !== "separator") {
        break;
      }
      this.buffer.next();

      const argument = this.parseExpression(bindingPower.lowest);
      callArguments.push(argument);
    }

    // expect ')'
    const maybeGroupEnd = this.buffer.read();
    this.buffer.next();
    if (maybeGroupEnd.type !== "group delimiter" || maybeGroupEnd.value !== ")") {
      throw new Error(`expect ) but received ${maybeGroupEnd.type}`);
    }

    return callArguments;
  }

  private parseAssignment(left: Identifier): Expression {
    const infix = "=";
    const infixBindingPower = getBindingPower(infix);

    const right = this.parseExpression(infixBindingPower);

    return makeAssignment(left, right);
  }

  private parseArithmeticInfixExpression(left: Expression, infix: InfixExpression["infix"]): Expression {
    const infixBindingPower = getBindingPower(infix);

    const right = this.parseExpression(infixBindingPower);

    return makeInfixExpression(infix, left, right);
  }

  private parseNumberLiteral(literal: string): NumberNode {
    const parsedNumber = Number(literal);
    if (Number.isNaN(parsedNumber)) {
      throw new Error(`expected non-NaN number, but received '${literal}'`);
    }

    return makeNumberNode(parsedNumber);
  }

  private parseBooleanLiteral(literal: "참" | "거짓"): BooleanNode {
    const parsedValue = literal === "참";

    return makeBooleanNode(parsedValue);
  }

  private parseStringLiteral(literal: string): StringNode {
    return makeStringNode(literal);
  }
}

export type * from "./syntax-tree";
