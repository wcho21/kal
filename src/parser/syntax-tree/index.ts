export type Node = Program | Identifier;
export type Statement = Assignment;
export type Expression = Identifier | NumberNode;

export interface Program {
  type: "program";
  statements: Statement[];
}

export interface Assignment {
  type: "assignment";
  left: Identifier;
  right: Expression;
}

export interface Identifier {
  type: "identifier";
  value: string;
}

export interface NumberNode {
  type: "number node";
  value: number;
}

export const program = (statements: Statement[] = []): Program => ({
  type: "program",
  statements,
});

export const assignment = (left: Identifier, right: Expression): Assignment => ({
  type: "assignment",
  left,
  right,
});

export const identifier = (value: string): Identifier => ({
  type: "identifier",
  value,
});

export const numberNode = (value: number): NumberNode => ({
  type: "number node",
  value,
});
