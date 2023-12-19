export type Expression =
  Identifier |
  NumberNode |
  BooleanNode |
  PrefixExpression |
  InfixExpression |
  Assignment;

export interface Identifier {
  type: "identifier";
  value: string;
}

export interface NumberNode {
  type: "number node";
  value: number;
}

export interface BooleanNode {
  type: "boolean node";
  value: boolean;
}

export interface PrefixExpression {
  type: "prefix expression";
  prefix: "+" | "-";
  expression: Expression;
}

export interface InfixExpression {
  type: "infix expression";
  infix: "+" | "-" | "*" | "/" | "=";
  left: Expression;
  right: Expression;
}

export interface Assignment {
  type: "assignment";
  left: Identifier;
  right: Expression;
}

export const makeIdentifier = (value: Identifier["value"]): Identifier => ({
  type: "identifier",
  value,
});

export const makeNumberNode = (value: NumberNode["value"]): NumberNode => ({
  type: "number node",
  value,
});

export const makeBooleanNode = (value: BooleanNode["value"]): BooleanNode => ({
  type: "boolean node",
  value,
});

export const makePrefixExpression = (prefix: PrefixExpression["prefix"], expression: PrefixExpression["expression"]): PrefixExpression => ({
  type: "prefix expression",
  prefix,
  expression,
});

export const makeInfixExpression = (infix: InfixExpression["infix"], left: InfixExpression["left"], right: InfixExpression["right"]): InfixExpression => ({
  type: "infix expression",
  infix,
  left,
  right,
});

export const makeAssignment = (left: Assignment["left"], right: Assignment["right"]): Assignment => ({
  type: "assignment",
  left,
  right,
});
