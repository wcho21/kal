export default class Reader {
  private readonly chars: string;
  private readonly fallbackChar: string;
  private index: number;

  /**
   * @params chars - Characters to initialize
   * @params fallbackChar - A character to return on underflow
   */
  constructor(chars: string, fallbackChar: string) {
    this.chars = chars;
    this.fallbackChar = fallbackChar;
    this.index = 0; // first character to read is at index 0
  }

  /** Returns current character; if end of input, return fallback character */
  read(): string {
    if (this.index === this.chars.length) {
      return this.fallbackChar;
    }

    return this.chars[this.index];
  }

  /** Increment index to get next character with get() */
  next(): void {
    if (this.index === this.chars.length) {
      return;
    }

    this.index++;
  }
}
