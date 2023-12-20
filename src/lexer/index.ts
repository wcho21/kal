import CharBuffer from "./char-buffer";
import * as Token from "./token";
import * as Util from "./util";

export default class Lexer {
  private readonly charBuffer: CharBuffer;

  constructor(input: string) {
    this.charBuffer = new CharBuffer(input);
  }

  private readNumber(): string {
    const wholeNumberPart = this.readWholeNumberPart();
    const decimalPart = this.readDecimalPart();

    const number = wholeNumberPart + decimalPart;

    return number;
  }

  private readWholeNumberPart(): string {
    const digits = [];
    while (Util.isDigit(this.charBuffer.peek())) {
      digits.push(this.charBuffer.pop());
    }

    const wholeNumberPart = digits.join("");
    return wholeNumberPart;
  }

  private readDecimalPart(): string {
    // early return if not decimal point
    const maybeDecimalPoint = this.charBuffer.peek();
    if (maybeDecimalPoint !== ".") {
      return "";
    }
    const decimalPoint = this.charBuffer.pop();

    // read digits after decimal point
    const digits = [];
    while (Util.isDigit(this.charBuffer.peek())) {
      digits.push(this.charBuffer.pop());
    }

    const decimalPart = decimalPoint + digits.join("");
    return decimalPart;
  }

  /** return [string-literal, true] if ok; otherwise [string-read-so-far, false] */
  private readStringLiteral(): [string, boolean] {
    const read: string[] = [];

    // read string until string closing symbol (')
    while (true) {
      const char = this.charBuffer.pop();

      if (char === "'") {
        const str = read.join("");
        const ok = true;
        return [str, ok];
      }

      if (char === CharBuffer.END_OF_INPUT) {
        const str = read.join("");
        const notOk = false;
        return [str, notOk];
      }

      read.push(char);
    }
  }

  private readIdentifier(): string {
    // read letters and digits
    const read = [];
    while (
      Util.isLetter(this.charBuffer.peek()) ||
      Util.isDigit(this.charBuffer.peek())
    ) {
      read.push(this.charBuffer.pop());
    }

    return read.join("");
  }

  private skipWhitespaces(): void {
    while (Util.isWhitespace(this.charBuffer.peek())) {
      this.charBuffer.pop();
    }
  }

  /** assume the bang character popped */
  private readOperatorStartingWithBang(): "!" | "!=" {
    switch (this.charBuffer.peek()) {
      case "=":
        this.charBuffer.pop();
        return "!=";

      default:
        return "!";
    }
  }

  /** assume the equal character popped */
  private readOperatorStartingWithEqual(): "=" | "==" {
    switch (this.charBuffer.peek()) {
      case "=":
        this.charBuffer.pop();
        return "==";

      default:
        return "=";
    }
  }

  /** assume the greater-than character popped */
  private readOperatorStartingWithGreaterThan(): ">" | ">=" {
    switch (this.charBuffer.peek()) {
      case "=":
        this.charBuffer.pop();
        return ">=";

      default:
        return ">";
    }
  }

  /** assume the less-than character popped */
  private readOperatorStartingWithLessThan(): "<" | "<=" {
    switch (this.charBuffer.peek()) {
      case "=":
        this.charBuffer.pop();
        return "<=";

      default:
        return "<";
    }
  }

  getToken(): Token.TokenType {
    this.skipWhitespaces();

    const char = this.charBuffer.peek();
    switch (char) {
      case "+":
      case "-":
      case "*":
      case "/":
        {
          const operator = this.charBuffer.pop() as typeof char;
          return Token.operator(operator);
        }

      case "(":
      case ")":
        {
          const delimiter = this.charBuffer.pop() as typeof char;
          return Token.groupDelimiter(delimiter);
        }

      case "!":
        {
          this.charBuffer.pop();

          const operator = this.readOperatorStartingWithBang();
          return Token.operator(operator);
        }

      case "=":
        {
          this.charBuffer.pop();

          const operator: "=" | "==" = this.readOperatorStartingWithEqual();
          return Token.operator(operator);
        }

      case ">":
        {
          this.charBuffer.pop();

          const operator: ">" | ">=" = this.readOperatorStartingWithGreaterThan();
          return Token.operator(operator);
        }

      case "<":
        {
          this.charBuffer.pop();

          const operator: "<" | "<=" = this.readOperatorStartingWithLessThan();
          return Token.operator(operator);
        }

      case "'":
        {
          this.charBuffer.pop();

          const [str, ok] = this.readStringLiteral();
          return ok ? Token.stringLiteral(str) : Token.illegal("'" + str);
        }

      case CharBuffer.END_OF_INPUT:
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

        this.charBuffer.pop();
        return Token.illegal(char);
    }
  }
}

export type { TokenType } from "./token";
