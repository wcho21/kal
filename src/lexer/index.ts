import { types, type Token, type TokenType } from "./tokens";

export default class Lexer {
  /*
   * NOTE (on implementation details and naming convention):
   * for all private 'read' methods, position variable advances
   *
   * NOTE 2:
   * I don't like the way to set this.char to read input characters
   * maybe I can factor out the character-reading logic into some another class
   * (but for now leave it as it is)
   */

  private static readonly endOfInput = "\0";

  private readonly input: string;
  private position: number; // points index of input to read next
  private char: string;

  constructor(input: string) {
    this.input = input;
    this.position = 0;
    this.char = " ";
  }

  private isEndOfInput() {
    return this.position >= this.input.length;
  }

  private readChar(): void {
    if (this.isEndOfInput()) {
      this.char = Lexer.endOfInput;
      return;
    }

    this.char = this.input[this.position];
    this.position++;
  }

  private peekChar(): string {
    if (this.isEndOfInput()) {
      return Lexer.endOfInput;
    }

    return this.input[this.position];
  }

  private readIdentifier(): string {
    const buffer: string[] = [];
    while (Util.isLetter(this.char)) {
      buffer.push(this.char);
      this.readChar();
    }
    return buffer.join("");
  }

  private readNumber(): string {
    const buffer: string[] = [];
    while (Util.isDigit(this.char)) {
      buffer.push(this.char);
      this.readChar();
    }
    return buffer.join("");
  }

  private skipWhitespaces() {
    while (Util.isWhitespace(this.char)) {
      this.readChar();
    }
  }

  getToken(): Token { // stub
    let token: Token;
    this.skipWhitespaces();

    switch (this.char) {
      case "=":
        if (this.peekChar() === "=") {
          const prevChar = this.char;
          this.readChar();
          token = { type: types.equal, value: prevChar + this.char };
          break;
        }

        token = { type: types.assign, value: this.char };
        break;
      case "+":
        token = { type: types.plus, value: this.char };
        break;
      case "-":
        token = { type: types.minus, value: this.char };
        break;
      case "*":
        token = { type: types.asterisk, value: this.char };
        break;
      case "/":
        token = { type: types.slash, value: this.char };
        break;
      case "!":
        if (this.peekChar() === "=") {
          const prevChar = this.char;
          this.readChar();
          token = { type: types.notEqual, value: prevChar + this.char };
          break;
        }

        token = { type: types.bang, value: this.char };
        break;
      case ">":
        if (this.peekChar() === "=") {
          const prevChar = this.char;
          this.readChar();
          token = { type: types.greaterThanOrEqualTo, value: prevChar + this.char };
          break;
        }

        token = { type: types.greaterThan, value: this.char };
        break;
      case "<":
        if (this.peekChar() === "=") {
          const prevChar = this.char;
          this.readChar();
          token = { type: types.lessThanOrEqualTo, value: prevChar + this.char };
          break;

        }
        token = { type: types.lessThan, value: this.char };
        break;
      case "(":
        token = { type: types.leftParen, value: this.char };
        break;
      case ")":
        token = { type: types.rightParen, value: this.char };
        break;
      case "{":
        token = { type: types.leftBrace, value: this.char };
        break;
      case "}":
        token = { type: types.rightBrace, value: this.char };
        break;
      case ",":
        token = { type: types.comma, value: this.char };
        break;
      case ";":
        token = { type: types.semicolon, value: this.char };
        break;
      case "\0":
        token = { type: types.endOfFile, value: this.char };
        break;
      default:
        if (Util.isLetter(this.char)) {
          const value = this.readIdentifier();
          const type = Util.getKeywordOrIdentifierTokenType(value);
          return { type, value };
        }
        if (Util.isDigit(this.char)) {
          const value = this.readNumber();
          const type = types.integer;
          return { type, value };
        }

        token = { type: types.unexpected, value: this.char };
        break;
    }

    this.readChar();
    return token;
  }
}
export { types };
export type { Token, TokenType };

// TODO:
// move to better place (and rename, because 'Util' is not a very good choice)
class Util {
  static keywordTokenTypeTable = new Map<string, TokenType>([
    // TODO: factor out keyword string literals or leave them as magic constants?
    ["함수", types.func],
    ["변수", types.variable],
    ["만약", types.condIf],
    ["아니면", types.condElse],
    ["반환", types.funcReturn],
    ["참", types.boolTrue],
    ["거짓", types.boolFalse],
  ]);

  /** a 'letter' means an alphabet in English or Korean, or underbar */
  static isLetter(char: string): boolean {
    return /^[a-zA-Z가-힣_]$/.test(char);
  }

  static isDigit(char: string): boolean {
    return /^[0-9]$/.test(char);
  }

  static isWhitespace(char: string): boolean {
    return /^[ \t\r\n]$/.test(char);
  }

  static isKeyword(str: string): boolean {
    return /^함수|변수|만약|아니면|반환|참|거짓$/.test(str);
  }

  static getKeywordOrIdentifierTokenType(tokenValue: string): TokenType {
    const type: TokenType | undefined = Util.keywordTokenTypeTable.get(tokenValue);
    if (type !== undefined) {
      return type;
    }

    return types.identifier;
  }
}
