import {
  makeProgram,
  makeIdentifier,
  makeAssignment,
  makeNumberNode,
  makeExpressionStatement,
  makePrefixExpression,
} from "./syntax-tree";
import type {
  Program,
  Statement,
  NumberNode,
  ExpressionStatement,
  Expression,
  PrefixExpression,
} from "./syntax-tree";
import Lexer from "../lexer";
import type { TokenType } from "../lexer";

class TokenBuffer {
  private readonly lexer: Lexer;
  private token: TokenType;

  constructor(lexer: Lexer) {
    this.lexer = lexer;
    this.token = lexer.getToken();
  }

  isEnd(): boolean {
    return this.token.type === "end";
  }

  read(): TokenType {
    return this.token;
  }

  next(): void {
    this.token = this.lexer.getToken();
  }
}

export default class Parser {
  private buffer: TokenBuffer;

  constructor(lexer: Lexer) {
    this.buffer = new TokenBuffer(lexer);
  }

  private parseNumberLiteral(literal: string): NumberNode {
    const parsedNumber = Number(literal);
    if (Number.isNaN(parsedNumber)) {
      throw new Error(`expected non-NaN number, but received '${literal}'`);
    }

    return makeNumberNode(parsedNumber);
  }

  private parsePrefixExpression(): Expression {
    const token = this.buffer.read();
    this.buffer.next(); // eat token

    if (token.type === "number literal") {
      const numberNode = this.parseNumberLiteral(token.value);
      return numberNode;
    }
    if (token.type === "identifier") {
      const identifier = makeIdentifier(token.value);
      return identifier;
    }
    if (
      token.type === "operator" &&
      (token.value === "+" || token.value === "-")
    ) {
      const subExpression = this.parseExpression();
      const prefix = token.value;
      const expression = makePrefixExpression(prefix, subExpression);
      return expression;
    }

    throw new Error(`bad token type ${token.type} for prefix expression`);
  }

  private parseInfixExpression(left: Expression): Expression | null {
    let token = this.buffer.read();
    if (token.type !== "operator" || token.value !== "=") {
      return null;
    }
    this.buffer.next(); // eat operator token after branching

    // TODO: support more node type (currenly number literal supported)
    token = this.buffer.read();
    this.buffer.next(); // eat token before throwing
    if (token.type !== "number literal") {
      throw new Error(`not number literal, but received ${token.type}`);
    }
    if (left.type !== "identifier") {
      throw new Error(`expected identifier on left value, but received ${token.type}`);
    }

    const expression = this.parseNumberLiteral(token.value);
    return makeAssignment(left, expression);
  }

  private parseExpression(): Expression  {
    const left = this.parsePrefixExpression();

    const infixExpression = this.parseInfixExpression(left);
    if (infixExpression === null) {
      return left;
    }

    return infixExpression;
  }

  private parseExpressionStatement(): ExpressionStatement {
    const expression = this.parseExpression();

    return makeExpressionStatement(expression);
  }

  private parseStatement(): Statement {
    return this.parseExpressionStatement();
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
}
