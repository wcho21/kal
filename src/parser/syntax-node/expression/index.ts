import type { SyntaxNodeBase, CreateNode } from "../base";
import { createNodeCreator } from "../base";
import type { BlockNode } from "../group";

export type Prefix = "+" | "-" | "!";
export type Infix = "+" | "-" | "*" | "/" | "=" | "==" | "!=" | ">" | "<" | ">=" | "<=";

export type ExpressionNode = IdentifierNode
  | NumberNode
  | BooleanNode
  | StringNode
  | PrefixNode
  | InfixNode
  | FunctionNode
  | CallNode
  | AssignmentNode;

export interface IdentifierNode extends SyntaxNodeBase<"identifier", { value: string }> {};
export interface NumberNode extends SyntaxNodeBase<"number", { value: number }> {};
export interface BooleanNode extends SyntaxNodeBase<"boolean", { value: boolean }> {};
export interface StringNode extends SyntaxNodeBase<"string", { value: string }> {};
export interface PrefixNode extends SyntaxNodeBase<"prefix", { prefix: Prefix, right: ExpressionNode }> {};
export interface InfixNode extends SyntaxNodeBase<"infix", { infix: Infix, left: ExpressionNode, right: ExpressionNode }> {};
export interface FunctionNode extends SyntaxNodeBase<"function", { parameters: IdentifierNode[], body: BlockNode }> {};
export interface CallNode extends SyntaxNodeBase<"call", { func: IdentifierNode | FunctionNode, args: ExpressionNode[] }> {};
export interface AssignmentNode extends SyntaxNodeBase<"assignment", { left: IdentifierNode, right: ExpressionNode }> {};

export const createIdentifierNode: CreateNode<IdentifierNode> = createNodeCreator<IdentifierNode>("identifier");
export const createNumberNode: CreateNode<NumberNode> = createNodeCreator<NumberNode>("number");
export const createBooleanNode: CreateNode<BooleanNode> = createNodeCreator<BooleanNode>("boolean");
export const createStringNode: CreateNode<StringNode> = createNodeCreator<StringNode>("string");
export const createPrefixNode: CreateNode<PrefixNode> = createNodeCreator<PrefixNode>("prefix");
export const createInfixNode: CreateNode<InfixNode> = createNodeCreator<InfixNode>("infix");
export const createFunctionNode: CreateNode<FunctionNode> = createNodeCreator<FunctionNode>("function");
export const createCallNode: CreateNode<CallNode> = createNodeCreator<CallNode>("call");
export const createAssignmentNode: CreateNode<AssignmentNode> = createNodeCreator<AssignmentNode>("assignment");
