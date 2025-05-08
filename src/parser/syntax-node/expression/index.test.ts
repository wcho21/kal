import type { BlockNode } from "../group";
import { fakePos } from "../testing/fixtures";
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
} from "./";
import type { ExpressionNode, IdentifierNode } from "./";

const cases = [
  {
    name: "identifier",
    node: createIdentifierNode({ value: "foo" }, fakePos, fakePos),
    expected: {
      type: "identifier",
      value: "foo",
      range: { begin: fakePos, end: fakePos },
    },
  },
  {
    name: "number",
    node: createNumberNode({ value: 42 }, fakePos, fakePos),
    expected: {
      type: "number",
      value: 42,
      range: { begin: fakePos, end: fakePos },
    },
  },
  {
    name: "string",
    node: createStringNode({ value: "foo" }, fakePos, fakePos),
    expected: {
      type: "string",
      value: "foo",
      range: { begin: fakePos, end: fakePos },
    },
  },
  {
    name: "prefix",
    node: createPrefixNode({ prefix: "+", right: {} as ExpressionNode }, fakePos, fakePos),
    expected: {
      type: "prefix",
      prefix: "+",
      right: {},
      range: { begin: fakePos, end: fakePos },
    },
  },
  {
    name: "infix",
    node: createInfixNode({ infix: "+", left: {} as ExpressionNode, right: {} as ExpressionNode }, fakePos, fakePos),
    expected: {
      type: "infix",
      infix: "+",
      left: {},
      right: {},
      range: { begin: fakePos, end: fakePos },
    },
  },
  {
    name: "function",
    node: createFunctionNode({ parameters: [] as IdentifierNode[], body: {} as BlockNode }, fakePos, fakePos),
    expected: {
      type: "function",
      parameters: [],
      body: {},
      range: { begin: fakePos, end: fakePos },
    },
  },
  {
    name: "call",
    node: createCallNode({ func: {} as IdentifierNode, args: [] as ExpressionNode[] }, fakePos, fakePos),
    expected: {
      type: "call",
      func: {},
      args: [],
      range: { begin: fakePos, end: fakePos },
    },
  },
  {
    name: "assignment",
    node: createAssignmentNode({ left: {} as IdentifierNode, right: {} as ExpressionNode }, fakePos, fakePos),
    expected: {
      type: "assignment",
      left: {},
      right: {},
      range: { begin: fakePos, end: fakePos },
    },
  },
  {
    name: "list (empty)",
    node: createListNode({ elements: [] }, fakePos, fakePos),
    expected: {
      type: "list",
      elements: [],
      range: { begin: fakePos, end: fakePos },
    },
  },
  {
    name: "list (non-empty)",
    node: createListNode({ elements: [{} as ExpressionNode, {} as ExpressionNode] }, fakePos, fakePos),
    expected: {
      type: "list",
      elements: [{}, {}],
      range: { begin: fakePos, end: fakePos },
    },
  },
];

it.each(cases)("create $name node", ({ node, expected }) => {
  expect(node).toEqual(expected);
});
