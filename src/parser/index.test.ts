import Lexer from "../lexer";
import Parser from "./";
import type { Program } from "./syntax-tree";

describe("parseProgram()", () => {
  const testParsing = ({ input, expected }: { input: string, expected: Program }) => {
    const lexer = new Lexer(input);
    const parser = new Parser(lexer);

    const node = parser.parseProgram();

    expect(node).toEqual(expected);
  };

  describe("assignment", () => {
    const cases: { name: string, input: string, expected: Program }[] = [
      {
        name: "a single assignment statement",
        input: "x = 42",
        expected: {
          type: "program",
          statements: [
            {
              type: "expression statement",
              expression: {
                type: "assignment",
                left: { type: "identifier", value: "x" },
                right: { type: "number node", value: 42 },
              },
            },
          ],
        },
      },
      {
        name: "multiple assignment statements",
        input: "x = 42 한 = 9 _123 = 123",
        expected: {
          type: "program",
          statements: [
            {
              type: "expression statement",
              expression: {
                type: "assignment",
                left: { type: "identifier", value: "x" },
                right: { type: "number node", value: 42 },
              },
            },
            {
              type: "expression statement",
              expression: {
                type: "assignment",
                left: { type: "identifier", value: "한" },
                right: { type: "number node", value: 9 },
              },
            },
            {
              type: "expression statement",
              expression: {
                type: "assignment",
                left: { type: "identifier", value: "_123" },
                right: { type: "number node", value: 123 },
              },
            },
          ],
        },
      },
    ];

    it.each(cases)("parse $name", testParsing);
  });

  describe("simple expression", () => {
    const cases: { name: string, input: string, expected: Program }[] = [
      {
        name: "an identifier",
        input: "x",
        expected: {
          type: "program",
          statements: [
            {
              type: "expression statement",
              expression: { type: "identifier", value: "x" },
            },
          ],
        },
      },
      {
        name: "a number",
        input: "123",
        expected: {
          type: "program",
          statements: [
            {
              type: "expression statement",
              expression: { type: "number node", value: 123 },
            },
          ],
        },
      },
      {
        name: "a negative number",
        input: "-42",
        expected: {
          type: "program",
          statements: [
            {
              type: "expression statement",
              expression: {
                type: "prefix expression",
                prefix: "-",
                expression: { type: "number node", value: 42 },
              },
            },
          ],
        },
      },
      {
        name: "a doubly negative number",
        input: "--42",
        expected: {
          type: "program",
          statements: [
            {
              type: "expression statement",
              expression: {
                type: "prefix expression",
                prefix: "-",
                expression: {
                  type: "prefix expression",
                  prefix: "-",
                  expression: { type: "number node", value: 42 },
                },
              },
            },
          ],
        },
      },
      {
        name: "a positive number",
        input: "+42",
        expected: {
          type: "program",
          statements: [
            {
              type: "expression statement",
              expression: {
                type: "prefix expression",
                prefix: "+",
                expression: { type: "number node", value: 42 },
              },
            },
          ],
        },
      },
    ];

    it.each(cases)("parse $name", testParsing);
  });
});
