import type { Statement } from "../statement";

export type Group = Program | Block;

/** a root node for a syntax tree of a program */
export interface Program {
  type: "program";
  statements: Statement[];
}

/** a group of statements */
export interface Block {
  type: "block";
  statements: Statement[];
}

export const makeProgram = (statements: Program["statements"] = []): Program => ({
  type: "program",
  statements,
});

export const makeBlock = (statements: Block["statements"] = []): Block => ({
  type: "block",
  statements,
});
