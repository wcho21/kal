import Lexer from "./";
import {
  booleanLiteralCases,
  identifierCases,
  keywordCases,
  multipleTokenCases,
  numberLiteralCases,
  singleDelimiterCases,
  singleOperatorCases,
  specialCases,
  stringLiteralCases,
} from "./index.test.case";
import type { SourceToken } from "./source-token";

describe("getSourceToken()", () => {
  describe("single token", () => {
    const testLex = ({ input, expected }: { input: string; expected: SourceToken }) => {
      const lexer = new Lexer(input);

      const token = lexer.getSourceToken();

      expect(token).toEqual(expected);
    };

    describe("operators", () => {
      it.each(singleOperatorCases)("lex operator '$input'", testLex);
    });

    describe("delimiters", () => {
      it.each(singleDelimiterCases)("lex delimiter '$input'", testLex);
    });

    describe("number literals", () => {
      it.each(numberLiteralCases)("lex number literal '$input'", testLex);
    });

    describe("boolean literals", () => {
      it.each(booleanLiteralCases)("lex boolean literal '$input'", testLex);
    });

    describe("string literals", () => {
      it.each(stringLiteralCases)("lex string literal '$input'", testLex);
    });

    describe("keywords", () => {
      it.each(keywordCases)("lex keyword '$input'", testLex);
    });

    describe("identifiers", () => {
      it.each(identifierCases)("lex identifier '$input'", testLex);
    });

    describe("special", () => {
      it.each(specialCases)("lex special '$input'", testLex);
    });
  });

  describe("multiple tokens", () => {
    const testLex = ({ input, expected }: { input: string; expected: SourceToken[] }) => {
      const lexer = new Lexer(input);

      for (const expectedToken of expected) {
        const token = lexer.getSourceToken();
        expect(token).toEqual(expectedToken);
      }
    };

    it.each(multipleTokenCases)("get tokens from input '$input'", testLex);
  });
});
