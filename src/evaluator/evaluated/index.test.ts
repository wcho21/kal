import {
  makeEvaluatedNumber,
  makeEvaluatedString,
  makeEvaluatedBoolean,
  makeEvaluatedFunction,
  makeEvaluatedEmpty,
  wrapReturnValue,
} from "./";
import type { Evaluated } from "./";
import type {
  FunctionExpression
} from "../../parser/syntax-tree";
import type Environment from "../environment";

describe("makeEvaluatedNumber()", () => {
  it("make number value", () => {
    const evaluated = makeEvaluatedNumber(42);

    expect(evaluated.type).toBe("number");
    expect(evaluated.value).toBe(42);
    expect(evaluated.representation).toBe("42");
  });
});

describe("makeEvaluatedString()", () => {
  it("make nonempty string value", () => {
    const evaluated = makeEvaluatedString("foo bar");

    expect(evaluated.type).toBe("string");
    expect(evaluated.value).toBe("foo bar");
    expect(evaluated.representation).toBe("'foo bar'");
  });

  it("make empty string value", () => {
    const evaluated = makeEvaluatedString("");

    expect(evaluated.type).toBe("string");
    expect(evaluated.value).toBe("");
    expect(evaluated.representation).toBe("''");
  });
});

describe("makeEvaluatedBoolean()", () => {
  it("make true boolean value", () => {
    const evaluated = makeEvaluatedBoolean(true);

    expect(evaluated.type).toBe("boolean");
    expect(evaluated.value).toBe(true);
    expect(evaluated.representation).toBe("참");
  });

  it("make false boolean value", () => {
    const evaluated = makeEvaluatedBoolean(false);

    expect(evaluated.type).toBe("boolean");
    expect(evaluated.value).toBe(false);
    expect(evaluated.representation).toBe("거짓");
  });
});

describe("makeEvaluatedFunction()", () => {
  it("make function value", () => {
    const parametersMock = [] as FunctionExpression["parameter"];
    const bodyMock = {} as FunctionExpression["body"];
    const environmentMock = {} as Environment;

    const evaluated = makeEvaluatedFunction(parametersMock, bodyMock, environmentMock);

    expect(evaluated.type).toBe("function");
    expect(evaluated.parameters).toBe(parametersMock);
    expect(evaluated.body).toBe(bodyMock);
    expect(evaluated.environment).toBe(environmentMock);
    expect(evaluated.representation).toBe("(함수)");
  });
});

describe("makeEvaluatedEmpty()", () => {
  it("make empty value", () => {
    const evaluated = makeEvaluatedEmpty();

    expect(evaluated.type).toBe("empty");
    expect(evaluated.representation).toBe("(비어있음)");
  });
});

describe("wrapReturnValue()", () => {
  it("wrap return value", () => {
    const valueMock = {} as Evaluated;

    const wrapped = wrapReturnValue(valueMock);

    expect(wrapped.type).toBe("return value");
  });
});
