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

export interface IdentifierNode extends SyntaxNodeBase<"identifier"> {
  value: string,
};
export interface NumberNode extends SyntaxNodeBase<"number"> {
  value: number,
};
export interface BooleanNode extends SyntaxNodeBase<"boolean"> {
  value: boolean,
};
export interface StringNode extends SyntaxNodeBase<"string"> {
  value: string,
};
export interface PrefixNode extends SyntaxNodeBase<"prefix"> {
  prefix: Prefix,
  right: ExpressionNode,
};
export interface InfixNode extends SyntaxNodeBase<"infix"> {
  infix: Infix,
  left: ExpressionNode,
  right: ExpressionNode,
};
export interface FunctionNode extends SyntaxNodeBase<"function"> {
  parameters: IdentifierNode[],
  body: BlockNode,
};
export interface CallNode extends SyntaxNodeBase<"call"> {
  func: IdentifierNode | FunctionNode,
  args: ExpressionNode[],
};
export interface AssignmentNode extends SyntaxNodeBase<"assignment"> {
  left: ExpressionNode,
  right: ExpressionNode,
};

export const createIdentifierNode: CreateNode<"identifier", IdentifierNode> = createNodeCreator<"identifier", IdentifierNode>("identifier");
export const createNumberNode: CreateNode<"number", NumberNode> = createNodeCreator<"number", NumberNode>("number");
export const createBooleanNode: CreateNode<"boolean", BooleanNode> = createNodeCreator<"boolean", BooleanNode>("boolean");
export const createStringNode: CreateNode<"string", StringNode> = createNodeCreator<"string", StringNode>("string");
export const createPrefixNode: CreateNode<"prefix", PrefixNode> = createNodeCreator<"prefix", PrefixNode>("prefix");
export const createInfixNode: CreateNode<"infix", InfixNode> = createNodeCreator<"infix", InfixNode>("infix");
export const createFunctionNode: CreateNode<"function", FunctionNode> = createNodeCreator<"function", FunctionNode>("function");
export const createCallNode: CreateNode<"call", CallNode> = createNodeCreator<"call", CallNode>("call");
export const createAssignmentNode: CreateNode<"assignment", AssignmentNode> = createNodeCreator<"assignment", AssignmentNode>("assignment");
