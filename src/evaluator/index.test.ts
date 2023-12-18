import Lexer from "../lexer";
import Parser from "../parser";
import Evaluator from "./";

describe("evaluate()", () => {
  const cases = [
    { input: "5", expected: 5 },
    { input: "-5", expected: -5 },
    { input: "--5", expected: 5 },
    { input: "+5", expected: 5 },
  ];

  it.each(cases)("evaluate $input", ({ input, expected }) => {
    const lexer = new Lexer(input);
    const parser = new Parser(lexer);
    const program = parser.parseProgram();
    const evaluator = new Evaluator();
    const evaluated = evaluator.evaluate(program);

    expect(evaluated).toBe(expected);
  });
});
