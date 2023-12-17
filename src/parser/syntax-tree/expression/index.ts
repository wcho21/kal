export type Expression = Identifier | NumberNode;

export interface Identifier {
  type: "identifier";
  value: string;
}

export interface NumberNode {
  type: "number node";
  value: number;
}

export const identifier = (value: Identifier["value"]): Identifier => ({
  type: "identifier",
  value,
});

export const numberNode = (value: NumberNode["value"]): NumberNode => ({
  type: "number node",
  value,
});
