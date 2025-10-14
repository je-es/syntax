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
import * as lexer2 from "@je-es/lexer";
import * as parser2 from "@je-es/parser";
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
export {
  Syntax,
  create,
  lexer2 as lexer,
  parser2 as parser
};
//# sourceMappingURL=syntax.mjs.map