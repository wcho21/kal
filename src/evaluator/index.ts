import type { Program, Node } from "../parser";

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

  private evaluateInfixExpression(infix: string, left: number, right: number): any {
    if (infix === "+") {
      return left + right;
    }
    if (infix === "-") {
      return left - right;
    }
    if (infix === "*") {
      return left * right;
    }
    if (infix === "/") {
      return left / right;
    }

    throw new Error(`bad infix ${infix}`);
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
    if (node.type === "infix expression") {
      const left = this.evaluate(node.left);
      const right = this.evaluate(node.right);

      if (typeof left !== "number") {
        throw new Error(`expected left expression type number, but received ${typeof left}`);
      }
      if (typeof right !== "number") {
        throw new Error(`expected left expression type number, but received ${typeof left}`);
      }

      return this.evaluateInfixExpression(node.infix, left, right);
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
