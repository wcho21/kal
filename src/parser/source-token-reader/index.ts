import type Lexer from "../../lexer";
import type { SourceToken } from "../../lexer";

export default class SourceTokenReader {
  private readonly lexer: Lexer;
  private token: SourceToken;

  constructor(lexer: Lexer) {
    this.lexer = lexer;
    this.token = lexer.getSourceToken();
  }

  read(): SourceToken {
    return this.token;
  }

  advance(): void {
    this.token = this.lexer.getSourceToken();
  }

  isEnd(): boolean {
    return this.token.type === "end";
  }
}
