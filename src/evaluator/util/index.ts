import type { KeyableValue, ListableValue, Value } from "../value";

export function getListRepresentation(elements: ListableValue[]): string {
  return `[${elements.map(e => e.representation).join(", ")}]`;
}

export function getTableRepresentation(elements: Map<KeyableValue, ListableValue>): string {
  return `[${Array.from(elements)
    .map(([k, v]) => `${k.representation}: ${v.representation}`)
    .join(", ")}]`;
}

export function isListableValue(value: Value): value is ListableValue {
  return (
    value.type === "number" ||
    value.type === "string" ||
    value.type === "boolean" ||
    value.type === "function" ||
    value.type === "list" ||
    value.type === "table"
  );
}

export function isKeyableValue(value: Value): value is KeyableValue {
  return value.type === "number" || value.type === "string" || value.type === "boolean";
}
