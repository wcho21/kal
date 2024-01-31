import type Position from "../../../util/position";

export interface Range {
  readonly begin: Position,
  readonly end: Position,
};

export interface SyntaxNodeBase<T extends string = string, F extends {} = {}> {
  readonly type: T,
  readonly range: Range,
  readonly fields: F,
};

export function createNodeCreator<N extends SyntaxNodeBase>(type: N["type"]) {
  type Node = { type: N["type"], range: N["range"], fields: N["fields"] };

  function createNode(fields: N["fields"], range: Range): Node;
  function createNode(fields: N["fields"], rangeBegin: Position, rangeEnd: Position): Node;
  function createNode(fields: N["fields"], arg1: Range | Position, rangeEnd?: Position): Node {
    if (rangeEnd !== undefined) {
      const range = {
        begin: arg1 as Position,
        end: rangeEnd,
      };

      return { type, range, fields };
    }

    return { type, range: arg1 as Range, fields };
  };

  return createNode;
};

declare function createNode<N extends SyntaxNodeBase>(fields: N["fields"], range: Range): N;
declare function createNode<N extends SyntaxNodeBase>(fields: N["fields"], rangeBegin: Position, rangeEnd: Position): N;
export type CreateNode<N extends SyntaxNodeBase> = typeof createNode<N>;
