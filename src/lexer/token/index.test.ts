import * as Token from "./";
import type * as TokenType from "./";

describe("operator", () => {
  const cases: { input: TokenType.Operator["value"], expected: TokenType.Operator }[] = [
    { input: "+", expected: Token.operator("+") },
    { input: "-", expected: Token.operator("-") },
    { input: "*", expected: Token.operator("*") },
    { input: "/", expected: Token.operator("/") },
    { input: "=", expected: Token.operator("=") },
  ];

  it.each(cases)("make operator token for '$input'", ({ input, expected }) => {
    const token = Token.operator(input);

    expect(token).toEqual(expected);
  });
});

describe("identifier", () => {
  const cases: { input: TokenType.Identifier["value"], expected: TokenType.Identifier }[] = [
    { input: "foo", expected: Token.identifier("foo") },
    { input: "이름", expected: Token.identifier("이름") },
    { input: "_foo이름123", expected: Token.identifier("_foo이름123") },
  ];

  it.each(cases)("make identifier token for '$input'", ({ input, expected }) => {
    const token = Token.identifier(input);

    expect(token).toEqual(expected);
  });
});

describe("number literal", () => {
  const cases: { input: TokenType.NumberLiteral["value"], expected: TokenType.NumberLiteral }[] = [
    { input: "0", expected: Token.numberLiteral("0") },
    { input: "123", expected: Token.numberLiteral("123") },
  ];

  it.each(cases)("make number literal token for '$input'", ({ input, expected }) => {
    const token = Token.numberLiteral(input);

    expect(token).toEqual(expected);
  });
});

describe("group delimiter", () => {
  const cases: { input: TokenType.GroupDelimiter["value"], expected: TokenType.GroupDelimiter }[] = [
    { input: "(", expected: Token.groupDelimiter("(") },
    { input: ")", expected: Token.groupDelimiter(")") },
  ];

  it.each(cases)("make group delimiter token for '$input'", ({ input, expected }) => {
    const token = Token.groupDelimiter(input);

    expect(token).toEqual(expected);
  });
});
