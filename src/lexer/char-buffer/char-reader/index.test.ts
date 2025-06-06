import { describe, expect, it } from "bun:test";
import Reader from "./";

describe("readSource()", () => {
  it("read a character", () => {
    const reader = new Reader("a", "\0");
    const expected = { value: "a", position: { row: 0, col: 0 } };

    const char = reader.readChar();

    expect(char).toEqual(expected);
  });

  it("read the same character twice if not advanced", () => {
    const reader = new Reader("a", "\0");
    const expected = { value: "a", position: { row: 0, col: 0 } };

    const char1 = reader.readChar();
    const char2 = reader.readChar();

    expect(char1).toEqual(expected);
    expect(char2).toEqual(expected);
  });

  it("read the fallback character if end of input", () => {
    const reader = new Reader("", "\0");
    const expected = { value: "\0", position: { row: 0, col: 0 } };

    const char1 = reader.readChar();
    const char2 = reader.readChar();

    expect(char1).toEqual(expected);
    expect(char2).toEqual(expected);
  });
});

describe("advance()", () => {
  it("advance to next character", () => {
    const reader = new Reader("ab", "\0");
    const expected = { value: "b", position: { row: 0, col: 1 } };

    reader.advance();
    const char = reader.readChar();

    expect(char).toEqual(expected);
  });

  it("advance to next line if new line (LF)", () => {
    const reader = new Reader("a\nb", "\0");
    const expected1 = { value: "\n", position: { row: 0, col: 1 } };
    const expected2 = { value: "b", position: { row: 1, col: 0 } };

    reader.advance();
    const char1 = reader.readChar();
    expect(char1).toEqual(expected1);

    reader.advance();
    const char2 = reader.readChar();
    expect(char2).toEqual(expected2);
  });

  it("advance to next line if new line (CR LF)", () => {
    const reader = new Reader("a\r\nb", "\0");
    const expected1 = { value: "\r\n", position: { row: 0, col: 1 } };
    const expected2 = { value: "b", position: { row: 1, col: 0 } };

    reader.advance();
    const char1 = reader.readChar();
    expect(char1).toEqual(expected1);

    reader.advance();
    const char2 = reader.readChar();
    expect(char2).toEqual(expected2);
  });

  it("read a couple of LF new lines", () => {
    const reader = new Reader("a\n\nb", "\0");
    const expected1 = { value: "\n", position: { row: 0, col: 1 } };
    const expected2 = { value: "\n", position: { row: 1, col: 0 } };

    reader.advance();
    const char1 = reader.readChar();
    expect(char1).toEqual(expected1);

    reader.advance();
    const char2 = reader.readChar();
    expect(char2).toEqual(expected2);
  });

  it("read a couple of CR LF new lines", () => {
    const reader = new Reader("a\r\n\r\nb", "\0");
    const expected1 = { value: "\r\n", position: { row: 0, col: 1 } };
    const expected2 = { value: "\r\n", position: { row: 1, col: 0 } };

    reader.advance();
    const char1 = reader.readChar();
    expect(char1).toEqual(expected1);

    reader.advance();
    const char2 = reader.readChar();
    expect(char2).toEqual(expected2);
  });
});
