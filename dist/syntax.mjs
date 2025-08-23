var __defProp = Object.defineProperty;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};

// lib/syntax.ts
import * as lexer from "@je-es/lexer";
import * as parser from "@je-es/parser";
var Syntax = class _Syntax {
  constructor(config) {
    this.config = config;
    this.parser = new parser.Parser(config.parser, config.settings);
  }
  /**
   * Parse a given input string into a structured syntax tree using the
   * syntax's parser.
   *
   * @param input - The string to parse.
   * @returns The parse result, including the syntax tree and any errors.
   */
  parse(input) {
    const tokens = lexer.tokenize(input, this.config.lexer);
    return this.parser.parse(tokens);
  }
  /**
   * Similar to parse, but returns only the errors in the parse result.
   *
   * @param input - The string to lint.
   * @returns An array of errors found in the input string.
   */
  lint(input) {
    const tokens = lexer.tokenize(input, this.config.lexer);
    return this.parser.parse(tokens).errors;
  }
  /**
   * Create a new Syntax object with the given start rule and debug level,
   * using the current syntax's configuration.
   *
   * @param ruleName  - The start rule for the new syntax.
   * @param debug     - The debug level for the new syntax. If null, the debug level
   *                    from the current syntax's settings will be used.
   * @returns A new Syntax object with the given start rule and debug level.
  */
  from(ruleName, debug = null) {
    const newConfig = __spreadValues({}, this.config);
    if (debug !== null) {
      newConfig.settings.debug = debug;
    }
    newConfig.settings.startRule = ruleName;
    const newLang = new _Syntax(newConfig);
    return newLang;
  }
};
function create(config) {
  return new Syntax(config);
}
export {
  Syntax,
  create,
  lexer,
  parser
};
//# sourceMappingURL=syntax.mjs.map