import {
  operator,
  identifier,
  numberLiteral,
  booleanLiteral,
  stringLiteral,
  groupDelimiter,
  separator,
  keyword,
} from "./";
import type {
  Operator,
  Identifier,
  NumberLiteral,
  BooleanLiteral,
  StringLiteral,
  GroupDelimiter,
  Separator,
  Keyword,
} from "./";

describe("operator", () => {
  const cases: { input: Operator["value"], expected: Operator }[] = [
    { input: "+", expected: operator("+") },
    { input: "-", expected: operator("-") },
    { input: "*", expected: operator("*") },
    { input: "/", expected: operator("/") },
    { input: "=", expected: operator("=") },
    { input: "!", expected: operator("!") },
    { input: "!=", expected: operator("!=") },
    { input: "==", expected: operator("==") },
    { input: ">", expected: operator(">") },
    { input: "<", expected: operator("<") },
    { input: ">=", expected: operator(">=") },
    { input: "<=", expected: operator("<=") },
  ];

  it.each(cases)("make operator token for '$input'", ({ input, expected }) => {
    const token = operator(input);

    expect(token).toEqual(expected);
  });
});

describe("identifier", () => {
  const cases: { input: Identifier["value"], expected: Identifier }[] = [
    { input: "foo", expected: identifier("foo") },
    { input: "이름", expected: identifier("이름") },
    { input: "_foo이름123", expected: identifier("_foo이름123") },
  ];

  it.each(cases)("make identifier token for '$input'", ({ input, expected }) => {
    const token = identifier(input);

    expect(token).toEqual(expected);
  });
});

describe("number literal", () => {
  const cases: { input: NumberLiteral["value"], expected: NumberLiteral }[] = [
    { input: "0", expected: numberLiteral("0") },
    { input: "123", expected: numberLiteral("123") },
  ];

  it.each(cases)("make number literal token for '$input'", ({ input, expected }) => {
    const token = numberLiteral(input);

    expect(token).toEqual(expected);
  });
});

describe("boolean literal", () => {
  const cases: { input: BooleanLiteral["value"], expected: BooleanLiteral }[] = [
    { input: "참", expected: booleanLiteral("참") },
    { input: "거짓", expected: booleanLiteral("거짓") },
  ];

  it.each(cases)("make boolean literal token for '$input'", ({ input, expected }) => {
    const token = booleanLiteral(input);

    expect(token).toEqual(expected);
  });
});

describe("string literal", () => {
  const cases: { input: StringLiteral["value"], expected: StringLiteral }[] = [
    { input: "foo bar", expected: stringLiteral("foo bar") },
    { input: "  ", expected: stringLiteral("  ") },
    { input: "123", expected: stringLiteral("123") },
    { input: "참", expected: stringLiteral("참") },
  ];

  it.each(cases)("make string literal token for '$input'", ({ input, expected }) => {
    const token = stringLiteral(input);

    expect(token).toEqual(expected);
  });
});

describe("group delimiter", () => {
  const cases: { input: GroupDelimiter["value"], expected: GroupDelimiter }[] = [
    { input: "(", expected: groupDelimiter("(") },
    { input: ")", expected: groupDelimiter(")") },
  ];

  it.each(cases)("make group delimiter token for '$input'", ({ input, expected }) => {
    const token = groupDelimiter(input);

    expect(token).toEqual(expected);
  });
});

describe("separator", () => {
  const cases: { input: Separator["value"], expected: Separator }[] = [
    { input: ",", expected: separator(",") },
  ];

  it.each(cases)("make separator token for '$input'", ({ input, expected }) => {
    const token = separator(input);

    expect(token).toEqual(expected);
  });
});

describe("keywords", () => {
  const cases: { input: Keyword["value"], expected: Keyword }[] = [
    { input: "만약", expected: keyword("만약") },
    { input: "아니면", expected: keyword("아니면") },
    { input: "함수", expected: keyword("함수") },
    { input: "결과", expected: keyword("결과") },
  ];

  it.each(cases)("make keyword token for '$input'", ({ input, expected }) => {
    const token = keyword(input);

    expect(token).toEqual(expected);
  });
});
