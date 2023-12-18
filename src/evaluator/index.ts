import type { Program, Node, PrefixExpression } from "../parser";

// TODO: fix any return type to specific ones (by implement value system)
export default class Evaluator {
  private evaluateProgram(node: Program): any {
    let evaluated;

    for (const statement of node.statements) {
      evaluated = this.evaluate(statement);
    }

    return evaluated;
  }

  private evaluatePrefixExpression(prefix: string, operand: number): any {
    if (prefix === "+") {
      return operand;
    }
    if (prefix === "-") {
      return -operand;
    }

    throw new Error(`bad prefix ${prefix}`);
  }

  evaluate(node: Node): any {
    if (node.type === "program") {
      return this.evaluateProgram(node);
    }
    if (node.type === "expression statement") {
      return this.evaluate(node.expression);
    }
    if (node.type === "number node") {
      return node.value;
    }
    if (node.type === "prefix expression") {
      const subExpression = this.evaluate(node.expression);
      if (typeof subExpression !== "number") {
        throw new Error(`expected sub expression type number, but received ${typeof subExpression}`);
      }

      return this.evaluatePrefixExpression(node.prefix, subExpression);
    }
    throw new Error(`not supported node type '${node.type}'`);
  }
}
