import Buffer from "./buffer";
import * as Token from "./token";
import * as Util from "./util";

export default class Lexer {
  private readonly buffer: Buffer;

  constructor(input: string) {
    this.buffer = new Buffer(input);
  }

  private readNumber(): string {
    // read digits
    const read = [];
    while (Util.isDigit(this.buffer.peek())) {
      read.push(this.buffer.pop());
    }

    return read.join("");
  }

  private readIdentifier(): string {
    // read letters and digits
    const read = [];
    while (
      Util.isLetter(this.buffer.peek()) ||
      Util.isDigit(this.buffer.peek())
    ) {
      read.push(this.buffer.pop());
    }

    return read.join("");
  }

  private skipWhitespaces(): void {
    while (Util.isWhitespace(this.buffer.peek())) {
      this.buffer.pop(); // discard current character
    }
  }

  getToken() {
    this.skipWhitespaces();

    const char = this.buffer.peek();

    switch (char) {
      case "+":
      case "-":
      case "*":
      case "/":
      case "=":
        this.buffer.pop(); // discard current character

        return Token.operator(char);
      case "\0":
        return Token.end;
      default:
        if (Util.isDigit(char)) {
          const number = this.readNumber();

          return Token.numberLiteral(number);
        }

        if (Util.isLetter(char)) {
          const identifier = this.readIdentifier();

          return Token.identifier(identifier);
        }

        this.buffer.pop(); // discard current character
        return Token.illegal(char);
    }
  }
}
