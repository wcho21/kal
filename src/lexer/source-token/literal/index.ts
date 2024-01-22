import type Position from "../../../util/position";
import type { SourceTokenBase } from "./../base";

type BooleanLiteralValue = "참" | "거짓";

export interface NumberLiteralToken extends SourceTokenBase {
  type: "number literal";
  value: string;
}

export interface BooleanLiteralToken extends SourceTokenBase {
  type: "boolean literal";
  value: BooleanLiteralValue;
}

export interface StringLiteralToken extends SourceTokenBase {
  type: "string literal";
  value: string;
}

type CreateNumberLiteralToken = (value: string, posBegin: Position, posEnd: Position) => NumberLiteralToken;
export const createNumberLiteralToken: CreateNumberLiteralToken = (value, posBegin, posEnd) => ({
  type: "number literal",
  value,
  posBegin,
  posEnd,
});

type CreateBooleanLiteralToken = (value: BooleanLiteralValue, posBegin: Position, posEnd: Position) => BooleanLiteralToken;
export const createBooleanLiteralToken: CreateBooleanLiteralToken = (value, posBegin, posEnd) => ({
  type: "boolean literal",
  value,
  posBegin,
  posEnd,
});

type CreateStringLiteralToken = (value: string, posBegin: Position, posEnd: Position) => StringLiteralToken;
export const createStringLiteralToken: CreateStringLiteralToken = (value, posBegin, posEnd) => ({
  type: "string literal",
  value,
  posBegin,
  posEnd,
});
