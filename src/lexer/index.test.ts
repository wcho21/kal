import Lexer, { types, type TokenType } from "./";

describe("getToken()", () => {
  describe("single tokens", () => {
    const inputAndExpectedTokenTypes: [string, TokenType][] = [
      ["=", types.assign],
      ["==", types.equal],
      ["+", types.plus],
      ["-", types.minus],
      ["*", types.asterisk],
      ["/", types.slash],
      ["!", types.bang],
      ["!=", types.notEqual],
      [">", types.greaterThan],
      [">=", types.greaterThanOrEqualTo],
      ["<", types.lessThan],
      ["<=", types.lessThanOrEqualTo],
      ["(", types.leftParen],
      [")", types.rightParen],
      ["{", types.leftBrace],
      ["}", types.rightBrace],
      [",", types.comma],
      [";", types.semicolon],
      ["함수", types.func],
      ["변수", types.variable],
      ["만약", types.condIf],
      ["아니면", types.condElse],
      ["반환", types.funcReturn],
      ["참", types.boolTrue],
      ["거짓", types.boolFalse],
      ["some_identifier", types.identifier],
      ["어떤_식별자", types.identifier],
      ["1234567890", types.integer],
    ];

    it.each(inputAndExpectedTokenTypes)("get token %s", (input, expectedTokenType) => {
      const lexer = new Lexer(input);

      const expectedToken = { type: expectedTokenType, value: input };
      expect(lexer.getToken()).toEqual(expectedToken);
    });
  });

  describe("multiple tokens", () => {
    it("get tokens", () => {
      const input = "= == <= >=";
      const lexer = new Lexer(input);

      expect(lexer.getToken()).toEqual({ type: types.assign, value: "=" });
      expect(lexer.getToken()).toEqual({ type: types.equal, value: "==" });
      expect(lexer.getToken()).toEqual({ type: types.lessThanOrEqualTo, value: "<=" });
      expect(lexer.getToken()).toEqual({ type: types.greaterThanOrEqualTo, value: ">=" });
    });
  });
});
