import {
  createIdentifierToken,
  createKeywordToken,
} from "./";
import { fakePos } from "../testing/fixtures";

describe("create token with begin and end position", () => {
  const cases = [
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
  const cases = [
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
