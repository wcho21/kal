import * as Eval from "./";
import type * as Value from "./value";

export const singleNumberCases = [
  { input: "5", expected: 5 },
  { input: "-5", expected: -5 },
  { input: "--5", expected: 5 },
  { input: "+5", expected: 5 },
];

export const singleArithmeticExpressionCases = [
  { input: "100+25", expected: 125 },
  { input: "100-25", expected: 75 },
  { input: "100*25", expected: 2500 },
  { input: "100/25", expected: 4 },
  { input: "100+25+4", expected: 129 },
  { input: "100+25-4", expected: 121 },
  { input: "100+25*4", expected: 200 },
];

export const leftAssocArithmeticOperationCases = [
  { input: "100-25-4", expected: 71 },
  { input: "100/25/4", expected: 1 },
];

export const groupedArithmeticExpressionCases = [
  { input: "100-(25-4)", expected: 79 },
  { input: "12-(34-56)", expected: 34 },
  { input: "12*(12/6)", expected: 24 },
  { input: "12+((30+4)-3*(12/(56-50)))", expected: 40 },
];

export const arithmeticExpressionWithFloatingPointNumberCases = [
  { input: "0.75 + 1.25", expected: 2 },
  { input: "2.5 / 0.5", expected: 5 },
];

export const singleBooleanCases = [
  { input: "참", expected: true },
  { input: "거짓", expected: false },
];

export const logicalNotExpressionCases = [
  { input: "!참", expected: false },
  { input: "!거짓", expected: true },
  { input: "!!참", expected: true },
  { input: "!!거짓", expected: false },
];

export const singleStringCases = [
  { input: "''", expected: "" },
  { input: "'foo bar'", expected: "foo bar" },
  { input: "'한글 단어'", expected: "한글 단어" },
];

export const booleanComparisonCases = [
  { input: "참 == 참", expected: true },
  { input: "거짓 == 참", expected: false },
  { input: "참 == 거짓", expected: false },
  { input: "거짓 == 거짓", expected: true },
  { input: "참 != 참", expected: false },
  { input: "거짓 != 참", expected: true },
  { input: "참 != 거짓", expected: true },
  { input: "거짓 != 거짓", expected: false },
];

export const numberComparisonCases = [
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

export const stringComparisonCases = [
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

export const logicalNotToBooleanExpressionCases = [
  { input: "!(1 == 1)", expected: false },
  { input: "!!(1 == 1)", expected: true },
];

export const listCases = [
  { input: "[]", expected: [] },
  { input: "[1]", expected: [{ type: "number", value: 1 } as Value.NumberValue] },
  {
    input: "[42, 참, 'foo', 함수() {}]",
    expected: [
      { type: "number", value: 42 } as Value.NumberValue,
      { type: "boolean", value: true } as Value.BooleanValue,
      { type: "string", value: "foo" } as Value.StringValue,
      { type: "function" } as Value.FunctionValue,
    ],
  },
  {
    input: "[42 + 1, !거짓, 길이('foo')]",
    expected: [
      { type: "number", value: 43 } as Value.NumberValue,
      { type: "boolean", value: true } as Value.BooleanValue,
      { type: "number", value: 3 } as Value.NumberValue,
    ],
  },
  {
    input: "[42, [], [[99, 1]]]",
    expected: [
      { type: "number", value: 42 } as Value.NumberValue,
      { type: "list", elements: [] as Value.Value[] } as Value.ListValue,
      { type: "list", elements: [] as Value.Value[] } as Value.ListValue,
    ],
  },
  {
    input: "[42, [!], [! 'foo': 99]]",
    expected: [
      { type: "number", value: 42 } as Value.NumberValue,
      { type: "table", elements: {} as Value.TableValue["elements"] } as Value.TableValue,
      { type: "table", elements: {} as Value.TableValue["elements"] } as Value.TableValue,
    ],
  },
];

export const tableCases: { input: string; expected: [Value.KeyableValue, Value.ListableValue][] }[] = [
  { input: "[!]", expected: [] },
  {
    input: "[! 'foo': 1]",
    expected: [
      [
        {
          type: "string",
          value: "foo",
        } as Value.StringValue,
        {
          type: "number",
          value: 1,
        } as Value.NumberValue,
      ],
    ],
  },
  {
    input: "[! 'foo': 42, 참: 함수() {}, 99: -1]",
    expected: [
      [
        {
          type: "string",
          value: "foo",
        } as Value.StringValue,
        {
          type: "number",
          value: 42,
        } as Value.NumberValue,
      ],
      [
        {
          type: "boolean",
          value: true,
        } as Value.BooleanValue,
        {
          type: "function",
        } as Value.FunctionValue,
      ],
      [
        {
          type: "number",
          value: 99,
        } as Value.NumberValue,
        {
          type: "number",
          value: -1,
        } as Value.NumberValue,
      ],
    ],
  },
  {
    input: "[! 1+2: 42, !참: 'bar']",
    expected: [
      [
        {
          type: "number",
          value: 3,
        } as Value.NumberValue,
        {
          type: "number",
          value: 42,
        } as Value.NumberValue,
      ],
      [
        {
          type: "boolean",
          value: false,
        } as Value.BooleanValue,
        {
          type: "string",
          value: "bar",
        } as Value.StringValue,
      ],
    ],
  },
];

export const branchStatementsYieldingSomethingCases = [
  {
    name: "simple if statement with boolean literal predicate",
    input: "만약 참 { 3 }",
    expected: 3,
  },
  {
    name: "simple if statement with boolean expression predicate",
    input: "만약 1 != 2 { 4 }",
    expected: 4,
  },
  {
    name: "simple if statement with variable comparison predicate",
    input: "사과 = 3  바나나 = 4  만약 사과 < 바나나 { 5 }",
    expected: 5,
  },
  {
    name: "simple if-else statement with true boolean literal predicate",
    input: "만약 참 { 6 } 아니면 { 7 }",
    expected: 6,
  },
  {
    name: "simple if-else statement with false boolean literal predicate",
    input: "만약 거짓 { 6 } 아니면 { 7 }",
    expected: 7,
  },
  {
    name: "simple if-else statement with boolean expression predicate",
    input: "만약 1 == 2 { 34 } 아니면 { 56 }",
    expected: 56,
  },
];

export const branchStatementsYieldingNothingCases = [
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

export const nestedBranchStatementsYieldingSomethingCases = [
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

export const nestedBranchStatementsYieldingNothingCases = [
  {
    name: "nested if statements",
    input: "만약 참 { 만약 참 { 만약 거짓 { 1 } } }",
  },
  {
    name: "nested if and if-else statements",
    input: "만약 거짓 { 만약 참 { 만약 거짓 { 0 } 아니면 { 1 } } 아니면 { 2 } }",
  },
];

export const variableStatementsCases = [
  {
    name: "integer variable with number literal",
    input: "foo = 42  foo",
    expected: 42,
  },
  {
    name: "integer variable with arithmetic expression",
    input: "foo = 42 * (8 / 4) + (1 - (2 - 1))  foo",
    expected: 84,
  },
  {
    name: "two integer variables with number literal",
    input: "foo = 42  bar = foo + 1  bar",
    expected: 43,
  },
  {
    name: "arithmetic expression with variables",
    input: "foo = 42  bar = 43  baz = 44  qux = (bar * (baz - foo))",
    expected: 86,
  },
  {
    name: "Korean integer variable with number literal",
    input: "변수 = 42  변수",
    expected: 42,
  },
];

export const functionExpressionCases = [
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

export const callExpressionCases = [
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

export const complexStatementsWithFunctionAndCallCases = [
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
  {
    name: "curried function call",
    input: "더하기 = 함수(숫자1) { 결과 함수(숫자2) { 결과 숫자1+숫자2 } }  더하기(4)(7)",
    expected: 11,
  },
];

export const builtinFunctionLengthCallCases = [
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
  {
    name: "empty list",
    input: "길이([])",
    expected: 0,
  },
  {
    name: "nonempty list",
    input: "길이([1, 2, 3])",
    expected: 3,
  },
  {
    name: "nested-in-single-level list",
    input: "길이([[1, 2, 3]])",
    expected: 1,
  },
  {
    name: "nested-in-multiple-level list",
    input: "길이([[[]], [1], [2, [3]]])",
    expected: 3,
  },
];

export const builtinFunctionInsertCallCases = [
  {
    name: "insert single value into empty list",
    input: "넣기([], 4)",
    expected: [{ type: "number", value: 4 } as Value.NumberValue],
  },
  {
    name: "insert multiple value into non-empty list",
    input: "넣기([42], 4, 참, 'foo')",
    expected: [
      { type: "number", value: 42 } as Value.NumberValue,
      { type: "number", value: 4 } as Value.NumberValue,
      { type: "boolean", value: true } as Value.BooleanValue,
      { type: "string", value: "foo" } as Value.StringValue,
    ],
  },
];

export const builtinFunctionRemoveCallCases = [
  {
    name: "remove value into list",
    input: "빼기([4, 42])",
    expected: [{ type: "number", value: 4 } as Value.NumberValue],
  },
];

export const builtinFunctionFindCallCases = [
  {
    name: "find value in list",
    input: "찾기([4, 42], 1)",
    expected: 42,
  },
  {
    name: "find value in list with negative index",
    input: "찾기([4, 42], -2)",
    expected: 4,
  },
];

export const builtinFunctionWriteCallCases = [
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

export const errorCases = [
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
