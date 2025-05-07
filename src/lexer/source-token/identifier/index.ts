import { createTokenCreator } from "../base";
import type { CreateToken, SourceTokenBase } from "./../base";

export type KeywordValue = BranchKeywordValue | FunctionKeywordValue | ReturnKeywordValue;
export type BranchKeywordValue = "만약" | "아니면";
export type FunctionKeywordValue = "함수";
export type ReturnKeywordValue = "결과";

export type IdentifierToken = SourceTokenBase<"identifier", string>;
export type KeywordToken = SourceTokenBase<"keyword", KeywordValue>;

export const createIdentifierToken: CreateToken<IdentifierToken> = createTokenCreator<IdentifierToken>("identifier");
export const createKeywordToken: CreateToken<KeywordToken> = createTokenCreator<KeywordToken>("keyword");
