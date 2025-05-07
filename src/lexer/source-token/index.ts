import type { BlockDelimiterToken, GroupDelimiterToken, SeparatorToken } from "./delimiter";
import type { IdentifierToken, KeywordToken } from "./identifier";
import type { BooleanLiteralToken, NumberLiteralToken, StringLiteralToken } from "./literal";
import type { OperatorToken } from "./operator";
import type { EndToken, IllegalStringLiteralToken, IllegalToken } from "./special";

export type SourceToken =
  | OperatorToken
  | IdentifierToken
  | KeywordToken
  | NumberLiteralToken
  | BooleanLiteralToken
  | StringLiteralToken
  | GroupDelimiterToken
  | BlockDelimiterToken
  | SeparatorToken
  | IllegalToken
  | IllegalStringLiteralToken
  | EndToken;

export * from "./operator";
export type * from "./operator";
export * from "./identifier";
export type * from "./identifier";
export * from "./literal";
export type * from "./literal";
export * from "./delimiter";
export type * from "./delimiter";
export * from "./special";
export type * from "./special";
