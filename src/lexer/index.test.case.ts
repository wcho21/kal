import type { SourceToken } from "./source-token";

export const singleOperatorCases: { input: string; expected: SourceToken }[] = [
  {
    input: "+",
    expected: {
      type: "operator",
      value: "+",
      range: {
        begin: { row: 0, col: 0 },
        end: { row: 0, col: 0 },
      },
    },
  },
  {
    input: "-",
    expected: {
      type: "operator",
      value: "-",
      range: {
        begin: { row: 0, col: 0 },
        end: { row: 0, col: 0 },
      },
    },
  },
  {
    input: "*",
    expected: {
      type: "operator",
      value: "*",
      range: {
        begin: { row: 0, col: 0 },
        end: { row: 0, col: 0 },
      },
    },
  },
  {
    input: "/",
    expected: {
      type: "operator",
      value: "/",
      range: {
        begin: { row: 0, col: 0 },
        end: { row: 0, col: 0 },
      },
    },
  },
  {
    input: "=",
    expected: {
      type: "operator",
      value: "=",
      range: {
        begin: { row: 0, col: 0 },
        end: { row: 0, col: 0 },
      },
    },
  },
  {
    input: "==",
    expected: {
      type: "operator",
      value: "==",
      range: {
        begin: { row: 0, col: 0 },
        end: { row: 0, col: 1 },
      },
    },
  },
  {
    input: "!",
    expected: {
      type: "operator",
      value: "!",
      range: {
        begin: { row: 0, col: 0 },
        end: { row: 0, col: 0 },
      },
    },
  },
  {
    input: "!=",
    expected: {
      type: "operator",
      value: "!=",
      range: {
        begin: { row: 0, col: 0 },
        end: { row: 0, col: 1 },
      },
    },
  },
  {
    input: ">",
    expected: {
      type: "operator",
      value: ">",
      range: {
        begin: { row: 0, col: 0 },
        end: { row: 0, col: 0 },
      },
    },
  },
  {
    input: ">=",
    expected: {
      type: "operator",
      value: ">=",
      range: {
        begin: { row: 0, col: 0 },
        end: { row: 0, col: 1 },
      },
    },
  },
  {
    input: "<",
    expected: {
      type: "operator",
      value: "<",
      range: {
        begin: { row: 0, col: 0 },
        end: { row: 0, col: 0 },
      },
    },
  },
  {
    input: "<=",
    expected: {
      type: "operator",
      value: "<=",
      range: {
        begin: { row: 0, col: 0 },
        end: { row: 0, col: 1 },
      },
    },
  },
];

export const singleDelimiterCases: { input: string; expected: SourceToken }[] = [
  {
    input: "(",
    expected: {
      type: "group delimiter",
      value: "(",
      range: {
        begin: { row: 0, col: 0 },
        end: { row: 0, col: 0 },
      },
    },
  },
  {
    input: ")",
    expected: {
      type: "group delimiter",
      value: ")",
      range: {
        begin: { row: 0, col: 0 },
        end: { row: 0, col: 0 },
      },
    },
  },
  {
    input: "{",
    expected: {
      type: "block delimiter",
      value: "{",
      range: {
        begin: { row: 0, col: 0 },
        end: { row: 0, col: 0 },
      },
    },
  },
  {
    input: "}",
    expected: {
      type: "block delimiter",
      value: "}",
      range: {
        begin: { row: 0, col: 0 },
        end: { row: 0, col: 0 },
      },
    },
  },
  {
    input: ",",
    expected: {
      type: "separator",
      value: ",",
      range: {
        begin: { row: 0, col: 0 },
        end: { row: 0, col: 0 },
      },
    },
  },
];

export const numberLiteralCases: { input: string; expected: SourceToken }[] = [
  {
    input: "0",
    expected: {
      type: "number literal",
      value: "0",
      range: {
        begin: { row: 0, col: 0 },
        end: { row: 0, col: 0 },
      },
    },
  },
  {
    input: "1",
    expected: {
      type: "number literal",
      value: "1",
      range: {
        begin: { row: 0, col: 0 },
        end: { row: 0, col: 0 },
      },
    },
  },
  {
    input: "1234",
    expected: {
      type: "number literal",
      value: "1234",
      range: {
        begin: { row: 0, col: 0 },
        end: { row: 0, col: 3 },
      },
    },
  },
  {
    input: "12.34",
    expected: {
      type: "number literal",
      value: "12.34",
      range: {
        begin: { row: 0, col: 0 },
        end: { row: 0, col: 4 },
      },
    },
  },
];

export const booleanLiteralCases: { input: string; expected: SourceToken }[] = [
  {
    input: "참",
    expected: {
      type: "boolean literal",
      value: "참",
      range: {
        begin: { row: 0, col: 0 },
        end: { row: 0, col: 0 },
      },
    },
  },
  {
    input: "거짓",
    expected: {
      type: "boolean literal",
      value: "거짓",
      range: {
        begin: { row: 0, col: 0 },
        end: { row: 0, col: 1 },
      },
    },
  },
];

export const stringLiteralCases: { input: string; expected: SourceToken }[] = [
  {
    input: "'foo bar 123 !@# 참'",
    expected: {
      type: "string literal",
      value: "foo bar 123 !@# 참",
      range: {
        begin: { row: 0, col: 0 },
        end: { row: 0, col: 18 },
      },
    },
  },
  {
    input: "''",
    expected: {
      type: "string literal",
      value: "",
      range: {
        begin: { row: 0, col: 0 },
        end: { row: 0, col: 1 },
      },
    },
  },
];

export const keywordCases: { input: string; expected: SourceToken }[] = [
  {
    input: "만약",
    expected: {
      type: "keyword",
      value: "만약",
      range: {
        begin: { row: 0, col: 0 },
        end: { row: 0, col: 1 },
      },
    },
  },
  {
    input: "아니면",
    expected: {
      type: "keyword",
      value: "아니면",
      range: {
        begin: { row: 0, col: 0 },
        end: { row: 0, col: 2 },
      },
    },
  },
  {
    input: "함수",
    expected: {
      type: "keyword",
      value: "함수",
      range: {
        begin: { row: 0, col: 0 },
        end: { row: 0, col: 1 },
      },
    },
  },
  {
    input: "결과",
    expected: {
      type: "keyword",
      value: "결과",
      range: {
        begin: { row: 0, col: 0 },
        end: { row: 0, col: 1 },
      },
    },
  },
];

export const identifierCases: { input: string; expected: SourceToken }[] = [
  {
    input: "Foo이름123_",
    expected: {
      type: "identifier",
      value: "Foo이름123_",
      range: {
        begin: { row: 0, col: 0 },
        end: { row: 0, col: 8 },
      },
    },
  },
  {
    input: "이름Foo123_",
    expected: {
      type: "identifier",
      value: "이름Foo123_",
      range: {
        begin: { row: 0, col: 0 },
        end: { row: 0, col: 8 },
      },
    },
  },
  {
    input: "_이름Foo123",
    expected: {
      type: "identifier",
      value: "_이름Foo123",
      range: {
        begin: { row: 0, col: 0 },
        end: { row: 0, col: 8 },
      },
    },
  },
];

export const specialCases: { input: string; expected: SourceToken }[] = [
  {
    input: "$",
    expected: {
      type: "illegal",
      value: "$",
      range: {
        begin: { row: 0, col: 0 },
        end: { row: 0, col: 0 },
      },
    },
  },
  {
    input: "'foo",
    expected: {
      type: "illegal string",
      value: "foo",
      range: {
        begin: { row: 0, col: 0 },
        end: { row: 0, col: 4 },
      },
    },
  },
  {
    input: "",
    expected: {
      type: "end",
      value: "$end",
      range: {
        begin: { row: 0, col: 0 },
        end: { row: 0, col: 0 },
      },
    },
  },
];

export const multipleTokenCases: { input: string; expected: SourceToken[] }[] = [
  {
    input: "12 + 34",
    expected: [
      {
        type: "number literal",
        value: "12",
        range: {
          begin: { row: 0, col: 0 },
          end: { row: 0, col: 1 },
        },
      },
      {
        type: "operator",
        value: "+",
        range: {
          begin: { row: 0, col: 3 },
          end: { row: 0, col: 3 },
        },
      },
      {
        type: "number literal",
        value: "34",
        range: {
          begin: { row: 0, col: 5 },
          end: { row: 0, col: 6 },
        },
      },
      {
        type: "end",
        value: "$end",
        range: {
          begin: { row: 0, col: 7 },
          end: { row: 0, col: 7 },
        },
      },
    ],
  },
  {
    input: "만약 참 {\n  12\r\n}",
    expected: [
      {
        type: "keyword",
        value: "만약",
        range: {
          begin: { row: 0, col: 0 },
          end: { row: 0, col: 1 },
        },
      },
      {
        type: "boolean literal",
        value: "참",
        range: {
          begin: { row: 0, col: 3 },
          end: { row: 0, col: 3 },
        },
      },
      {
        type: "block delimiter",
        value: "{",
        range: {
          begin: { row: 0, col: 5 },
          end: { row: 0, col: 5 },
        },
      },
      {
        type: "number literal",
        value: "12",
        range: {
          begin: { row: 1, col: 2 },
          end: { row: 1, col: 3 },
        },
      },
      {
        type: "block delimiter",
        value: "}",
        range: {
          begin: { row: 2, col: 0 },
          end: { row: 2, col: 0 },
        },
      },
      {
        type: "end",
        value: "$end",
        range: {
          begin: { row: 2, col: 1 },
          end: { row: 2, col: 1 },
        },
      },
    ],
  },
  {
    input: "사과(1)(2)",
    expected: [
      {
        type: "identifier",
        value: "사과",
        range: {
          begin: { row: 0, col: 0 },
          end: { row: 0, col: 1 },
        },
      },
      {
        type: "group delimiter",
        value: "(",
        range: {
          begin: { row: 0, col: 2 },
          end: { row: 0, col: 2 },
        },
      },
      {
        type: "number literal",
        value: "1",
        range: {
          begin: { row: 0, col: 3 },
          end: { row: 0, col: 3 },
        },
      },
      {
        type: "group delimiter",
        value: ")",
        range: {
          begin: { row: 0, col: 4 },
          end: { row: 0, col: 4 },
        },
      },
      {
        type: "group delimiter",
        value: "(",
        range: {
          begin: { row: 0, col: 5 },
          end: { row: 0, col: 5 },
        },
      },
      {
        type: "number literal",
        value: "2",
        range: {
          begin: { row: 0, col: 6 },
          end: { row: 0, col: 6 },
        },
      },
      {
        type: "group delimiter",
        value: ")",
        range: {
          begin: { row: 0, col: 7 },
          end: { row: 0, col: 7 },
        },
      },
      {
        type: "end",
        value: "$end",
        range: {
          begin: { row: 0, col: 8 },
          end: { row: 0, col: 8 },
        },
      },
    ],
  },
];
