import Evaluator, { Environment } from "./evaluator";
import Lexer from "./lexer";
import Parser from "./parser";

export const execute = (input: string, callbackOnStdout?: (toWrite: string) => void): string => {
  const lexer = new Lexer(input);
  const parser = new Parser(lexer);
  const parsed = parser.parseSource();

  const evaluator = new Evaluator();
  if (callbackOnStdout !== undefined) {
    evaluator.onStdout(callbackOnStdout);
  }

  const environment = new Environment();
  const evaluated = evaluator.evaluate(parsed, environment);

  return String(evaluated.representation);
};
