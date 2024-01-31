import Lexer from "./lexer";
import Parser from "./parser/v2";
import Evaluator, { Environment } from "./evaluator/v2";

export const execute = (input: string): string => {
  const lexer = new Lexer(input);
  const parser = new Parser(lexer);
  const parsed = parser.parseSource();

  const evaluator = new Evaluator();
  const environment = new Environment();
  const evaluated = evaluator.evaluate(parsed, environment);

  return String(evaluated.representation);
};
