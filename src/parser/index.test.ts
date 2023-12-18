import Lexer from "../lexer";
import Parser from "./";

describe("parseProgram()", () => {
  describe("assignment", () => {
    it("should parse an assignment statement", () => {
      const input = "x = 42"
      const lexer = new Lexer(input);
      const parser = new Parser(lexer);

      const node = parser.parseProgram();
      expect(node.statements.length).toBe(1);

      expect(node.statements[0]).toEqual({
        type: "expression statement",
        expression: {
          type: "assignment",
          left: { type: "identifier", value: "x" },
          right: { type: "number node", value: 42 },
        },
      });
    });

    it("should parse more than one assignment statements", () => {
      const input = "x = 42 한 = 9"
      const lexer = new Lexer(input);
      const parser = new Parser(lexer);

      const node = parser.parseProgram();
      expect(node.statements.length).toBe(2);

      expect(node.statements[0]).toEqual({
        type: "expression statement",
        expression: {
          type: "assignment",
          left: { type: "identifier", value: "x" },
          right: { type: "number node", value: 42 },
        },
      });
      expect(node.statements[1]).toEqual({
        type: "expression statement",
        expression: {
          type: "assignment",
          left: { type: "identifier", value: "한" },
          right: { type: "number node", value: 9 },
        },
      });
    });
  });

  describe("single expression", () => {
    it("parse a single identifier expression", () => {
      const input = "x";
      const lexer = new Lexer(input);
      const parser = new Parser(lexer);

      const node = parser.parseProgram();
      expect(node.statements.length).toBe(1);

      expect(node.statements[0]).toEqual({
        type: "expression statement",
        expression: { type: "identifier", value: "x" },
      });
    });

    it("parse a number literal expression", () => {
      const input = "5";
      const lexer = new Lexer(input);
      const parser = new Parser(lexer);

      const node = parser.parseProgram();
      expect(node.statements.length).toBe(1);

      expect(node.statements[0]).toEqual({
        type: "expression statement",
        expression: { type: "number node", value: 5 },
      });
    });
  });
});
