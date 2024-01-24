import type { GroupNode } from "./group";
import type { StatementNode } from "./statement";
import type { ExpressionNode } from "./expression";

export type SyntaxNode = GroupNode | StatementNode | ExpressionNode;

export * from "./group";
export type * from "./group";
export * from "./statement";
export type * from "./statement";
export * from "./expression";
export type * from "./expression";
