import Buffer from "./";

describe("popChar()", () => {
  it("pop characters", () => {
    const buffer = new Buffer("ab");

    expect(buffer.pop()).toBe("a");
    expect(buffer.pop()).toBe("b");
  });

  it("pop null character if nothing to pop", () => {
    const buffer = new Buffer("");

    expect(buffer.pop()).toBe("\0");
  });

  it("pop null character more than once if nothing to pop", () => {
    const buffer = new Buffer("");

    expect(buffer.pop()).toBe("\0");
    expect(buffer.pop()).toBe("\0");
  });
});

describe("peekChar()", () => {
  it("peek character", () => {
    const buffer = new Buffer("a");

    expect(buffer.peek()).toBe("a");
  });

  it("peek the same character twice", () => {
    const buffer = new Buffer("a");

    expect(buffer.peek()).toBe("a");
    expect(buffer.peek()).toBe("a");
  });

  it("peek null character if nothing to pop", () => {
    const buffer = new Buffer("");

    expect(buffer.peek()).toBe("\0");
  });

  it("peek null character more than once if nothing to pop", () => {
    const buffer = new Buffer("");

    expect(buffer.peek()).toBe("\0");
    expect(buffer.peek()).toBe("\0");
  });
});
