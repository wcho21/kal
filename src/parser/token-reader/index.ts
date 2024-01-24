import Lexer from "../../lexer";
import type { TokenType } from "../../lexer";

/** @deprecated */
export default class TokenReader {
  private readonly lexer: Lexer;
  private token: TokenType;

  constructor(lexer: Lexer) {
    this.lexer = lexer;
    this.token = lexer.getToken();
  }

  /** @deprecated */
  isEnd(): boolean {
    return this.token.type === "end";
  }

  /** @deprecated */
  read(): TokenType {
    return this.token;
  }

  /** @deprecated */
  next(): void {
    this.token = this.lexer.getToken();
  }
}
