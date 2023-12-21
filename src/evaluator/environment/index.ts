import type { Evaluated } from "../evaluated";

export interface EnvironmentType {
  get: (name: string) => Evaluated | null;
  set: (name: string, value: Evaluated) => void;
}

export default class Environment implements EnvironmentType {
  private readonly superEnvironment: Environment | null;
  private readonly table: Map<string, any>;

  constructor(superEnvironment: Environment | null = null) {
    this.superEnvironment = superEnvironment;
    this.table = new Map<string, any>;
  }

  get(name: string): Evaluated | null {
    // return if found in current environment
    const fetched = this.table.get(name);
    if (fetched !== undefined) {
      return fetched;
    }

    // return value in super environment
    if (this.superEnvironment === null) {
      return null;
    }
    return this.superEnvironment.get(name);
  }

  set(name: string, value: Evaluated): void {
    this.table.set(name, value);
  }
}
