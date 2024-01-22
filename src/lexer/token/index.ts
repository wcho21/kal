export type TokenType =
  Operator |
  Identifier |
  NumberLiteral |
  BooleanLiteral |
  StringLiteral |
  GroupDelimiter |
  BlockDelimiter |
  Separator |
  Keyword |
  Illegal |
  End;

export const END_VALUE = "$end"; // unreadable character '$' used to avoid other token values

type OperatorValue = ArithmeticOperatorValue | AssignmentOperatorValue | LogicalOperatorValue;
type ArithmeticOperatorValue = "+" | "-" | "*" | "/";
type AssignmentOperatorValue = "=";
type LogicalOperatorValue = "!" | "!=" | "==" | ">" | "<" | ">=" | "<=";
type BooleanLiteralValue = "참" | "거짓";
type GroupDelimiterValue = "(" | ")";
type BlockDelimiterValue = "{" | "}";
type SeparatorValue = ",";
type KeywordValue = BranchKeywordValue | FunctionKeywordValue | ReturnKeywordValue;
type BranchKeywordValue = "만약" | "아니면";
type FunctionKeywordValue = "함수";
type ReturnKeywordValue = "결과";
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

export interface BlockDelimiter {
  type: "block delimiter";
  value: BlockDelimiterValue;
}

export interface Separator {
  type: "separator",
  value: SeparatorValue;
}

export interface Keyword {
  type: "keyword";
  value: KeywordValue;
}

export interface Illegal {
  type: "illegal";
  value: string;
}

export interface End {
  type: "end";
  value: EndValue
}

/** @deprecated */
export const operator = (value: Operator["value"]): Operator => ({
  type: "operator",
  value,
});

/** @deprecated */
export const identifier = (value: Identifier["value"]): Identifier => ({
  type: "identifier",
  value,
});

/** @deprecated */
export const numberLiteral = (value: NumberLiteral["value"]): NumberLiteral => ({
  type: "number literal",
  value,
});

/** @deprecated */
export const booleanLiteral = (value: BooleanLiteral["value"]): BooleanLiteral => ({
  type: "boolean literal",
  value,
});

/** @deprecated */
export const stringLiteral = (value: StringLiteral["value"]): StringLiteral => ({
  type: "string literal",
  value,
});

/** @deprecated */
export const groupDelimiter = (value: GroupDelimiter["value"]): GroupDelimiter => ({
  type: "group delimiter",
  value,
});

/** @deprecated */
export const blockDelimiter = (value: BlockDelimiter["value"]): BlockDelimiter => ({
  type: "block delimiter",
  value,
});

/** @deprecated */
export const separator = (value: Separator["value"]): Separator => ({
  type: "separator",
  value,
});

/** @deprecated */
export const keyword = (value: Keyword["value"]): Keyword => ({
  type: "keyword",
  value,
});

/** @deprecated */
export const illegal = (value: Illegal["value"]): Illegal => ({
  type: "illegal",
  value,
});

export const end: End = { type: "end", value: END_VALUE };
