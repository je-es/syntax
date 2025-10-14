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
  lexer: () => lexer2,
  parser: () => parser2
});
module.exports = __toCommonJS(syntax_exports);
var lexer = __toESM(require("@je-es/lexer"));
var parser = __toESM(require("@je-es/parser"));
var lexer2 = __toESM(require("@je-es/lexer"));
var parser2 = __toESM(require("@je-es/parser"));
var Syntax = class _Syntax {
  constructor(config) {
    this.config = config;
    this.parser = new parser.Parser(config.parser, config.settings);
    this.lsp = config.lsp;
  }
  parse(input) {
    const tokens = lexer.tokenize(input, this.config.lexer);
    return this.parser.parse(tokens);
  }
  lint(input) {
    const tokens = lexer.tokenize(input, this.config.lexer);
    return this.parser.parse(tokens).errors;
  }
  from(ruleName, debug = null) {
    const newConfig = __spreadValues({}, this.config);
    if (debug !== null) {
      newConfig.settings.debug = debug;
    }
    newConfig.settings.startRule = ruleName;
    return new _Syntax(newConfig);
  }
  /**
   * Get LSP keywords grouped by category.
   */
  getLSPKeywords() {
    var _a;
    return (_a = this.lsp) == null ? void 0 : _a.keywords;
  }
  /**
   * Get all keywords as a flat array.
   */
  getAllKeywords() {
    var _a;
    if (!((_a = this.lsp) == null ? void 0 : _a.keywords)) return [];
    const { declarations, types, controlFlow, modifiers, operators, literals } = this.lsp.keywords;
    return [...declarations, ...types, ...controlFlow, ...modifiers, ...operators, ...literals];
  }
  /**
   * Get documentation for a specific keyword.
   */
  getKeywordDoc(keyword) {
    var _a, _b;
    return (_b = (_a = this.lsp) == null ? void 0 : _a.keywordDocs) == null ? void 0 : _b[keyword];
  }
  /**
   * Get documentation for a builtin.
   */
  getBuiltinDoc(builtin) {
    var _a, _b;
    return (_b = (_a = this.lsp) == null ? void 0 : _a.builtinDocs) == null ? void 0 : _b[builtin];
  }
  /**
   * Check if a string is a keyword in this syntax.
   */
  isKeyword(str) {
    var _a;
    if (!((_a = this.lsp) == null ? void 0 : _a.keywords)) return false;
    const all = this.getAllKeywords();
    return all.includes(str);
  }
  /**
   * Check if a string is a builtin in this syntax.
   */
  isBuiltin(str) {
    var _a;
    if (!((_a = this.lsp) == null ? void 0 : _a.keywords)) return false;
    return this.lsp.keywords.builtins.includes(str);
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