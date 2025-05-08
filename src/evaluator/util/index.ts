import type { ListableValue } from "../value";

export function getListRepresentation(elements: ListableValue[]): string {
  return `[${elements.map(e => e.representation).join(", ")}]`;
}