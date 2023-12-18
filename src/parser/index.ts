import * as SyntaxTree from "./syntax-tree";
import type * as SyntaxTreeType from "./syntax-tree";
import Lexer from "../lexer";
import type { TokenType } from "../lexer";

type PrefixParser = () => SyntaxTreeType.Expression;
type InfixParser = (left: SyntaxTreeType.Expression) => SyntaxTreeType.Expression;

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

  private parseNumberLiteral(literal: string): SyntaxTree.NumberNode {
    const parsedNumber = Number(literal);
    if (Number.isNaN(parsedNumber)) {
      throw new Error(`expected non-NaN number, but received '${literal}'`);
    }

    return SyntaxTree.numberNode(parsedNumber);
  }

  private parseStatement(): SyntaxTree.Statement {
    let token: TokenType;

    token = this.buffer.read();
    this.buffer.next(); // eat token before throwing
    if (token.type === "number literal") {
      const numberNode = this.parseNumberLiteral(token.value);
      return SyntaxTree.expressionStatement(numberNode);
    }
    if (token.type !== "identifier") {
      throw new Error(`not identifier, but received ${token.type}`);
    }
    const identifier = SyntaxTree.identifier(token.value);

    token = this.buffer.read();
    if (token.type !== "operator" || token.value !== "=") {
      return SyntaxTree.expressionStatement(identifier);
    }
    this.buffer.next(); // eat token after branching

    // TODO: support more node type (currenly number literal supported)
    token = this.buffer.read();
    this.buffer.next(); // eat token before throwing
    if (token.type !== "number literal") {
      throw new Error(`not number literal, but received ${token.type}`);
    }
    const expression = this.parseNumberLiteral(token.value);

    return SyntaxTree.assignment(identifier, expression);
  }

  parseProgram(): SyntaxTree.Program {
    const program = SyntaxTree.program();

    while (!this.buffer.isEnd()) {
      const statement = this.parseStatement();
      if (statement !== null) {
        program.statements.push(statement);
      }
    }

    return program;
  }
}
