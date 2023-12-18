import type { Group } from "./group";
import type { Statement } from "./statement";
import type { Expression } from "./expression";

export type Node = Group | Statement | Expression;

export * from "./expression";
export * from "./statement";
export * from "./group";
export type * from "./expression";
export type * from "./statement";
export type * from "./group";
