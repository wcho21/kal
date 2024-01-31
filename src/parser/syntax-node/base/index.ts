import type { Position, Range } from "../../../util/position";
import { copyRange } from "../../../util/position";

export interface SyntaxNodeBase<T extends string> {
  readonly type: T,
  readonly range: Range,
};

type AdditionalFields<T extends string, N extends SyntaxNodeBase<T>> = Omit<N, keyof SyntaxNodeBase<T>>;

export function createNodeCreator<T extends string, N extends SyntaxNodeBase<T>>(type: T) {
  type Node = { type: T, range: Range } & AdditionalFields<T, N>;

  function createNode(fields: AdditionalFields<T, N>, range: Range): Node;
  function createNode(fields: AdditionalFields<T, N>, rangeBegin: Position, rangeEnd: Position): Node;
  function createNode(fields: AdditionalFields<T, N>, arg1: Range | Position, rangeEnd?: Position): Node {
    if (rangeEnd !== undefined) {
      return { type, range: copyRange(arg1 as Position, rangeEnd), ...fields };
    }

    const range = arg1 as Range;
    return { type, range: copyRange(range.begin, range.end), ...fields };
  };

  return createNode;
};

declare function createNode<T extends string, N extends SyntaxNodeBase<T>>(fields: AdditionalFields<T, N>, range: Range): N;
declare function createNode<T extends string, N extends SyntaxNodeBase<T>>(fields: AdditionalFields<T, N>, rangeBegin: Position, rangeEnd: Position): N;
export type CreateNode<T extends string, N extends SyntaxNodeBase<T>> = typeof createNode<T, N>;
