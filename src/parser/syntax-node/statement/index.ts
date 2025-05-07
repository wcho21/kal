import type { CreateNode, SyntaxNodeBase } from "../base";
import { createNodeCreator } from "../base";
import type { ExpressionNode } from "../expression";
import type { BlockNode } from "../group";

export type StatementNode = BranchNode | ReturnNode | ExpressionStatementNode;

export interface BranchNode extends SyntaxNodeBase<"branch"> {
  predicate: ExpressionNode;
  consequence: BlockNode;
  alternative?: BlockNode;
}
export interface ReturnNode extends SyntaxNodeBase<"return"> {
  expression: ExpressionNode;
}
/** A wrapper type to treat a single expression as a statement. */
export interface ExpressionStatementNode extends SyntaxNodeBase<"expression statement"> {
  expression: ExpressionNode;
}

export const createBranchNode: CreateNode<"branch", BranchNode> = createNodeCreator<"branch", BranchNode>("branch");
export const createReturnNode: CreateNode<"return", ReturnNode> = createNodeCreator<"return", ReturnNode>("return");
export const createExpressionStatementNode: CreateNode<"expression statement", ExpressionStatementNode> =
  createNodeCreator<"expression statement", ExpressionStatementNode>("expression statement");
