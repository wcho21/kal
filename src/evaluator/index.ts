import type * as Node from "../parser";
import type { Range } from "../util/position";
import builtin, { type BuiltinFunction } from "./builtin";
import Environment from "./environment";
import { getListRepresentation, getTableRepresentation, isKeyableValue, isListableValue } from "./util";
import type * as Value from "./value";
import * as value from "./value";

export class EvaluatorError extends Error {
  public range: Range;
  public received?: string;

  constructor(range: Range, received?: string) {
    super();
    this.range = range;
    this.received = received;
  }
}

export class TopLevelReturnError extends EvaluatorError {}
export class BadPredicateError extends EvaluatorError {}
export class BadAssignmentLeftError extends EvaluatorError {}
export class BadPrefixExpressionError extends EvaluatorError {}
export class BadInfixExpressionError extends EvaluatorError {}
export class BadIdentifierError extends EvaluatorError {}
export class BadListElementTypeError extends EvaluatorError {}
export class BadTableKeyTypeError extends EvaluatorError {}
export class BadTableValueTypeError extends EvaluatorError {}

type ComparisonOperator = "==" | "!=" | ">" | "<" | ">=" | "<=";

export default class Evaluator {
  private callbackOnStdout?: (toWrite: string) => void;

  evaluate(node: Node.ProgramNode, env: Environment): Value.Value {
    return this.evaluateProgram(node, env);
  }

  onStdout(callback: (toWrite: string) => void): void {
    this.callbackOnStdout = callback;
  }

  private evaluateProgram(node: Node.ProgramNode, env: Environment): Value.Value {
    const { statements } = node;

    let lastEvaluated: Value.Value | null = null;
    for (let i = 0; i < statements.length; ++i) {
      const evaluated = this.evaluateStatement(statements[i], env);

      if (evaluated.type === "return") {
        throw new TopLevelReturnError(node.range);
      }

      lastEvaluated = evaluated;
    }

    return lastEvaluated ?? this.createEmptyValue(node.range);
  }

  private evaluateStatement(node: Node.StatementNode, env: Environment): Value.Value | Value.ReturnValue {
    if (node.type === "branch") {
      return this.evaluateBranchStatement(node, env);
    }
    if (node.type === "expression statement") {
      return this.evaluateExpressionStatement(node, env);
    }
    if (node.type === "return") {
      const val = this.evaluateExpression(node.expression, env);
      return value.createReturnValue(val);
    }

    const nothing: never = node;
    return nothing;
  }

  private evaluateBranchStatement(node: Node.BranchNode, env: Environment): Value.Value | Value.ReturnValue {
    const pred = this.evaluateExpression(node.predicate, env);
    if (pred.type !== "boolean") {
      throw new BadPredicateError(pred.range, pred.representation);
    }

    if (pred.value) {
      return this.evaluateBlock(node.consequence, env);
    }

    if (node.alternative === undefined) {
      return this.createEmptyValue(node.range);
    }

    return this.evaluateBlock(node.alternative, env);
  }

  private evaluateBlock(node: Node.BlockNode, env: Environment): Value.Value | Value.ReturnValue {
    let lastEvaluated: Value.Value | null = null;

    for (let i = 0; i < node.statements.length; ++i) {
      const evaluated = this.evaluateStatement(node.statements[i], env);

      if (evaluated.type === "return") {
        return evaluated;
      }

      lastEvaluated = evaluated;
    }

    return lastEvaluated ?? this.createEmptyValue(node.range);
  }

  private evaluateExpressionStatement(node: Node.ExpressionStatementNode, env: Environment): Value.Value {
    return this.evaluateExpression(node.expression, env);
  }

  private evaluateExpression(node: Node.ExpressionNode, env: Environment): Value.Value {
    if (node.type === "number") {
      return this.createNumberValue(node.value, node.range);
    }
    if (node.type === "boolean") {
      return this.createBooleanValue(node.value, node.range);
    }
    if (node.type === "string") {
      return this.createStringValue(node.value, node.range);
    }
    if (node.type === "list") {
      return this.createListValue(node.elements, node.range, env);
    }
    if (node.type === "table") {
      return this.createTableValue(node.elements, node.range, env);
    }
    if (node.type === "prefix") {
      return this.evaluatePrefixExpression(node, env);
    }
    if (node.type === "infix") {
      return this.evaluateInfixExpression(node, env);
    }
    if (node.type === "assignment") {
      return this.evaluateAssignment(node, env);
    }
    if (node.type === "identifier") {
      return this.evaluateIdentifier(node, env);
    }
    if (node.type === "function") {
      return this.evaluateFunctionExpression(node, env);
    }
    if (node.type === "call") {
      return this.evaluateCall(node, env);
    }

    const _never: never = node;
    return _never;
  }

  private evaluatePrefixExpression(node: Node.PrefixNode, env: Environment): Value.Value {
    const right = this.evaluateExpression(node.right, env);

    if ((node.prefix === "+" || node.prefix === "-") && right.type === "number") {
      return this.evaluatePrefixNumberExpression(node.prefix, right);
    }
    if (node.prefix === "!" && right.type === "boolean") {
      return this.evaluatePrefixBooleanExpression(node.prefix, right);
    }

    throw new BadPrefixExpressionError(node.range);
  }

  private evaluateInfixExpression(node: Node.InfixNode, env: Environment): Value.Value {
    const left = this.evaluateExpression(node.left, env);
    const right = this.evaluateExpression(node.right, env);

    if (left.type === "number" && right.type === "number" && this.isArithmeticInfixOperator(node.infix)) {
      const value = this.getArithmeticInfixOperationValue(left.value, right.value, node.infix);
      return this.createNumberValue(value, node.range);
    }

    if (left.type === "number" && right.type === "number" && this.isComparisonInfixOperator(node.infix)) {
      const value = this.getNumericComparisonInfixOperationValue(left.value, right.value, node.infix);
      return this.createBooleanValue(value, node.range);
    }

    if (left.type === "boolean" && right.type === "boolean" && this.isComparisonInfixOperator(node.infix)) {
      const value = this.getBooleanComparisonInfixOperationValue(left.value, right.value, node.infix);
      return this.createBooleanValue(value, node.range);
    }

    if (left.type === "string" && right.type === "string" && this.isComparisonInfixOperator(node.infix)) {
      const value = this.getStringComparisonInfixOperationValue(left.value, right.value, node.infix);
      return this.createBooleanValue(value, node.range);
    }

    throw new BadInfixExpressionError(node.range);
  }

  private evaluateIdentifier(node: Node.IdentifierNode, env: Environment): Value.Value {
    const name = node.value;
    const envValue = env.get(name);

    if (envValue !== null) {
      return envValue;
    }

    const builtinValue = builtin.get(name);
    if (builtinValue !== null) {
      return this.createBuiltinFunctionValue(builtinValue, node.range);
    }

    throw new BadIdentifierError(node.range, name);
  }

  private evaluateAssignment(node: Node.AssignmentNode, env: Environment): Value.Value {
    if (node.left.type !== "identifier") {
      throw new BadAssignmentLeftError(node.range);
    }

    const varName = node.left.value;
    const varValue = this.evaluateExpression(node.right, env);

    env.set(varName, varValue);

    return varValue; // evaluated value of assignment is the evaluated value of variable
  }

  private evaluateFunctionExpression(node: Node.FunctionNode, env: Environment): Value.Value {
    return this.createFunctionValue(node.parameters, node.body, env, node.range);
  }

  private evaluateCall(node: Node.CallNode, env: Environment): Value.Value {
    const func = this.evaluateExpression(node.func, env);

    if (func.type === "function") {
      const callArguments = this.evaluateCallArguments(node.args, env);

      const value = this.evaluateFunctionCall(func, callArguments);
      return value;
    }
    if (func.type === "builtin function") {
      const callArguments = this.evaluateCallArguments(node.args, env);

      return this.evaluateBuiltinFunctionCall(func, callArguments);
    }

    throw new Error(`expected function but received ${func.type}`);
  }

  private evaluateCallArguments(args: Node.ExpressionNode[], env: Environment): Value.Value[] {
    return args.map(arg => this.evaluateExpression(arg, env));
  }

  private evaluateFunctionCall(func: Value.FunctionValue, callArguments: Value.Value[]): Value.Value {
    const env = this.createExtendedEnvironment(func.environment, func.parameters, callArguments);

    const blockValue = this.evaluateBlock(func.body, env);
    if (blockValue.type !== "return") {
      // TODO: better error with range
      throw new Error(`expected return value in function but it didn't`);
    }

    const returnValue = blockValue.value;
    return returnValue;
  }

  private evaluateBuiltinFunctionCall(func: Value.BuiltinFunctionValue, callArguments: Value.Value[]): Value.Value {
    const callbackOnStdout = this.callbackOnStdout === undefined ? undefined : this.callbackOnStdout.bind(this);
    return func.body(callArguments, callbackOnStdout);
  }

  private getBooleanComparisonInfixOperationValue(
    left: boolean,
    right: boolean,
    operator: ComparisonOperator,
  ): boolean {
    return this.getComparisonInfixOperationValue<boolean>(left, right, operator);
  }

  private getNumericComparisonInfixOperationValue(left: number, right: number, operator: ComparisonOperator): boolean {
    return this.getComparisonInfixOperationValue<number>(left, right, operator);
  }

  private getStringComparisonInfixOperationValue(left: string, right: string, operator: ComparisonOperator): boolean {
    return this.getComparisonInfixOperationValue<string>(left, right, operator);
  }

  private getComparisonInfixOperationValue<T>(left: T, right: T, operator: ComparisonOperator): boolean {
    if (operator === "==") {
      return left === right;
    }
    if (operator === "!=") {
      return left !== right;
    }
    if (operator === ">") {
      return left > right;
    }
    if (operator === "<") {
      return left < right;
    }
    if (operator === ">=") {
      return left >= right;
    }
    if (operator === "<=") {
      return left <= right;
    }

    const _never: never = operator;
    return _never;
  }

  private getArithmeticInfixOperationValue(left: number, right: number, operator: "+" | "-" | "*" | "/"): number {
    if (operator === "+") {
      return left + right;
    }
    if (operator === "-") {
      return left - right;
    }
    if (operator === "*") {
      return left * right;
    }
    if (operator === "/") {
      return left / right;
    }

    const _never: never = operator;
    return _never;
  }

  private evaluatePrefixNumberExpression(prefix: "+" | "-", node: Node.NumberNode): Value.NumberValue {
    if (prefix === "+") {
      return this.createNumberValue(node.value, node.range);
    }
    if (prefix === "-") {
      return this.createNumberValue(-node.value, node.range);
    }

    const _never: never = prefix;
    return _never;
  }

  private evaluatePrefixBooleanExpression(prefix: "!", node: Node.BooleanNode): Value.BooleanValue {
    if (prefix === "!") {
      return this.createBooleanValue(!node.value, node.range);
    }

    const _never: never = prefix;
    return _never;
  }

  private createExtendedEnvironment(
    oldEnv: Environment,
    identifiers: Node.IdentifierNode[],
    values: Value.Value[],
  ): Environment {
    const newEnv = new Environment(oldEnv);

    for (let i = 0; i < identifiers.length; ++i) {
      const name = identifiers[i].value;
      const value = values[i];
      newEnv.set(name, value);
    }

    return newEnv;
  }

  // create value functions: wrappers for consistent representation

  private createNumberValue(val: number, range: Range): Value.NumberValue {
    return value.createNumberValue({ value: val }, String(val), range);
  }

  private createBooleanValue(val: boolean, range: Range): Value.BooleanValue {
    return value.createBooleanValue({ value: val }, val ? "참" : "거짓", range);
  }

  private createStringValue(val: string, range: Range): Value.StringValue {
    return value.createStringValue({ value: val }, val, range);
  }

  private createListValue(elements: Node.ExpressionNode[], range: Range, env: Environment): Value.ListValue {
    const evaluated = this.evaluateListElements(elements, env);
    const representation = getListRepresentation(evaluated);

    return value.createListValue({ elements: evaluated }, representation, range);
  }

  private evaluateListElements(elements: Node.ExpressionNode[], env: Environment): Value.ListableValue[] {
    return elements.map(node => {
      const e = this.evaluateExpression(node, env);
      // TODO: can be parser-level error if elements restricted to be the "listable" type?
      //       see also evaluateTableElements for the same problem
      if (!isListableValue(e)) {
        throw new BadListElementTypeError(node.range);
      }

      return e;
    });
  }

  private createTableValue(
    elements: [Node.ExpressionNode, Node.ExpressionNode][],
    range: Range,
    env: Environment,
  ): Value.TableValue {
    const evaluated = this.evaluateTableElements(elements, env);
    const representation = getTableRepresentation(evaluated);

    return value.createTableValue({ elements: evaluated }, representation, range);
  }

  private evaluateTableElements(
    elements: [Node.ExpressionNode, Node.ExpressionNode][],
    env: Environment,
  ): Map<Value.KeyableValue, Value.ListableValue> {
    return new Map(
      elements.map(([keyNode, valueNode]) => {
        const k = this.evaluateExpression(keyNode, env);
        if (!isKeyableValue(k)) {
          throw new BadTableKeyTypeError(k.range);
        }
        const v = this.evaluateExpression(valueNode, env);
        if (!isListableValue(v)) {
          throw new BadTableKeyTypeError(v.range);
        }

        return [k, v];
      }),
    );
  }

  private createEmptyValue(range: Range): Value.EmptyValue {
    return value.createEmptyValue({ value: null }, "(없음)", range);
  }

  private createFunctionValue(
    parameters: Node.FunctionNode["parameters"],
    body: Node.FunctionNode["body"],
    environment: Environment,
    range: Range,
  ): Value.FunctionValue {
    return value.createFunctionValue({ parameters, body, environment }, "(함수)", range);
  }

  private createBuiltinFunctionValue(func: BuiltinFunction, range: Range): Value.BuiltinFunctionValue {
    return value.createBuiltinFunctionValue({ body: func }, "(내장 함수)", range);
  }

  // util predicate functions

  private isArithmeticInfixOperator(operator: string): operator is "+" | "-" | "*" | "/" {
    return ["+", "-", "*", "/"].some(infix => infix === operator);
  }

  private isComparisonInfixOperator(operator: string): operator is ComparisonOperator {
    return ["==", "!=", ">", "<", ">=", "<="].some(infix => infix === operator);
  }
}

export { default as Environment } from "./environment";
