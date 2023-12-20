import type { Block } from "../group";
import type { Expression } from "../expression";

export type Statement =
  BranchStatement |
  ExpressionStatement;

export interface BranchStatement {
  type: "branch statement";
  predicate: Expression;
  consequence: Block;
  alternative?: Block;
}

/** A wrapper type to treat a single expression as a statement. */
export interface ExpressionStatement {
  type: "expression statement";
  expression: Expression;
}

type MakeBranchStatement = (
  predicate: BranchStatement["predicate"],
  consequence: BranchStatement["consequence"],
  alternative?: BranchStatement["alternative"]
) => BranchStatement;
export const makeBranchStatement: MakeBranchStatement = (predicate, consequence, alternative) => ({
  type: "branch statement",
  predicate,
  consequence,
  alternative,
});

export const makeExpressionStatement = (expression: ExpressionStatement["expression"]): ExpressionStatement => ({
  type: "expression statement",
  expression,
});
