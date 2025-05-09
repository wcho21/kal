import { describe, expect, it } from "bun:test";
import { fakePos1, fakePos2, fakeRange } from "../../../util/position/index.test.fixture";
import { createOperatorToken } from "./";
import type { OperatorToken } from "./";

type Token = OperatorToken;
type Case = { name: string; token: Token; expected: Token };

describe("create token with begin and end position", () => {
  const cases: Case[] = [
    {
      name: "operator",
      token: createOperatorToken("+", fakePos1, fakePos2),
      expected: {
        type: "operator",
        value: "+",
        range: fakeRange,
      },
    },
  ];

  it.each(cases)("create $name token", ({ token, expected }) => {
    expect(token).toEqual(expected);
  });
});

describe("create token with range", () => {
  const cases: Case[] = [
    {
      name: "operator",
      token: createOperatorToken("+", fakeRange),
      expected: {
        type: "operator",
        value: "+",
        range: fakeRange,
      },
    },
  ];

  it.each(cases)("create $name token", ({ token, expected }) => {
    expect(token).toEqual(expected);
  });
});
