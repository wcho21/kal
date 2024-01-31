import type { SourceTokenBase, CreateToken } from "./../base";
import { createTokenCreator } from "../base";

export type BooleanLiteralValue = "참" | "거짓";

export type NumberLiteralToken = SourceTokenBase<"number literal", string>;
export type BooleanLiteralToken = SourceTokenBase<"boolean literal", BooleanLiteralValue>;
export type StringLiteralToken = SourceTokenBase<"string literal", string>;

export const createNumberLiteralToken: CreateToken<NumberLiteralToken> = createTokenCreator<NumberLiteralToken>("number literal");
export const createBooleanLiteralToken: CreateToken<BooleanLiteralToken> = createTokenCreator<BooleanLiteralToken>("boolean literal");
export const createStringLiteralToken: CreateToken<StringLiteralToken> = createTokenCreator<StringLiteralToken>("string literal");
