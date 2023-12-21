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

  describe("logical expression", () => {
    const cases: { name: string, input: string, expected: Program }[] = [
      {
        name: "not operator",
        input: "!x",
        expected: {
          type: "program",
          statements: [
            {
              type: "expression statement",
              expression: {
                type: "prefix expression",
                prefix: "!",
                expression: { type: "identifier", value: "x" },
              },
            },
          ],
        },
      },
      {
        name: "double not operator",
        input: "!!x",
        expected: {
          type: "program",
          statements: [
            {
              type: "expression statement",
              expression: {
                type: "prefix expression",
                prefix: "!",
                expression: {
                  type: "prefix expression",
                  prefix: "!",
                  expression: { type: "identifier", value: "x" },
                },
              },
            },
          ],
        },
      },
      {
        name: "equal-to comparison",
        input: "x == y",
        expected: {
          type: "program",
          statements: [
            {
              type: "expression statement",
              expression: {
                type: "infix expression",
                infix: "==",
                left: { type: "identifier", value: "x" },
                right: { type: "identifier", value: "y" },
              },
            },
          ],
        },
      },
      {
        name: "not-equal-to comparison",
        input: "x != y",
        expected: {
          type: "program",
          statements: [
            {
              type: "expression statement",
              expression: {
                type: "infix expression",
                infix: "!=",
                left: { type: "identifier", value: "x" },
                right: { type: "identifier", value: "y" },
              },
            },
          ],
        },
      },
      {
        name: "greater-than comparison",
        input: "x > y",
        expected: {
          type: "program",
          statements: [
            {
              type: "expression statement",
              expression: {
                type: "infix expression",
                infix: ">",
                left: { type: "identifier", value: "x" },
                right: { type: "identifier", value: "y" },
              },
            },
          ],
        },
      },
      {
        name: "less-than comparison",
        input: "x < y",
        expected: {
          type: "program",
          statements: [
            {
              type: "expression statement",
              expression: {
                type: "infix expression",
                infix: "<",
                left: { type: "identifier", value: "x" },
                right: { type: "identifier", value: "y" },
              },
            },
          ],
        },
      },
      {
        name: "greater-than-or-equal-to comparison",
        input: "x >= y",
        expected: {
          type: "program",
          statements: [
            {
              type: "expression statement",
              expression: {
                type: "infix expression",
                infix: ">=",
                left: { type: "identifier", value: "x" },
                right: { type: "identifier", value: "y" },
              },
            },
          ],
        },
      },
      {
        name: "less-than-or-equal-to comparison",
        input: "x <= y",
        expected: {
          type: "program",
          statements: [
            {
              type: "expression statement",
              expression: {
                type: "infix expression",
                infix: "<=",
                left: { type: "identifier", value: "x" },
                right: { type: "identifier", value: "y" },
              },
            },
          ],
        },
      },
      {
        name: "left associative comparison",
        input: "x <= y == z",
        expected: {
          type: "program",
          statements: [
            {
              type: "expression statement",
              expression: {
                type: "infix expression",
                infix: "==",
                left: {
                  type: "infix expression",
                  infix: "<=",
                  left: { type: "identifier", value: "x" },
                  right: { type: "identifier", value: "y" },
                },
                right: { type: "identifier", value: "z" },
              },
            },
          ],
        },
      },
      {
        name: "complex grouped comparison",
        input: "x == (y >= z)",
        expected: {
          type: "program",
          statements: [
            {
              type: "expression statement",
              expression: {
                type: "infix expression",
                infix: "==",
                left: { type: "identifier", value: "x" },
                right: {
                  type: "infix expression",
                  infix: ">=",
                  left: { type: "identifier", value: "y" },
                  right: { type: "identifier", value: "z" },
                },
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
      {
        name: "an addition of two numbers",
        input: "42+99",
        expected: {
          type: "program",
          statements: [
            {
              type: "expression statement",
              expression: {
                type: "infix expression",
                infix: "+",
                left: { type: "number node", value: 42 },
                right: { type: "number node", value: 99 },
              },
            },
          ],
        },
      },
      {
        name: "an addition with the first negative number",
        input: "-42+99",
        expected: {
          type: "program",
          statements: [
            {
              type: "expression statement",
              expression: {
                type: "infix expression",
                infix: "+",
                left: {
                  type: "prefix expression",
                  prefix: "-",
                  expression: { type: "number node", value: 42 },
                },
                right: { type: "number node", value: 99 },
              },
            },
          ],
        },
      },
      {
        name: "an addition with the second negative number",
        input: "42+-99",
        expected: {
          type: "program",
          statements: [
            {
              type: "expression statement",
              expression: {
                type: "infix expression",
                infix: "+",
                left: { type: "number node", value: 42 },
                right: {
                  type: "prefix expression",
                  prefix: "-",
                  expression: { type: "number node", value: 99 },
                },
              },
            },
          ],
        },
      },
      {
        name: "an addition of two negative numbers",
        input: "-42+-99",
        expected: {
          type: "program",
          statements: [
            {
              type: "expression statement",
              expression: {
                type: "infix expression",
                infix: "+",
                left: {
                  type: "prefix expression",
                  prefix: "-",
                  expression: { type: "number node", value: 42 },
                },
                right: {
                  type: "prefix expression",
                  prefix: "-",
                  expression: { type: "number node", value: 99 },
                },
              },
            },
          ],
        },
      },
      {
        name: "an addition of two positive numbers",
        input: "+42++99",
        expected: {
          type: "program",
          statements: [
            {
              type: "expression statement",
              expression: {
                type: "infix expression",
                infix: "+",
                left: {
                  type: "prefix expression",
                  prefix: "+",
                  expression: { type: "number node", value: 42 },
                },
                right: {
                  type: "prefix expression",
                  prefix: "+",
                  expression: { type: "number node", value: 99 },
                },
              },
            },
          ],
        },
      },
      {
        name: "a subtraction of two numbers",
        input: "42-99",
        expected: {
          type: "program",
          statements: [
            {
              type: "expression statement",
              expression: {
                type: "infix expression",
                infix: "-",
                left: { type: "number node", value: 42 },
                right: { type: "number node", value: 99 },
              },
            },
          ],
        },
      },
      {
        name: "a multiplication of two numbers",
        input: "42*99",
        expected: {
          type: "program",
          statements: [
            {
              type: "expression statement",
              expression: {
                type: "infix expression",
                infix: "*",
                left: { type: "number node", value: 42 },
                right: { type: "number node", value: 99 },
              },
            },
          ],
        },
      },
      {
        name: "a division of two numbers",
        input: "42/99",
        expected: {
          type: "program",
          statements: [
            {
              type: "expression statement",
              expression: {
                type: "infix expression",
                infix: "/",
                left: { type: "number node", value: 42 },
                right: { type: "number node", value: 99 },
              },
            },
          ],
        },
      },
      {
        name: "an addition of three numbers, left associative",
        input: "42+99+12",
        expected: {
          type: "program",
          statements: [
            {
              type: "expression statement",
              expression: {
                type: "infix expression",
                infix: "+",
                left: {
                  type: "infix expression",
                  infix: "+",
                  left: { type: "number node", value: 42 },
                  right: { type: "number node", value: 99 },
                },
                right: { type: "number node", value: 12 },
              },
            },
          ],
        },
      },
      {
        name: "addition and multiplication",
        input: "42+99*12",
        expected: {
          type: "program",
          statements: [
            {
              type: "expression statement",
              expression: {
                type: "infix expression",
                infix: "+",
                left: { type: "number node", value: 42 },
                right: {
                  type: "infix expression",
                  infix: "*",
                  left: { type: "number node", value: 99 },
                  right: { type: "number node", value: 12 },
                },
              },
            },
          ],
        },
      },
      {
        name: "multiplication and addition",
        input: "42*99+12",
        expected: {
          type: "program",
          statements: [
            {
              type: "expression statement",
              expression: {
                type: "infix expression",
                infix: "+",
                left: {
                  type: "infix expression",
                  infix: "*",
                  left: { type: "number node", value: 42 },
                  right: { type: "number node", value: 99 },
                },
                right: { type: "number node", value: 12 },
              },
            },
          ],
        },
      },
      {
        name: "an addition with grouped expression",
        input: "12+(34+56)",
        expected: {
          type: "program",
          statements: [
            {
              type: "expression statement",
              expression: {
                type: "infix expression",
                infix: "+",
                left: { type: "number node", value: 12 },
                right: {
                  type: "infix expression",
                  infix: "+",
                  left: { type: "number node", value: 34 },
                  right: { type: "number node", value: 56 },
                },
              },
            },
          ],
        },
      },
      {
        name: "an addition with grouped more than once",
        input: "12+(34+(56+(78+9)))",
        expected: {
          type: "program",
          statements: [
            {
              type: "expression statement",
              expression: {
                type: "infix expression",
                infix: "+",
                left: { type: "number node", value: 12 },
                right: {
                  type: "infix expression",
                  infix: "+",
                  left: { type: "number node", value: 34 },
                  right: {
                    type: "infix expression",
                    infix: "+",
                    left: { type: "number node", value: 56 },
                    right: {
                      type: "infix expression",
                      infix: "+",
                      left: { type: "number node", value: 78 },
                      right: { type: "number node", value: 9 },
                    },
                  },
                },
              },
            },
          ],
        },
      },
      {
        name: "arithmetic expression with grouped more than once",
        input: "(12*(34/56))+(7-((8+9)*10))",
        expected: {
          type: "program",
          statements: [
            {
              type: "expression statement",
              expression: {
                type: "infix expression",
                infix: "+",
                left: {
                  type: "infix expression",
                  infix: "*",
                  left: { type: "number node", value: 12 },
                  right: {
                    type: "infix expression",
                    infix: "/",
                    left: { type: "number node", value: 34 },
                    right: { type: "number node", value: 56 },
                  },
                },
                right: {
                  type: "infix expression",
                  infix: "-",
                  left: { type: "number node", value: 7 },
                  right: {
                    type: "infix expression",
                    infix: "*",
                    left: {
                      type: "infix expression",
                      infix: "+",
                      left: { type: "number node", value: 8 },
                      right: { type: "number node", value: 9 },
                    },
                    right: { type: "number node", value: 10 },
                  },
                },
              },
            },
          ],
        },
      },
      {
        name: "arithmetic expression with floating point numbers",
        input: "0.75 + 1.25",
        expected: {
          type: "program",
          statements: [
            {
              type: "expression statement",
              expression: {
                type: "infix expression",
                infix: "+",
                left: { type: "number node", value: 0.75 },
                right: { type: "number node", value: 1.25 },
              },
            },
          ],
        },
      },
      {
        name: "true boolean literal",
        input: "참",
        expected: {
          type: "program",
          statements: [
            {
              type: "expression statement",
              expression: { type: "boolean node", value: true },
            },
          ],
        },
      },
      {
        name: "false boolean literal",
        input: "거짓",
        expected: {
          type: "program",
          statements: [
            {
              type: "expression statement",
              expression: { type: "boolean node", value: false },
            },
          ],
        },
      },
      {
        name: "string literal",
        input: "'foo bar'",
        expected: {
          type: "program",
          statements: [
            {
              type: "expression statement",
              expression: { type: "string node", value: "foo bar" },
            },
          ],
        },
      },
    ];

    it.each(cases)("parse $name", testParsing);
  });

  describe("functions", () => {
    const cases: { name: string, input: string, expected: Program }[] = [
      {
        name: "function expression with parameters",
        input: "함수 (사과, 바나나) { 사과 + 바나나 }",
        expected: {
          type: "program",
          statements: [
            {
              type: "expression statement",
              expression: {
                type: "function expression",
                parameter: [
                  { type: "identifier", value: "사과" },
                  { type: "identifier", value: "바나나" },
                ],
                body: {
                  type: "block",
                  statements: [
                    {
                      type: "expression statement",
                      expression: {
                        type: "infix expression",
                        infix: "+",
                        left: { type: "identifier", value: "사과" },
                        right: { type: "identifier", value: "바나나" },
                      },
                    },
                  ],
                },
              },
            },
          ],
        },
      },
      {
        name: "function expression with no parameters",
        input: "함수 () { 사과 + 바나나 }",
        expected: {
          type: "program",
          statements: [
            {
              type: "expression statement",
              expression: {
                type: "function expression",
                parameter: [],
                body: {
                  type: "block",
                  statements: [
                    {
                      type: "expression statement",
                      expression: {
                        type: "infix expression",
                        infix: "+",
                        left: { type: "identifier", value: "사과" },
                        right: { type: "identifier", value: "바나나" },
                      },
                    },
                  ],
                },
              },
            },
          ],
        },
      },
    ];

    it.each(cases)("parse $name", testParsing);
  });

  describe("calls", () => {
    const cases: { name: string, input: string, expected: Program }[] = [
      {
        name: "call function without arguments",
        input: "과일()",
        expected: {
          type: "program",
          statements: [
            {
              type: "expression statement",
              expression: {
                type: "call",
                functionToCall: { type: "identifier", value: "과일" },
                callArguments: [],
              },
            },
          ],
        },
      },
      {
        name: "call function with identifier arguments",
        input: "과일(사과, 바나나, 포도)",
        expected: {
          type: "program",
          statements: [
            {
              type: "expression statement",
              expression: {
                type: "call",
                functionToCall: { type: "identifier", value: "과일" },
                callArguments: [
                  { type: "identifier", value: "사과" },
                  { type: "identifier", value: "바나나" },
                  { type: "identifier", value: "포도" },
                ],
              },
            },
          ],
        },
      },
      {
        name: "call function with expression arguments",
        input: "과일(1, 2+3)",
        expected: {
          type: "program",
          statements: [
            {
              type: "expression statement",
              expression: {
                type: "call",
                functionToCall: { type: "identifier", value: "과일" },
                callArguments: [
                  { type: "number node", value: 1 },
                  {
                    type: "infix expression",
                    infix: "+",
                    left: { type: "number node", value: 2 },
                    right: { type: "number node", value: 3 },
                  },
                ],
              },
            },
          ],
        },
      },
      {
        name: "call function with function literal",
        input: "함수(사과, 바나나){사과 + 바나나}(1, 2)",
        expected: {
          type: "program",
          statements: [
            {
              type: "expression statement",
              expression: {
                type: "call",
                functionToCall: {
                  type: "function expression",
                  parameter: [
                    { type: "identifier", value: "사과" },
                    { type: "identifier", value: "바나나" },
                  ],
                  body: {
                    type: "block",
                    statements: [
                      {
                        type: "expression statement",
                        expression: {
                          type: "infix expression",
                          infix: "+",
                          left: { type: "identifier", value: "사과" },
                          right: { type: "identifier", value: "바나나" },
                        },
                      },
                    ],
                  },
                },
                callArguments: [
                  { type: "number node", value: 1 },
                  { type: "number node", value: 2 },
                ],
              },
            },
          ],
        },
      },
    ];

    it.each(cases)("parse $name", testParsing);
  });

  describe("branch statements", () => {
    const cases: { name: string, input: string, expected: Program }[] = [
      {
        name: "simple if statement with boolean predicate",
        input: "만약 참 { 1 }",
        expected: {
          type: "program",
          statements: [
            {
              type: "branch statement",
              predicate: { type: "boolean node", value: true },
              consequence: {
                type: "block",
                statements: [
                  {
                    type: "expression statement",
                    expression: { type: "number node", value: 1 },
                  },
                ],
              },
            },
          ],
        },
      },
      {
        name: "simple if statement with expression predicate",
        input: "만약 사과 == 1 { 2 }",
        expected: {
          type: "program",
          statements: [
            {
              type: "branch statement",
              predicate: {
                type: "infix expression",
                infix: "==",
                left: { type: "identifier", value: "사과" },
                right:  { type: "number node", value: 1 },
              },
              consequence: {
                type: "block",
                statements: [
                  {
                    type: "expression statement",
                    expression: { type: "number node", value: 2 },
                  },
                ],
              },
            },
          ],
        },
      },
      {
        name: "simple if-else statement with boolean predicate",
        input: "만약 참 { 3 } 아니면 { 4 }",
        expected: {
          type: "program",
          statements: [
            {
              type: "branch statement",
              predicate: { type: "boolean node", value: true },
              consequence: {
                type: "block",
                statements: [
                  {
                    type: "expression statement",
                    expression: { type: "number node", value: 3 },
                  },
                ],
              },
              alternative: {
                type: "block",
                statements: [
                  {
                    type: "expression statement",
                    expression: { type: "number node", value: 4 },
                  },
                ],
              },
            },
          ],
        },
      },
    ];

    it.each(cases)("parse $name", testParsing);
  });

  describe("complex expression", () => {
    const cases: { name: string, input: string, expected: Program }[] = [
      {
        name: "assignment and arithmetic expression",
        input: "변수1 = 1  ((변수1 + 변수1) * 변수1)",
        expected: {
          type: "program",
          statements: [
            {
              type: "expression statement",
              expression: {
                type: "assignment",
                left: { type: "identifier", value: "변수1" },
                right: { type: "number node", value: 1 },
              },
            },
            {
              type: "expression statement",
              expression: {
                type: "infix expression",
                infix: "*",
                left: {
                  type: "infix expression",
                  infix: "+",
                  left: { type: "identifier", value: "변수1" },
                  right: { type: "identifier", value: "변수1" },
                },
                right: { type: "identifier", value: "변수1" },
              },
            },
          ],
        },
      },
    ];

    it.each(cases)("parse $name", testParsing);
  });
});
