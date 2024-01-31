import Lexer from "../lexer";
import Parser from "./v2";
import {
  ParserError,
  BadPrefixError,
  BadExpressionError,
} from "./v2";
import type {
  ProgramNode,
  AssignmentNode,
  IdentifierNode,
  ExpressionStatementNode,
} from "./syntax-node";

type SuccessTestCase<E extends {} = any> = { name: string, input: string, expected: E };
type FailureTestCase<E extends typeof ParserError = typeof ParserError> = { name: string, input: string, expected: E };

describe("parseSource()", () => {
  const createParser = (input: string) => {
    const lexer = new Lexer(input);
    const parser = new Parser(lexer);

    return parser;
  };

  const testSuccess = ({ input, expected }: { input: string, expected: ProgramNode }) => {
    const parser = createParser(input);

    const node = parser.parseSource();

    expect(node).toMatchObject(expected);
  };

  const testFailure = ({ input, expected }: { input: string, expected: typeof ParserError }) => {
    const parser = createParser(input);

    expect(() => parser.parseSource()).toThrow(expected);
  };

  describe("creating nodes", () => {
    describe("literal expressions", () => {
      const cases: SuccessTestCase[] = [
        {
          name: "a number literal",
          input: "42",
          expected: {
            type: "program",
            fields: {
              statements: [
                {
                  type: "expression statement",
                  fields: {
                    expression: {
                      type: "number",
                      fields: {
                        value: 42,
                      },
                    }
                  },
                },
              ],
            },
          },
        },
        {
          name: "a boolean literal",
          input: "참",
          expected: {
            type: "program",
            fields: {
              statements: [
                {
                  type: "expression statement",
                  fields: {
                    expression: {
                      type: "boolean",
                      fields: {
                        value: true,
                      },
                    }
                  },
                },
              ],
            },
          },
        },
        {
          name: "a string literal",
          input: "'foo bar'",
          expected: {
            type: "program",
            fields: {
              statements: [
                {
                  type: "expression statement",
                  fields: {
                    expression: {
                      type: "string",
                      fields: {
                        value: "foo bar",
                      },
                    }
                  },
                },
              ],
            },
          },
        },
        {
          name: "a identifer literal",
          input: "foo",
          expected: {
            type: "program",
            fields: {
              statements: [
                {
                  type: "expression statement",
                  fields: {
                    expression: {
                      type: "identifier",
                      fields: {
                        value: "foo",
                      },
                    }
                  },
                },
              ],
            },
          },
        },
      ];

      it.each(cases)("$name", testSuccess);
    });

    describe("arithmetic expressions", () => {
      describe("single number", () => {
        const cases: SuccessTestCase[] = [
          {
            name: "positive number",
            input: "+42",
            expected: {
              type: "program",
              fields: {
                statements: [
                  {
                    type: "expression statement",
                    fields: {
                      expression: {
                        type: "prefix",
                        fields: {
                          prefix: "+",
                          right: {
                            type: "number",
                            fields: {
                              value: 42,
                            },
                          },
                        },
                      }
                    },
                  },
                ],
              },
            },
          },
          {
            name: "negative number",
            input: "-42",
            expected: {
              type: "program",
              fields: {
                statements: [
                  {
                    type: "expression statement",
                    fields: {
                      expression: {
                        type: "prefix",
                        fields: {
                          prefix: "-",
                          right: {
                            type: "number",
                            fields: {
                              value: 42,
                            },
                          },
                        },
                      }
                    },
                  },
                ],
              },
            },
          },
          {
            name: "doubly negative number",
            input: "--42",
            expected: {
              type: "program",
              fields: {
                statements: [
                  {
                    type: "expression statement",
                    fields: {
                      expression: {
                        type: "prefix",
                        fields: {
                          prefix: "-",
                          right: {
                            type: "prefix",
                            fields: {
                              prefix: "-",
                              right: {
                                type: "number",
                                fields: {
                                  value: 42,
                                },
                              },
                            },
                          },
                        },
                      }
                    },
                  },
                ],
              },
            },
          },
        ];

        it.each(cases)("$name", testSuccess);
      });

      describe("left associativity", () => {
        const leftAssocCases = [
          { infix: "+", name: "left associative addition" },
          { infix: "-", name: "left associative subtraction" },
          { infix: "*", name: "left associative multiplication" },
          { infix: "/", name: "left associative division" },
        ];
        const leftAssocTestCases: SuccessTestCase[] = leftAssocCases.map(({ infix, name }) => ({
          name,
          input: `11 ${infix} 22 ${infix} 33`,
          expected: {
            type: "program",
            fields: {
              statements: [
                {
                  type: "expression statement",
                  fields: {
                    expression: {
                      type: "infix",
                      fields: {
                        infix,
                        left: {
                          type: "infix",
                          fields: {
                            infix,
                            left: {
                              type: "number",
                              fields: {
                                value: 11,
                              },
                            },
                            right: {
                              type: "number",
                              fields: {
                                value: 22,
                              },
                            },
                          },
                        },
                        right: {
                          type: "number",
                          fields: {
                            value: 33,
                          },
                        },
                      },
                    }
                  },
                },
              ],
            },
          },
        }));

        it.each(leftAssocTestCases)("$name", testSuccess);
      });

      describe("associativity among different operations", () => {
        const cases: SuccessTestCase[] = [
          {
            name: "four operations",
            input: "11+22*33/44-55",
            expected: {
              type: "program",
              fields: {
                statements: [
                  {
                    type: "expression statement",
                    fields: {
                      expression: {
                        type: "infix",
                        fields: {
                          infix: "-",
                          left: {
                            type: "infix",
                            fields: {
                              infix: "+",
                              left: {
                                type: "number",
                                fields: { value: 11 },
                              },
                              right: {
                                type: "infix",
                                fields: {
                                  infix: "/",
                                  left: {
                                    type: "infix",
                                    fields: {
                                      infix: "*",
                                      left: {
                                        type: "number",
                                        fields: {
                                          value: 22
                                        },
                                      },
                                      right: {
                                        type: "number",
                                        fields: {
                                          value: 33
                                        },
                                      },
                                    },
                                  },
                                  right: {
                                    type: "number",
                                    fields: {
                                      value: 44
                                    },
                                  },
                                },
                              },
                            },
                          },
                          right: {
                            type: "number",
                            fields: {
                              value: 55,
                            },
                          },
                        },
                      }
                    },
                  },
                ],
              },
            },
          },
          {
            name: "with grouped",
            input: "11+(22+33)",
            expected: {
              type: "program",
              fields: {
                statements: [
                  {
                    type: "expression statement",
                    fields: {
                      expression: {
                        type: "infix",
                        fields: {
                          infix: "+",
                          left: {
                            type: "number",
                            fields: {
                              value: 11,
                            },
                          },
                          right: {
                            type: "infix",
                            fields: {
                              infix: "+",
                              left: {
                                type: "number",
                                fields: {
                                  value: 22,
                                },
                              },
                              right: {
                                type: "number",
                                fields: {
                                  value: 33,
                                },
                              },
                            },
                          },
                        },
                      }
                    },
                  },
                ],
              },
            },
          },
        ];

        it.each(cases)("$name", testSuccess);
      });

    });

    describe("logical expressions", () => {
      describe("unary operation", () => {
        const cases: SuccessTestCase[] = [
          {
            name: "negation expression",
            input: "!foo",
            expected: {
              type: "program",
              fields: {
                statements: [
                  {
                    type: "expression statement",
                    fields: {
                      expression: {
                        type: "prefix",
                        fields: {
                          prefix: "!",
                          right: {
                            type: "identifier",
                            fields: {
                              value: "foo",
                            },
                          },
                        },
                      }
                    },
                  },
                ],
              },
            },
          },
          {
            name: "double negation expression",
            input: "!!foo",
            expected: {
              type: "program",
              fields: {
                statements: [
                  {
                    type: "expression statement",
                    fields: {
                      expression: {
                        type: "prefix",
                        fields: {
                          prefix: "!",
                          right: {
                            type: "prefix",
                            fields: {
                              prefix: "!",
                              right: {
                                type: "identifier",
                                fields: {
                                  value: "foo",
                                },
                              },
                            },
                          },
                        },
                      },
                    },
                  },
                ],
              },
            },
          },
        ];

        it.each(cases)("$name", testSuccess);
      });

      describe("binary operation", () => {
        const infixCases = [
          { name: "equal-to expression", infix: "==" },
          { name: "not-equal-to expression", infix: "!=" },
          { name: "greater-than expression", infix: ">" },
          { name: "less-than expression", infix: "<" },
          { name: "greater-than-or-equal-to expression", infix: ">=" },
          { name: "less-than-or-equal-to expression", infix: "<=" },
        ];
        const infixTestCases: SuccessTestCase[] = infixCases.map(({ name, infix }) => ({
          name,
          input: `foo ${infix} bar`,
          expected: {
            type: "program",
            fields: {
              statements: [
                {
                  type: "expression statement",
                  fields: {
                    expression: {
                      type: "infix",
                      fields: {
                        infix,
                        left: {
                          type: "identifier",
                          fields: {
                            value: "foo",
                          },
                        },
                        right: {
                          type: "identifier",
                          fields: {
                            value: "bar",
                          },
                        },
                      },
                    },
                  },
                },
              ],
            },
          },
        }));

        it.each(infixTestCases)("$name", testSuccess);
      });

      describe("right associativity", () => {
        const infixCases = [
          { name: "right associative equal-to expression", infix: "==" },
          { name: "right associative not-equal-to expression", infix: "!=" },
        ];
        const infixTestCases: SuccessTestCase[] = infixCases.map(({ name, infix }) => ({
          name,
          input: `foo ${infix} bar ${infix} baz`,
          expected: {
            type: "program",
            fields: {
              statements: [
                {
                  type: "expression statement",
                  fields: {
                    expression: {
                      type: "infix",
                      fields: {
                        infix,
                        left: {
                          type: "identifier",
                          fields: {
                            value: "foo",
                          },
                        },
                        right: {
                          type: "infix",
                          fields: {
                            infix,
                            left: {
                              type: "identifier",
                              fields: {
                                value: "bar",
                              },
                            },
                            right: {
                              type: "identifier",
                              fields: {
                                value: "baz",
                              },
                            },
                          },
                        },
                      },
                    },
                  },
                },
              ],
            },
          },
        }));

        it.each(infixTestCases)("$name", testSuccess);
      });

      describe("grouped expression", () => {
        const cases: SuccessTestCase[] = [
          {
            name: "equal-to and not-equal-to",
            input: "(foo == bar) != baz",
            expected: {
              type: "program",
              fields: {
                statements: [
                  {
                    type: "expression statement",
                    fields: {
                      expression: {
                        type: "infix",
                        fields: {
                          infix: "!=",
                          left: {
                            type: "infix",
                            fields: {
                              infix: "==",
                              left: {
                                type: "identifier",
                                fields: {
                                  value: "foo",
                                },
                              },
                              right: {
                                type: "identifier",
                                fields: {
                                  value: "bar",
                                },
                              },
                            },
                          },
                          right: {
                            type: "identifier",
                            fields: {
                              value: "baz"
                            },
                          },
                        },
                      },
                    },
                  },
                ],
              },
            },
          },
        ];

        it.each(cases)("$name", testSuccess);
      });
    });

    describe("assignment", () => {
      const cases: SuccessTestCase[] = [
        {
          name: "a single assignment statement",
          input: "x = 42",
          expected: {
            type: "program",
            fields: {
              statements: [
                {
                  type: "expression statement",
                  fields: {
                    expression: {
                      type: "assignment",
                      fields: {
                        left: {
                          type: "identifier",
                          fields: {
                            value: "x",
                          },
                        },
                        right: {
                          type: "number",
                          fields: {
                            value: 42,
                          },
                        },
                      },
                    },
                  },
                },
              ],
            },
          },
        },
        {
          name: "right associative assignment",
          input: "x = y = 42",
          expected: {
            type: "program",
            fields: {
              statements: [
                {
                  type: "expression statement",
                  fields: {
                    expression: {
                      type: "assignment",
                      fields: {
                        left: {
                          type: "identifier",
                          fields: {
                            value: "x",
                          },
                        },
                        right: {
                          type: "assignment",
                          fields: {
                            left: {
                              type: "identifier",
                              fields: {
                                value: "y",
                              },
                            },
                            right: {
                              type: "number",
                              fields: {
                                value: 42,
                              },
                            },
                          },
                        },
                      },
                    }
                  },
                },
              ],
            },
          },
        },
      ];

      it.each(cases)("$name", testSuccess);
    });

    describe("call expressions", () => {
      const cases: SuccessTestCase[] = [
        {
          name: "call function with identifier",
          input: "foo(bar, 42)",
          expected: {
            type: "program",
            fields: {
              statements: [
                {
                  type: "expression statement",
                  fields: {
                    expression: {
                      type: "call",
                      fields: {
                        func: {
                          type: "identifier",
                          fields: {
                            value: "foo",
                          },
                        },
                        args: [
                          {
                            type: "identifier",
                            fields: {
                              value: "bar",
                            },
                          },
                          {
                            type: "number",
                            fields: {
                              value: 42,
                            },
                          },
                        ],
                      },
                    },
                  },
                },
              ],
            },
          },
        },
        {
          name: "call function with function literal",
          input: "함수(foo){ foo }(42)",
          expected: {
            type: "program",
            fields: {
              statements: [
                {
                  type: "expression statement",
                  fields: {
                    expression: {
                      type: "call",
                      fields: {
                        func: {
                          type: "function",
                          fields: {
                            parameters: {}, // omit
                            body: {}, // omit
                          },
                        },
                        args: [
                          {
                            type: "number",
                            fields: {
                              value: 42,
                            },
                          },
                        ],
                      },
                    },
                  },
                },
              ],
            },
          },
        },
      ];

      it.each(cases)("$name", testSuccess);
    });

    describe("function expressions", () => {
      const cases: SuccessTestCase[] = [
        {
          name: "function expression with parameters",
          input: "함수 (foo, bar) { foo + bar }",
          expected: {
            type: "program",
            fields: {
              statements: [
                {
                  type: "expression statement",
                  fields: {
                    expression: {
                      type: "function",
                      fields: {
                        parameters: [
                          {
                            type: "identifier",
                            fields: {
                              value: "foo",
                            },
                          },
                          {
                            type: "identifier",
                            fields: {
                              value: "bar",
                            },
                          },
                        ],
                        body: {
                          type: "block",
                          fields: {
                            statements: [
                              {
                                type: "expression statement",
                                fields: {
                                  expression: {
                                    type: "infix",
                                    fields: {}, // omit
                                  },
                                },
                              },
                            ],
                          },
                        },
                      },
                    },
                  },
                },
              ],
            },
          },
        },
      ];

      it.each(cases)("$name", testSuccess);
    });
    describe("return statement", () => {
      const cases: SuccessTestCase[] = [
        {
          name: "return number literal",
          input: "결과 42",
          expected: {
            type: "program",
            fields: {
              statements: [
                {
                  type: "return",
                  fields: {
                    expression: {
                      type: "number",
                      fields: {
                        value: 42,
                      },
                    },
                  },
                },
              ],
            },
          },
        },
      ];

      it.each(cases)("$name", testSuccess);
    });

    describe("branch statement", () => {
      const cases: SuccessTestCase[] = [
        {
          name: "predicate and consequence",
          input: "만약 foo { bar }",
          expected: {
            type: "program",
            fields: {
              statements: [
                {
                  type: "branch",
                  fields: {
                    predicate: {
                      type: "identifier",
                      fields: {
                        value: "foo",
                      },
                    },
                    consequence: {
                      type: "block",
                      fields: {
                        statements: [
                          {
                            type: "expression statement",
                            fields: {
                              expression: {
                                type: "identifier",
                                fields: {
                                  value: "bar",
                                },
                              },
                            },
                          },
                        ],
                      },
                    },
                  },
                },
              ],
            },
          },
        },
        {
          name: "predicate and consequence with alternative",
          input: "만약 foo { bar } 아니면 { baz }",
          expected: {
            type: "program",
            fields: {
              statements: [
                {
                  type: "branch",
                  fields: {
                    predicate: {
                      type: "identifier",
                      fields: {
                        value: "foo",
                      },
                    },
                    consequence: {
                      type: "block",
                      fields: {
                        statements: [
                          {
                            type: "expression statement",
                            fields: {
                              expression: {
                                type: "identifier",
                                fields: {
                                  value: "bar",
                                },
                              },
                            },
                          },
                        ],
                      },
                    },
                    alternative: {
                      type: "block",
                      fields: {
                        statements: [
                          {
                            type: "expression statement",
                            fields: {
                              expression: {
                                type: "identifier",
                                fields: {
                                  value: "baz",
                                },
                              },
                            },
                          },
                        ],
                      },
                    },
                  },
                },
              ],
            },
          },
        },
      ];

      it.each(cases)("$name", testSuccess);
    });
  });

  describe("marking positions", () => {
    describe("single statements", () => {
      describe("literal expressions", () => {
        const literalCases = [
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
        const cases: SuccessTestCase[] = literalCases.map(({ name, input, range, type }) => ({
          name,
          input,
          expected: {
            type: "program",
            range,
            fields: {
              statements: [
                {
                  type: "expression statement",
                  range,
                  fields: {
                    expression: {
                      type,
                      range,
                    }
                  },
                },
              ],
            },
          },
        }));

        it.each(cases)("$name", testSuccess);
      });

      describe("single expressions", () => {
        const cases: SuccessTestCase[] = [
          {
            name: "assignment",
            input: "x = 42",
            expected: {
              type: "program",
              range: {
                begin: { row: 0, col: 0 },
                end: { row: 0, col: 5 },
              },
              fields: {
                statements: [
                  {
                    type: "expression statement",
                    range: {
                      begin: { row: 0, col: 0 },
                      end: { row: 0, col: 5 },
                    },
                    fields: {
                      expression: {
                        type: "assignment",
                        range: {
                          begin: { row: 0, col: 0 },
                          end: { row: 0, col: 5 },
                        },
                        fields: {
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
                    },
                  },
                ],
              },
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
              fields: {
                statements: [
                  {
                    type: "expression statement",
                    range: {
                      begin: { row: 0, col: 0 },
                      end: { row: 0, col: 6 },
                    },
                    fields: {
                      expression: {
                        type: "infix",
                        range: {
                          begin: { row: 0, col: 0 },
                          end: { row: 0, col: 6 },
                        },
                        fields: {
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
                    },
                  },
                ],
              },
            },
          },
          {
            name: "grouped expression",
            input: "(11 + 22)",
            expected: {
              type: "program",
              range: {
              },
              fields: {
                statements: [
                  {
                    type: "expression statement",
                    range: {
                    },
                    fields: {
                      expression: {
                        type: "infix",
                        range: {
                          begin: { row: 0, col: 0 },
                          end: { row: 0, col: 8 },
                        },
                        fields: {
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
                    },
                  },
                ],
              },
            },
          },
          {
            name: "function expression",
            input: "함수(foo) {\n  foo\n}",
            expected: {
              type: "program",
              range: {
                begin: {
                  row: 0,
                  col: 0,
                },
                end: {
                  row: 2,
                  col: 0,
                },
              },
              fields: {
                statements: [
                  {
                    type: "expression statement",
                    fields: {
                      expression: {
                        type: "function",
                        range: {
                          begin: {
                            row: 0,
                            col: 0,
                          },
                          end: {
                            row: 2,
                            col: 0,
                          },
                        },
                        fields: {
                          body: {
                            type: "block",
                            range: {
                              begin: {
                                row: 0,
                                col: 8,
                              },
                              end: {
                                row: 2,
                                col: 0,
                              },
                            },
                          },
                        },
                      },
                    },
                  },
                ],
              },
            },
          },
          {
            name: "call expression",
            input: "foo(bar, baz)",
            expected: {
              type: "program",
              range: {
              },
              fields: {
                statements: [
                  {
                    type: "expression statement",
                    fields: {
                      expression: {
                        type: "call",
                        range: {
                          begin: {
                            row: 0,
                            col: 0,
                          },
                          end: {
                            row: 0,
                            col: 12,
                          },
                        },
                      },
                    },
                  },
                ],
              },
            },
          },
        ];

        it.each(cases.slice(4))("$name", testSuccess);
      });

      describe("single statements", () => {
        const cases: SuccessTestCase[] = [
          {
            name: "branch statement",
            input: "만약 foo {\n  11\n} 아니면 {\n  22\n}",
            expected: {
              type: "program",
              range: {
              },
              fields: {
                statements: [
                  {
                    type: "branch",
                    range: {
                    },
                    fields: {
                      predicate: {
                        range: {
                          begin: {
                            row: 0,
                            col: 3,
                          },
                          end: {
                            row: 0,
                            col: 5,
                          },
                        },
                      },
                      consequence: {
                        type: "block",
                        range: {
                          begin: {
                            row: 0,
                            col: 7,
                          },
                          end: {
                            row: 2,
                            col: 0,
                          },
                        },
                      },
                      alternative: {
                        type: "block",
                        range: {
                          begin: {
                            row: 2,
                            col: 6,
                          },
                          end: {
                            row: 4,
                            col: 0,
                          },
                        },
                      },
                    },
                  },
                ],
              },
            },
          },
        ];

        it.each(cases)("$name", testSuccess);
      });
    });
  });

  describe("error handling", () => {
    const cases: FailureTestCase[] = [
      {
        name: "not parsable expression start",
        input: "*3",
        expected: BadExpressionError,
      }
    ];

    it.each(cases)("$name", testFailure);
  });
});
