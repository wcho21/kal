import type Position from "../../../util/position";
import type { SourceTokenBase } from "./../base";

export type GroupDelimiterValue = "(" | ")";
export type BlockDelimiterValue = "{" | "}";
export type SeparatorValue = ",";

export interface GroupDelimiterToken extends SourceTokenBase {
  type: "group delimiter";
  value: GroupDelimiterValue;
}

export interface BlockDelimiterToken extends SourceTokenBase {
  type: "block delimiter";
  value: BlockDelimiterValue;
}

export interface SeparatorToken extends SourceTokenBase {
  type: "separator",
  value: SeparatorValue;
}

type CreateGroupDelimiterToken = (value: GroupDelimiterValue, posBegin: Position, posEnd: Position) => GroupDelimiterToken;
export const createGroupDelimiterToken: CreateGroupDelimiterToken = (value, posBegin, posEnd) => ({
  type: "group delimiter",
  value,
  posBegin,
  posEnd,
});

type CreateBlockDelimiterToken = (value: BlockDelimiterValue, posBegin: Position, posEnd: Position) => BlockDelimiterToken;
export const createBlockDelimiterToken: CreateBlockDelimiterToken = (value, posBegin, posEnd) => ({
  type: "block delimiter",
  value,
  posBegin,
  posEnd,
});

type CreateSeparatorToken = (value: SeparatorValue, posBegin: Position, posEnd: Position) => SeparatorToken;
export const createSeparatorToken: CreateSeparatorToken = (value, posBegin, posEnd) => ({
  type: "separator",
  value,
  posBegin,
  posEnd,
});
