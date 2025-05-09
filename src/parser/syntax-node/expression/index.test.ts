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
  createNumberNode,
  createPrefixNode,
  createStringNode,
  createTableNode,
} from "./";
import type { AssignmentNode, CallNode, ExpressionNode, FunctionNode, IdentifierNode } from "./";

type Node = AssignmentNode | ExpressionNode | CallNode;
type Case = { name: string; node: Node; expected: Node };

const fakeExprNode = {} as ExpressionNode;
const fakeIdentifierNode = {} as IdentifierNode;
const fakeIdentifierNodes = [] as IdentifierNode[];
const fakeBlockNode = {} as BlockNode;

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
    node: createPrefixNode({ prefix: "+", right: fakeExprNode }, fakePos1, fakePos2),
    expected: {
      type: "prefix",
      prefix: "+",
      right: fakeExprNode,
      range: fakeRange,
    },
  },
  {
    name: "infix",
    node: createInfixNode({ infix: "+", left: fakeExprNode, right: fakeExprNode }, fakePos1, fakePos2),
    expected: {
      type: "infix",
      infix: "+",
      left: fakeExprNode,
      right: fakeExprNode,
      range: fakeRange,
    },
  },
  {
    name: "function",
    node: createFunctionNode({ parameters: fakeIdentifierNodes, body: fakeBlockNode }, fakePos1, fakePos2),
    expected: {
      type: "function",
      parameters: fakeIdentifierNodes,
      body: {} as FunctionNode["body"],
      range: fakeRange,
    },
  },
  {
    name: "call",
    node: createCallNode({ func: fakeIdentifierNode, args: fakeIdentifierNodes }, fakePos1, fakePos2),
    expected: {
      type: "call",
      func: fakeIdentifierNode,
      args: fakeIdentifierNodes,
      range: fakeRange,
    },
  },
  {
    name: "assignment",
    node: createAssignmentNode({ left: fakeExprNode, right: fakeExprNode }, fakePos1, fakePos2),
    expected: {
      type: "assignment",
      left: fakeExprNode,
      right: fakeExprNode,
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
    node: createListNode({ elements: [fakeExprNode, fakeExprNode] }, fakePos1, fakePos2),
    expected: {
      type: "list",
      elements: [fakeExprNode, fakeExprNode],
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
    node: createTableNode({ elements: [[fakeExprNode, fakeExprNode]] }, fakePos1, fakePos2),
    expected: {
      type: "table",
      elements: [[fakeExprNode, fakeExprNode]],
      range: fakeRange,
    },
  },
];

it.each(cases)("create $name node", ({ node, expected }) => {
  expect(node).toEqual(expected);
});
