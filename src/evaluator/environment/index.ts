export interface EnvironmentType {
  get: (name: string) => unknown;
  set: (name: string, value: any) => unknown;
}

export default class Environment implements EnvironmentType {
  private readonly table: Map<string, any>;

  constructor() {
    this.table = new Map<string, any>;
  }

  get(name: string): unknown {
    return this.table.get(name) ?? null;
  }

  set(name: string, value: any): unknown {
    this.table.set(name, value);

    return value;
  }
}
