import type Position from "../../../util/position";
import type { SourceTokenBase } from "./../base";

export type OperatorValue = ArithmeticOperatorValue | AssignmentOperatorValue | LogicalOperatorValue;
export type ArithmeticOperatorValue = "+" | "-" | "*" | "/";
export type AssignmentOperatorValue = "=";
export type LogicalOperatorValue = "!" | "!=" | "==" | ">" | "<" | ">=" | "<=";

export interface OperatorToken extends SourceTokenBase {
  type: "operator",
  value: OperatorValue,
}

type CreateOperatorToken = (value: OperatorValue, posBegin: Position, posEnd: Position) => OperatorToken;
export const createOperatorToken: CreateOperatorToken = (value, posBegin, posEnd) => ({
  type: "operator",
  value,
  posBegin,
  posEnd,
});
