import type { Program, Node } from "../parser";
import Environment from "./environment";

// TODO: fix any return type to specific ones (by implement value system)
export default class Evaluator {
  private evaluateProgram(node: Program, env: Environment): any {
    let evaluated;

    for (const statement of node.statements) {
      evaluated = this.evaluate(statement, env);
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

  evaluate(node: Node, env: Environment): any {
    if (node.type === "program") {
      return this.evaluateProgram(node, env);
    }
    if (node.type === "expression statement") {
      return this.evaluate(node.expression, env);
    }
    if (node.type === "number node") {
      return node.value;
    }
    if (node.type === "boolean node") {
      return node.value;
    }
    if (node.type === "string node") {
      return node.value;
    }
    if (node.type === "infix expression") {
      const left = this.evaluate(node.left, env);
      const right = this.evaluate(node.right, env);

      if (typeof left !== "number") {
        throw new Error(`expected left expression type number, but received ${typeof left}`);
      }
      if (typeof right !== "number") {
        throw new Error(`expected left expression type number, but received ${typeof left}`);
      }

      return this.evaluateInfixExpression(node.infix, left, right);
    }
    if (node.type === "prefix expression") {
      const subExpression = this.evaluate(node.expression, env);
      if (typeof subExpression !== "number") {
        throw new Error(`expected sub expression type number, but received ${typeof subExpression}`);
      }

      return this.evaluatePrefixExpression(node.prefix, subExpression);
    }
    if (node.type === "assignment") {
      const varValue = this.evaluate(node.right, env);

      if (node.left.type !== "identifier") {
        throw new Error(`expected identifier on left value, but received ${typeof node.left.type}`);
      }
      const varName = node.left.value;

      env.set(varName, varValue);

      return varValue;
    }
    if (node.type === "identifier") {
      const varName = node.value;
      const value = env.get(varName);

      if (value === null) {
        throw new Error(`identifier '${varName}' not found`);
      }

      return value;
    }

    // throw new Error(`not supported node type '${node.type}'`);
  }
}

export { default as Environment } from "./environment";
