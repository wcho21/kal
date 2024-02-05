import type * as Value from "../value";
import * as value from "../value";

export type BuiltinFunction = (args: any) => Value.Value;

const len: BuiltinFunction = (args: Value.Value[]) => {
  const arg = args[0];
  if (arg.type === "string") {
    const length = arg.value.length;
    return value.createNumberValue({ value: length }, String(length), arg.range);
  }

  throw new Error();
};

const builtins = {
  get(identifier: string): BuiltinFunction | null {
    switch (identifier) {
      case "길이":
        return len;
      default:
        return null;
    }
  }
};
export default builtins;
