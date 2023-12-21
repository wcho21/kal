import type { Program, Block, BranchStatement, Node, Expression } from "../parser";
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

  private evaluateBlock(node: Block, env: Environment): any {
    let evaluated;

    for (const statement of node.statements) {
      evaluated = this.evaluate(statement, env);
    }

    return evaluated;
  }

  private evaluatePrefixNumberExpression(prefix: string, operand: number): any {
    if (prefix === "+") {
      return operand;
    }
    if (prefix === "-") {
      return -operand;
    }

    throw new Error(`bad prefix ${prefix}`);
  }

  private evaluatePrefixBooleanExpression(prefix: string, operand: boolean): any {
    if (prefix === "!") {
      return !operand;
    }

    throw new Error(`bad prefix ${prefix}`);
  }

  private evaluateBranchStatement(node: BranchStatement, env: Environment): any {
    const predicate = this.evaluate(node.predicate, env);

    if (predicate) {
      const consequence = this.evaluate(node.consequence, env);
      return consequence;
    }

    // early return if no else block
    if (typeof node.alternative === "undefined") {
      return undefined;
    }

    const alternative = this.evaluate(node.alternative, env);
    return alternative;
  }

  private evaluateInfixExpression(infix: string, left: unknown, right: unknown): any {
    // type matching order is important: more inclusive case first

    if (
      (typeof left === "boolean" && typeof right === "boolean") ||
      (typeof left === "number" && typeof right === "number")
    ) {
      if (infix === "==") {
        return left === right;
      }
      if (infix === "!=") {
        return left !== right;
      }
      if (infix === ">") {
        return left > right;
      }
      if (infix === "<") {
        return left < right;
      }
      if (infix === ">=") {
        return left >= right;
      }
      if (infix === "<=") {
        return left <= right;
      }
    }

    if (typeof left === "number" && typeof right === "number") {
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

      throw new Error(`bad infix ${infix} for number operands`);
    }

    throw new Error(`bad infix ${infix}, with left '${left}' and right '${right}'`);
  }

  evaluate(node: Node, env: Environment): any {
    if (node.type === "program") {
      return this.evaluateProgram(node, env);
    }
    if (node.type === "block") {
      return this.evaluateBlock(node, env);
    }
    if (node.type === "branch statement") {
      return this.evaluateBranchStatement(node, env);
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

      return this.evaluateInfixExpression(node.infix, left, right);
    }
    if (node.type === "prefix expression") {
      const subExpression = this.evaluate(node.expression, env);
      if (
        (node.prefix === "+" || node.prefix === "-") &&
        typeof subExpression == "number"
      ) {
        return this.evaluatePrefixNumberExpression(node.prefix, subExpression);
      }
      if (node.prefix === "!" && typeof subExpression === "boolean") {
        return this.evaluatePrefixBooleanExpression(node.prefix, subExpression);
      }

      throw new Error(`bad prefix expression: prefix: '${node.prefix}' with type: '${typeof subExpression}'`);
    }
    if (node.type === "function expression") {
      const parameters = node.parameter;
      const body = node.body;
      return { parameters, body, environment: env };
    }
    if (node.type === "call") {
      const functionToCall = this.evaluate(node.functionToCall, env);

      const callArguments = this.parseCallArguments(node.callArguments, env);

      const value = this.evaluateFunctionCall(functionToCall, callArguments);
      return value;
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

    const exhaustiveCheck: never = node;
  }

  private parseCallArguments(callArguments: Expression[], env: Environment): any[] {
    const values = [];
    for (const arg of callArguments) {
      const value = this.evaluate(arg, env);
      values.push(value);
    }
    return values;
  }

  private evaluateFunctionCall(functionToCall: any, callArguments: any[]): any {
    const functionEnv = new Environment(functionToCall.environment);
    for (let i = 0; i < functionToCall.parameters.length; ++i) {
      const name = functionToCall.parameters[i].value;
      const value = callArguments[i];
      functionEnv.set(name, value);
    }

    const value = this.evaluate(functionToCall.body, functionEnv);
    return value;
  }
}

export { default as Environment } from "./environment";
