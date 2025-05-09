import { expect, it } from "bun:test";
import { fakePos1, fakePos2, fakeRange } from "../../../util/position/index.test.fixture";
import type { BlockNode } from "../group";
import {
  createAssignmentNode,
  createCallNode,
  createFunctionNode,
  createIdentifierNode,
  createInfixNode,
  createListNode,
  createTableNode,
  createNumberNode,
  createPrefixNode,
  createStringNode,
} from "./";
import type {
  AssignmentNode,
  CallNode,
  ExpressionNode,
  FunctionNode,
  IdentifierNode,
  InfixNode,
  ListNode,
  NumberNode,
  PrefixNode,
  StringNode,
} from "./";

type Node =
  | AssignmentNode
  | CallNode
  | ExpressionNode
  | FunctionNode
  | IdentifierNode
  | InfixNode
  | ListNode
  | NumberNode
  | PrefixNode
  | StringNode;
type Case = { name: string; node: Node; expected: Node };

const cases: Case[] = [
  {
    name: "identifier",
    node: createIdentifierNode({ value: "foo" }, fakePos1, fakePos2),
    expected: {
      type: "identifier",
      value: "foo",
      range: fakeRange,
    },
  },
  {
    name: "number",
    node: createNumberNode({ value: 42 }, fakePos1, fakePos2),
    expected: {
      type: "number",
      value: 42,
      range: fakeRange,
    },
  },
  {
    name: "string",
    node: createStringNode({ value: "foo" }, fakePos1, fakePos2),
    expected: {
      type: "string",
      value: "foo",
      range: fakeRange,
    },
  },
  {
    name: "prefix",
    node: createPrefixNode({ prefix: "+", right: {} as ExpressionNode }, fakePos1, fakePos2),
    expected: {
      type: "prefix",
      prefix: "+",
      right: {} as ExpressionNode,
      range: fakeRange,
    },
  },
  {
    name: "infix",
    node: createInfixNode({ infix: "+", left: {} as ExpressionNode, right: {} as ExpressionNode }, fakePos1, fakePos2),
    expected: {
      type: "infix",
      infix: "+",
      left: {} as ExpressionNode,
      right: {} as ExpressionNode,
      range: fakeRange,
    },
  },
  {
    name: "function",
    node: createFunctionNode({ parameters: [] as IdentifierNode[], body: {} as BlockNode }, fakePos1, fakePos2),
    expected: {
      type: "function",
      parameters: [],
      body: {} as FunctionNode["body"],
      range: fakeRange,
    },
  },
  {
    name: "call",
    node: createCallNode({ func: {} as IdentifierNode, args: [] as ExpressionNode[] }, fakePos1, fakePos2),
    expected: {
      type: "call",
      func: {} as CallNode["func"],
      args: [] as CallNode["args"],
      range: fakeRange,
    },
  },
  {
    name: "assignment",
    node: createAssignmentNode({ left: {} as IdentifierNode, right: {} as ExpressionNode }, fakePos1, fakePos2),
    expected: {
      type: "assignment",
      left: {} as IdentifierNode,
      right: {} as ExpressionNode,
      range: fakeRange,
    },
  },
  {
    name: "list (empty)",
    node: createListNode({ elements: [] }, fakePos1, fakePos2),
    expected: {
      type: "list",
      elements: [],
      range: fakeRange,
    },
  },
  {
    name: "list (non-empty)",
    node: createListNode({ elements: [{} as ExpressionNode, {} as ExpressionNode] }, fakePos1, fakePos2),
    expected: {
      type: "list",
      elements: [{} as ExpressionNode, {} as ExpressionNode],
      range: fakeRange,
    },
  },
  {
    name: "table (empty)",
    node: createTableNode({ elements: [] }, fakePos1, fakePos2),
    expected: {
      type: "table",
      elements: [],
      range: fakeRange,
    },
  },
  {
    name: "table (non-empty)",
    node: createTableNode({ elements: [[{} as ExpressionNode, {} as ExpressionNode]] }, fakePos1, fakePos2),
    expected: {
      type: "table",
      elements: [[{} as ExpressionNode, {} as ExpressionNode]],
      range: fakeRange,
    },
  },
];

it.each(cases)("create $name node", ({ node, expected }) => {
  expect(node).toEqual(expected);
});
