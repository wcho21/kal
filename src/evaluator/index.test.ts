import Lexer from "../lexer";
import Parser from "../parser";
import Evaluator from "./";
import Environment from "./environment";

describe("evaluate()", () => {
  const cases = [
    { input: "5", expected: 5 },
    { input: "-5", expected: -5 },
    { input: "--5", expected: 5 },
    { input: "+5", expected: 5 },
    { input: "100+25", expected: 125 },
    { input: "100-25", expected: 75 },
    { input: "100*25", expected: 2500 },
    { input: "100/25", expected: 4 },
    { input: "100+25+4", expected: 129 },
    { input: "100+25-4", expected: 121 },
    { input: "100+25*4", expected: 200 },

    /* test case for left associativity */
    { input: "100-25-4", expected: 71 },
    { input: "100/25/4", expected: 1 },

    /* test case for grouped expression */
    { input: "100-(25-4)", expected: 79 },
    { input: "12-(34-56)", expected: 34 },
    { input: "12*(12/6)", expected: 24 },
    { input: "12+((30+4)-3*(12/(56-50)))", expected: 40 },
  ];

  it.each(cases)("evaluate $input", ({ input, expected }) => {
    const lexer = new Lexer(input);
    const parser = new Parser(lexer);
    const program = parser.parseProgram();
    const evaluator = new Evaluator();
    const environment = new Environment();
    const evaluated = evaluator.evaluate(program, environment);

    expect(evaluated).toBe(expected);
  });
});
