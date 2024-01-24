import type Position from "../../../util/position";

export interface SyntaxNodeBase<T extends string = string, F extends {} = {}> {
  type: T,
  range: {
    begin: Position,
    end: Position,
  },
  fields: F,
};

export function createNodeCreator<N extends SyntaxNodeBase>(type: N["type"]) {
  function createNode(fields: N["fields"], rangeBegin: Position, rangeEnd: Position) {
    const range = {
      begin: rangeBegin,
      end: rangeEnd,
    };

    return { type, range, fields };
  };

  return createNode;
};

export type CreateNode<N extends SyntaxNodeBase> = (fields: N["fields"], rangeBegin: Position, rangeEnd: Position) => N;
