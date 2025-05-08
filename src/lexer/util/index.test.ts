import { describe, expect, it } from "bun:test";
import * as Util from "./";

describe("isLetter()", () => {
  it("return true if a letter", () => {
    expect(Util.isLetter("a")).toBe(true);
    expect(Util.isLetter("z")).toBe(true);
    expect(Util.isLetter("A")).toBe(true);
    expect(Util.isLetter("Z")).toBe(true);
    expect(Util.isLetter("가")).toBe(true);
    expect(Util.isLetter("힣")).toBe(true);
    expect(Util.isLetter("_")).toBe(true);
  });

  it("return false if not a letter", () => {
    expect(Util.isLetter("+")).toBe(false);
    expect(Util.isLetter("-")).toBe(false);
    expect(Util.isLetter("*")).toBe(false);
    expect(Util.isLetter("/")).toBe(false);
    expect(Util.isLetter("$")).toBe(false);
    expect(Util.isLetter("-")).toBe(false);
    expect(Util.isLetter("0")).toBe(false);
    expect(Util.isLetter("9")).toBe(false);
    expect(Util.isLetter(" ")).toBe(false);
    expect(Util.isLetter("foo")).toBe(false);
  });
});

describe("isDigit()", () => {
  it("return true if a digit", () => {
    expect(Util.isDigit("0")).toBe(true);
    expect(Util.isDigit("9")).toBe(true);
  });

  it("return false if not a digit", () => {
    expect(Util.isDigit("+")).toBe(false);
    expect(Util.isDigit("-")).toBe(false);
    expect(Util.isDigit("*")).toBe(false);
    expect(Util.isDigit("/")).toBe(false);
    expect(Util.isDigit("$")).toBe(false);
    expect(Util.isDigit("-")).toBe(false);
    expect(Util.isDigit("a")).toBe(false);
    expect(Util.isDigit("가")).toBe(false);
    expect(Util.isDigit(" ")).toBe(false);
    expect(Util.isDigit("123")).toBe(false);
  });
});

describe("isWhitespace()", () => {
  it("return true if a whitespace", () => {
    expect(Util.isWhitespace(" ")).toBe(true);
    expect(Util.isWhitespace("\t")).toBe(true);
    expect(Util.isWhitespace("\r")).toBe(true);
    expect(Util.isWhitespace("\n")).toBe(true);
  });

  it("return false if not a whitespace", () => {
    expect(Util.isWhitespace("+")).toBe(false);
    expect(Util.isWhitespace("-")).toBe(false);
    expect(Util.isWhitespace("*")).toBe(false);
    expect(Util.isWhitespace("/")).toBe(false);
    expect(Util.isWhitespace("$")).toBe(false);
    expect(Util.isWhitespace("-")).toBe(false);
    expect(Util.isWhitespace("a")).toBe(false);
    expect(Util.isWhitespace("가")).toBe(false);
    expect(Util.isWhitespace("123")).toBe(false);
    expect(Util.isWhitespace("  ")).toBe(false);
  });
});
