import { describe, expect, it } from "bun:test";
import type { Value } from "../value";
import Environment from "./";

describe("set()", () => {
  it("set name and value", () => {
    const env = new Environment();
    const varName = "foo";
    const varValue = {} as Value;

    expect(() => env.set(varName, varValue)).not.toThrow();
  });
});

describe("get()", () => {
  it("get value after setting the value", () => {
    const env = new Environment();
    const varName = "foo";
    const varValue = {} as Value;

    env.set(varName, varValue);

    expect(env.get(varName)).toBe(varValue);
  });

  it("get null if not found", () => {
    const env = new Environment();
    const varNameNotSet = "foo";

    expect(env.get(varNameNotSet)).toBe(null);
  });
});

describe("linked environment", () => {
  it("set super environment and get via sub environment", () => {
    const varNameInSuper = "foo";
    const varValueInSuper = {} as Value;

    const superEnv = new Environment();
    superEnv.set(varNameInSuper, varValueInSuper);
    const subEnv = new Environment(superEnv);

    expect(subEnv.get(varNameInSuper)).toBe(varValueInSuper);
  });

  it("get null if not found even in super environment", () => {
    const superEnv = new Environment();
    const subEnv = new Environment(superEnv);

    const varNameSetNowhere = "foo";
    expect(subEnv.get(varNameSetNowhere)).toBe(null);
  });
});
