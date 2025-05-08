import Lexer from "../lexer";
import Parser from "../parser";
import Evaluator from "./";
import Environment from "./environment";
import {
  arithmeticExpressionWithFloatingPointNumberCases,
  booleanComparisonCases,
  branchStatementsYieldingNothingCases,
  branchStatementsYieldingSomethingCases,
  builtinFunctionInsertCallCases,
  builtinFunctionLengthCallCases,
  builtinFunctionRemoveCallCases,
  builtinFunctionWriteCallCases,
  callExpressionCases,
  complexStatementsWithFunctionAndCallCases,
  errorCases,
  functionExpressionCases,
  groupedArithmeticExpressionCases,
  leftAssocArithmeticOperationCases,
  listCases,
  logicalNotExpressionCases,
  logicalNotToBooleanExpressionCases,
  nestedBranchStatementsYieldingNothingCases,
  nestedBranchStatementsYieldingSomethingCases,
  numberComparisonCases,
  singleArithmeticExpressionCases,
  singleBooleanCases,
  singleNumberCases,
  singleStringCases,
  stringComparisonCases,
  variableStatementsCases,
} from "./index.test.case";
import type {
  BooleanValue,
  EmptyValue,
  FunctionValue,
  ListValue,
  ListableValue,
  NumberValue,
  StringValue,
  Value,
} from "./value";

const evaluateInput = (input: string, onStdout?: (toWrite: string) => void): Value => {
  const lexer = new Lexer(input);
  const parser = new Parser(lexer);
  const parsed = parser.parseSource();

  const evaluator = new Evaluator();
  if (onStdout !== undefined) {
    evaluator.onStdout(onStdout);
  }
  const env = new Environment();
  const evaluated = evaluator.evaluate(parsed, env);
  return evaluated;
};

const testEvaluatingPrimitive = ({ input, expected }: { input: string; expected: number | boolean | string }) => {
  const evaluated = evaluateInput(input) as StringValue | BooleanValue;

  expect(evaluated.value).toBe(expected);
};

const testEvaluatingEmpty = ({ input }: { input: string }): void => {
  const evaluated = evaluateInput(input) as EmptyValue;

  expect(evaluated.value).toBe(null);
};

const testEvaluatingFunction = ({
  input,
  expectedParamsLength,
}: { input: string; expectedParamsLength: number }): void => {
  const evaluated = evaluateInput(input) as FunctionValue;

  expect(evaluated).toHaveProperty("parameters");
  expect(evaluated.parameters.length).toBe(expectedParamsLength);
  expect(evaluated).toHaveProperty("body");
  expect(evaluated).toHaveProperty("environment");
};

const testEvaluatingList = ({ input, expected }: { input: string; expected: ListableValue[] }): void => {
  const evaluated = evaluateInput(input) as ListValue;

  expect(evaluated.elements.length).toBe(expected.length);

  for (let i = 0; i < evaluated.elements.length; ++i) {
    const elem = evaluated.elements[i];
    const expectedElem = expected[i];

    if (elem.type === "number" || elem.type === "string" || elem.type === "boolean") {
      const expectedValue = (expectedElem as NumberValue).value;
      expect(elem.value).toBe(expectedValue);
    } else if (elem.type === "function") {
      expect(elem.type).toBe("function");
    } else if (elem.type === "list") {
      expect(elem.type).toBe("list");
    } else {
      const _never: never = elem;
      throw new Error("must be unreachable");
    }
  }
};

const testEvaluatingStdout = ({ input, expected }: { input: string; expected: object }): void => {
  const stdouts: string[] = [];

  evaluateInput(input, toWrite => stdouts.push(toWrite));

  expect(stdouts).toEqual(expected);
};

describe("evaluate()", () => {
  describe("single numbers", () => {
    it.each(singleNumberCases)("evaluate $input", testEvaluatingPrimitive);
  });

  describe("simple arithmetic expressions", () => {
    it.each(singleArithmeticExpressionCases)("evaluate $input", testEvaluatingPrimitive);
  });

  describe("left associativity of arithmetic operation", () => {
    it.each(leftAssocArithmeticOperationCases)("evaluate $input", testEvaluatingPrimitive);
  });

  describe("grouped arithmetic expressions", () => {
    it.each(groupedArithmeticExpressionCases)("evaluate $input", testEvaluatingPrimitive);
  });

  describe("arithmetic expressions with floating point number", () => {
    it.each(arithmeticExpressionWithFloatingPointNumberCases)("evaluate $input", testEvaluatingPrimitive);
  });

  describe("single boolean", () => {
    it.each(singleBooleanCases)("evaluate $input", testEvaluatingPrimitive);
  });

  describe("logical not expressions", () => {
    it.each(logicalNotExpressionCases)("evaluate $input", testEvaluatingPrimitive);
  });

  describe("single string", () => {
    it.each(singleStringCases)("evaluate $input", testEvaluatingPrimitive);
  });

  describe("boolean comparison", () => {
    it.each(booleanComparisonCases)("evaluate $input", testEvaluatingPrimitive);
  });

  describe("number comparison", () => {
    it.each(numberComparisonCases)("evaluate $input", testEvaluatingPrimitive);
  });

  describe("string comparison", () => {
    it.each(stringComparisonCases)("evaluate $input", testEvaluatingPrimitive);
  });

  describe("logical not operation to boolean expression", () => {
    it.each(logicalNotToBooleanExpressionCases)("evaluate $input", testEvaluatingPrimitive);
  });

  describe("list", () => {
    it.each(listCases)("evaluate $input", testEvaluatingList);
  });

  describe("branch statements yielding something", () => {
    it.each(branchStatementsYieldingSomethingCases)("evaluate $input", testEvaluatingPrimitive);
  });

  describe("branch statements yielding nothing", () => {
    it.each(branchStatementsYieldingNothingCases)("evaluate $input", testEvaluatingEmpty);
  });

  describe("nested branch statements yielding something", () => {
    it.each(nestedBranchStatementsYieldingSomethingCases)("evaluate $input", testEvaluatingPrimitive);
  });

  describe("nested branch statements yielding nothing", () => {
    it.each(nestedBranchStatementsYieldingNothingCases)("evaluate $input", testEvaluatingEmpty);
  });

  describe("variable statements", () => {
    it.each(variableStatementsCases)("evaluate $name", testEvaluatingPrimitive);
  });

  describe("function expressions", () => {
    it.each(functionExpressionCases)("evaluate $name", testEvaluatingFunction);
  });

  describe("call expressions", () => {
    it.each(callExpressionCases)("evaluate $name", testEvaluatingPrimitive);
  });

  describe("complex statements with function and calls", () => {
    it.each(complexStatementsWithFunctionAndCallCases)("evaluate $name", testEvaluatingPrimitive);
  });

  describe("builtin function calls", () => {
    describe("길이()", () => {
      it.each(builtinFunctionLengthCallCases)("evaluate $name", testEvaluatingPrimitive);
    });

    describe("넣기()", () => {
      it.each(builtinFunctionInsertCallCases)("evaluate $name", testEvaluatingList);
    });

    describe("빼기()", () => {
      it.each(builtinFunctionRemoveCallCases)("evaluate $name", testEvaluatingList);
    });

    describe("쓰기()", () => {
      it.each(builtinFunctionWriteCallCases)("evaluate $name", testEvaluatingStdout);
    });
  });

  describe("errors", () => {
    it.each(errorCases)("$name", ({ input, expected, range, received }) => {
      expect(() => evaluateInput(input)).toThrow(expected);
      try {
        evaluateInput(input);
      } catch (err) {
        const e = err as typeof expected;

        expect(e).toMatchObject({ range });
        if (received !== undefined) {
          expect(e).toMatchObject({ received });
        }
      }
    });
  });
});
