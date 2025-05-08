import { describe, expect, it } from "bun:test";
import { fakePos } from "../testing/fixtures";
import type { IdentifierToken, KeywordToken } from "./";
import { createIdentifierToken, createKeywordToken } from "./";

type Token = IdentifierToken | KeywordToken;
type Case = { name: string; token: Token; expected: Token };

describe("create token with begin and end position", () => {
  const cases: Case[] = [
    {
      name: "identifier",
      token: createIdentifierToken("foo", fakePos, fakePos),
      expected: {
        type: "identifier",
        value: "foo",
        range: {
          begin: fakePos,
          end: fakePos,
        },
      },
    },
    {
      name: "keyword",
      token: createKeywordToken("만약", fakePos, fakePos),
      expected: {
        type: "keyword",
        value: "만약",
        range: {
          begin: fakePos,
          end: fakePos,
        },
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
      token: createIdentifierToken("foo", { begin: fakePos, end: fakePos }),
      expected: {
        type: "identifier",
        value: "foo",
        range: {
          begin: fakePos,
          end: fakePos,
        },
      },
    },
    {
      name: "keyword",
      token: createKeywordToken("만약", { begin: fakePos, end: fakePos }),
      expected: {
        type: "keyword",
        value: "만약",
        range: {
          begin: fakePos,
          end: fakePos,
        },
      },
    },
  ];

  it.each(cases)("create $name token", ({ token, expected }) => {
    expect(token).toEqual(expected);
  });
});
