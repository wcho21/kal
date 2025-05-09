import { describe, expect, it } from "bun:test";
import { fakePos1, fakePos2, fakeRange } from "../index.test.fixture";
import { createEndToken, createIllegalStringLiteralToken, createIllegalToken } from "./";
import type { EndToken, IllegalStringLiteralToken, IllegalToken } from "./";

type Token = EndToken | IllegalStringLiteralToken | IllegalToken;
type Case = { name: string; token: Token; expected: Token };

describe("create token with begin and end position", () => {
  const cases: Case[] = [
    {
      name: "illegal",
      token: createIllegalToken("$", fakePos1, fakePos2),
      expected: {
        type: "illegal",
        value: "$",
        range: fakeRange,
      },
    },
    {
      name: "illegal string",
      token: createIllegalStringLiteralToken("foo", fakePos1, fakePos2),
      expected: {
        type: "illegal string",
        value: "foo",
        range: fakeRange,
      },
    },
    {
      name: "end",
      token: createEndToken("$end", fakePos1, fakePos2),
      expected: {
        type: "end",
        value: "$end",
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
      name: "illegal",
      token: createIllegalToken("$end", fakeRange),
      expected: {
        type: "illegal",
        value: "$end",
        range: fakeRange,
      },
    },
    {
      name: "illegal string",
      token: createIllegalStringLiteralToken("foo", fakeRange),
      expected: {
        type: "illegal string",
        value: "foo",
        range: fakeRange,
      },
    },
    {
      name: "end",
      token: createEndToken("$end", fakeRange),
      expected: {
        type: "end",
        value: "$end",
        range: fakeRange,
      },
    },
  ];

  it.each(cases)("create $name token", ({ token, expected }) => {
    expect(token).toEqual(expected);
  });
});
