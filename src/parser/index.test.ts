import { describe, expect, it } from "bun:test";
import Lexer from "../lexer";
import Parser from "./";
import type { ParserError } from "./";
import {
  assignmentCases,
  branchStatementCases,
  callExpressionCases,
  failCases,
  functionExpressionCases,
  groupedCases,
  infixCases,
  leftAssocCases,
  listExpressionCases,
  literalCases,
  literalExpressionCases,
  multipleOperatorsAssocCases,
  returnStatementCases,
  rightAssocInfixCases,
  singleExpressionCases,
  singleNumberCases,
  singleStatementCases,
  unaryCases,
} from "./index.test.case";

describe("parseSource()", () => {
  const createParser = (input: string) => {
    const lexer = new Lexer(input);
    const parser = new Parser(lexer);

    return parser;
  };

  const testSuccess = ({ input, expected }: { input: string; expected: object }) => {
    const parser = createParser(input);

    const node = parser.parseSource();

    expect(node).toMatchObject(expected);
  };

  const testFailure = ({ input, expected }: { input: string; expected: typeof ParserError }) => {
    const parser = createParser(input);

    expect(() => parser.parseSource()).toThrow(expected);
  };

  describe("creating nodes", () => {
    describe("literal expressions", () => {
      it.each(literalCases)("$name", testSuccess);
    });

    describe("arithmetic expressions", () => {
      describe("single number", () => {
        it.each(singleNumberCases)("$name", testSuccess);
      });

      describe("left associativity", () => {
        it.each(leftAssocCases)("$name", testSuccess);
      });

      describe("associativity among different operations", () => {
        it.each(multipleOperatorsAssocCases)("$name", testSuccess);
      });
    });

    describe("logical expressions", () => {
      describe("unary operation", () => {
        it.each(unaryCases)("$name", testSuccess);
      });

      describe("binary operation", () => {
        it.each(infixCases)("$name", testSuccess);
      });

      describe("right associativity", () => {
        it.each(rightAssocInfixCases)("$name", testSuccess);
      });

      describe("grouped expression", () => {
        it.each(groupedCases)("$name", testSuccess);
      });
    });

    describe("assignment", () => {
      it.each(assignmentCases)("$name", testSuccess);
    });

    describe("call expressions", () => {
      it.each(callExpressionCases)("$name", testSuccess);
    });

    describe("function expressions", () => {
      it.each(functionExpressionCases)("$name", testSuccess);
    });

    describe("list expressions", () => {
      it.each(listExpressionCases)("$name", testSuccess);
    });

    describe("return statement", () => {
      it.each(returnStatementCases)("$name", testSuccess);
    });

    describe("branch statement", () => {
      it.each(branchStatementCases)("$name", testSuccess);
    });
  });

  describe("marking positions", () => {
    describe("single statements", () => {
      describe("literal expressions", () => {
        it.each(literalExpressionCases)("$name", testSuccess);
      });

      describe("single expressions", () => {
        it.each(singleExpressionCases)("$name", testSuccess);
      });

      describe("single statements", () => {
        it.each(singleStatementCases)("$name", testSuccess);
      });
    });
  });

  describe("error handling", () => {
    it.each(failCases)("$name", testFailure);
  });
});
