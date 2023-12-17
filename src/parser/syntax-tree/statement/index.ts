import type * as Expression from "../expression";

export type Statement = Assignment;

export interface Assignment {
  type: "assignment";
  left: Expression.Identifier;
  right: Expression.Expression;
}

export const assignment = (left: Assignment["left"], right: Assignment["right"]): Assignment => ({
  type: "assignment",
  left,
  right,
});
