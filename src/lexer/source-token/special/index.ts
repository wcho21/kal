import type Position from "../../../util/position";
import type { SourceTokenBase } from "./../base";

export const END_VALUE = "$end"; // unreadable character '$' used to avoid other token values
type EndValue = typeof END_VALUE;

export interface IllegalToken extends SourceTokenBase {
  type: "illegal";
  value: string;
}

export interface IllegalStringLiteralToken extends SourceTokenBase {
  type: "illegal string";
  value: string;
}

export interface EndToken extends SourceTokenBase {
  type: "end";
  value: EndValue
}

type CreateIllegalToken = (value: string, posBegin: Position, posEnd: Position) => IllegalToken;
export const createIllegalToken: CreateIllegalToken = (value, posBegin, posEnd) => ({
  type: "illegal",
  value,
  posBegin,
  posEnd,
});

type CreateIllegalStringLiteralToken = (value: string, posBegin: Position, posEnd: Position) => IllegalStringLiteralToken;
export const createIllegalStringLiteralToken: CreateIllegalStringLiteralToken = (value, posBegin, posEnd) => ({
  type: "illegal string",
  value,
  posBegin,
  posEnd,
});

type CreateEndToken = (posBegin: Position, posEnd: Position) => EndToken;
export const createEndToken: CreateEndToken = (posBegin, posEnd) => ({
  type: "end",
  value: END_VALUE,
  posBegin,
  posEnd,
});
