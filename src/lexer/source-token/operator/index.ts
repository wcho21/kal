import type { SourceTokenBase, CreateToken } from "./../base";
import { createTokenCreator } from "../base";

export type OperatorValue = ArithmeticOperatorValue | AssignmentOperatorValue | LogicalOperatorValue;
export type ArithmeticOperatorValue = "+" | "-" | "*" | "/";
export type AssignmentOperatorValue = "=";
export type LogicalOperatorValue = "!" | "!=" | "==" | ">" | "<" | ">=" | "<=";

export type OperatorToken = SourceTokenBase<"operator", OperatorValue>;

export const createOperatorToken: CreateToken<OperatorToken> = createTokenCreator<OperatorToken>("operator");
