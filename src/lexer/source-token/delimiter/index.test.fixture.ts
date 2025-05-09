import type { Position, Range } from "../../../util/position";

// fake positions with random rows and cols
export const fakePos1: Position = { row: 42, col: 99 };
export const fakePos2: Position = { row: 11, col: 22 };
export const fakeRange: Range = { begin: fakePos1, end: fakePos2 };
