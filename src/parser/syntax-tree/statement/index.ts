import type * as Expression from "../expression";

export type Statement = Assignment;

/** An assignment statement where the assignment operator ('=') is used */
export interface Assignment {
  type: "assignment";
  left: Expression.Identifier;
  right: Expression.Expression;
}

/** A wrapper type to treat a single expression as a statement. */
export interface ExpressionStatement {
  type: "expression statement";
  expression: Expression.Expression;
}

export const assignment = (left: Assignment["left"], right: Assignment["right"]): Assignment => ({
  type: "assignment",
  left,
  right,
});

export const expressionStatement = (expression: ExpressionStatement["expression"]): ExpressionStatement => ({
  type: "expression statement",
  expression,
});
