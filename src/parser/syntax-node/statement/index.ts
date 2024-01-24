import type { SyntaxNodeBase, CreateNode } from "../base";
import { createNodeCreator } from "../base";
import type { BlockNode } from "../group";
import type { ExpressionNode } from "../expression";

export type StatementNode = BranchNode | ReturnNode | ExpressionStatementNode;

export interface BranchNode extends SyntaxNodeBase<"branch", { predicate: ExpressionNode, consequence: BlockNode, alternative?: BlockNode }> {};
export interface ReturnNode extends SyntaxNodeBase<"return", { expression: ExpressionNode }> {};
/** A wrapper type to treat a single expression as a statement. */
export interface ExpressionStatementNode extends SyntaxNodeBase<"expression statement", { expression: ExpressionNode }> {};

export const createBranchNode: CreateNode<BranchNode> = createNodeCreator<BranchNode>("branch");
export const createReturnNode: CreateNode<ReturnNode> = createNodeCreator<ReturnNode>("return");
export const createExpressionStatementNode: CreateNode<ExpressionStatementNode> = createNodeCreator<ExpressionStatementNode>("expression statement");
