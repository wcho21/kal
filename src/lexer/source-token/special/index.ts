import type { SourceTokenBase, CreateToken } from "./../base";
import { createTokenCreator } from "../base";

export const END_VALUE = "$end"; // unreadable character '$' used to avoid other token values
type EndValue = typeof END_VALUE;

export type IllegalToken = SourceTokenBase<"illegal", string>;
export type IllegalStringLiteralToken = SourceTokenBase<"illegal string", string>;
export type EndToken = SourceTokenBase<"end", EndValue>;

export const createIllegalToken: CreateToken<IllegalToken> = createTokenCreator<IllegalToken>("illegal");
export const createIllegalStringLiteralToken: CreateToken<IllegalStringLiteralToken> = createTokenCreator<IllegalStringLiteralToken>("illegal string");
export const createEndToken: CreateToken<EndToken> = createTokenCreator<EndToken>("end");
