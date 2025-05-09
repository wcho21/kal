import { describe, expect, it } from "bun:test";
import { fakePos1, fakePos2, fakeRange } from "../index.test.fixture";
import type { IdentifierToken, KeywordToken } from "./";
import { createIdentifierToken, createKeywordToken } from "./";

type Token = IdentifierToken | KeywordToken;
type Case = { name: string; token: Token; expected: Token };

describe("create token with begin and end position", () => {
  const cases: Case[] = [
    {
      name: "identifier",
      token: createIdentifierToken("foo", fakePos1, fakePos2),
      expected: {
        type: "identifier",
        value: "foo",
        range: fakeRange,
      },
    },
    {
      name: "keyword",
      token: createKeywordToken("만약", fakePos1, fakePos2),
      expected: {
        type: "keyword",
        value: "만약",
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
      name: "identifier",
      token: createIdentifierToken("foo", fakeRange),
      expected: {
        type: "identifier",
        value: "foo",
        range: fakeRange,
      },
    },
    {
      name: "keyword",
      token: createKeywordToken("만약", fakeRange),
      expected: {
        type: "keyword",
        value: "만약",
        range: fakeRange,
      },
    },
  ];

  it.each(cases)("create $name token", ({ token, expected }) => {
    expect(token).toEqual(expected);
  });
});
