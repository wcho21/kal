import {
  makeProgram,
  makeIdentifier,
  makeAssignment,
  makeNumberNode,
  makeBooleanNode,
  makeStringNode,
  makeExpressionStatement,
  makePrefixExpression,
  makeInfixExpression,
} from "./syntax-tree";
import type {
  Program,
  Statement,
  NumberNode,
  BooleanNode,
  StringNode,
  ExpressionStatement,
  Expression,
  Identifier,
  InfixExpression,
} from "./syntax-tree";
import Lexer from "../lexer";
import TokenReader from "./token-reader";

type BindingPower = number;
const bindingPower = {
  lowest: 0,
  assignment: 30,
  comparison: 40,
  summative: 50,
  productive: 60,
  prefix: 70,
};
const getBindingPower = (infix: string): BindingPower => {
  switch (infix) {
    case "=":
      return bindingPower.assignment;
    case "==":
    case "!=":
    case ">":
    case "<":
    case ">=":
    case "<=":
      return bindingPower.comparison;
    case "+":
    case "-":
      return bindingPower.summative;
    case "*":
    case "/":
      return bindingPower.productive;
    default:
      return bindingPower.lowest;
  }
};

export default class Parser {
  private buffer: TokenReader;

  constructor(lexer: Lexer) {
    this.buffer = new TokenReader(lexer);
  }

  parseProgram(): Program {
    const program = makeProgram();

    while (!this.buffer.isEnd()) {
      const statement = this.parseStatement();
      if (statement !== null) {
        program.statements.push(statement);
      }
    }

    return program;
  }

  private parseStatement(): Statement {
    return this.parseExpressionStatement();
  }

  private parseExpressionStatement(): ExpressionStatement {
    const expression = this.parseExpression(bindingPower.lowest);

    return makeExpressionStatement(expression);
  }

  private parseExpression(threshold: BindingPower): Expression  {
    let expression = this.parsePrefixExpression();

    while (true) {
      const nextBindingPower = getBindingPower(this.buffer.read().value);
      if (nextBindingPower <= threshold) {
        break;
      }

      const infixExpression = this.parseInfixExpression(expression);
      if (infixExpression === null) {
        break;
      }

      expression = infixExpression;
    }

    return expression;
  }

  private parsePrefixExpression(): Expression {
    const token = this.buffer.read();
    this.buffer.next(); // eat token

    if (token.type === "number literal") {
      const numberNode = this.parseNumberLiteral(token.value);
      return numberNode;
    }
    if (token.type === "boolean literal") {
      const booleanNode = this.parseBooleanLiteral(token.value);
      return booleanNode;
    }
    if (token.type === "string literal") {
      const stringNode = this.parseStringLiteral(token.value);
      return stringNode;
    }
    if (token.type === "identifier") {
      const identifier = makeIdentifier(token.value);
      return identifier;
    }
    if (
      token.type === "operator" &&
      (token.value === "+" || token.value === "-" || token.value === "!")
    ) {
      const subExpression = this.parseExpression(bindingPower.prefix);
      const prefix = token.value;
      const expression = makePrefixExpression(prefix, subExpression);
      return expression;
    }
    if (token.type === "group delimiter" && token.value === "(") {
      const groupedExpression = this.parseExpression(bindingPower.lowest);

      const nextToken = this.buffer.read();
      this.buffer.next(); // eat token
      if (nextToken.type !== "group delimiter" || nextToken.value !== ")") {
        throw new Error(`expected ) but received ${nextToken.type}`);
      }

      return groupedExpression;
    }

    throw new Error(`bad token type ${token.type} (${token.value}) for prefix expression`);
  }

  private parseInfixExpression(left: Expression): Expression | null {
    let token = this.buffer.read();
    if (token.type !== "operator") {
      return null;
    }

    const infix = token.value;
    this.buffer.next(); // eat infix token

    if (infix === "=" && left.type === "identifier") {
      return this.parseAssignment(left);
    }
    if (
      infix === "+" ||
      infix === "-" ||
      infix === "*" ||
      infix === "/" ||
      infix === "!=" ||
      infix === "==" ||
      infix === ">" ||
      infix === "<" ||
      infix === ">=" ||
      infix === "<="
    ) {
      return this.parseArithmeticInfixExpression(left, infix);
    }
    return null;
  }

  private parseAssignment(left: Identifier): Expression {
    const infix = "=";
    const infixBindingPower = getBindingPower(infix);

    const right = this.parseExpression(infixBindingPower);

    return makeAssignment(left, right);
  }

  private parseArithmeticInfixExpression(left: Expression, infix: InfixExpression["infix"]): Expression {
    const infixBindingPower = getBindingPower(infix);

    const right = this.parseExpression(infixBindingPower);

    return makeInfixExpression(infix, left, right);
  }

  private parseNumberLiteral(literal: string): NumberNode {
    const parsedNumber = Number(literal);
    if (Number.isNaN(parsedNumber)) {
      throw new Error(`expected non-NaN number, but received '${literal}'`);
    }

    return makeNumberNode(parsedNumber);
  }

  private parseBooleanLiteral(literal: "참" | "거짓"): BooleanNode {
    const parsedValue = literal === "참";

    return makeBooleanNode(parsedValue);
  }

  private parseStringLiteral(literal: string): StringNode {
    return makeStringNode(literal);
  }
}

export type * from "./syntax-tree";
