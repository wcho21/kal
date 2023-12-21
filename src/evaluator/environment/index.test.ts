import Environment from "./";

describe("set()", () => {
  it("set name and value", () => {
    const env = new Environment();

    expect(() => env.set("foo", 42)).not.toThrow();
  });
});

describe("get()", () => {
  it("get value after setting the value", () => {
    const env = new Environment();

    env.set("foo", 42);
    const value = env.get("foo");

    expect(value).toBe(42);
  });

  it("get null if not found", () => {
    const env = new Environment();

    const value = env.get("foo");

    expect(value).toBe(null);
  });
});

describe("linked environment", () => {
  it("set super environment and get via sub environment", () => {
    const superEnv = new Environment();
    superEnv.set("foo", 42);
    const subEnv = new Environment(superEnv);

    const value = subEnv.get("foo");

    expect(value).toBe(42);
  });

  it("get null if not found even in super environment", () => {
    const superEnv = new Environment();
    const subEnv = new Environment(superEnv);

    const value = subEnv.get("foo");

    expect(value).toBe(null);
  });
});
