import Lexer from "../lexer";
import Parser from "../parser";
import Evaluator from "./";
import Environment from "./environment";

describe("evaluate()", () => {
  describe("simple expression", () => {
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
      { input: "참", expected: true },
      { input: "거짓", expected: false },
      { input: "'foo bar'", expected: "foo bar" },
      { input: "!참", expected: false },
      { input: "!거짓", expected: true },
      { input: "!!참", expected: true },
      { input: "!!거짓", expected: false },

      /* test case for comparison expressions */
      { input: "참 == 참", expected: true },
      { input: "거짓 == 참", expected: false },
      { input: "참 == 거짓", expected: false },
      { input: "거짓 == 거짓", expected: true },
      { input: "참 != 참", expected: false },
      { input: "거짓 != 참", expected: true },
      { input: "참 != 거짓", expected: true },
      { input: "거짓 != 거짓", expected: false },
      { input: "2 > 1", expected: true },
      { input: "1 > 1", expected: false },
      { input: "1 > 2", expected: false },
      { input: "2 >= 1", expected: true },
      { input: "1 >= 1", expected: true },
      { input: "1 >= 2", expected: false },
      { input: "2 < 1", expected: false },
      { input: "1 < 1", expected: false },
      { input: "1 < 2", expected: true },
      { input: "2 <= 1", expected: false },
      { input: "1 <= 1", expected: true },
      { input: "1 <= 2", expected: true },
      { input: "!(1 == 1)", expected: false },
      { input: "!!(1 == 1)", expected: true },

      /* test case for left associativity */
      { input: "100-25-4", expected: 71 },
      { input: "100/25/4", expected: 1 },

      /* test case for grouped expression */
      { input: "100-(25-4)", expected: 79 },
      { input: "12-(34-56)", expected: 34 },
      { input: "12*(12/6)", expected: 24 },
      { input: "12+((30+4)-3*(12/(56-50)))", expected: 40 },

      /* test case for floating point numbers */
      { input: "0.75 + 1.25", expected: 2 },
      { input: "2.5 / 0.5", expected: 5 },
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

  describe("branch statements", () => {
    const cases = [
      {
        name: "simple if statement with boolean literal predicate",
        input: "만약 참 { 3 }",
        expected: 3
      },
      {
        name: "simple if statement with boolean expression predicate",
        input: "만약 1 != 2 { 4 }",
        expected: 4
      },
      {
        name: "simple if statement with variable comparison predicate",
        input: "사과 = 3  바나나 = 4  만약 사과 < 바나나 { 5 }",
        expected: 5
      },
      {
        name: "simple if-else statement with true boolean literal predicate",
        input: "만약 참 { 6 } 아니면 { 7 }",
        expected: 6
      },
      {
        name: "simple if-else statement with false boolean literal predicate",
        input: "만약 거짓 { 6 } 아니면 { 7 }",
        expected: 7
      },
      {
        name: "simple if-else statement with boolean expression predicate",
        input: "만약 1 == 2 { 34 } 아니면 { 56 }",
        expected: 56
      },
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

  describe("variable statements", () => {
    const cases = [
      { name: "integer variable with number literal", input: "foo = 42  foo", expected: 42 },
      { name: "integer variable with arithmetic expression", input: "foo = 42 * (8 / 4) + (1 - (2 - 1))  foo", expected: 84 },
      { name: "two integer variables with number literal", input: "foo = 42  bar = foo + 1  bar", expected: 43 },
      { name: "arithmetic expression with variables", input: "foo = 42  bar = 43  baz = 44  qux = (bar * (baz - foo))", expected: 86 },
      { name: "Korean integer variable with number literal", input: "변수 = 42  변수", expected: 42 },
    ];

    it.each(cases)("evaluate $name", ({ input, expected }) => {
      const lexer = new Lexer(input);
      const parser = new Parser(lexer);
      const program = parser.parseProgram();
      const evaluator = new Evaluator();
      const environment = new Environment();
      const evaluated = evaluator.evaluate(program, environment);

      expect(evaluated).toBe(expected);
    });
  });

  describe("function expressions", () => {
    const cases = [
      {
        name: "simple function expression",
        input: "함수 () { 1 }"
      },
    ];

    it.each(cases)("evaluate $name", ({ input }) => {
      const lexer = new Lexer(input);
      const parser = new Parser(lexer);
      const program = parser.parseProgram();
      const evaluator = new Evaluator();
      const environment = new Environment();
      const evaluated = evaluator.evaluate(program, environment);

      expect(evaluated).not.toBeUndefined();
      expect(evaluated).toHaveProperty("parameters");
      expect(evaluated).toHaveProperty("body");
      expect(evaluated).toHaveProperty("environment");
    });
  });

  describe("call expressions", () => {
    const cases = [
      {
        name: "function call with function literal",
        input: "함수(바나나) { 바나나 + 1 }(42)"
      },
    ];

    it.each(cases)("evaluate $name", ({ input }) => {
      const lexer = new Lexer(input);
      const parser = new Parser(lexer);
      const program = parser.parseProgram();
      const evaluator = new Evaluator();
      const environment = new Environment();
      const evaluated = evaluator.evaluate(program, environment);

      expect(evaluated).toBe(43);
    });
  });
});
