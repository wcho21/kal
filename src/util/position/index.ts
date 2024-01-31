export interface Position {
  readonly row: number,
  readonly col: number,
}

export interface Range {
  readonly begin: Position,
  readonly end: Position,
}

export const copyPosition = (pos: Position, offset?: Position) => {
  const row = pos.row + (offset?.row ?? 0);
  const col = pos.col + (offset?.col ?? 0);

  return { row, col };
}

export const copyRange = (begin: Position, end: Position, offset?: Range) => {
  const copiedBegin = copyPosition(begin, offset?.begin);
  const copiedEnd = copyPosition(end, offset?.end);

  return { begin: copiedBegin, end: copiedEnd };
}
