import Lexer from "../../lexer";
import TokenReader from "./";

describe("read()", () => {
  it("read a token", () => {
    const input = "42";
    const lexer = new Lexer(input);
    const reader = new TokenReader(lexer);

    expect(reader.read()).toEqual({ type: "number literal", value: "42" });
  });
});

describe("next()", () => {
  it("read next token", () => {
    const input = "42 99";
    const lexer = new Lexer(input);
    const reader = new TokenReader(lexer);

    expect(reader.read()).toEqual({ type: "number literal", value: "42" });
    reader.next();
    expect(reader.read()).toEqual({ type: "number literal", value: "99" });
  });

  it("read end token if end", () => {
    const input = "";
    const lexer = new Lexer(input);
    const reader = new TokenReader(lexer);

    expect(reader.read()).toEqual({ type: "end" });
    reader.next();
    expect(reader.read()).toEqual({ type: "end" });
  });
});

describe("isEnd()", () => {
  it("return true if end", () => {
    const input = "";
    const lexer = new Lexer(input);
    const reader = new TokenReader(lexer);

    expect(reader.isEnd()).toBe(true);
  });

  it("return false if not end", () => {
    const input = "42";
    const lexer = new Lexer(input);
    const reader = new TokenReader(lexer);

    expect(reader.isEnd()).toBe(false);
  });
});
