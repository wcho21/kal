import type * as Value from "../value";
import * as value from "../value";

export type BuiltinFunction = (args: Value.Value[], onStdout?: (toWrite: string) => void) => Value.Value;

const len: BuiltinFunction = (args: Value.Value[]) => {
  if (args.length !== 1) {
    throw new Error();
  }

  const target = args[0];

  if (target.type === "string") {
    const length = target.value.length;
    return value.createNumberValue({ value: length }, String(length), target.range);
  }
  if (target.type === "list") {
    const length = target.elements.length;
    return value.createNumberValue({ value: length }, String(length), target.range);
  }

  // TODO: handle exceptional cases such as more than two args

  throw new Error();
};

const write: BuiltinFunction = (args, onStdout) => {
  if (args.length === 0) {
    throw new Error();
  }

  const str = args.map(arg => arg.representation).join(" ");
  if (onStdout !== undefined) {
    onStdout(str);
  }

  const range = { begin: args[0].range.begin, end: args[args.length - 1].range.end };
  return value.createEmptyValue({ value: null }, "(없음)", range);
};

const builtins = {
  get(identifier: string): BuiltinFunction | null {
    switch (identifier) {
      case "길이":
        return len;
      case "쓰기":
        return write;
      default:
        return null;
    }
  },
};
export default builtins;
