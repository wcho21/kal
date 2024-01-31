import {
  createProgramNode,
  createBlockNode,
} from "./";
import { fakePos } from "../testing/fixtures";

const cases = [
  {
    name: "program",
    node: createProgramNode({ statements: [] }, fakePos, fakePos),
    expected: {
      type: "program",
      statements: [],
      range: { begin: fakePos, end: fakePos },
    },
  },
  {
    name: "block",
    node: createBlockNode({ statements: [] }, fakePos, fakePos),
    expected: {
      type: "block",
      statements: [],
      range: { begin: fakePos, end: fakePos },
    },
  },
];

it.each(cases)("create $name node", ({ node, expected }) => {
  expect(node).toEqual(expected);
});
