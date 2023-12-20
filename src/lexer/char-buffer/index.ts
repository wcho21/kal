import Reader from "./reader";

export default class CharBuffer {
  static readonly END_OF_INPUT = "\0";

  private readonly reader: Reader;

  constructor(input: string) {
    this.reader = new Reader(input, CharBuffer.END_OF_INPUT);
  }

  pop(): string {
    const char = this.reader.read();
    this.reader.next();

    return char;
  }

  peek(): string {
    const char = this.reader.read();

    return char;
  }
}
