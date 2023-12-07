import type { TokenType } from "./types";

export interface Token {
  type: TokenType,
  value: string,
}

export type { TokenType };
export * as types from "./types";
