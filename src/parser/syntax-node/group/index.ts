import type { CreateNode, SyntaxNodeBase } from "../base";
import { createNodeCreator } from "../base";
import type { StatementNode } from "../statement";

export type GroupNode = ProgramNode | BlockNode;

/** a root node for a syntax tree of a program */
export interface ProgramNode extends SyntaxNodeBase<"program"> {
  statements: StatementNode[];
}
/** a group of statements */
export interface BlockNode extends SyntaxNodeBase<"block"> {
  statements: StatementNode[];
}

export const createProgramNode: CreateNode<"program", ProgramNode> = createNodeCreator<"program", ProgramNode>(
  "program",
);
export const createBlockNode: CreateNode<"block", BlockNode> = createNodeCreator<"block", BlockNode>("block");
