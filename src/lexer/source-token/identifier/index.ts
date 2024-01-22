import type Position from "../../../util/position";
import type { SourceTokenBase } from "./../base";

type KeywordValue = BranchKeywordValue | FunctionKeywordValue | ReturnKeywordValue;
type BranchKeywordValue = "만약" | "아니면";
type FunctionKeywordValue = "함수";
type ReturnKeywordValue = "결과";

export interface IdentifierToken extends SourceTokenBase {
  type: "identifier";
  value: string;
}

export interface KeywordToken extends SourceTokenBase {
  type: "keyword";
  value: KeywordValue;
}

type CreateIdentifierToken = (value: string, posBegin: Position, posEnd: Position) => IdentifierToken;
export const createIdentifierToken: CreateIdentifierToken = (value, posBegin, posEnd) => ({
  type: "identifier",
  value,
  posBegin,
  posEnd,
});

type CreateKeywordToken = (value: KeywordValue, posBegin: Position, posEnd: Position) => KeywordToken;
export const createKeywordToken: CreateKeywordToken = (value, posBegin, posEnd) => ({
  type: "keyword",
  value,
  posBegin,
  posEnd,
});
