import Lexer from "./";
import * as Token from "./token";
import type * as TokenType from "./token";

describe("getToken()", () => {
  describe("single token", () => {
    describe("operators", () => {
      const cases: { input: string, expected: TokenType.Operator }[] = [
        { input: "+", expected: Token.operator("+") },
        { input: "-", expected: Token.operator("-") },
        { input: "*", expected: Token.operator("*") },
        { input: "/", expected: Token.operator("/") },
        { input: "=", expected: Token.operator("=") },
      ];

      it.each(cases)("get operator token '$input'", ({ input, expected }) => {
        const lexer = new Lexer(input);

        const token = lexer.getToken();

        expect(token).toEqual(expected);
      });
    });

    describe("identifiers", () => {
      const cases: { input: string, expected: TokenType.Identifier }[] = [
        { input: "foo", expected: Token.identifier("foo") },
        { input: "이름", expected: Token.identifier("이름") },
        { input: "foo이름", expected: Token.identifier("foo이름") },
        { input: "foo123", expected: Token.identifier("foo123") },
        { input: "이름foo", expected: Token.identifier("이름foo") },
        { input: "_foo이름", expected: Token.identifier("_foo이름") },
      ];

      it.each(cases)("get identifier token '$input'", ({ input, expected }) => {
        const lexer = new Lexer(input);

        const token = lexer.getToken();

        expect(token).toEqual(expected);
      });
    });

    describe("literals", () => {
      const cases: { input: string, expected: TokenType.NumberLiteral }[] = [
        { input: "0", expected: Token.numberLiteral("0") },
        { input: "123", expected: Token.numberLiteral("123") },
      ];

      it.each(cases)("get literal token '$input'", ({ input, expected }) => {
        const lexer = new Lexer(input);

        const token = lexer.getToken();

        expect(token).toEqual(expected);
      });
    });

    describe("group delimiters", () => {
      const cases: { input: "(" | ")", expected: TokenType.GroupDelimiter }[] = [
        { input: "(", expected: Token.groupDelimiter("(") },
        { input: ")", expected: Token.groupDelimiter(")") },
      ];

      it.each(cases)("get group delimiter token '$input'", ({ input, expected }) => {
        const lexer = new Lexer(input);

        const token = lexer.getToken();

        expect(token).toEqual(expected);
      });
    });

    describe("illegal", () => {
      const cases: { input: string, expected: TokenType.Illegal }[] = [
        { input: "$", expected: Token.illegal("$") },
      ];

      it.each(cases)("get illegal token '$input'", ({ input, expected }) => {
        const lexer = new Lexer(input);

        const token = lexer.getToken();

        expect(token).toEqual(expected);
      });
    });

    describe("end", () => {
      const cases: { input: string, expected: TokenType.End }[] = [
        { input: "", expected: Token.end },
      ];

      it.each(cases)("get end token '$input'", ({ input, expected }) => {
        const lexer = new Lexer(input);

        const token = lexer.getToken();

        expect(token).toEqual(expected);
      });
    });
  });

  describe("multiple tokens", () => {
    const cases: { input: string, expectedTokens: TokenType.TokenType[] }[] = [
      {
        input: "12 + 34 * 5 / 67 - 89",
        expectedTokens: [
          Token.numberLiteral("12"),
          Token.operator("+"),
          Token.numberLiteral("34"),
          Token.operator("*"),
          Token.numberLiteral("5"),
          Token.operator("/"),
          Token.numberLiteral("67"),
          Token.operator("-"),
          Token.numberLiteral("89"),
          Token.end,
        ]
      },
      {
        input: "_이름 = foo123",
        expectedTokens: [
          Token.identifier("_이름"),
          Token.operator("="),
          Token.identifier("foo123"),
          Token.end,
        ]
      },
    ];

    it.each(cases)("get tokens from input '$input'", ({ input, expectedTokens }) => {
      const lexer = new Lexer(input);

      for (const expected of expectedTokens) {
        const token = lexer.getToken();
        expect(token).toEqual(expected);
      }
    });
  });

  describe("no token", () => {
    it("get only end token", () => {
      const input = "  \r\r\n\n\t\t";
      const expected = Token.end;

      const lexer = new Lexer(input);

      const token = lexer.getToken();
      expect(token).toEqual(expected);
    });
  });
});
