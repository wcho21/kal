import type * as Expression from "../expression";

export type Statement = ExpressionStatement;

/** A wrapper type to treat a single expression as a statement. */
export interface ExpressionStatement {
  type: "expression statement";
  expression: Expression.Expression;
}

export const expressionStatement = (expression: ExpressionStatement["expression"]): ExpressionStatement => ({
  type: "expression statement",
  expression,
});
