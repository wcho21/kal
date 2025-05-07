import type { ExpressionNode } from "../expression";
import type { BlockNode } from "../group";
import { fakePos } from "../testing/fixtures";
import { createBranchNode, createExpressionStatementNode, createReturnNode } from "./";

const cases = [
  {
    name: "branch",
    node: createBranchNode({ predicate: {} as ExpressionNode, consequence: {} as BlockNode }, fakePos, fakePos),
    expected: {
      type: "branch",
      predicate: {},
      consequence: {},
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
      predicate: {},
      consequence: {},
      alternative: {},
      range: { begin: fakePos, end: fakePos },
    },
  },
  {
    name: "return",
    node: createReturnNode({ expression: {} as ExpressionNode }, fakePos, fakePos),
    expected: {
      type: "return",
      expression: {},
      range: { begin: fakePos, end: fakePos },
    },
  },
  {
    name: "expression statement",
    node: createExpressionStatementNode({ expression: {} as ExpressionNode }, fakePos, fakePos),
    expected: {
      type: "expression statement",
      expression: {},
      range: { begin: fakePos, end: fakePos },
    },
  },
];

it.each(cases)("create $name node", ({ node, expected }) => {
  expect(node).toEqual(expected);
});
