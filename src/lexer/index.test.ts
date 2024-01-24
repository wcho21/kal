import Lexer from "./";
import {
  operator,
  identifier,
  numberLiteral,
  booleanLiteral,
  stringLiteral,
  groupDelimiter,
  blockDelimiter,
  keyword,
  separator,
  illegal,
  end,
} from "./token";
import type {
  TokenType,
  Operator,
  Identifier,
  NumberLiteral,
  BooleanLiteral,
  StringLiteral,
  GroupDelimiter,
  BlockDelimiter,
  Keyword,
  Separator,
  Illegal,
  End,
} from "./token";

import type {
  SourceToken,
} from "./source-token";

describe("getSourceToken()", () => {
  describe("single token", () => {
    const testLex = ({ input, expected }: { input: string, expected: SourceToken }) => {
      const lexer = new Lexer(input);

      const token = lexer.getSourceToken();

      expect(token).toEqual(expected);
    };

    describe("operators", () => {
      const cases: { input: string, expected: SourceToken }[] = [
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

      it.each(cases)("lex operator '$input'", testLex);
    });

    describe("delimiters", () => {
      const cases: { input: string, expected: SourceToken }[] = [
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

      it.each(cases)("lex delimiter '$input'", testLex);
    });

    describe("number literals", () => {
      const cases: { input: string, expected: SourceToken }[] = [
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

      it.each(cases)("lex number literal '$input'", testLex);
    });

    describe("boolean literals", () => {
      const cases: { input: string, expected: SourceToken }[] = [
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

      it.each(cases)("lex boolean literal '$input'", testLex);
    });

    describe("string literals", () => {
      const cases: { input: string, expected: SourceToken }[] = [
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

      it.each(cases)("lex string literal '$input'", testLex);
    });

    describe("keywords", () => {
      const cases: { input: string, expected: SourceToken }[] = [
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

      it.each(cases)("lex keyword '$input'", testLex);
    });

    describe("identifiers", () => {
      const cases: { input: string, expected: SourceToken }[] = [
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

      it.each(cases)("lex identifier '$input'", testLex);
    });

    describe("special", () => {
      const cases: { input: string, expected: SourceToken }[] = [
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

      it.each(cases)("lex special '$input'", testLex);
    });
  });

  describe("multiple tokens", () => {
    const cases: { input: string, expectedTokens: SourceToken[] }[] = [
      {
        input: "12 + 34",
        expectedTokens: [
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
        ]
      },
      {
        input: "만약 참 {\n  12\r\n}",
        expectedTokens: [
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
        ]
      },
    ];

    it.each(cases)("get tokens from input '$input'", ({ input, expectedTokens }) => {
      const lexer = new Lexer(input);

      for (const expected of expectedTokens) {
        const token = lexer.getSourceToken();
        expect(token).toEqual(expected);
      }
    });
  });
});

describe("getToken()", () => {
  describe("single token", () => {
    const testLexing = ({ input, expected }: { input: string, expected: TokenType }) => {
      const lexer = new Lexer(input);

      const token = lexer.getToken();

      expect(token).toEqual(expected);
    };

    describe("operators", () => {
      const cases: { input: string, expected: Operator }[] = [
        { input: "+", expected: operator("+") },
        { input: "-", expected: operator("-") },
        { input: "*", expected: operator("*") },
        { input: "/", expected: operator("/") },
        { input: "=", expected: operator("=") },
        { input: "!", expected: operator("!") },
        { input: "==", expected: operator("==") },
        { input: "!=", expected: operator("!=") },
        { input: ">", expected: operator(">") },
        { input: "<", expected: operator("<") },
        { input: ">=", expected: operator(">=") },
        { input: "<=", expected: operator("<=") },
      ];

      it.each(cases)("get operator token '$input'", testLexing);
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

      it.each(cases)("get identifier token '$input'", testLexing);
    });

    describe("number literals", () => {
      const cases: { input: string, expected: NumberLiteral }[] = [
        { input: "0", expected: numberLiteral("0") },
        { input: "123", expected: numberLiteral("123") },
        { input: "12.75", expected: numberLiteral("12.75") },
        { input: "0.875", expected: numberLiteral("0.875") },
        { input: "2.00", expected: numberLiteral("2.00") },
      ];

      it.each(cases)("get number literal token '$input'", testLexing);
    });

    describe("boolean literals", () => {
      const cases: { input: string, expected: BooleanLiteral }[] = [
        { input: "참", expected: booleanLiteral("참") },
        { input: "거짓", expected: booleanLiteral("거짓") },
      ];

      it.each(cases)("get boolean literal token '$input'", testLexing);
    });

    describe("string literals", () => {
      const cases: { input: string, expected: StringLiteral }[] = [
        { input: "'foo bar'", expected: stringLiteral("foo bar") },
        { input: "'123'", expected: stringLiteral("123") },
        { input: "'!@#$'", expected: stringLiteral("!@#$") },
        { input: "'   '", expected: stringLiteral("   ") },
        { input: "'참'", expected: stringLiteral("참") },
      ];

      it.each(cases)("get string literal token '$input'", testLexing);
    });

    describe("group delimiters", () => {
      const cases: { input: string, expected: GroupDelimiter }[] = [
        { input: "(", expected: groupDelimiter("(") },
        { input: ")", expected: groupDelimiter(")") },
      ];

      it.each(cases)("get group delimiter token '$input'", testLexing);
    });

    describe("block delimiters", () => {
      const cases: { input: string, expected: BlockDelimiter }[] = [
        { input: "{", expected: blockDelimiter("{") },
        { input: "}", expected: blockDelimiter("}") },
      ];

      it.each(cases)("get group delimiter token '$input'", testLexing);
    });

    describe("keywords", () => {
      const cases: { input: string, expected: Keyword }[] = [
        { input: "만약", expected: keyword("만약") },
        { input: "아니면", expected: keyword("아니면") },
        { input: "함수", expected: keyword("함수") },
        { input: "결과", expected: keyword("결과") },
      ];

      it.each(cases)("get group delimiter token '$input'", testLexing);
    });

    describe("separator", () => {
      const cases: { input: string, expected: Separator }[] = [
        { input: ",", expected: separator(",") },
      ];

      it.each(cases)("get separator token '$input'", testLexing);
    });

    describe("illegal", () => {
      const cases: { input: string, expected: Illegal }[] = [
        { input: "$", expected: illegal("$") },
        { input: "'foo", expected: illegal("'foo") },
      ];

      it.each(cases)("get illegal token '$input'", testLexing);
    });

    describe("end", () => {
      const cases: { input: string, expected: End }[] = [
        { input: "", expected: end },
      ];

      it.each(cases)("get end token '$input'", testLexing);
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
      {
        input: "'foo' 'bar'",
        expectedTokens: [
          stringLiteral("foo"),
          stringLiteral("bar"),
          end,
        ]
      },
      {
        input: "만약 참 { \n 12 \n } 아니면 { \n 34 \n}",
        expectedTokens: [
          keyword("만약"),
          booleanLiteral("참"),
          blockDelimiter("{"),
          numberLiteral("12"),
          blockDelimiter("}"),
          keyword("아니면"),
          blockDelimiter("{"),
          numberLiteral("34"),
          blockDelimiter("}"),
          end,
        ]
      },
      {
        input: "함수(사과, 바나나) { 결과 사과 + 바나나 }",
        expectedTokens:[
          keyword("함수"),
          groupDelimiter("("),
          identifier("사과"),
          separator(","),
          identifier("바나나"),
          groupDelimiter(")"),
          blockDelimiter("{"),
          keyword("결과"),
          identifier("사과"),
          operator("+"),
          identifier("바나나"),
          blockDelimiter("}"),
        ],
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
