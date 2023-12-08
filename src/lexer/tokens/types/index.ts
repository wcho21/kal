export type TokenType = Symbol;

// NOTE:
// define token type as Symbol, since the value is not important and
// it's ok if can be compared by value (that is, not a reference type)
//
// give descriptive name to variables (possibly quite long though)
// rather than cryptic one

// operators
export const assign: TokenType = Symbol("= token type");
export const plus: TokenType = Symbol("+ token type");
export const minus: TokenType = Symbol("- token type");
export const asterisk: TokenType = Symbol("* token type");
export const slash: TokenType = Symbol("/ token type");
export const bang: TokenType = Symbol("! token type");
export const equal: TokenType = Symbol("== token type");
export const notEqual: TokenType = Symbol("!= token type");
export const greaterThan: TokenType = Symbol("> than token type");
export const greaterThanOrEqualTo: TokenType = Symbol(">= than or equal to token type");
export const lessThan: TokenType = Symbol("< token type");
export const lessThanOrEqualTo: TokenType = Symbol("<= token type");

// keywords
export const func: TokenType = Symbol("function token type");
export const variable: TokenType = Symbol("variable token type");
export const condIf: TokenType = Symbol("if token type");
export const condElse: TokenType = Symbol("else token type");
export const funcReturn: TokenType = Symbol("return token type");
export const boolTrue: TokenType = Symbol("true token type");
export const boolFalse: TokenType = Symbol("false token type");

// delimiters
export const leftParen: TokenType = Symbol("( token type");
export const rightParen: TokenType = Symbol(") token type");
export const leftBrace: TokenType = Symbol("{ token type");
export const rightBrace: TokenType = Symbol("} token type");
export const comma: TokenType = Symbol(", token type");
export const semicolon: TokenType = Symbol("; token type");

// literals
export const integer: TokenType = Symbol("integer token type");
export const unexpected: TokenType = Symbol("unexpected token type");

// meta
export const identifier: TokenType = Symbol("identifier token type");
export const endOfFile: TokenType = Symbol("end of file token type");
