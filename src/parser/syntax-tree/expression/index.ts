export type Expression = Identifier | NumberNode | Assignment;

export interface Identifier {
  type: "identifier";
  value: string;
}

export interface NumberNode {
  type: "number node";
  value: number;
}

export interface Assignment {
  type: "assignment";
  left: Identifier;
  right: Expression;
}

export const identifier = (value: Identifier["value"]): Identifier => ({
  type: "identifier",
  value,
});

export const numberNode = (value: NumberNode["value"]): NumberNode => ({
  type: "number node",
  value,
});


export const assignment = (left: Assignment["left"], right: Assignment["right"]): Assignment => ({
  type: "assignment",
  left,
  right,
});
