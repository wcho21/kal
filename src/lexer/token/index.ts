export type TokenType =
  Operator |
  Identifier |
  NumberLiteral |
  BooleanLiteral |
  StringLiteral |
  GroupDelimiter |
  Illegal |
  End;

export interface Operator {
  type: "operator";
  value: "+" | "-" | "*" | "/" | "=" | "!=" | "==" | ">" | "<" | ">=" | "<=";
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
  value: "참" | "거짓";
}

export interface StringLiteral {
  type: "string literal";
  value: string;
}

export interface GroupDelimiter {
  type: "group delimiter";
  value: "(" | ")";
}

export interface Illegal {
  type: "illegal";
  value: string;
}

export interface End {
  type: "end";
  value: "$end";
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

export const end: End = {
  type: "end",
  value: "$end", // unreadable character '$' used to avoid `identifer` value
};
