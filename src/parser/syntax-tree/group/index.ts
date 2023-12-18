import type * as Statement from "../statement";

export type Group = Program;

export interface Program {
  type: "program";
  statements: Statement.Statement[];
}

export const makeProgram = (statements: Program["statements"] = []): Program => ({
  type: "program",
  statements,
});
