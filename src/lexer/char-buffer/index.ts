import CharReader, { type SourceChar } from "./char-reader";

export default class CharBuffer {
  static readonly END_OF_INPUT = "\0";

  private readonly reader: CharReader;

  constructor(input: string) {
    this.reader = new CharReader(input, CharBuffer.END_OF_INPUT);
  }

  popChar(): SourceChar {
    const char = this.reader.readChar();
    this.reader.advance();

    return char;
  }

  peekChar(): SourceChar {
    const char = this.reader.readChar();

    return char;
  }
}

export type { SourceChar } from "./char-reader";
