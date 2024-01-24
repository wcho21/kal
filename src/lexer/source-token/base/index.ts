import type Position from "../../../util/position";

export interface Range {
  readonly begin: Position,
  readonly end: Position,
};

export interface SourceTokenBase<T extends string = string, V = unknown> {
  readonly type: T,
  readonly value: V,
  readonly range: Range,
};

/** returns overloaded token creator function */
export function createTokenCreator<T extends SourceTokenBase>(type: T["type"]) {
  // explicitly specify the return type since the overloaded function cannot infer it
  type Token = { type: T["type"], value: T["value"], range: Range };

  function createToken(value: T["value"], range: Range): Token;
  function createToken(value: T["value"], pos1: Position, pos2: Position): Token;
  function createToken(value: T["value"], arg1: Position | Range, pos2?: Position): Token {
    if (pos2 !== undefined) {
      const range = { begin: arg1 as Position, end: pos2 as Position };
      return { type, value, range };
    }

    return { type, value, range: arg1 as { begin: Position, end: Position } };
  };

  return createToken;
};

declare function createToken<T extends SourceTokenBase>(value: T["value"], range: Range): T;
declare function createToken<T extends SourceTokenBase>(value: T["value"], pos1: Position, pos2: Position): T;
export type CreateToken<T extends SourceTokenBase> = typeof createToken<T>;
