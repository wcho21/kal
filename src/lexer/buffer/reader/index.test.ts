import Reader from "./";

describe("read()", () => {
  it("read a character", () => {
    const reader = new Reader("a", "\0");

    expect(reader.read()).toBe("a");
  });

  it("read the same character twice", () => {
    const reader = new Reader("a", "\0");

    expect(reader.read()).toBe("a");
    expect(reader.read()).toBe("a");
  });

  it("read fallback character if end of input", () => {
    const reader = new Reader("", "\0");

    expect(reader.read()).toBe("\0");
    expect(reader.read()).toBe("\0");
  });
});

describe("incrementIndex()", () => {
  it("increment index and read next character", () => {
    const reader = new Reader("ab", "\0");

    reader.next();
    expect(reader.read()).toBe("b");
  });

  it("not increment index if end of input", () => {
    const reader = new Reader("a", "\0");

    reader.next();
    reader.next();
    expect(reader.read()).toBe("\0");
  });
});
