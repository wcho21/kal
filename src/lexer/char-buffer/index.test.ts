import CharBuffer from "./";

describe("popChar()", () => {
  it("pop characters", () => {
    const buffer = new CharBuffer("ab");
    const expected1 = { value: "a", position: { row: 0, col: 0 }};
    const expected2 = { value: "b", position: { row: 0, col: 1 }};

    expect(buffer.popChar()).toEqual(expected1);
    expect(buffer.popChar()).toEqual(expected2);
  });

  it("pop null characters if nothing to pop", () => {
    const buffer = new CharBuffer("");
    const expected = { value: "\0", position: { row: 0, col: 0 }};

    // pop the same null character more than once
    expect(buffer.popChar()).toEqual(expected);
    expect(buffer.popChar()).toEqual(expected);
  });
});

describe("peekChar()", () => {
  it("peek character", () => {
    const buffer = new CharBuffer("a");
    const expected = { value: "a", position: { row: 0, col: 0 }};

    // peek the same character if not popped
    expect(buffer.peekChar()).toEqual(expected);
    expect(buffer.peekChar()).toEqual(expected);
  });

  it("peek null characters if nothing to pop", () => {
    const buffer = new CharBuffer("");
    const expected = { value: "\0", position: { row: 0, col: 0 }};

    // peek the same null character more than once
    expect(buffer.peekChar()).toEqual(expected);
    expect(buffer.peekChar()).toEqual(expected);
  });
});
