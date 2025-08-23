"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __getProtoOf = Object.getPrototypeOf;
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
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// lib/syntax.ts
var syntax_exports = {};
__export(syntax_exports, {
  Syntax: () => Syntax,
  create: () => create,
  lexer: () => lexer,
  parser: () => parser
});
module.exports = __toCommonJS(syntax_exports);
var lexer = __toESM(require("@je-es/lexer"));
var parser = __toESM(require("@je-es/parser"));
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Syntax,
  create,
  lexer,
  parser
});
//# sourceMappingURL=syntax.js.map