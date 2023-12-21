import type { Program, Block, BranchStatement, Node, Expression } from "../parser";
import {
  makeEvaluatedNumber,
  makeEvaluatedBoolean,
  makeEvaluatedString,
  makeEvaluatedFunction,
  makeEvaluatedEmpty,
} from "./evaluated";
import type {
  Evaluated,
  EvaluatedNumber,
  EvaluatedBoolean,
  EvaluatedFunction,
} from "./evaluated";
import Environment from "./environment";

export default class Evaluator {
  private evaluateProgram(node: Program, env: Environment): Evaluated {
    if (node.statements.length === 0) {
      return makeEvaluatedEmpty();
    }

    const evaluatedStatements = node.statements.map(statement => this.evaluate(statement, env));
    const evaluated = evaluatedStatements[evaluatedStatements.length-1];

    return evaluated;
  }

  private evaluateBlock(node: Block, env: Environment): Evaluated {
    if (node.statements.length === 0) {
      throw new Error(`block cannot be empty`);
    }

    const evaluatedStatements = node.statements.map(statement => this.evaluate(statement, env));
    const evaluated = evaluatedStatements[evaluatedStatements.length-1];

    return evaluated;
  }

  private evaluatePrefixNumberExpression(prefix: string, operand: EvaluatedNumber): EvaluatedNumber {
    if (prefix === "+") {
      return operand;
    }
    if (prefix === "-") {
      return makeEvaluatedNumber(-operand.value);
    }

    throw new Error(`bad prefix ${prefix}`);
  }

  private evaluatePrefixBooleanExpression(prefix: string, operand: EvaluatedBoolean): EvaluatedBoolean {
    if (prefix === "!") {
      return makeEvaluatedBoolean(!operand.value);
    }

    throw new Error(`bad prefix ${prefix}`);
  }

  private evaluateBranchStatement(node: BranchStatement, env: Environment): Evaluated {
    const predicate = this.evaluate(node.predicate, env);
    if (predicate.type !== "boolean") {
      throw new Error(`expected boolean expression predicate, but received ${predicate.type}`);
    }

    if (predicate.value) {
      const consequence = this.evaluate(node.consequence, env);
      return consequence;
    }

    // early return if no else block
    if (typeof node.alternative === "undefined") {
      return makeEvaluatedEmpty();
    }

    const alternative = this.evaluate(node.alternative, env);
    return alternative;
  }

  private evaluateInfixExpression(infix: string, left: Evaluated, right: Evaluated): Evaluated {
    // type matching order is important: more inclusive case first

    if (
      (left.type === "boolean" && right.type === "boolean") ||
      (left.type === "number" && right.type === "number") ||
      (left.type === "string" && right.type === "string")
    ) {
      if (infix === "==") {
        return makeEvaluatedBoolean(left.value == right.value);
      }
      if (infix === "!=") {
        return makeEvaluatedBoolean(left.value != right.value);
      }
      if (infix === ">") {
        return makeEvaluatedBoolean(left.value > right.value);
      }
      if (infix === "<") {
        return makeEvaluatedBoolean(left.value < right.value);
      }
      if (infix === ">=") {
        return makeEvaluatedBoolean(left.value >= right.value);
      }
      if (infix === "<=") {
        return makeEvaluatedBoolean(left.value <= right.value);
      }
    }

    if (left.type === "number" && right.type === "number") {
      if (infix === "+") {
        return makeEvaluatedNumber(left.value + right.value);
      }
      if (infix === "-") {
        return makeEvaluatedNumber(left.value - right.value);
      }
      if (infix === "*") {
        return makeEvaluatedNumber(left.value * right.value);
      }
      if (infix === "/") {
        // TODO: guard division by zero
        return makeEvaluatedNumber(left.value / right.value);
      }

      throw new Error(`bad infix ${infix} for number operands`);
    }

    throw new Error(`bad infix ${infix}, with left '${left}' and right '${right}'`);
  }

  evaluate(node: Node, env: Environment): Evaluated {
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
      return makeEvaluatedNumber(node.value);
    }

    if (node.type === "boolean node") {
      return makeEvaluatedBoolean(node.value);
    }

    if (node.type === "string node") {
      return makeEvaluatedString(node.value);
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
        subExpression.type == "number"
      ) {
        return this.evaluatePrefixNumberExpression(node.prefix, subExpression);
      }
      if (node.prefix === "!" && subExpression.type === "boolean") {
        return this.evaluatePrefixBooleanExpression(node.prefix, subExpression);
      }

      throw new Error(`bad prefix expression: prefix: '${node.prefix}' with type: '${typeof subExpression}'`);
    }

    if (node.type === "function expression") {
      const parameters = node.parameter;
      const body = node.body;
      return makeEvaluatedFunction(parameters, body, env);
    }

    if (node.type === "call") {
      const functionToCall = this.evaluate(node.functionToCall, env);
      if (functionToCall.type !== "function") {
        throw new Error(`expected function but received ${functionToCall.type}`);
      }

      const callArguments = this.parseCallArguments(node.callArguments, env);

      const value = this.evaluateFunctionCall(functionToCall, callArguments);
      return value;
    }

    if (node.type === "assignment") {
      if (node.left.type !== "identifier") {
        throw new Error(`expected identifier on left value, but received ${typeof node.left.type}`);
      }
      const varName = node.left.value;
      const varValue = this.evaluate(node.right, env);

      env.set(varName, varValue);

      return varValue; // evaluated value of assignment is the evaluated value of variable
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
    return exhaustiveCheck;
  }

  private parseCallArguments(callArguments: Expression[], env: Environment): Evaluated[] {
    const values = [];
    for (const arg of callArguments) {
      const value = this.evaluate(arg, env);
      values.push(value);
    }
    return values;
  }

  private evaluateFunctionCall(functionToCall: EvaluatedFunction, callArguments: Evaluated[]): Evaluated {
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
