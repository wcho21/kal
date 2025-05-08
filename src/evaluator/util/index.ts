import type { ListableValue, Value } from "../value";

export function getListRepresentation(elements: ListableValue[]): string {
  return `[${elements.map(e => e.representation).join(", ")}]`;
}

export function isListableValue(value: Value): value is ListableValue {
  return (
    value.type === "number" ||
    value.type === "string" ||
    value.type === "boolean" ||
    value.type === "function" ||
    value.type === "list"
  );
}
