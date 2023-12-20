export type TokenType =
  Operator |
  Identifier |
  NumberLiteral |
  BooleanLiteral |
  StringLiteral |
  GroupDelimiter |
  Illegal |
  End;

export const END_VALUE = "$end"; // unreadable character '$' used to avoid other token values

type OperatorValue = ArithmeticOperatorValue | AssignmentOperatorValue | LogicalOperatorValue;
type ArithmeticOperatorValue = "+" | "-" | "*" | "/";
type AssignmentOperatorValue = "=";
type LogicalOperatorValue = "!" | "!=" | "==" | ">" | "<" | ">=" | "<=";
type BooleanLiteralValue = "참" | "거짓";
type GroupDelimiterValue = "(" | ")";
type EndValue = typeof END_VALUE;

export interface Operator {
  type: "operator";
  value: OperatorValue;
}

export interface Identifier {
  type: "identifier";
  value: string;
}

export interface NumberLiteral {
  type: "number literal";
  value: string;
}

export interface BooleanLiteral {
  type: "boolean literal";
  value: BooleanLiteralValue;
}

export interface StringLiteral {
  type: "string literal";
  value: string;
}

export interface GroupDelimiter {
  type: "group delimiter";
  value: GroupDelimiterValue;
}

export interface Illegal {
  type: "illegal";
  value: string;
}

export interface End {
  type: "end";
  value: EndValue
}

export const operator = (value: Operator["value"]): Operator => ({
  type: "operator",
  value,
});

export const identifier = (value: Identifier["value"]): Identifier => ({
  type: "identifier",
  value,
});

export const numberLiteral = (value: NumberLiteral["value"]): NumberLiteral => ({
  type: "number literal",
  value,
});

export const booleanLiteral = (value: BooleanLiteral["value"]): BooleanLiteral => ({
  type: "boolean literal",
  value,
});

export const stringLiteral = (value: StringLiteral["value"]): StringLiteral => ({
  type: "string literal",
  value,
});

export const groupDelimiter = (value: GroupDelimiter["value"]): GroupDelimiter => ({
  type: "group delimiter",
  value,
});

export const illegal = (value: Illegal["value"]): Illegal => ({
  type: "illegal",
  value,
});

export const end: End = { type: "end", value: END_VALUE };
