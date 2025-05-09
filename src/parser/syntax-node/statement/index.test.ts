import { expect, it } from "bun:test";
import { fakePos1, fakePos2, fakeRange } from "../../../util/position/index.test.fixture";
import type { ExpressionNode } from "../expression";
import type { BlockNode } from "../group";
import { createBranchNode, createExpressionStatementNode, createReturnNode } from "./";
import type { BranchNode, ExpressionStatementNode, ReturnNode } from "./";

type Node = BranchNode | ExpressionStatementNode | ReturnNode;
type Case = { name: string; node: Node; expected: Node };

const cases: Case[] = [
  {
    name: "branch",
    node: createBranchNode({ predicate: {} as ExpressionNode, consequence: {} as BlockNode }, fakePos1, fakePos2),
    expected: {
      type: "branch",
      predicate: {} as ExpressionNode,
      consequence: {} as BlockNode,
      range: fakeRange,
    },
  },
  {
    name: "branch with alternative",
    node: createBranchNode(
      { predicate: {} as ExpressionNode, consequence: {} as BlockNode, alternative: {} as BlockNode },
      fakePos1,
      fakePos2,
    ),
    expected: {
      type: "branch",
      predicate: {} as ExpressionNode,
      consequence: {} as BlockNode,
      alternative: {} as BlockNode,
      range: fakeRange,
    },
  },
  {
    name: "return",
    node: createReturnNode({ expression: {} as ExpressionNode }, fakePos1, fakePos2),
    expected: {
      type: "return",
      expression: {} as ExpressionNode,
      range: fakeRange,
    },
  },
  {
    name: "expression statement",
    node: createExpressionStatementNode({ expression: {} as ExpressionNode }, fakePos1, fakePos2),
    expected: {
      type: "expression statement",
      expression: {} as ExpressionNode,
      range: fakeRange,
    },
  },
];

it.each(cases)("create $name node", ({ node, expected }) => {
  expect(node).toEqual(expected);
});
