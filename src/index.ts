import Lexer from "./lexer";
import Parser from "./parser";
import CodeGenerator from "./code-generator";
import VirtualMachine from "./virtual-machine";

export class Compiler {
  private lexer: Lexer;
  private parser: Parser;
  private codeGenerator: CodeGenerator;

  constructor() {
    this.lexer = new Lexer() ;
    this.parser = new Parser();
    this.codeGenerator = new CodeGenerator();
  }

  compile() {
    const tokens = this.lexer.getTokens();
    const syntaxTree = this.parser.parse(tokens);
    const codes = this.codeGenerator.generate(syntaxTree);

    return codes;
  }
}

export class Executor {
  private virtualMachine: VirtualMachine;

  constructor() {
    this.virtualMachine = new VirtualMachine();
  }

  execute(code: any) {
    const output = this.virtualMachine.execute(code);

    return output;
  }
}
