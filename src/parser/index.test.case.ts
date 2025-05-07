import { BadExpressionError } from "./";

export const literalCases = [
  {
    name: "a number literal",
    input: "42",
    expected: {
      type: "program",
      statements: [
        {
          type: "expression statement",
          expression: {
            type: "number",
            value: 42,
          },
        },
      ],
    },
  },
  {
    name: "a boolean literal",
    input: "참",
    expected: {
      type: "program",
      statements: [
        {
          type: "expression statement",
          expression: {
            type: "boolean",
            value: true,
          },
        },
      ],
    },
  },
  {
    name: "a string literal",
    input: "'foo bar'",
    expected: {
      type: "program",
      statements: [
        {
          type: "expression statement",
          expression: {
            type: "string",
            value: "foo bar",
          },
        },
      ],
    },
  },
  {
    name: "a identifer literal",
    input: "foo",
    expected: {
      type: "program",
      statements: [
        {
          type: "expression statement",
          expression: {
            type: "identifier",
            value: "foo",
          },
        },
      ],
    },
  },
];

export const singleNumberCases = [
  {
    name: "positive number",
    input: "+42",
    expected: {
      type: "program",
      statements: [
        {
          type: "expression statement",
          expression: {
            type: "prefix",
            prefix: "+",
            right: {
              type: "number",
              value: 42,
            },
          },
        },
      ],
    },
  },
  {
    name: "negative number",
    input: "-42",
    expected: {
      type: "program",
      statements: [
        {
          type: "expression statement",
          expression: {
            type: "prefix",
            prefix: "-",
            right: {
              type: "number",
              value: 42,
            },
          },
        },
      ],
    },
  },
  {
    name: "doubly negative number",
    input: "--42",
    expected: {
      type: "program",
      statements: [
        {
          type: "expression statement",
          expression: {
            type: "prefix",
            prefix: "-",
            right: {
              type: "prefix",
              prefix: "-",
              right: {
                type: "number",
                value: 42,
              },
            },
          },
        },
      ],
    },
  },
];

const leftAssocOperators = [
  { infix: "+", name: "left associative addition" },
  { infix: "-", name: "left associative subtraction" },
  { infix: "*", name: "left associative multiplication" },
  { infix: "/", name: "left associative division" },
];
export const leftAssocCases = leftAssocOperators.map(({ infix, name }) => ({
  name,
  input: `11 ${infix} 22 ${infix} 33`,
  expected: {
    type: "program",
    statements: [
      {
        type: "expression statement",
        expression: {
          type: "infix",
          infix,
          left: {
            type: "infix",
            infix,
            left: {
              type: "number",
              value: 11,
            },
            right: {
              type: "number",
              value: 22,
            },
          },
          right: {
            type: "number",
            value: 33,
          },
        },
      },
    ],
  },
}));

export const multipleOperatorsAssocCases = [
  {
    name: "four operations",
    input: "11+22*33/44-55",
    expected: {
      type: "program",
      statements: [
        {
          type: "expression statement",
          expression: {
            type: "infix",
            infix: "-",
            left: {
              type: "infix",
              infix: "+",
              left: {
                type: "number",
                value: 11,
              },
              right: {
                type: "infix",
                infix: "/",
                left: {
                  type: "infix",
                  infix: "*",
                  left: {
                    type: "number",
                    value: 22,
                  },
                  right: {
                    type: "number",
                    value: 33,
                  },
                },
                right: {
                  type: "number",
                  value: 44,
                },
              },
            },
            right: {
              type: "number",
              value: 55,
            },
          },
        },
      ],
    },
  },
  {
    name: "with grouped",
    input: "11+(22+33)",
    expected: {
      type: "program",
      statements: [
        {
          type: "expression statement",
          expression: {
            type: "infix",
            infix: "+",
            left: {
              type: "number",
              value: 11,
            },
            right: {
              type: "infix",
              infix: "+",
              left: {
                type: "number",
                value: 22,
              },
              right: {
                type: "number",
                value: 33,
              },
            },
          },
        },
      ],
    },
  },
];

export const unaryCases = [
  {
    name: "negation expression",
    input: "!foo",
    expected: {
      type: "program",
      statements: [
        {
          type: "expression statement",
          expression: {
            type: "prefix",
            prefix: "!",
            right: {
              type: "identifier",
              value: "foo",
            },
          },
        },
      ],
    },
  },
  {
    name: "double negation expression",
    input: "!!foo",
    expected: {
      type: "program",
      statements: [
        {
          type: "expression statement",
          expression: {
            type: "prefix",
            prefix: "!",
            right: {
              type: "prefix",
              prefix: "!",
              right: {
                type: "identifier",
                value: "foo",
              },
            },
          },
        },
      ],
    },
  },
];

const infixes = [
  { name: "equal-to expression", infix: "==" },
  { name: "not-equal-to expression", infix: "!=" },
  { name: "greater-than expression", infix: ">" },
  { name: "less-than expression", infix: "<" },
  { name: "greater-than-or-equal-to expression", infix: ">=" },
  { name: "less-than-or-equal-to expression", infix: "<=" },
];
export const infixCases = infixes.map(({ name, infix }) => ({
  name,
  input: `foo ${infix} bar`,
  expected: {
    type: "program",
    statements: [
      {
        type: "expression statement",
        expression: {
          type: "infix",
          infix,
          left: {
            type: "identifier",
            value: "foo",
          },
          right: {
            type: "identifier",
            value: "bar",
          },
        },
      },
    ],
  },
}));

const rightAssocInfixes = [
  { name: "right associative equal-to expression", infix: "==" },
  { name: "right associative not-equal-to expression", infix: "!=" },
];
export const rightAssocInfixCases = rightAssocInfixes.map(({ name, infix }) => ({
  name,
  input: `foo ${infix} bar ${infix} baz`,
  expected: {
    type: "program",
    statements: [
      {
        type: "expression statement",
        expression: {
          type: "infix",
          infix,
          left: {
            type: "identifier",
            value: "foo",
          },
          right: {
            type: "infix",
            infix,
            left: {
              type: "identifier",
              value: "bar",
            },
            right: {
              type: "identifier",
              value: "baz",
            },
          },
        },
      },
    ],
  },
}));

export const groupedCases = [
  {
    name: "equal-to and not-equal-to",
    input: "(foo == bar) != baz",
    expected: {
      type: "program",
      statements: [
        {
          type: "expression statement",
          expression: {
            type: "infix",
            infix: "!=",
            left: {
              type: "infix",
              infix: "==",
              left: {
                type: "identifier",
                value: "foo",
              },
              right: {
                type: "identifier",
                value: "bar",
              },
            },
            right: {
              type: "identifier",
              value: "baz",
            },
          },
        },
      ],
    },
  },
];

export const assignmentCases = [
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
            left: {
              type: "identifier",
              value: "x",
            },
            right: {
              type: "number",
              value: 42,
            },
          },
        },
      ],
    },
  },
  {
    name: "right associative assignment",
    input: "x = y = 42",
    expected: {
      type: "program",
      statements: [
        {
          type: "expression statement",
          expression: {
            type: "assignment",
            left: {
              type: "identifier",
              value: "x",
            },
            right: {
              type: "assignment",
              left: {
                type: "identifier",
                value: "y",
              },
              right: {
                type: "number",
                value: 42,
              },
            },
          },
        },
      ],
    },
  },
];

export const callExpressionCases = [
  {
    name: "call function with identifier",
    input: "foo(bar, 42)",
    expected: {
      type: "program",
      statements: [
        {
          type: "expression statement",
          expression: {
            type: "call",
            func: {
              type: "identifier",
              value: "foo",
            },
            args: [
              {
                type: "identifier",
                value: "bar",
              },
              {
                type: "number",
                value: 42,
              },
            ],
          },
        },
      ],
    },
  },
  {
    name: "call function with function literal",
    input: "함수(foo){ foo }(42)",
    expected: {
      type: "program",
      statements: [
        {
          type: "expression statement",
          expression: {
            type: "call",
            func: {
              type: "function",
              parameters: {}, // omit
              body: {}, // omit
            },
            args: [
              {
                type: "number",
                value: 42,
              },
            ],
          },
        },
      ],
    },
  },
  {
    name: "call curried function",
    input: "사과(1)(2)",
    expected: {
      type: "program",
      statements: [
        {
          type: "expression statement",
          expression: {
            type: "call",
            func: {
              type: "call",
              func: {
                type: "identifier",
                value: "사과",
              },
              args: [
                {
                  type: "number",
                  value: 1,
                },
              ],
            },
            args: [
              {
                type: "number",
                value: 2,
              },
            ],
          },
        },
      ],
    },
  },
];

export const functionExpressionCases = [
  {
    name: "function expression with parameters",
    input: "함수 (foo, bar) { foo + bar }",
    expected: {
      type: "program",
      statements: [
        {
          type: "expression statement",
          expression: {
            type: "function",
            parameters: [
              {
                type: "identifier",
                value: "foo",
              },
              {
                type: "identifier",
                value: "bar",
              },
            ],
            body: {
              type: "block",
              statements: [
                {
                  type: "expression statement",
                  expression: {
                    type: "infix",
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

export const returnStatementCases = [
  {
    name: "return number literal",
    input: "결과 42",
    expected: {
      type: "program",
      statements: [
        {
          type: "return",
          expression: {
            type: "number",
            value: 42,
          },
        },
      ],
    },
  },
];

export const branchStatementCases = [
  {
    name: "predicate and consequence",
    input: "만약 foo { bar }",
    expected: {
      type: "program",
      statements: [
        {
          type: "branch",
          predicate: {
            type: "identifier",
            value: "foo",
          },
          consequence: {
            type: "block",
            statements: [
              {
                type: "expression statement",
                expression: {
                  type: "identifier",
                  value: "bar",
                },
              },
            ],
          },
        },
      ],
    },
  },
  {
    name: "predicate and consequence with alternative",
    input: "만약 foo { bar } 아니면 { baz }",
    expected: {
      type: "program",
      statements: [
        {
          type: "branch",
          predicate: {
            type: "identifier",
            value: "foo",
          },
          consequence: {
            type: "block",
            statements: [
              {
                type: "expression statement",
                expression: {
                  type: "identifier",
                  value: "bar",
                },
              },
            ],
          },
          alternative: {
            type: "block",
            statements: [
              {
                type: "expression statement",
                expression: {
                  type: "identifier",
                  value: "baz",
                },
              },
            ],
          },
        },
      ],
    },
  },
];

const literals = [
  {
    name: "number literal",
    type: "number",
    input: "12345",
    range: {
      begin: { row: 0, col: 0 },
      end: { row: 0, col: 4 },
    },
  },
  {
    name: "string literal",
    type: "string",
    input: "'foo bar'",
    range: {
      begin: { row: 0, col: 0 },
      end: { row: 0, col: 8 },
    },
  },
  {
    name: "boolean literal",
    type: "boolean",
    input: "거짓",
    range: {
      begin: { row: 0, col: 0 },
      end: { row: 0, col: 1 },
    },
  },
  {
    name: "identifier literal",
    type: "identifier",
    input: "foo",
    range: {
      begin: { row: 0, col: 0 },
      end: { row: 0, col: 2 },
    },
  },
];
export const literalExpressionCases = literals.map(({ name, input, range, type }) => ({
  name,
  input,
  expected: {
    type: "program",
    range,
    statements: [
      {
        type: "expression statement",
        range,
        expression: {
          type,
          range,
        },
      },
    ],
  },
}));

export const singleExpressionCases = [
  {
    name: "assignment",
    input: "x = 42",
    expected: {
      type: "program",
      range: {
        begin: { row: 0, col: 0 },
        end: { row: 0, col: 5 },
      },
      statements: [
        {
          type: "expression statement",
          range: {
            begin: { row: 0, col: 0 },
            end: { row: 0, col: 5 },
          },
          expression: {
            type: "assignment",
            range: {
              begin: { row: 0, col: 0 },
              end: { row: 0, col: 5 },
            },
            left: {
              type: "identifier",
              range: {
                begin: { row: 0, col: 0 },
                end: { row: 0, col: 0 },
              },
            },
            right: {
              type: "number",
              range: {
                begin: { row: 0, col: 4 },
                end: { row: 0, col: 5 },
              },
            },
          },
        },
      ],
    },
  },
  {
    name: "arithmetic expression",
    input: "11 + 22",
    expected: {
      type: "program",
      range: {
        begin: { row: 0, col: 0 },
        end: { row: 0, col: 6 },
      },
      statements: [
        {
          type: "expression statement",
          range: {
            begin: { row: 0, col: 0 },
            end: { row: 0, col: 6 },
          },
          expression: {
            type: "infix",
            range: {
              begin: { row: 0, col: 0 },
              end: { row: 0, col: 6 },
            },
            left: {
              type: "number",
              range: {
                begin: { row: 0, col: 0 },
                end: { row: 0, col: 1 },
              },
            },
            right: {
              type: "number",
              range: {
                begin: { row: 0, col: 5 },
                end: { row: 0, col: 6 },
              },
            },
          },
        },
      ],
    },
  },
  {
    name: "grouped expression",
    input: "(11 + 22)",
    expected: {
      type: "program",
      range: {
        begin: { row: 0, col: 0 },
        end: { row: 0, col: 8 },
      },
      statements: [
        {
          type: "expression statement",
          range: {
            begin: { row: 0, col: 0 },
            end: { row: 0, col: 8 },
          },
          expression: {
            type: "infix",
            range: {
              begin: { row: 0, col: 0 },
              end: { row: 0, col: 8 },
            },
            left: {
              type: "number",
              range: {
                begin: { row: 0, col: 1 },
                end: { row: 0, col: 2 },
              },
            },
            right: {
              type: "number",
              range: {
                begin: { row: 0, col: 6 },
                end: { row: 0, col: 7 },
              },
            },
          },
        },
      ],
    },
  },
  {
    name: "function expression",
    input: "함수(foo) {\n  foo\n}",
    expected: {
      type: "program",
      range: {
        begin: { row: 0, col: 0 },
        end: { row: 2, col: 0 },
      },
      statements: [
        {
          type: "expression statement",
          expression: {
            type: "function",
            range: {
              begin: { row: 0, col: 0 },
              end: { row: 2, col: 0 },
            },
            body: {
              type: "block",
              range: {
                begin: { row: 0, col: 8 },
                end: { row: 2, col: 0 },
              },
            },
          },
        },
      ],
    },
  },
  {
    name: "call expression",
    input: "foo(bar, baz)",
    expected: {
      type: "program",
      range: {},
      statements: [
        {
          type: "expression statement",
          expression: {
            type: "call",
            range: {
              begin: { row: 0, col: 0 },
              end: { row: 0, col: 12 },
            },
          },
        },
      ],
    },
  },
];

export const singleStatementCases = [
  {
    name: "branch statement",
    input: "만약 foo {\n  11\n} 아니면 {\n  22\n}",
    expected: {
      type: "program",
      range: {},
      statements: [
        {
          type: "branch",
          range: {},
          predicate: {
            range: {
              begin: { row: 0, col: 3 },
              end: { row: 0, col: 5 },
            },
          },
          consequence: {
            type: "block",
            range: {
              begin: { row: 0, col: 7 },
              end: { row: 2, col: 0 },
            },
          },
          alternative: {
            type: "block",
            range: {
              begin: { row: 2, col: 6 },
              end: { row: 4, col: 0 },
            },
          },
        },
      ],
    },
  },
];

export const failCases = [
  {
    name: "not parsable expression start",
    input: "*3",
    expected: BadExpressionError,
  },
];
