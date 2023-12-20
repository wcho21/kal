import CharBuffer from "./char-buffer";
import * as Token from "./token";
import * as Util from "./util";

export default class Lexer {
  private readonly buffer: CharBuffer;

  constructor(input: string) {
    this.buffer = new CharBuffer(input);
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

  /** return [string-literal, true] if ok; otherwise [string-read-so-far, false] */
  private readStringLiteral(): [string, boolean] {
    const read: string[] = [];

    // read string until string closing symbol (')
    while (true) {
      const char = this.buffer.pop();

      // return illegal token if end before reading string
      if (char === "\0") {
        return [read.join(""), false];
      }

      if (char === "'") {
        return [read.join(""), true];
      }

      read.push(char);
    }
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
      case "!":
        this.buffer.pop(); // discard current character

        if (this.buffer.peek() === "=") {
          this.buffer.pop();
          return Token.operator("!=");
        }

        return Token.operator("!");
      case "+":
      case "-":
      case "*":
      case "/":
        this.buffer.pop(); // discard current character

        return Token.operator(char);
      case "=":
        this.buffer.pop(); // discard current character

        if (this.buffer.peek() === "=") {
          this.buffer.pop();
          return Token.operator("==");
        }

        return Token.operator("=");
      case ">":
        this.buffer.pop();

        if (this.buffer.peek() === "=") {
          this.buffer.pop();
          return Token.operator(">=");
        }

        return Token.operator(">");
      case "<":
        this.buffer.pop();

        if (this.buffer.peek() === "=") {
          this.buffer.pop();
          return Token.operator("<=");
        }

        return Token.operator("<");
      case "(":
      case ")":
        this.buffer.pop(); // discard current character

        return Token.groupDelimiter(char);
      case "'":
        {
          this.buffer.pop(); // discard current character

          const [str, ok] = this.readStringLiteral();
          return ok ? Token.stringLiteral(str) : Token.illegal("'" + str);
        }
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
