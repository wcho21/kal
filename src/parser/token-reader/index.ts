import Lexer from "../../lexer";
import type { TokenType } from "../../lexer";

export default class TokenReader {
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
