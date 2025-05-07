import CharBuffer, { type SourceChar } from "./char-buffer";

import {
  createOperatorToken,
  createGroupDelimiterToken,
  createBlockDelimiterToken,
  createSeparatorToken,
  createIllegalToken,
  createIllegalStringLiteralToken,
  createNumberLiteralToken,
  createBooleanLiteralToken,
  createStringLiteralToken,
  createKeywordToken,
  createIdentifierToken,
  createEndToken,
} from "./source-token";
import type {
  SourceToken,
  OperatorToken,
  IdentifierToken,
  KeywordToken,
  NumberLiteralToken,
  BooleanLiteralToken,
  StringLiteralToken,
  IllegalStringLiteralToken,
} from "./source-token";
import type { Position } from "../util/position";
import { isDigit, isLetter, isWhitespace } from "./util";

export default class Lexer {
  private readonly charBuffer: CharBuffer;

  constructor(input: string) {
    this.charBuffer = new CharBuffer(input);
  }

  getSourceToken(): SourceToken {
    this.skipWhitespaceChars();

    const char = this.charBuffer.peekChar();
    switch (char.value) {
      case "+":
      case "-":
      case "*":
      case "/":
        {
          const { position } = this.charBuffer.popChar();
          const value = char.value;

          const token = createOperatorToken(value, position, position);
          return token;
        }

      case "(":
      case ")":
        {
          const { position } = this.charBuffer.popChar();
          const value = char.value;

          const token = createGroupDelimiterToken(value, position, position);
          return token;
        }

      case "{":
      case "}":
        {
          const { position } = this.charBuffer.popChar();
          const value = char.value;

          const token = createBlockDelimiterToken(value, position, position);
          return token;
        }

      case ",":
        {
          const { position } = this.charBuffer.popChar();
          const value = char.value;

          const token = createSeparatorToken(value, position, position);
          return token;
        }

      case "!":
        {
          const { position: pos } = this.charBuffer.popChar();

          const token = this.lexCharsStartingWithBang(pos);
          return token;
        }

      case "=":
        {
          const { position: pos } = this.charBuffer.popChar();

          const token = this.lexCharsStartingWithEqual(pos);
          return token;
        }

      case ">":
        {
          const { position: pos } = this.charBuffer.popChar();

          const token = this.lexCharsStartingWithGreaterThan(pos);
          return token;
        }

      case "<":
        {
          const { position: pos } = this.charBuffer.popChar();

          const token = this.lexCharsStartingWithLessThan(pos);
          return token;
        }

      case "'":
        {
          const { position: pos } = this.charBuffer.popChar();

          const token = this.lexCharsStartingWithSingleQuote(pos);
          return token;
        }

      case CharBuffer.END_OF_INPUT:
        {
          const { position: pos } = this.charBuffer.popChar();

          const token = createEndToken("$end", pos, pos);
          return token;
        }

      default:
        {
          if (isDigit(char.value)) {
            const token = this.lexNumberLiteral();
            return token;
          }

          if (isLetter(char.value)) {
            const token = this.lexLetters();
            return token;
          }

          const { position } = this.charBuffer.popChar();
          const token = createIllegalToken(char.value, position, position);
          return token;
        }
    }
  }

  private skipWhitespaceChars(): void {
    while (true) {
      const char = this.charBuffer.peekChar();
      if (!isWhitespace(char.value)) {
        break;
      }

      this.charBuffer.popChar();
    }
  }

  /** assumes the bang character popped */
  private lexCharsStartingWithBang(bangPos: Position): OperatorToken {
    const peek = this.charBuffer.peekChar();
    switch (peek.value) {
      case "=":
        {
          const { position: posEnd } = this.charBuffer.popChar();
          return createOperatorToken("!=", bangPos, posEnd);
        }

      default:
        return createOperatorToken("!", bangPos, bangPos);
    }
  }

  /** assumes the equal character popped */
  private lexCharsStartingWithEqual(equalPos: Position): OperatorToken {
    const peek = this.charBuffer.peekChar();
    switch (peek.value) {
      case "=":
        {
          const { position: posEnd } = this.charBuffer.popChar();
          return createOperatorToken("==", equalPos, posEnd);
        }

      default:
        return createOperatorToken("=", equalPos, equalPos);
    }
  }

  /** assume the greater-than character popped */
  private lexCharsStartingWithGreaterThan(greaterThanPos: Position): OperatorToken {
    const peek = this.charBuffer.peekChar();
    switch (peek.value) {
      case "=":
        {
          const { position: posEnd } = this.charBuffer.popChar();
          return createOperatorToken(">=", greaterThanPos, posEnd);
        }

      default:
          return createOperatorToken(">", greaterThanPos, greaterThanPos);
    }
  }

  /** assume the less-than character popped */
  private lexCharsStartingWithLessThan(lessThanPos: Position): OperatorToken {
    const peek = this.charBuffer.peekChar();
    switch (peek.value) {
      case "=":
        {
          const { position: posEnd } = this.charBuffer.popChar();
          return createOperatorToken("<=", lessThanPos, posEnd);
        }

      default:
        return createOperatorToken("<", lessThanPos, lessThanPos);
    }
  }

  /** assume the single quote character popped */
  private lexCharsStartingWithSingleQuote(quotePos: Position): StringLiteralToken | IllegalStringLiteralToken {
    const chars: SourceChar[] = [];

    while (true) {
      const char = this.charBuffer.popChar();

      const value = chars.map(char => char.value).join("");
      const posBegin = quotePos;
      const posEnd = char.position;

      if (char.value === "'") {
        return createStringLiteralToken(value, posBegin, posEnd);
      }

      if (char.value === CharBuffer.END_OF_INPUT) {
        return createIllegalStringLiteralToken(value, posBegin, posEnd);
      }

      chars.push(char);
    }
  }

  private lexNumberLiteral(): NumberLiteralToken {
    const wholeNumberPart = this.readDigitChars();
    const decimalPart = this.readDecimalChars();
    const numberChars = wholeNumberPart.concat(decimalPart);

    const value = numberChars.map(char => char.value).join("");
    const posBegin = numberChars[0].position;
    const posEnd = numberChars[numberChars.length-1].position;

    const token = createNumberLiteralToken(value, posBegin, posEnd);
    return token;
  }

  private lexLetters(): BooleanLiteralToken | IdentifierToken | KeywordToken {
    const letterChars = this.readLetterChars();

    const value = letterChars.map(char => char.value).join("");
    const posBegin = letterChars[0].position;
    const posEnd = letterChars[letterChars.length-1].position;

    // order is important; match keywords first, then identifier
    switch (value) {
      case "참":
      case "거짓":
        {
          const token = createBooleanLiteralToken(value, posBegin, posEnd);
          return token;
        }

      case "만약":
      case "아니면":
      case "함수":
      case "결과":
        {
          const token = createKeywordToken(value, posBegin, posEnd);
          return token;
        }

      default:
        {
          const token = createIdentifierToken(value, posBegin, posEnd);
          return token;
        }
    }
  }

  private readDigitChars(): SourceChar[] {
    const chars: SourceChar[] = [];
    while (true) {
      const peek = this.charBuffer.peekChar();
      if (!isDigit(peek.value)) {
        break;
      }

      chars.push(this.charBuffer.popChar());
    }

    return chars;
  }

  private readDecimalChars(): SourceChar[] {
    // read decimal point; if not, early return
    const maybeDot = this.charBuffer.peekChar();
    if (maybeDot.value !== ".") {
      return [];
    }
    const dot = this.charBuffer.popChar();

    // read and return decimal part
    const digits = this.readDigitChars();
    const decimalChars = [dot].concat(digits);
    return decimalChars;
  }

  private readLetterChars(): SourceChar[] {
    const chars: SourceChar[] = [];
    while (true) {
      const peek = this.charBuffer.peekChar();
      if (!isLetter(peek.value) && !isDigit(peek.value)) {
        break;
      }

      chars.push(this.charBuffer.popChar());
    }

    return chars;
  }
}

export type { SourceToken } from "./source-token";
