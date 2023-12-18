import Lexer from "./lexer";
import Parser from "./parser";
import Evaluator from "./evaluator";

const execute = (input: string): string => {
  const lexer = new Lexer(input);
  const parser = new Parser(lexer);
  const parsed = parser.parseProgram();

  const evaluator = new Evaluator();
  const evaluated = evaluator.evaluate(parsed);

  return String(evaluated);
};
export default execute;
