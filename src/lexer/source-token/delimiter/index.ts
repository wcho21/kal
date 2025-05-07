import { createTokenCreator } from "../base";
import type { CreateToken, SourceTokenBase } from "./../base";

export type GroupDelimiterValue = "(" | ")";
export type BlockDelimiterValue = "{" | "}";
export type SeparatorValue = ",";

export type GroupDelimiterToken = SourceTokenBase<"group delimiter", GroupDelimiterValue>;
export type BlockDelimiterToken = SourceTokenBase<"block delimiter", BlockDelimiterValue>;
export type SeparatorToken = SourceTokenBase<"separator", SeparatorValue>;

export const createGroupDelimiterToken: CreateToken<GroupDelimiterToken> =
  createTokenCreator<GroupDelimiterToken>("group delimiter");
export const createBlockDelimiterToken: CreateToken<BlockDelimiterToken> =
  createTokenCreator<BlockDelimiterToken>("block delimiter");
export const createSeparatorToken: CreateToken<SeparatorToken> = createTokenCreator<SeparatorToken>("separator");
