import { expect, it } from "bun:test";
import type { ExpressionNode } from "../expression";
import type { BlockNode } from "../group";
import { fakePos } from "../testing/fixtures";
import { createBranchNode, createExpressionStatementNode, createReturnNode } from "./";
import type { BranchNode, ExpressionStatementNode, ReturnNode } from "./";

type Node = BranchNode | ExpressionStatementNode | ReturnNode;
type Case = { name: string; node: Node; expected: Node };

const cases: Case[] = [
  {
    name: "branch",
    node: createBranchNode({ predicate: {} as ExpressionNode, consequence: {} as BlockNode }, fakePos, fakePos),
    expected: {
      type: "branch",
      predicate: {} as ExpressionNode,
      consequence: {} as BlockNode,
      range: { begin: fakePos, end: fakePos },
    },
  },
  {
    name: "branch with alternative",
    node: createBranchNode(
      { predicate: {} as ExpressionNode, consequence: {} as BlockNode, alternative: {} as BlockNode },
      fakePos,
      fakePos,
    ),
    expected: {
      type: "branch",
      predicate: {} as ExpressionNode,
      consequence: {} as BlockNode,
      alternative: {} as BlockNode,
      range: { begin: fakePos, end: fakePos },
    },
  },
  {
    name: "return",
    node: createReturnNode({ expression: {} as ExpressionNode }, fakePos, fakePos),
    expected: {
      type: "return",
      expression: {} as ExpressionNode,
      range: { begin: fakePos, end: fakePos },
    },
  },
  {
    name: "expression statement",
    node: createExpressionStatementNode({ expression: {} as ExpressionNode }, fakePos, fakePos),
    expected: {
      type: "expression statement",
      expression: {} as ExpressionNode,
      range: { begin: fakePos, end: fakePos },
    },
  },
];

it.each(cases)("create $name node", ({ node, expected }) => {
  expect(node).toEqual(expected);
});
