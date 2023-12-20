import type { Block } from "../group";
import type { Expression } from "../expression";

export type Statement =
  BranchStatement |
  ExpressionStatement;

export interface BranchStatement {
  type: "branch statement";
  predicate: Expression;
  consequence: Block;
}

/** A wrapper type to treat a single expression as a statement. */
export interface ExpressionStatement {
  type: "expression statement";
  expression: Expression;
}

export const makeBranchStatement = (predicate: BranchStatement["predicate"], consequence: BranchStatement["consequence"]): BranchStatement => ({
  type: "branch statement",
  predicate,
  consequence,
});

export const makeExpressionStatement = (expression: ExpressionStatement["expression"]): ExpressionStatement => ({
  type: "expression statement",
  expression,
});
