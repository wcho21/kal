import Lexer from "../lexer";
import Parser from "./";

describe("parseProgram()", () => {
  it("should parse an assignment statement", () => {
    const input = "x = 42"
    const lexer = new Lexer(input);
    const parser = new Parser(lexer);

    const node = parser.parseProgram();
    expect(node.statements.length).toBe(1);

    expect(node.statements[0]).toEqual({
      type: "assignment",
      left: { type: "identifier", value: "x" },
      right: { type: "number node", value: 42 },
    });
  });

  it("should parse more than one assignment statements", () => {
    const input = "x = 42 한 = 9"
    const lexer = new Lexer(input);
    const parser = new Parser(lexer);

    const node = parser.parseProgram();
    expect(node.statements.length).toBe(2);

    expect(node.statements[0]).toEqual({
      type: "assignment",
      left: { type: "identifier", value: "x" },
      right: { type: "number node", value: 42 },
    });
    expect(node.statements[1]).toEqual({
      type: "assignment",
      left: { type: "identifier", value: "한" },
      right: { type: "number node", value: 9 },
    });
  });
});
