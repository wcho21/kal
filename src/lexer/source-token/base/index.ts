import type Position from "../../../util/position";

export interface SourceTokenBase {
  type: string,
  value: string,
  posBegin: Position,
  posEnd: Position,
};
