export type TokenType = Operator | Identifier | NumberLiteral | End;

export interface Operator {
  type: "operator";
  value: "+" | "-" | "*" | "/" | "=";
}

export interface Identifier {
  type: "identifier";
  value: string;
}

export interface NumberLiteral {
  type: "number literal";
  value: string;
}

export interface Illegal {
  type: "illegal";
  value: string;
}

export interface End {
  type: "end";
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

export const illegal = (value: Illegal["value"]): Illegal => ({
  type: "illegal",
  value,
});

export const end: End = {
  type: "end",
};
