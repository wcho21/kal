import * as SyntaxTree from "./syntax-tree";
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

  private parseStatement(): SyntaxTree.Statement {
    let token: TokenType;

    token = this.buffer.read();
    this.buffer.next();
    if (token.type !== "identifier") {
      throw new Error(`not identifier, but received ${token.type}`);
    }
    const identifier = SyntaxTree.identifier(token.value);

    token = this.buffer.read();
    this.buffer.next();
    if (token.type !== "operator" || token.value !== "=") {
      throw new Error(`not operator =, but received ${token.type}`);
    }

    // TODO: support more node type (currenly number literal supported)
    token = this.buffer.read();
    this.buffer.next();
    if (token.type !== "number literal") {
      throw new Error(`not number literal, but received ${token.type}`);
    }
    const numberParsed = Number(token.value);
    if (Number.isNaN(numberParsed)) {
      throw new Error(`received NaN`);
    }
    const expression = SyntaxTree.numberNode(numberParsed);

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
