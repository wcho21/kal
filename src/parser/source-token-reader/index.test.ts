import { describe, expect, it } from "bun:test";
import Lexer from "../../lexer";
import type { SourceToken } from "../../lexer/source-token";
import SourceTokenReader from "./";

type Token = SourceToken;
type Case = { name: string; token: Token; expected: Token };

const createReader = (input: string) => {
  const lexer = new Lexer(input);

  return new SourceTokenReader(lexer);
};

describe("read()", () => {
  it("read a token", () => {
    const input = "42";
    const reader = createReader(input);
    const expected: Token = {
      type: "number literal",
      value: "42",
      range: {
        begin: { col: 0, row: 0 },
        end: { col: 1, row: 0 },
      },
    };

    expect(reader.read()).toEqual(expected);
  });

  it("read the end token if nothing to read", () => {
    const input = "";
    const reader = createReader(input);
    const expected: Token = {
      type: "end",
      value: "$end",
      range: {
        begin: { col: 0, row: 0 },
        end: { col: 0, row: 0 },
      },
    };

    expect(reader.read()).toEqual(expected);
  });
});

describe("advance()", () => {
  it("advance to next token", () => {
    const input = "42 99";
    const reader = createReader(input);
    const expected: Token = {
      type: "number literal",
      value: "99",
      range: {
        begin: { col: 3, row: 0 },
        end: { col: 4, row: 0 },
      },
    };

    reader.advance();
    expect(reader.read()).toEqual(expected);
  });
});

describe("isEnd()", () => {
  it("return true if end", () => {
    const input = "";
    const reader = createReader(input);
    const expected = true;

    expect(reader.isEnd()).toEqual(expected);
  });

  it("return false if not end", () => {
    const input = "42";
    const reader = createReader(input);
    const expected = false;

    expect(reader.isEnd()).toEqual(expected);
  });
});
