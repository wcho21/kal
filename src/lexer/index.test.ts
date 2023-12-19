import Lexer from "./";
import {
  operator,
  identifier,
  numberLiteral,
  groupDelimiter,
  illegal,
  end,
} from "./token";
import type {
  TokenType,
  Operator,
  Identifier,
  NumberLiteral,
  GroupDelimiter,
  Illegal,
  End,
} from "./token";

describe("getToken()", () => {
  describe("single token", () => {
    describe("operators", () => {
      const cases: { input: string, expected: Operator }[] = [
        { input: "+", expected: operator("+") },
        { input: "-", expected: operator("-") },
        { input: "*", expected: operator("*") },
        { input: "/", expected: operator("/") },
        { input: "=", expected: operator("=") },
      ];

      it.each(cases)("get operator token '$input'", ({ input, expected }) => {
        const lexer = new Lexer(input);

        const token = lexer.getToken();

        expect(token).toEqual(expected);
      });
    });

    describe("identifiers", () => {
      const cases: { input: string, expected: Identifier }[] = [
        { input: "foo", expected: identifier("foo") },
        { input: "이름", expected: identifier("이름") },
        { input: "foo이름", expected: identifier("foo이름") },
        { input: "foo123", expected: identifier("foo123") },
        { input: "이름foo", expected: identifier("이름foo") },
        { input: "_foo이름", expected: identifier("_foo이름") },
      ];

      it.each(cases)("get identifier token '$input'", ({ input, expected }) => {
        const lexer = new Lexer(input);

        const token = lexer.getToken();

        expect(token).toEqual(expected);
      });
    });

    describe("literals", () => {
      const cases: { input: string, expected: NumberLiteral }[] = [
        { input: "0", expected: numberLiteral("0") },
        { input: "123", expected: numberLiteral("123") },
      ];

      it.each(cases)("get literal token '$input'", ({ input, expected }) => {
        const lexer = new Lexer(input);

        const token = lexer.getToken();

        expect(token).toEqual(expected);
      });
    });

    describe("group delimiters", () => {
      const cases: { input: "(" | ")", expected: GroupDelimiter }[] = [
        { input: "(", expected: groupDelimiter("(") },
        { input: ")", expected: groupDelimiter(")") },
      ];

      it.each(cases)("get group delimiter token '$input'", ({ input, expected }) => {
        const lexer = new Lexer(input);

        const token = lexer.getToken();

        expect(token).toEqual(expected);
      });
    });

    describe("illegal", () => {
      const cases: { input: string, expected: Illegal }[] = [
        { input: "$", expected: illegal("$") },
      ];

      it.each(cases)("get illegal token '$input'", ({ input, expected }) => {
        const lexer = new Lexer(input);

        const token = lexer.getToken();

        expect(token).toEqual(expected);
      });
    });

    describe("end", () => {
      const cases: { input: string, expected: End }[] = [
        { input: "", expected: end },
      ];

      it.each(cases)("get end token '$input'", ({ input, expected }) => {
        const lexer = new Lexer(input);

        const token = lexer.getToken();

        expect(token).toEqual(expected);
      });
    });
  });

  describe("multiple tokens", () => {
    const cases: { input: string, expectedTokens: TokenType[] }[] = [
      {
        input: "12 + 34 * 5 / 67 - 89",
        expectedTokens: [
          numberLiteral("12"),
          operator("+"),
          numberLiteral("34"),
          operator("*"),
          numberLiteral("5"),
          operator("/"),
          numberLiteral("67"),
          operator("-"),
          numberLiteral("89"),
          end,
        ]
      },
      {
        input: "_이름 = foo123",
        expectedTokens: [
          identifier("_이름"),
          operator("="),
          identifier("foo123"),
          end,
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
      const expected = end;

      const lexer = new Lexer(input);

      const token = lexer.getToken();
      expect(token).toEqual(expected);
    });
  });
});
