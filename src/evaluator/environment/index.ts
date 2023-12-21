export interface EnvironmentType {
  get: (name: string) => unknown;
  set: (name: string, value: any) => unknown;
}

export default class Environment implements EnvironmentType {
  private readonly superEnvironment: Environment | null;
  private readonly table: Map<string, any>;

  constructor(superEnvironment: Environment | null = null) {
    this.superEnvironment = superEnvironment;
    this.table = new Map<string, any>;
  }

  get(name: string): unknown {
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

  set(name: string, value: any): unknown {
    this.table.set(name, value);

    return value;
  }
}
