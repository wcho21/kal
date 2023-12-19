import Buffer from "./buffer";
import * as Token from "./token";
import * as Util from "./util";

export default class Lexer {
  private readonly buffer: Buffer;

  constructor(input: string) {
    this.buffer = new Buffer(input);
  }

  private readNumber(): string {
    const wholeNumberPart = this.readWholeNumberPart();
    const decimalPart = this.readDecimalPart();

    const number = wholeNumberPart + decimalPart;

    return number;
  }

  private readWholeNumberPart(): string {
    // read digits
    const read = [];
    while (Util.isDigit(this.buffer.peek())) {
      read.push(this.buffer.pop());
    }

    return read.join("");
  }

  private readDecimalPart(): string {
    // early return if not decimal point
    const maybeDecimalPoint = this.buffer.peek();
    if (maybeDecimalPoint !== ".") {
      return "";
    }

    const read = [maybeDecimalPoint];
    this.buffer.pop(); // eat the decimal point

    // read digits after decimal point
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

  getToken(): Token.TokenType {
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
      case "(":
      case ")":
        this.buffer.pop(); // discard current character

        return Token.groupDelimiter(char);
      case "\0":
        return Token.end;
      default:
        if (Util.isDigit(char)) {
          const number = this.readNumber();

          return Token.numberLiteral(number);
        }

        if (Util.isLetter(char)) {
          // match keyword first before matching identifier
          // since identifier is a string of letters not matched with keywords

          const read = this.readIdentifier();

          if (read === "참" || read === "거짓") {
            return Token.booleanLiteral(read);
          }

          return Token.identifier(read);
        }

        this.buffer.pop(); // discard current character
        return Token.illegal(char);
    }
  }
}

export type { TokenType } from "./token";
