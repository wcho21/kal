import CharBuffer from "./char-buffer";
import * as Token from "./token";
import * as Util from "./util";

export default class Lexer {
  private readonly charBuffer: CharBuffer;

  constructor(input: string) {
    this.charBuffer = new CharBuffer(input);
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

      case "{":
      case "}":
        {
          const delimiter = this.charBuffer.pop() as typeof char;
          return Token.blockDelimiter(delimiter);
        }

      case ",":
        {
          const separator = this.charBuffer.pop() as typeof char;
          return Token.separator(separator);
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
          const number = this.readNumberLiteral();

          return Token.numberLiteral(number);
        }

        if (Util.isLetter(char)) {
          const read = this.readLettersAndDigits();

          // order is important: match keywords first, before identifier
          if (read === "참" || read === "거짓") {
            return Token.booleanLiteral(read);
          }

          if (
            read === "만약" ||
            read === "아니면" ||
            read === "함수" ||
            read === "결과"
          ) {
            return Token.keyword(read);
          }

          return Token.identifier(read);
        }

        this.charBuffer.pop();
        return Token.illegal(char);
    }
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

  /** return [string-literal, true] if ok; otherwise [string-read-so-far, false] */
  private readStringLiteral(): [string, boolean] {
    const read: string[] = [];

    // read string until string closing symbol (')
    while (true) {
      const char = this.charBuffer.pop();

      if (char === "'" || char === CharBuffer.END_OF_INPUT) {
        const str = read.join("");
        const legalString = char === "'"; // true if closing quote encoutered

        return [str, legalString];
      }

      read.push(char);
    }
  }

  private readNumberLiteral(): string {
    const wholeNumberPart = this.readDigits();
    const decimalPart = this.readDecimalPart();

    const number = wholeNumberPart + decimalPart;

    return number;
  }

  private readDigits(): string {
    const read: string[] = [];
    while (Util.isDigit(this.charBuffer.peek())) {
      read.push(this.charBuffer.pop());
    }

    const digits = read.join("");
    return digits;
  }

  /** helper function for readNumberLiteral() method */
  private readDecimalPart(): string {
    // read decimal point; if not, early return
    const maybeDecimalPoint = this.charBuffer.peek();
    if (maybeDecimalPoint !== ".") {
      return "";
    }
    const decimalPoint = this.charBuffer.pop();

    // read and return decimal part
    const digits = this.readDigits();
    const decimalPart = decimalPoint + digits;
    return decimalPart;
  }

  private readLettersAndDigits(): string {
    const read = [];
    while (
      Util.isLetter(this.charBuffer.peek()) ||
      Util.isDigit(this.charBuffer.peek())
    ) {
      read.push(this.charBuffer.pop());
    }

    return read.join("");
  }
}

export type { TokenType } from "./token";
