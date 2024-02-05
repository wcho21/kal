import Lexer from "../lexer";
import Parser from "../parser";
import Evaluator, * as Eval from "./";
import Environment from "./environment";

const evaluateInput = (input: string, onStdout?: (toWrite: string) => void) => {
  const lexer = new Lexer(input);
  const parser = new Parser(lexer);
  const parsed = parser.parseSource();

  const evaluator = new Evaluator();
  if (onStdout !== undefined) {
    evaluator.onStdout(onStdout);
  }
  const env = new Environment();
  const evaluated = evaluator.evaluate(parsed, env);
  return evaluated;
};

const testEvaluatingPrimitive = ({ input, expected }: { input: string, expected: any }): void => {
  const evaluated = evaluateInput(input) as any;

  expect(evaluated.value).toBe(expected);
};

const testEvaluatingEmpty = ({ input }: { input: string }): void => {
  const evaluated = evaluateInput(input) as any;

  expect(evaluated.value).toBe(null);
};

const testEvaluatingFunction = ({ input, expectedParamsLength }: { input: string, expectedParamsLength: number }): void => {
  const evaluated = evaluateInput(input) as any;

  expect(evaluated).toHaveProperty("parameters");
  expect(evaluated.parameters.length).toBe(expectedParamsLength);
  expect(evaluated).toHaveProperty("body");
  expect(evaluated).toHaveProperty("environment");
};

const testEvaluatingStdout = ({ input, expected }: { input: string, expected: any }): void => {
  const stdouts: string[] = [];

  evaluateInput(input, toWrite => stdouts.push(toWrite));

  expect(stdouts).toEqual(expected);
};

describe("evaluate()", () => {
  describe("single numbers", () => {
    const cases = [
      { input: "5", expected: 5 },
      { input: "-5", expected: -5 },
      { input: "--5", expected: 5 },
      { input: "+5", expected: 5 },
    ];

    it.each(cases)("evaluate $input", testEvaluatingPrimitive);
  });

  describe("simple arithmetic expressions", () => {
    const cases = [
      { input: "100+25", expected: 125 },
      { input: "100-25", expected: 75 },
      { input: "100*25", expected: 2500 },
      { input: "100/25", expected: 4 },
      { input: "100+25+4", expected: 129 },
      { input: "100+25-4", expected: 121 },
      { input: "100+25*4", expected: 200 },
    ];

    it.each(cases)("evaluate $input", testEvaluatingPrimitive);
  });

  describe("left associativity of arithmetic operation", () => {
    const cases = [
      { input: "100-25-4", expected: 71 },
      { input: "100/25/4", expected: 1 },
    ];

    it.each(cases)("evaluate $input", testEvaluatingPrimitive);
  });

  describe("grouped arithmetic expressions", () => {
    const cases = [
      { input: "100-(25-4)", expected: 79 },
      { input: "12-(34-56)", expected: 34 },
      { input: "12*(12/6)", expected: 24 },
      { input: "12+((30+4)-3*(12/(56-50)))", expected: 40 },
    ];

    it.each(cases)("evaluate $input", testEvaluatingPrimitive);
  });

  describe("arithmetic expressions with floating point number", () => {
    const cases = [
      { input: "0.75 + 1.25", expected: 2 },
      { input: "2.5 / 0.5", expected: 5 },
    ];

    it.each(cases)("evaluate $input", testEvaluatingPrimitive);
  });

  describe("single boolean", () => {
    const cases = [
      { input: "참", expected: true },
      { input: "거짓", expected: false },
    ];

    it.each(cases)("evaluate $input", testEvaluatingPrimitive);
  });

  describe("logical not expressions", () => {
    const cases = [
      { input: "!참", expected: false },
      { input: "!거짓", expected: true },
      { input: "!!참", expected: true },
      { input: "!!거짓", expected: false },
    ];

    it.each(cases)("evaluate $input", testEvaluatingPrimitive);
  });

  describe("single string", () => {
    const cases = [
      { input: "''", expected: "" },
      { input: "'foo bar'", expected: "foo bar" },
      { input: "'한글 단어'", expected: "한글 단어" },
    ];

    it.each(cases)("evaluate $input", testEvaluatingPrimitive);
  });

  describe("boolean comparison", () => {
    const cases = [
      { input: "참 == 참", expected: true },
      { input: "거짓 == 참", expected: false },
      { input: "참 == 거짓", expected: false },
      { input: "거짓 == 거짓", expected: true },
      { input: "참 != 참", expected: false },
      { input: "거짓 != 참", expected: true },
      { input: "참 != 거짓", expected: true },
      { input: "거짓 != 거짓", expected: false },
    ];

    it.each(cases)("evaluate $input", testEvaluatingPrimitive);
  });

  describe("number comparison", () => {
    const cases = [
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
    ];

    it.each(cases)("evaluate $input", testEvaluatingPrimitive);
  });

  describe("string comparison", () => {
    const cases = [
      { input: "'사과' == '사과'", expected: true },
      { input: "'사과' != '사과'", expected: false },
      { input: "'사과' == '바나나'", expected: false },
      { input: "'사과' != '바나나'", expected: true },
      { input: "'B' > 'A'", expected: true },
      { input: "'A' > 'A'", expected: false },
      { input: "'A' > 'B'", expected: false },
      { input: "'B' >= 'A'", expected: true },
      { input: "'A' >= 'A'", expected: true },
      { input: "'A' >= 'B'", expected: false },
      { input: "'B' < 'A'", expected: false },
      { input: "'A' < 'A'", expected: false },
      { input: "'A' < 'B'", expected: true },
      { input: "'B' <= 'A'", expected: false },
      { input: "'A' <= 'A'", expected: true },
      { input: "'A' <= 'B'", expected: true },
    ];

    it.each(cases)("evaluate $input", testEvaluatingPrimitive);
  });

  describe("logical not operation to boolean expression", () => {
    const cases = [
      { input: "!(1 == 1)", expected: false },
      { input: "!!(1 == 1)", expected: true },
    ];

    it.each(cases)("evaluate $input", testEvaluatingPrimitive);
  });

  describe("branch statements yielding something", () => {
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

    it.each(cases)("evaluate $input", testEvaluatingPrimitive);
  });

  describe("branch statements yielding nothing", () => {
    const cases = [
      {
        name: "simple if statement with boolean literal predicate",
        input: "만약 거짓 { 3 }",
      },
      {
        name: "simple if statement with boolean expression predicate",
        input: "만약 1 == 2 { 4 }",
      },
      {
        name: "simple if statement with variable comparison predicate",
        input: "사과 = 3  바나나 = 4  만약 사과 > 바나나 { 5 }",
      },
    ];

    it.each(cases)("evaluate $input", testEvaluatingEmpty);
  });

  describe("nested branch statements yielding something", () => {
    const cases = [
      {
        name: "nested if statements",
        input: "만약 참 { 만약 참 { 만약 참 { 1 } } }",
        expected: 1,
      },
      {
        name: "nested if-else statements",
        input: "만약 거짓 { 0 } 아니면 { 만약 참 { 만약 거짓 { 1 } 아니면 { 2 } } 아니면 { 3 } }",
        expected: 2,
      },
    ];

    it.each(cases)("evaluate $input", testEvaluatingPrimitive);
  });

  describe("nested branch statements yielding nothing", () => {
    const cases = [
      {
        name: "nested if statements",
        input: "만약 참 { 만약 참 { 만약 거짓 { 1 } } }",
      },
      {
        name: "nested if and if-else statements",
        input: "만약 거짓 { 만약 참 { 만약 거짓 { 0 } 아니면 { 1 } } 아니면 { 2 } }",
      },
    ];

    it.each(cases)("evaluate $input", testEvaluatingEmpty);
  });

  describe("variable statements", () => {
    const cases = [
      {
        name: "integer variable with number literal",
        input: "foo = 42  foo",
        expected: 42
      },
      {
        name: "integer variable with arithmetic expression",
        input: "foo = 42 * (8 / 4) + (1 - (2 - 1))  foo",
        expected: 84
      },
      {
        name: "two integer variables with number literal",
        input: "foo = 42  bar = foo + 1  bar",
        expected: 43
      },
      {
        name: "arithmetic expression with variables",
        input: "foo = 42  bar = 43  baz = 44  qux = (bar * (baz - foo))",
        expected: 86
      },
      {
        name: "Korean integer variable with number literal",
        input: "변수 = 42  변수",
        expected: 42
      },
    ];

    it.each(cases)("evaluate $name", testEvaluatingPrimitive);
  });

  describe("function expressions", () => {
    const cases = [
      {
        name: "simple function expression",
        input: "함수 () { 1 }",
        expectedParamsLength: 0,
      },
      {
        name: "simple function expression",
        input: "함수 (사과, 바나나, 포도) { 1 }",
        expectedParamsLength: 3,
      },
    ];

    it.each(cases)("evaluate $name", testEvaluatingFunction);
  });

  describe("call expressions", () => {
    const cases = [
      {
        name: "function call with function literal",
        input: "함수(바나나) { 결과 바나나 + 1 }(42)",
        expected: 43,
      },
      {
        name: "function call with identifier",
        input: "더하기 = 함수(숫자1, 숫자2) { 결과 숫자1 + 숫자2 }  더하기(3, 4)",
        expected: 7,
      },
    ];

    it.each(cases)("evaluate $name", testEvaluatingPrimitive);
  });

  describe("complex statements with function and calls", () => {
    const cases = [
      {
        name: "make and call function containing branch statement",
        input: "과일 = 함수(색깔) { 만약 (색깔 == '빨강') { 결과 '사과' } 아니면 { '포도' } }  과일('빨강')",
        expected: "사과",
      },
      {
        name: "make and call closure",
        input: "더하기 = 함수(숫자1) { 결과 함수(숫자2) { 결과 숫자1+숫자2 } }  하나더하기 = 더하기(1)  하나더하기(4)",
        expected: 5,
      },
    ];

    it.each(cases)("evaluate $name", testEvaluatingPrimitive);
  });

  describe("builtin function calls", () => {
    describe("길이()", () => {
      const cases = [
        {
          name: "empty string",
          input: "길이('')",
          expected: 0,
        },
        {
          name: "nonempty string",
          input: "길이('사과')",
          expected: 2,
        },
      ];

      it.each(cases)("evaluate $name", testEvaluatingPrimitive);
    });

    describe("쓰기()", () => {
      const cases = [
        {
          name: "single string",
          input: "쓰기('사과')",
          expected: ["사과"],
        },
        {
          name: "multiple string",
          input: "쓰기('사과', '포도', '바나나')",
          expected: ["사과 포도 바나나"],
        },
        {
          name: "multiple calls",
          input: "쓰기('사과') 쓰기('포도')",
          expected: ["사과", "포도"],
        },
      ];

      it.each(cases)("evaluate $name", testEvaluatingStdout);
    });
  });

  describe("errors", () => {
    const cases = [
      {
        name: "top level return error",
        input: "결과 11",
        expected: Eval.TopLevelReturnError,
        range: { begin: { row: 0, col: 0 }, end: { row: 0, col: 4 } },
      },
      {
        name: "bad predicate error",
        input: "만약 11 {\n  22\n}",
        expected: Eval.BadPredicateError,
        range: { begin: { row: 0, col: 3 }, end: { row: 0, col: 4 } },
        received: "11",
      },
      {
        name: "bad identifier error",
        input: "사과",
        expected: Eval.BadIdentifierError,
        range: { begin: { row: 0, col: 0 }, end: { row: 0, col: 1 } },
        received: "사과",
      },
    ];

    it.each(cases)("$name", ({ input, expected, range, received }) => {
      expect(() => evaluateInput(input)).toThrow(expected);
      try {
        evaluateInput(input);
      } catch (err) {
        const e = err as typeof expected;

        expect(e).toMatchObject({ range });
        if (received !== undefined) {
          expect(e).toMatchObject({ received });
        }
      }
    });
  });
});
