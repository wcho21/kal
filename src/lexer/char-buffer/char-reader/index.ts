import type SourceChar from "./source-char";

export default class CharReader {
  private readonly chars: string;
  private readonly fallbackChar: string;
  private index: number; // next index to read
  private row: number; // current row
  private col: number; // current col

  /**
   * @params chars - Characters to initialize
   * @params fallbackChar - A character to return on underflow
   */
  constructor(chars: string, fallbackChar: string) {
    this.chars = chars;
    this.fallbackChar = fallbackChar;

    this.index = 0; // first character to read is at index 0
    this.row = 0;
    this.col = 0;
  }

  /** return character at current position */
  readChar(): SourceChar {
    // return fallback character if end of input
    if (this.index === this.chars.length) {
      const fallbackChar: SourceChar = {
        value: this.fallbackChar,
        position: {
          row: this.row,
          col: this.col,
        },
      };
      return fallbackChar;
    }

    // return new line character(s) if any
    const newLine = this.peekNewLine();
    if (newLine !== null) {
      const newLineChar = {
        value: newLine,
        position: {
          row: this.row,
          col: this.col,
        },
      };
      return newLineChar;
    }

    // return single character
    const char = this.chars[this.index];
    const sourceChar: SourceChar = {
      value: char,
      position: {
        row: this.row,
        col: this.col,
      },
    };
    return sourceChar;
  }

  /** advance to next character */
  advance(): void {
    if (this.index === this.chars.length) {
      return;
    }

    // advance position past new line character(s) if any
    const newLine = this.peekNewLine();
    if (newLine !== null) {
      this.index += newLine.length;
      ++this.row;
      this.col = 0;
      return;
    }

    // advance
    ++this.index;
    ++this.col;
  }

  private peekNewLine(): string | null {
    // return if end of input
    if (this.index === this.chars.length) {
      return null;
    }

    // return if no new line
    const char = this.chars[this.index];
    if (char !== "\r" && char !== "\n") {
      return null;
    }

    // return if the last character
    if (this.index + 1 === this.chars.length) {
      return char;
    }

    // return if CR LF
    const nextChar = this.chars[this.index + 1];
    if (char === "\r" && nextChar === "\n") {
      return char + nextChar;
    }

    // return if CR or LF
    return char;
  }
}

export type { SourceChar };
