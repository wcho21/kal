import type { FunctionNode } from "../../parser";
import { type Range, copyRange } from "../../util/position";
import type Environment from "../environment";

export interface ValueBase<T extends string = string> {
  readonly type: T;
  readonly representation: string;
  readonly range: Range;
}

export type Value = PrimitiveValue | EmptyValue | BuiltinFunctionValue | ListValue;
export type PrimitiveValue = NumberValue | StringValue | BooleanValue | FunctionValue;
export type ListableValue = PrimitiveValue | ListValue;

export interface NumberValue extends ValueBase<"number"> {
  readonly value: number;
}
export interface StringValue extends ValueBase<"string"> {
  readonly value: string;
}
export interface BooleanValue extends ValueBase<"boolean"> {
  readonly value: boolean;
}
export interface FunctionValue extends ValueBase<"function"> {
  readonly parameters: FunctionNode["parameters"];
  readonly body: FunctionNode["body"];
  readonly environment: Environment;
}

export interface ListValue extends ValueBase<"list"> {
  readonly elements: ListableValue[];
}

export interface EmptyValue extends ValueBase<"empty"> {
  readonly value: null;
}
export interface BuiltinFunctionValue extends ValueBase<"builtin function"> {
  readonly body: (args: Value[], onStdout?: (toWrite: string) => void) => Value;
}

export interface ReturnValue {
  readonly type: "return";
  readonly value: Value;
}

const createValueCreator = <T extends string, V extends ValueBase<T>>(type: T) => {
  return (fields: Omit<V, keyof ValueBase<T>>, representation: string, range: Range) => ({
    type,
    range: copyRange(range.begin, range.end),
    representation,
    ...fields,
  });
};
type CreateValue<T extends string, V extends ValueBase<T>> = (
  fields: Omit<V, keyof ValueBase<T>>,
  representation: string,
  range: Range,
) => V;

export const createNumberValue: CreateValue<"number", NumberValue> = createValueCreator<"number", NumberValue>(
  "number",
);
export const createBooleanValue: CreateValue<"boolean", BooleanValue> = createValueCreator<"boolean", BooleanValue>(
  "boolean",
);
export const createStringValue: CreateValue<"string", StringValue> = createValueCreator<"string", StringValue>(
  "string",
);
export const createEmptyValue: CreateValue<"empty", EmptyValue> = createValueCreator<"empty", EmptyValue>("empty");
export const createFunctionValue: CreateValue<"function", FunctionValue> = createValueCreator<
  "function",
  FunctionValue
>("function");
export const createListValue: CreateValue<"list", ListValue> = createValueCreator<"list", ListValue>("list");
export const createBuiltinFunctionValue: CreateValue<"builtin function", BuiltinFunctionValue> = createValueCreator<
  "builtin function",
  BuiltinFunctionValue
>("builtin function");
export const createReturnValue = (value: Value): ReturnValue => ({
  type: "return",
  value,
});
