import type {
  FunctionExpression,
} from "../../parser/syntax-tree";
import type Environment from "../environment";

interface EvaluatedBase {
  readonly type: string;
  readonly representation: string;
}

export interface EvaluatedNumber extends EvaluatedBase {
  readonly type: "number";
  readonly value: number;
}

export interface EvaluatedString extends EvaluatedBase {
  readonly type: "string";
  readonly value: string;
}

export interface EvaluatedBoolean extends EvaluatedBase {
  readonly type: "boolean";
  readonly value: boolean;
}

export interface EvaluatedFunction extends EvaluatedBase {
  readonly type: "function";
  readonly parameters: FunctionExpression["parameter"];
  readonly body: FunctionExpression["body"];
  readonly environment: Environment;
}

// 'empty' represents the result of running statement (e.g., branching) in REPL
export interface EvaluatedEmpty extends EvaluatedBase {
  readonly type: "empty";
}

export type Evaluated =
  EvaluatedPrimitive |
  EvaluatedFunction |
  EvaluatedEmpty;
export type EvaluatedPrimitive =
  EvaluatedNumber |
  EvaluatedString |
  EvaluatedBoolean;

export type MakeEvaluatedNumber = (value: number) => EvaluatedNumber;
export const makeEvaluatedNumber: MakeEvaluatedNumber = value => ({
  type: "number",
  value,
  get representation() {
    return `${value}`;
  },
});

export type MakeEvaluatedString = (value: string) => EvaluatedString;
export const makeEvaluatedString: MakeEvaluatedString = value => ({
  type: "string",
  value,
  get representation() {
    return `'${value}'`;
  },
});

export type MakeEvaluatedBoolean = (value: boolean) => EvaluatedBoolean;
export const makeEvaluatedBoolean: MakeEvaluatedBoolean = value => ({
  type: "boolean",
  value,
  get representation() {
    return value ? "참" : "거짓";
  },
});

export type MakeEvaluatedFunction = (
  parameters: FunctionExpression["parameter"],
  body: FunctionExpression["body"],
  environment: Environment
) => EvaluatedFunction;
export const makeEvaluatedFunction: MakeEvaluatedFunction = (parameters, body, environment) => ({
  type: "function",
  parameters,
  body,
  environment,
  get representation() {
    return "(함수)";
  },
});

export type MakeEvaluatedEmpty = () => EvaluatedEmpty;
export const makeEvaluatedEmpty: MakeEvaluatedEmpty = () => ({
  type: "empty",
  get representation() {
    return "(비어있음)";
  },
});
