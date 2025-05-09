import { describe, expect, it } from "bun:test";
import { fakePos1, fakePos2, fakeRange } from "../index.test.fixture";
import { createBooleanLiteralToken, createNumberLiteralToken, createStringLiteralToken } from "./";
import type { BooleanLiteralToken, NumberLiteralToken, StringLiteralToken } from "./";

type Token = BooleanLiteralToken | NumberLiteralToken | StringLiteralToken;
type Case = { name: string; token: Token; expected: Token };

describe("create token with begin and end position", () => {
  const cases: Case[] = [
    {
      name: "number literal",
      token: createNumberLiteralToken("0", fakePos1, fakePos2),
      expected: {
        type: "number literal",
        value: "0",
        range: fakeRange,
      },
    },
    {
      name: "boolean literal",
      token: createBooleanLiteralToken("참", fakePos1, fakePos2),
      expected: {
        type: "boolean literal",
        value: "참",
        range: fakeRange,
      },
    },
    {
      name: "string literal",
      token: createStringLiteralToken("foo", fakePos1, fakePos2),
      expected: {
        type: "string literal",
        value: "foo",
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
      name: "number literal",
      token: createNumberLiteralToken("0", fakeRange),
      expected: {
        type: "number literal",
        value: "0",
        range: fakeRange,
      },
    },
    {
      name: "boolean literal",
      token: createBooleanLiteralToken("참", fakeRange),
      expected: {
        type: "boolean literal",
        value: "참",
        range: fakeRange,
      },
    },
    {
      name: "string literal",
      token: createStringLiteralToken("foo", fakeRange),
      expected: {
        type: "string literal",
        value: "foo",
        range: fakeRange,
      },
    },
  ];

  it.each(cases)("create $name token", ({ token, expected }) => {
    expect(token).toEqual(expected);
  });
});
