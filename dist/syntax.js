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
  parser: () => parser_exports
});
module.exports = __toCommonJS(syntax_exports);
var lexer = __toESM(require("@je-es/lexer"));

// ../parser/dist/parser.mjs
var parser_exports = {};
__export(parser_exports, {
  ERRORS: () => ERRORS,
  Parser: () => Parser,
  Result: () => Result,
  choice: () => choice,
  createRule: () => createRule,
  error: () => error,
  errorRecoveryStrategies: () => errorRecoveryStrategies,
  loud: () => loud,
  oneOrMore: () => oneOrMore,
  optional: () => optional,
  parse: () => parse,
  repeat: () => repeat,
  rule: () => rule,
  seq: () => seq,
  silent: () => silent,
  token: () => token,
  zeroOrMore: () => zeroOrMore,
  zeroOrOne: () => zeroOrOne
});
var __defProp2 = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols2 = Object.getOwnPropertySymbols;
var __hasOwnProp2 = Object.prototype.hasOwnProperty;
var __propIsEnum2 = Object.prototype.propertyIsEnumerable;
var __defNormalProp2 = (obj, key, value) => key in obj ? __defProp2(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues2 = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp2.call(b, prop))
      __defNormalProp2(a, prop, b[prop]);
  if (__getOwnPropSymbols2)
    for (var prop of __getOwnPropSymbols2(b)) {
      if (__propIsEnum2.call(b, prop))
        __defNormalProp2(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
var Result = class _Result {
  // Initialization
  constructor(status, source, mode, span) {
    this.span = { start: -99, end: -99 };
    this.status = "unset";
    this.source = null;
    this.mode = "unset";
    this.errors = [];
    this.status = status;
    this.source = source;
    this.mode = mode;
    this.span = span;
  }
  // └────────────────────────────────────────────────────────────────────┘
  // ┌──────────────────────────────── MAIN ──────────────────────────────┐
  // └────────────────────────────────────────────────────────────────────┘
  // ┌─────────────────────────────── FACTORY ────────────────────────────┐
  clone() {
    const res = new _Result(this.status, this.source, this.mode, this.span);
    res.errors = [...this.errors];
    return res;
  }
  static create(status, source, mode, span) {
    return new _Result(status, source, mode, span);
  }
  static createAsToken(status, source, span) {
    var _a, _b;
    const newSource = {
      source_kind: "token-source",
      kind: (_a = source == null ? void 0 : source.kind) != null ? _a : "unset",
      value: (_b = source == null ? void 0 : source.value) != null ? _b : void 0,
      span
    };
    return _Result.create(status, newSource, "token", span);
  }
  static createAsOptional(status, source, span) {
    const newSource = {
      source_kind: "optional-source",
      result: source
    };
    return _Result.create(status, newSource, "optional", span);
  }
  static createAsChoice(status, source, index, span) {
    const newSource = {
      source_kind: "choice-source",
      atIndex: index,
      result: source
    };
    return _Result.create(status, newSource, "choice", span);
  }
  static createAsRepeat(status, source, span) {
    const newSource = {
      source_kind: "repeat-source",
      result: source != null ? source : []
    };
    return _Result.create(status, newSource, "repeat", span);
  }
  static createAsSequence(status, source, span) {
    const newSource = {
      source_kind: "sequence-source",
      result: source != null ? source : []
    };
    return _Result.create(status, newSource, "seq", span);
  }
  static createAsCustom(status, name, data, span) {
    const newSource = {
      source_kind: "custom-source",
      tag: name,
      data
    };
    return _Result.create(status, newSource, "custom", span);
  }
  withError(err) {
    this.errors.push(err);
    return this;
  }
  // └────────────────────────────────────────────────────────────────────┘
  // ┌──────────────────────────────── IS_X ──────────────────────────────┐
  isPassed() {
    return this.status === "passed";
  }
  isFullyPassed() {
    if (!this.isPassed()) return false;
    if (this.isOptional() && !this.isOptionalPassed()) return false;
    return true;
  }
  isFailed() {
    return this.status === "failed";
  }
  isUnset() {
    return this.status === "unset";
  }
  isToken() {
    return this.mode === "token";
  }
  isOptional() {
    return this.mode === "optional";
  }
  isOptionalPassed() {
    return this.isOptional() && this.source.result !== null;
  }
  isChoice() {
    return this.mode === "choice";
  }
  isRepeat() {
    return this.mode === "repeat";
  }
  isSequence() {
    return this.mode === "seq";
  }
  isCustom(tag) {
    if (this.mode === "custom") {
      if (tag) {
        return this.source.tag == tag;
      } else return true;
    }
    return false;
  }
  // └────────────────────────────────────────────────────────────────────┘
  // ┌────────────────────────────── GETTERS ─────────────────────────────┐
  getTokenKind() {
    if (this.isToken()) {
      return this.source.kind;
    }
    return void 0;
  }
  getTokenValue() {
    if (this.isToken()) {
      if (this.source.value === void 0) {
        return null;
      }
      return this.source.value;
    }
    return void 0;
  }
  getTokenSpan() {
    if (this.isToken()) {
      return this.source.span;
    }
    return void 0;
  }
  getTokenData() {
    if (this.isToken()) {
      return {
        kind: this.source.kind,
        value: this.source.value,
        span: this.source.span
      };
    }
    return void 0;
  }
  getOptionalResult() {
    if (this.isOptionalPassed()) {
      return this.source.result;
    }
    return void 0;
  }
  getChoiceIndex() {
    if (this.isChoice()) {
      return this.source.atIndex;
    }
    return void 0;
  }
  getChoiceResult() {
    if (this.isChoice()) {
      return this.source.result;
    }
    return void 0;
  }
  getRepeatCount() {
    if (this.isRepeat()) {
      return this.source.result.length;
    }
    return void 0;
  }
  getRepeatResult() {
    if (this.isRepeat()) {
      return this.source.result;
    }
    return void 0;
  }
  getSequenceCount() {
    if (this.isSequence()) {
      return this.source.result.length;
    }
    return void 0;
  }
  getSequenceResult() {
    if (this.isSequence()) {
      return this.source.result;
    }
    return void 0;
  }
  getCustomData() {
    if (this.isCustom()) {
      return this.source.data;
    }
    return void 0;
  }
  // └────────────────────────────────────────────────────────────────────┘
  // ┌──────────────────────────────── HELP ──────────────────────────────┐
  hasErrors() {
    return this.errors.length > 0;
  }
  // └────────────────────────────────────────────────────────────────────┘
};
var ERRORS = {
  // Core parsing errors
  LEXICAL_ERROR: "LEXICAL_ERROR",
  TOKEN_EXPECTED_EOF: "TOKEN_EXPECTED_EOF",
  TOKEN_MISMATCH: "TOKEN_MISMATCH",
  RULE_FAILED: "RULE_FAILED",
  BUILD_FUNCTION_FAILED: "BUILD_FUNCTION_FAILED",
  REPEAT_MIN_NOT_MET: "REPEAT_MIN_NOT_MET",
  SEQUENCE_FAILED: "SEQUENCE_FAILED",
  CUSTOM_ERROR: "CUSTOM_ERROR",
  // Choice and alternatives
  CHOICE_ALL_FAILED: "CHOICE_ALL_FAILED",
  // System errors
  FATAL_ERROR: "FATAL_ERROR",
  UNKNOWN_ERROR: "UNKNOWN_ERROR",
  // Recovery and validation
  RECOVERY_CUSTOM: "RECOVERY_CUSTOM"
};
var Parser = class _Parser {
  // Initialization
  constructor(rules, settings) {
    this.tokens = [];
    this.ast = [];
    this.errors = [];
    this.index = 0;
    this.depth = 0;
    this.rootStartIndex = 0;
    this.indentLevel = 0;
    this.startTime = 0;
    this.errorSeq = 0;
    this.memoCache = /* @__PURE__ */ new Map();
    this.ignoredSet = /* @__PURE__ */ new Set();
    this.memoHits = 0;
    this.memoMisses = 0;
    this.silentContextStack = [];
    this.lastVisitedIndex = 0;
    this.lastHandledRule = "unknown";
    this.ruleStack = [];
    this.patternStack = [];
    this.lastInnerRule = "unknown";
    this.lastCompletedRule = "unknown";
    this.successfulRules = [];
    this.globalSuccessRules = [];
    this.lastLeafRule = "unknown";
    this.rules = new Map(rules.map((rule2) => [rule2.name, rule2]));
    this.settings = this.normalizeSettings(settings);
    this.debugLevel = this.settings.debug;
    this.ignoredSet = new Set(this.settings.ignored);
    this.stats = { tokensProcessed: 0, rulesApplied: 0, errorsRecovered: 0, parseTimeMs: 0 };
    const grammarIssues = this.validateGrammar();
    if (grammarIssues.length > 0) {
      throw new Error(`Grammar validation failed: ${grammarIssues.join(", ")}`);
    }
  }
  // └────────────────────────────────────────────────────────────────────┘
  // ┌──────────────────────────────── MAIN ──────────────────────────────┐
  parse(tokens) {
    this.resetState(tokens);
    this.startTime = Date.now();
    this.log("rules", `\u{1F680} Parse started: ${tokens.length} tokens`);
    if (!(tokens == null ? void 0 : tokens.length)) {
      return { ast: [], errors: [] };
    }
    const errorToken = tokens.find((token2) => token2.kind === "error");
    if (errorToken) {
      return {
        ast: [],
        errors: [this.createError(ERRORS.LEXICAL_ERROR, `Unexpected token '${errorToken.value}'`, _Parser.hanldeErrorSpan(errorToken.span), 0, 0, this.lastHandledRule)]
      };
    }
    try {
      const startRule = this.rules.get(this.settings.startRule);
      if (!startRule) {
        throw new Error(`Start rule '${this.settings.startRule}' not found`);
      }
      this.skipIgnored();
      this.parseWithRecovery(startRule);
      this.skipIgnored();
    } catch (err) {
      this.handleFatalError(err);
    }
    this.stats.parseTimeMs = Date.now() - this.startTime;
    this.log("rules", `\u2705 Parse completed: ${this.ast.length} nodes, ${this.errors.length} errors (${this.stats.parseTimeMs}ms)`);
    this.log("verbose", `\u{1F4CA} Memo stats: ${this.memoHits} hits, ${this.memoMisses} misses, ${this.memoCache.size} cached entries`);
    return {
      ast: this.ast,
      errors: this.errors,
      statistics: this.stats
    };
  }
  parseWithRecovery(startRule) {
    var _a;
    const maxErrors = this.settings.errorRecovery.maxErrors;
    let consecutiveErrors = 0;
    while (this.index < this.tokens.length && (maxErrors === 0 || this.errors.length < maxErrors)) {
      const beforeIndex = this.index;
      this.rootStartIndex = beforeIndex;
      try {
        const result = this.parsePattern(startRule.pattern, startRule);
        if (result.status === "passed") {
          const processed = ((_a = startRule.options) == null ? void 0 : _a.build) ? this.safeBuild(startRule.options.build, result) : result;
          if (processed !== null) {
            this.ast.push(processed);
          }
        }
        consecutiveErrors = 0;
        if (this.index >= this.tokens.length || this.index === beforeIndex) {
          break;
        }
      } catch (error2) {
        consecutiveErrors++;
        const parseError = this.normalizeError(error2, this.getCurrentSpan());
        this.addError(parseError);
        if (this.settings.errorRecovery.mode === "resilient") {
          this.applyRecovery(startRule, beforeIndex);
          if (this.index === beforeIndex && this.index < this.tokens.length) {
            this.index++;
          }
        } else {
          break;
        }
        if (consecutiveErrors > 10) {
          break;
        }
      }
      this.skipIgnored();
    }
  }
  parsePattern(pattern, parentRule) {
    var _a;
    this.lastHandledRule = pattern.type;
    if (this.depth > this.settings.maxDepth) {
      throw new Error("Maximum parsing depth exceeded");
    }
    const shouldBeSilent = this.shouldBeSilent(pattern, parentRule);
    const isOptionalContext = (parentRule == null ? void 0 : parentRule.name) === "optional" || this.patternStack[this.patternStack.length - 1] === "optional";
    this.silentContextStack.push(shouldBeSilent || isOptionalContext);
    const startIndex = this.index;
    const memoKey = this.shouldUseMemoization(pattern, parentRule) ? this.createMemoKey(pattern, startIndex, parentRule == null ? void 0 : parentRule.name) : null;
    if (memoKey) {
      const memoResult = this.getMemoized(memoKey);
      if (memoResult.hit) {
        this.index = memoResult.newIndex;
        this.silentContextStack.pop();
        this.log("verbose", `\u{1F50B} Memo HIT: ${memoKey} \u2192 ${memoResult.newIndex}`);
        return memoResult.result;
      }
    }
    this.indentLevel++;
    this.log("patterns", `${"  ".repeat(this.indentLevel)}\u26A1 ${pattern.type}${parentRule ? ` (${parentRule.name})` : ""}${shouldBeSilent ? " [SILENT]" : ""} @${this.index}`);
    this.depth++;
    let result = Result.create("unset", null, "unset", this.getCurrentSpan());
    try {
      this.skipIgnored((_a = parentRule == null ? void 0 : parentRule.options) == null ? void 0 : _a.ignored);
      result = this.executePattern(pattern, parentRule, shouldBeSilent);
      const status = result !== null ? "\u2713" : "\u2717";
      this.log("patterns", `${"  ".repeat(this.indentLevel)}${status} ${pattern.type} \u2192 ${this.index}`);
      if (memoKey && !isOptionalContext) {
        this.memoize(memoKey, result, startIndex, this.index);
      }
      return result;
    } catch (error2) {
      if (isOptionalContext) {
        this.index = startIndex;
        this.log("patterns", `${"  ".repeat(this.indentLevel)}\u2717 ${pattern.type} (optional context, suppressed) \u2192 ${startIndex}`);
        return Result.createAsOptional("failed", null, this.getCurrentSpan());
      }
      throw error2;
    } finally {
      this.depth--;
      this.indentLevel--;
      this.silentContextStack.pop();
    }
  }
  executePattern(pattern, parentRule, shouldBeSilent) {
    switch (pattern.type) {
      case "token":
        return this.parseToken(pattern.name, pattern.value, parentRule, shouldBeSilent);
      case "rule":
        return this.parseRule(pattern.name, parentRule, shouldBeSilent);
      case "repeat":
        return this.parseRepeat(pattern.pattern, pattern.min || 0, pattern.max || Infinity, pattern.separator, parentRule, shouldBeSilent);
      case "seq":
        return this.parseSequence(pattern.patterns, parentRule, shouldBeSilent);
      case "choice":
        return this.parseChoice(pattern.patterns, parentRule, shouldBeSilent);
      case "optional":
        return this.parseOptional(pattern.pattern, parentRule);
      default:
        throw new Error(`Unknown pattern type: ${pattern.type}`);
    }
  }
  parseToken(tokenName, tokenValue, parentRule, shouldBeSilent) {
    this.lastHandledRule = (parentRule == null ? void 0 : parentRule.name) || tokenName;
    this.log("tokens", `\u2192 ${tokenName} @${this.index}`);
    this.lastVisitedIndex = this.index;
    if (this.index >= this.tokens.length) {
      this.log("tokens", `\u2717 Expected '${tokenName}', got 'EOF' @${this.index}`);
      if (shouldBeSilent) {
        return Result.create("failed", null, "unset", this.getCurrentSpan());
      }
      const error3 = this.createError(
        ERRORS.TOKEN_EXPECTED_EOF,
        `Expected '${tokenName}', got 'EOF'`,
        this.getCurrentSpan(),
        0,
        this.index,
        this.lastHandledRule,
        this.getInnerMostRule()
      );
      const finalError = this.getCustomErrorOr(parentRule, error3);
      return Result.createAsToken("failed", null, this.getCurrentSpan()).withError(finalError);
    }
    const token2 = this.getCurrentToken();
    if (token2.kind === tokenName) {
      if (tokenValue && token2.value !== tokenValue) {
        const error3 = this.createError(
          ERRORS.TOKEN_MISMATCH,
          `Expected '${tokenName}' with value '${tokenValue}', got '${token2.value}'`,
          this.getCurrentSpan(),
          0,
          this.index,
          this.lastHandledRule,
          this.getInnerMostRule()
        );
        this.handleParseError(error3, parentRule);
      } else {
        const consumedToken = __spreadValues2({}, token2);
        this.index++;
        this.stats.tokensProcessed++;
        this.log("tokens", `\u2713 ${tokenName} = "${token2.value}" @${this.index - 1}`);
        return Result.createAsToken("passed", consumedToken, consumedToken.span);
      }
    }
    this.log("tokens", `\u2717 Expected '${tokenName}', got '${token2.kind}' @${this.lastVisitedIndex}`);
    if (shouldBeSilent) {
      return Result.create("failed", null, "unset", token2.span);
    }
    const error2 = this.createError(
      ERRORS.TOKEN_MISMATCH,
      `Expected '${tokenName}', got '${token2.kind}'`,
      _Parser.hanldeErrorSpan(this.getCurrentSpan()),
      0,
      this.lastVisitedIndex,
      this.lastHandledRule,
      this.getInnerMostRule(true)
    );
    this.handleParseError(error2, parentRule);
  }
  parseRule(ruleName, parentRule, shouldBeSilent) {
    var _a;
    this.lastHandledRule = ruleName;
    this.ruleStack.push(ruleName);
    this.patternStack.push("rule");
    this.lastInnerRule = ruleName;
    this.log("rules", `\u2192 ${ruleName} @${this.index} [Stack: ${this.ruleStack.join(" \u2192 ")}]`);
    this.lastVisitedIndex = this.index;
    const targetRule = this.rules.get(ruleName);
    if (!targetRule) {
      this.ruleStack.pop();
      this.patternStack.pop();
      const error2 = new Error(`Rule '${ruleName}' not found`);
      this.handleFatalError(error2);
      return Result.create("failed", null, "unset", this.getCurrentSpan()).withError(this.fetalErrorToParseError(error2));
    }
    const startIndex = this.index;
    const savedErrors = [...this.errors];
    const savedSuccessfulRules = [...this.successfulRules];
    try {
      this.stats.rulesApplied++;
      const result = this.parsePattern(targetRule.pattern, targetRule);
      if (!result.isFullyPassed()) {
        this.successfulRules = savedSuccessfulRules;
        if (shouldBeSilent) {
          this.log("rules", `\u2717 ${ruleName} (silent) @${this.lastVisitedIndex}`);
          this.ruleStack.pop();
          this.patternStack.pop();
          return Result.create("failed", null, "unset", result.span);
        }
        const error2 = this.createError(
          ERRORS.RULE_FAILED,
          `Rule '${ruleName}' failed to match`,
          this.getCurrentSpan(),
          0,
          this.lastVisitedIndex,
          this.lastHandledRule,
          this.getInnerMostRule(true)
        );
        this.ruleStack.pop();
        this.patternStack.pop();
        const finalError = this.getCustomErrorOr(parentRule, error2);
        return Result.create("failed", null, "unset", result.span).withError(finalError);
      }
      let finalResult = result;
      if (result !== null && ((_a = targetRule.options) == null ? void 0 : _a.build)) {
        const build_result = this.safeBuild(targetRule.options.build, finalResult);
        if (build_result) {
          finalResult = build_result;
        }
      }
      this.log("rules", `\u2713 RULE \u2192 ${ruleName} @${this.lastVisitedIndex}`);
      this.lastCompletedRule = ruleName;
      this.successfulRules.push(ruleName);
      this.globalSuccessRules.push(ruleName);
      this.updateLeafRule(ruleName);
      this.trimSuccessfulRules();
      this.ruleStack.pop();
      this.patternStack.pop();
      return finalResult;
    } catch (e) {
      this.successfulRules = savedSuccessfulRules;
      this.ruleStack.pop();
      this.patternStack.pop();
      if (shouldBeSilent) {
        this.index = startIndex;
        this.errors = savedErrors;
        return Result.create("failed", null, "unset", this.getCurrentSpan());
      }
      if (e instanceof Error) {
        this.handleFatalError(e);
      } else {
        this.handleParseError(e, parentRule);
      }
    }
    return Result.create("failed", null, "unset", this.getCurrentSpan());
  }
  parseOptional(pattern, parentRule) {
    var _a;
    this.log("verbose", `OPTIONAL @${this.index}`);
    this.lastHandledRule = "optional";
    this.lastVisitedIndex = this.index;
    const startIndex = this.index;
    const savedErrors = [...this.errors];
    try {
      const result = this.parsePattern(pattern, parentRule);
      if (result.isFullyPassed()) {
        this.log("verbose", `\u2713 OPTIONAL \u2192 [1 element] @${this.index}`);
        return Result.createAsOptional("passed", result, result.span);
      } else {
        this.index = startIndex;
        this.errors = savedErrors;
        this.log("verbose", `\u2713 OPTIONAL \u2192 [] (pattern returned null) @${this.index}`);
        return Result.createAsOptional("passed", null, (_a = result.span) != null ? _a : this.getCurrentSpan());
      }
    } catch (e) {
      this.index = startIndex;
      this.errors = savedErrors;
      this.log("verbose", `\u2713 OPTIONAL \u2192 [] (exception caught: ${e.msg || e}) @${this.index}`);
      return Result.createAsOptional("passed", null, this.getCurrentSpan());
    }
  }
  parseChoice(patterns, parentRule, shouldBeSilent) {
    this.log("verbose", `CHOICE[${patterns.length}] @${this.index}`);
    this.lastVisitedIndex = this.index;
    const startIndex = this.index;
    const savedErrors = [...this.errors];
    let bestResult = null;
    for (let patternIndex = 0; patternIndex < patterns.length; patternIndex++) {
      this.index = startIndex;
      this.errors = [...savedErrors];
      try {
        const result = this.parsePattern(patterns[patternIndex], parentRule);
        if (result.isFullyPassed()) {
          this.log("verbose", `\u2713 CHOICE \u2192 alt ${patternIndex + 1}/${patterns.length} succeeded @${this.lastVisitedIndex}`);
          return Result.createAsChoice("passed", result, patternIndex, result.span);
        }
        const progress = this.lastVisitedIndex - startIndex;
        const currentErrors = this.errors.slice(savedErrors.length);
        this.log("verbose", `\u2717 CHOICE \u2192 alt ${patternIndex + 1} failed, errors=${currentErrors.length}, progress=${progress}`);
        if (!bestResult || progress > bestResult.progress || progress === bestResult.progress && currentErrors.length > 0) {
          bestResult = {
            index: this.index,
            errors: currentErrors,
            span: this.getCurrentSpan(),
            progress,
            patternIndex,
            failedAt: -1
          };
        }
      } catch (error3) {
        const progress = this.lastVisitedIndex - startIndex;
        const normalizedError = this.normalizeError(error3, this.getCurrentSpan());
        this.log("verbose", `\u2717 CHOICE \u2192 alt ${patternIndex + 1} threw error: ${normalizedError.msg}, progress=${progress}`);
        if (!bestResult || progress >= bestResult.progress && error3.failedAt > bestResult.failedAt) {
          bestResult = {
            index: this.lastVisitedIndex,
            errors: [normalizedError],
            span: normalizedError.span,
            progress,
            patternIndex,
            failedAt: normalizedError.failedAt || -1
          };
        }
      }
    }
    this.index = startIndex;
    this.errors = savedErrors;
    if (shouldBeSilent) {
      return Result.create("failed", null, "unset", this.getCurrentSpan());
    }
    if (bestResult) {
      const bestError = bestResult.errors.length > 0 ? bestResult.errors[bestResult.errors.length - 1] : this.createError(
        ERRORS.CHOICE_ALL_FAILED,
        `Choice failed at alternative ${this.lastVisitedIndex + 1}`,
        bestResult.span,
        bestResult.failedAt,
        this.lastVisitedIndex,
        this.lastHandledRule
      );
      this.log("verbose", `\u2717 All alternatives failed. Best: pattern ${this.lastVisitedIndex}, progress ${bestResult.progress}, failedAt ${bestResult.failedAt}, error: ${bestError.msg}`);
      throw bestError;
    }
    const error2 = this.createError(
      ERRORS.CHOICE_ALL_FAILED,
      `Expected one of: ${patterns.map((p) => this.patternToString(p)).join(", ")}`,
      this.getCurrentSpan(),
      0,
      this.lastVisitedIndex,
      this.lastHandledRule
    );
    throw error2;
  }
  parseRepeat(pattern, min = 0, max = Infinity, separator, parentRule, shouldBeSilent) {
    var _a, _b;
    this.lastHandledRule = pattern.type;
    this.log("verbose", `REPEAT(${min}-${max}) @${this.index}`);
    this.lastVisitedIndex = this.index;
    const results = [];
    let consecutiveFailures = 0;
    const startIndex = this.index;
    while (results.length < max && this.index < this.tokens.length) {
      const iterationStart = this.index;
      const savedErrors = [...this.errors];
      try {
        const result = this.parsePattern(pattern, parentRule);
        if (!result.isFullyPassed()) {
          this.errors = savedErrors;
          if (results.length >= min) {
            break;
          } else if (shouldBeSilent || pattern.silent) {
            break;
          } else {
            consecutiveFailures++;
            if (consecutiveFailures > 3) {
              break;
            }
            if ((_a = parentRule == null ? void 0 : parentRule.options) == null ? void 0 : _a.recovery) {
              this.applyRecovery(parentRule, iterationStart);
              if (this.index === iterationStart) {
                this.index++;
              }
              continue;
            } else {
              break;
            }
          }
        }
        consecutiveFailures = 0;
        results.push(result);
        if (this.index === iterationStart) {
          this.log("verbose", `\u26A0\uFE0F No progress in repeat iteration, breaking @${this.index}`);
          break;
        }
        if (separator && results.length < max && this.index < this.tokens.length) {
          const sepStart = this.index;
          const sepSavedErrors = [...this.errors];
          try {
            const sepResult = this.parsePattern(separator, void 0);
            if (!sepResult.isFullyPassed()) {
              this.index = sepStart;
              this.errors = sepSavedErrors;
              break;
            }
          } catch (e) {
            this.index = sepStart;
            this.errors = sepSavedErrors;
            break;
          }
        }
      } catch (e) {
        consecutiveFailures++;
        this.index = iterationStart;
        this.errors = savedErrors;
        if (shouldBeSilent || results.length >= min) {
          break;
        }
        throw e;
      }
    }
    if (results.length < min) {
      if (shouldBeSilent) {
        return Result.create("failed", null, "unset", this.getCurrentSpan());
      }
      if ((_b = parentRule == null ? void 0 : parentRule.options) == null ? void 0 : _b.errors) {
        const customError = this.getCustomErrorForCondition(parentRule, 0, this.index, startIndex);
        if (customError) {
          throw customError;
        }
      }
      const error2 = this.createError(
        ERRORS.REPEAT_MIN_NOT_MET,
        `Expected at least ${min} occurrences, got ${results.length}`,
        this.getCurrentSpan(),
        0,
        this.index,
        this.lastHandledRule
      );
      throw error2;
    }
    this.log("verbose", `REPEAT \u2192 [${results.length}] @${this.index}`);
    return Result.createAsRepeat("passed", results, results.length ? {
      start: results[0].span.start,
      end: results[results.length - 1].span.end
    } : this.getCurrentSpan());
  }
  parseSequence(patterns, parentRule, shouldBeSilent) {
    var _a;
    this.log("verbose", `SEQUENCE[${patterns.length}] @${this.index}`);
    this.lastVisitedIndex = this.index;
    if (patterns.length === 0) {
      return Result.create("failed", null, "unset", this.getCurrentSpan());
    }
    const startIndex = this.index;
    const savedErrors = [...this.errors];
    const results = [];
    let lastPatternIndex = 0;
    try {
      for (lastPatternIndex = 0; lastPatternIndex < patterns.length; lastPatternIndex++) {
        const pattern = patterns[lastPatternIndex];
        const beforePatternIndex = this.index;
        const result = this.parsePattern(pattern, parentRule);
        if (!result.isPassed()) {
          if (shouldBeSilent) {
            this.index = startIndex;
            this.errors = savedErrors;
            return Result.create("failed", null, "unset", result.span);
          }
          const error2 = this.createError(
            ERRORS.SEQUENCE_FAILED,
            `Sequence failed at element ${lastPatternIndex + 1}/${patterns.length}`,
            this.getCurrentSpan(),
            lastPatternIndex,
            this.lastVisitedIndex,
            this.lastHandledRule
          );
          this.handleParseError(error2, parentRule);
        }
        results.push(result);
        if (this.index === beforePatternIndex && !pattern.silent) {
          this.log("verbose", `\u26A0\uFE0F  No progress at sequence element ${lastPatternIndex} @${this.lastVisitedIndex}`);
        }
        this.skipIgnored((_a = parentRule == null ? void 0 : parentRule.options) == null ? void 0 : _a.ignored);
      }
      this.log("verbose", `SEQUENCE \u2192 [${results.length}] @${this.lastVisitedIndex}`);
      return Result.createAsSequence("passed", results, results.length ? {
        start: results[0].span.start,
        end: results[results.length - 1].span.end
      } : this.getCurrentSpan());
    } catch (e) {
      this.index = startIndex;
      this.errors = savedErrors;
      if (!shouldBeSilent && !this.isInSilentMode()) {
        if (e instanceof Error) {
          this.handleFatalError(e);
        } else {
          const error2 = this.createError(e.code, e.msg, e.span, lastPatternIndex, this.lastVisitedIndex, this.lastHandledRule);
          this.handleParseError(error2, parentRule);
        }
      }
      return Result.create("failed", null, "unset", this.getCurrentSpan());
    }
  }
  safeBuild(buildFn, matches) {
    try {
      return buildFn(matches, this);
    } catch (error2) {
      if (!this.isInSilentMode()) {
        const isParseError = error2.span !== void 0;
        const buildError = this.createError(
          isParseError ? error2.code : ERRORS.BUILD_FUNCTION_FAILED,
          isParseError ? error2.msg : `${error2.message}`,
          isParseError ? error2.span : _Parser.hanldeErrorSpan(this.getCurrentSpan()),
          isParseError ? error2.failedAt : 0,
          isParseError ? error2.tokenIndex : this.lastVisitedIndex,
          isParseError ? error2.prevRule : this.lastHandledRule,
          isParseError ? error2.prevInnerRule : this.getInnerMostRule()
        );
        this.addError(buildError);
        this.log("errors", `Build error: ${error2.message}`);
      }
      return matches;
    }
  }
  // └────────────────────────────────────────────────────────────────────┘
  // ┌──────────────────────────────── MODE ──────────────────────────────┐
  shouldBeSilent(pattern, rule2) {
    var _a;
    return ((_a = rule2 == null ? void 0 : rule2.options) == null ? void 0 : _a.silent) === true || pattern.silent === true || this.silentContextStack.length > 0 && this.silentContextStack[this.silentContextStack.length - 1];
  }
  isInSilentMode() {
    return this.silentContextStack.length > 0 && this.silentContextStack[this.silentContextStack.length - 1];
  }
  // └────────────────────────────────────────────────────────────────────┘
  // ┌──────────────────────────────── HELP ──────────────────────────────┐
  normalizeSettings(settings) {
    const defaultSettings = {
      startRule: "root",
      errorRecovery: {
        mode: "strict",
        maxErrors: 1
      },
      ignored: ["ws"],
      debug: "off",
      maxDepth: 1e3,
      maxCacheSize: 1
      // 1 MB
    };
    if (!settings) {
      return defaultSettings;
    }
    const mergedSettings = __spreadValues2(__spreadValues2({}, defaultSettings), settings);
    if (settings == null ? void 0 : settings.errorRecovery) {
      mergedSettings.errorRecovery = __spreadValues2(__spreadValues2({}, defaultSettings.errorRecovery), settings.errorRecovery);
    }
    return mergedSettings;
  }
  validateGrammar() {
    const issues = [];
    const ruleNames = new Set(Array.from(this.rules.keys()));
    for (const [ruleName, rule2] of this.rules) {
      const referencedRules = this.extractRuleReferences(rule2.pattern);
      for (const ref of referencedRules) {
        if (!ruleNames.has(ref)) {
          issues.push(`Rule '${ruleName}' references undefined rule '${ref}'`);
        }
      }
    }
    if (!this.rules.has(this.settings.startRule)) {
      issues.push(`Start rule '${this.settings.startRule}' is not defined`);
    }
    return issues;
  }
  extractRuleReferences(pattern) {
    const refs = [];
    switch (pattern.type) {
      case "rule":
        refs.push(pattern.name);
        break;
      case "repeat":
        refs.push(...this.extractRuleReferences(pattern.pattern));
        if (pattern.separator) {
          refs.push(...this.extractRuleReferences(pattern.separator));
        }
        break;
      case "optional":
        refs.push(...this.extractRuleReferences(pattern.pattern));
        break;
      case "seq":
      case "choice":
        if (pattern.patterns) {
          for (const p of pattern.patterns) {
            refs.push(...this.extractRuleReferences(p));
          }
        }
        break;
    }
    return refs;
  }
  skipIgnored(ruleIgnored) {
    if (this.ignoredSet.size === 0 && !(ruleIgnored == null ? void 0 : ruleIgnored.length)) {
      return;
    }
    const combinedIgnored = ruleIgnored ? /* @__PURE__ */ new Set([...this.ignoredSet, ...ruleIgnored]) : this.ignoredSet;
    while (this.index < this.tokens.length) {
      const token2 = this.tokens[this.index];
      if (!combinedIgnored.has(token2.kind)) {
        break;
      }
      this.index++;
      this.stats.tokensProcessed++;
    }
  }
  skipUntilTokens(tokens) {
    if (tokens.length === 0) {
      return;
    }
    const tokenSet = new Set(tokens);
    const maxIterations = Math.min(1e4, this.tokens.length - this.index);
    let skipped = 0;
    while (this.index < this.tokens.length && skipped < maxIterations) {
      const currentToken = this.tokens[this.index];
      if (tokenSet.has(currentToken.kind)) {
        this.log("errors", `Found sync token '${currentToken.kind}' @${this.index}`);
        return;
      }
      this.index++;
      skipped++;
    }
  }
  resetState(tokens) {
    this.tokens = tokens;
    this.index = 0;
    this.errors = [];
    this.ast = [];
    this.depth = 0;
    this.errorSeq = 0;
    this.indentLevel = 0;
    this.rootStartIndex = 0;
    this.silentContextStack = [];
    this.ruleStack = [];
    this.patternStack = [];
    this.lastInnerRule = "unknown";
    this.lastCompletedRule = "unknown";
    this.successfulRules = [];
    this.globalSuccessRules = [];
    this.lastLeafRule = "unknown";
    this.memoCache.clear();
    this.memoHits = 0;
    this.memoMisses = 0;
    this.stats = {
      tokensProcessed: 0,
      rulesApplied: 0,
      errorsRecovered: 0,
      parseTimeMs: 0
    };
  }
  getCurrentToken() {
    return this.tokens[this.index];
  }
  getCurrentSpan() {
    if (this.index === 0) {
      if (this.tokens.length > 0) {
        return {
          start: this.tokens[0].span.start,
          end: this.tokens[0].span.end
        };
      }
      return { start: 0, end: 0 };
    }
    if (this.index >= this.tokens.length) {
      const lastToken = this.tokens[this.tokens.length - 1];
      return {
        start: lastToken.span.start,
        end: lastToken.span.end
      };
    }
    return this.tokens[this.index].span;
  }
  patternToString(pattern) {
    switch (pattern.type) {
      case "token":
        return `token(${pattern.name})`;
      case "rule":
        return `rule(${pattern.name})`;
      case "repeat":
        return `repeat(${this.patternToString(pattern.pattern)})`;
      case "optional":
        return `optional(${this.patternToString(pattern.pattern)})`;
      case "choice":
        return `choice(${pattern.patterns.map((p) => this.patternToString(p)).join("|")})`;
      case "seq":
        return `seq(${pattern.patterns.map((p) => this.patternToString(p)).join(" ")})`;
      default:
        return pattern.type;
    }
  }
  updateLeafRule(ruleName) {
    if (ruleName !== "unknown" && !ruleName.includes("<") && !ruleName.includes("\u2192") && ruleName.length < 30) {
      this.lastLeafRule = ruleName;
      this.log("verbose", `\u{1F343} Updated lastLeafRule to: "${ruleName}"`);
    }
  }
  trimSuccessfulRules() {
    if (this.successfulRules.length > 10) {
      this.successfulRules = this.successfulRules.slice(-5);
    }
    if (this.globalSuccessRules.length > 20) {
      this.globalSuccessRules = this.globalSuccessRules.slice(-10);
    }
  }
  isNextToken(type, ignoredTokens) {
    const ignored = [...ignoredTokens != null ? ignoredTokens : [], ...this.settings.ignored];
    let currentIndex = this.index;
    while (currentIndex < this.tokens.length) {
      const currentToken = this.tokens[currentIndex];
      if (currentToken.kind === type) {
        return true;
      }
      if (ignored.includes(currentToken.kind)) {
        currentIndex++;
      } else {
        break;
      }
    }
    return false;
  }
  isPrevToken(type, startIndex = -1, ignoredTokens) {
    if (startIndex === -1) {
      startIndex = this.index > 0 ? this.index : 0;
    }
    const ignored = [...ignoredTokens != null ? ignoredTokens : [], ...this.settings.ignored];
    let currentIndex = startIndex - 1;
    while (currentIndex >= 0) {
      const currentToken = this.tokens[currentIndex];
      if (currentToken.kind === type) {
        return true;
      }
      if (ignored.includes(currentToken.kind)) {
        currentIndex--;
      } else {
        break;
      }
    }
    return false;
  }
  isPrevRule(name) {
    return this.lastHandledRule === name;
  }
  // └────────────────────────────────────────────────────────────────────┘
  // ┌─────────────────────────────── ERROR ──────────────────────────────┐
  static hanldeErrorSpan(span) {
    if (span.start === span.end) {
      span.end += 1;
    }
    return span;
  }
  createError(code, msg, span, failedAt, tokenIndex, prevRule, prevInnerRule) {
    return {
      code,
      msg,
      span: span || this.getCurrentSpan(),
      failedAt,
      tokenIndex,
      startIndex: this.rootStartIndex,
      // Use root start index for error tracking
      prevRule,
      prevInnerRule: prevInnerRule || this.getInnerMostRule()
    };
  }
  getCustomErrorOr(rule2, defaultError) {
    var _a;
    if (!((_a = rule2 == null ? void 0 : rule2.options) == null ? void 0 : _a.errors)) {
      return defaultError;
    }
    for (const errorHandler of rule2.options.errors) {
      let matches = false;
      if (typeof errorHandler.cond === "number") {
        matches = defaultError.failedAt === errorHandler.cond;
      } else if (typeof errorHandler.cond === "function") {
        try {
          const contextualInnerRule = this.getInnerMostRule(true);
          const opt = {
            failedAt: defaultError.failedAt,
            tokenIndex: defaultError.tokenIndex,
            prevRule: defaultError.prevRule,
            prevInnerRule: contextualInnerRule
          };
          matches = errorHandler.cond(this, opt);
        } catch (err) {
          matches = false;
        }
      }
      if (matches) {
        return this.createError(
          errorHandler.code || ERRORS.CUSTOM_ERROR,
          errorHandler.msg,
          defaultError.span,
          defaultError.failedAt,
          defaultError.tokenIndex,
          defaultError.prevRule,
          defaultError.prevInnerRule || this.getInnerMostRule(true)
        );
      }
    }
    return defaultError;
  }
  getInnerMostRule(forErrorCondition = false) {
    this.log("verbose", `\u{1F4CD} Types.Rule context: stack=[${this.ruleStack.join(",")} as ${this.patternStack.join(",")}], recent=[${this.successfulRules.slice(-3).join(",")}], leaf=${this.lastLeafRule}, current=${this.lastHandledRule}`);
    if (forErrorCondition && this.lastLeafRule !== "unknown") {
      this.log("verbose", `\u{1F3AF} getInnerMostRule(forErrorCondition=true) using lastLeafRule: "${this.lastLeafRule}"`);
      return this.lastLeafRule;
    }
    if (this.ruleStack.length > 0) {
      return this.ruleStack[this.ruleStack.length - 1];
    }
    if (this.lastLeafRule !== "unknown") {
      return this.lastLeafRule;
    }
    const meaningfulRules = [...this.successfulRules, ...this.globalSuccessRules];
    for (let i = meaningfulRules.length - 1; i >= 0; i--) {
      const rule2 = meaningfulRules[i];
      if (this.isMeaningfulRule(rule2)) {
        return rule2;
      }
    }
    if (this.lastCompletedRule !== "unknown" && this.lastCompletedRule.length < 30) {
      return this.lastCompletedRule;
    }
    return this.lastInnerRule;
  }
  isMeaningfulRule(rule2) {
    return rule2 !== "unknown" && !rule2.includes("<") && !rule2.includes("\u2192") && rule2.length < 30;
  }
  isSpanCovered(inner, outer) {
    return outer.start <= inner.start && outer.end >= inner.end;
  }
  addError(error2) {
    var _a, _b;
    if (this.isInSilentMode()) {
      return;
    }
    const maxErrors = this.settings.errorRecovery.maxErrors;
    if (maxErrors !== 0 && this.errors.length >= maxErrors) {
      return;
    }
    if (this.settings.errorRecovery.mode === "strict" && this.errors.length > 0) {
      return;
    }
    const normalizeMsg = (msg) => msg.replace(/[`'"]/g, "").toLowerCase();
    const duplicateError = this.errors.find(
      (e) => e.code === error2.code && normalizeMsg(e.msg) === normalizeMsg(error2.msg)
    );
    if (duplicateError) {
      if (error2.span && duplicateError.span) {
        return;
      }
    }
    const sameStartIndexError = this.errors.find(
      (e) => e.startIndex === error2.startIndex
    );
    if (sameStartIndexError) {
      return;
    }
    if (error2.span) {
      const hasExactSpanMatch = this.errors.some(
        (e) => e.span && error2.span && e.span.start === error2.span.start && e.span.end === error2.span.end
      );
      if (hasExactSpanMatch) {
        return;
      }
      const isErrorCovered = this.errors.some(
        (e) => e.span && error2.span && this.isSpanCovered(error2.span, e.span)
      );
      if (isErrorCovered) {
        return;
      }
      this.errors = this.errors.filter(
        (e) => !e.span || !error2.span || !this.isSpanCovered(e.span, error2.span)
      );
    }
    this.errors.push(error2);
    this.log("errors", `\u26A0\uFE0F  ${error2.msg} @${(_a = error2.span) == null ? void 0 : _a.start}:${(_b = error2.span) == null ? void 0 : _b.end}`);
  }
  handleParseError(error2, rule2) {
    const finalError = this.getCustomErrorOr(rule2, error2);
    throw finalError;
  }
  handleFatalError(error2) {
    const parseError = this.normalizeError(error2, this.getCurrentSpan());
    parseError.prevInnerRule = this.getInnerMostRule();
    this.addError(parseError);
    this.log("errors", `\u{1F4A5} Fatal error: ${parseError.msg} @${this.index}`);
  }
  fetalErrorToParseError(error2) {
    return this.createError(
      ERRORS.FATAL_ERROR,
      error2.message,
      this.getCurrentSpan(),
      0,
      this.lastVisitedIndex,
      this.lastHandledRule,
      this.getInnerMostRule()
    );
  }
  normalizeError(error2, defaultSpan) {
    if (error2 && typeof error2 === "object" && "msg" in error2 && "code" in error2 && "span" in error2) {
      const parseError = error2;
      if (!parseError.prevInnerRule) {
        parseError.prevInnerRule = this.getInnerMostRule();
      }
      return parseError;
    }
    if (error2 instanceof Error) {
      return this.createError(
        ERRORS.FATAL_ERROR,
        error2.message,
        defaultSpan,
        0,
        this.lastVisitedIndex,
        this.lastHandledRule,
        this.getInnerMostRule()
      );
    }
    return this.createError(
      ERRORS.UNKNOWN_ERROR,
      `Unknown error: ${error2}`,
      defaultSpan,
      0,
      this.lastVisitedIndex,
      this.lastHandledRule,
      this.getInnerMostRule()
    );
  }
  applyRecovery(rule2, startIndex) {
    var _a;
    const recovery = (_a = rule2 == null ? void 0 : rule2.options) == null ? void 0 : _a.recovery;
    if (recovery) {
      this.applyRecoveryStrategy(recovery);
    } else {
      this.skipIgnored();
      if (this.index < this.tokens.length) {
        this.index++;
      }
    }
    this.stats.errorsRecovered++;
    if (startIndex !== void 0 && this.index === startIndex && this.index < this.tokens.length) {
      this.index++;
    }
  }
  getCustomErrorForCondition(rule2, failedAt, tokenIndex, _startIndex) {
    var _a;
    if (!((_a = rule2 == null ? void 0 : rule2.options) == null ? void 0 : _a.errors)) {
      return null;
    }
    for (const errorHandler of rule2.options.errors) {
      let matches = false;
      if (typeof errorHandler.cond === "number") {
        matches = failedAt === errorHandler.cond;
      } else if (typeof errorHandler.cond === "function") {
        try {
          const opt = {
            failedAt,
            tokenIndex,
            prevRule: rule2.name,
            prevInnerRule: this.getInnerMostRule(true)
          };
          matches = errorHandler.cond(this, opt);
        } catch (err) {
          matches = false;
        }
      }
      if (matches) {
        return this.createError(
          errorHandler.code || ERRORS.CUSTOM_ERROR,
          errorHandler.msg,
          this.getCurrentSpan(),
          failedAt,
          tokenIndex,
          rule2.name,
          this.getInnerMostRule(true)
        );
      }
    }
    return null;
  }
  applyRecoveryStrategy(strategy) {
    const beforePos = this.index;
    this.log("errors", `\u{1F527} Recovery: ${strategy.type} @${beforePos}`);
    switch (strategy.type) {
      case "skipUntil": {
        const tokens = strategy.tokens || (strategy.token ? [strategy.token] : []);
        this.skipUntilTokens(tokens);
        break;
      }
      default:
    }
    this.log("errors", `Recovery: ${beforePos} \u2192 ${this.index}`);
  }
  // └────────────────────────────────────────────────────────────────────┘
  // ┌─────────────────────────────── DEBUG ──────────────────────────────┐
  log(level, message) {
    if (this.debugLevel === "off") {
      return;
    }
    const levels = ["off", "errors", "rules", "patterns", "tokens", "verbose"];
    const currentIndex = levels.indexOf(this.debugLevel);
    const messageIndex = levels.indexOf(level);
    if (messageIndex <= currentIndex) {
      const prefix = this.getDebugPrefix(level);
    }
  }
  getDebugPrefix(level) {
    const prefixes = {
      errors: "\u{1F525}",
      rules: "\u{1F4CB}",
      patterns: "\u{1F50D}",
      tokens: "\u{1F3AF}",
      verbose: "\u{1F4DD}"
    };
    return `[${prefixes[level] || (level === "off" ? "\u26A1" : "")}]`;
  }
  // └────────────────────────────────────────────────────────────────────┘
  // ┌─────────────────────────────── CACHE ──────────────────────────────┐
  dispose() {
    this.memoCache.clear();
    this.rules.clear();
    this.ignoredSet.clear();
    this.tokens = [];
    this.ast = [];
    this.errors = [];
    this.silentContextStack = [];
    this.ruleStack = [];
    this.successfulRules = [];
    this.globalSuccessRules = [];
  }
  cleanMemoCache() {
    const entries = Array.from(this.memoCache.entries());
    const now = Date.now();
    const validEntries = entries.filter(([, value]) => {
      if (now - (value.cachedAt || 0) > 1e3) {
        return false;
      }
      if (value.errorCount !== this.errors.length) {
        return false;
      }
      return true;
    });
    const keepCount = Math.floor(validEntries.length / 2);
    this.memoCache.clear();
    for (let i = validEntries.length - keepCount; i < validEntries.length; i++) {
      this.memoCache.set(validEntries[i][0], validEntries[i][1]);
    }
    this.log("verbose", `\u{1F9F9} Memo cache cleaned: kept ${keepCount} of ${entries.length} entries`);
  }
  createMemoKey(pattern, position, ruleName) {
    var _a;
    const silentContext = this.isInSilentMode() ? "S" : "L";
    const errorContext = this.errors.length > 0 ? `E${this.errors.length}` : "E0";
    const baseKey = `${pattern.type}:${position}:${silentContext}:${errorContext}`;
    if (ruleName) {
      const rule2 = this.rules.get(ruleName);
      const ruleContext = this.getRuleContext(rule2);
      return `rule:${ruleName}:${ruleContext}:${baseKey}`;
    }
    switch (pattern.type) {
      case "token":
        return `${baseKey}:${pattern.name}:${pattern.value || ""}`;
      case "optional":
        return `${baseKey}:optional`;
      case "repeat":
        return `${baseKey}:${pattern.min || 0}:${pattern.max || "inf"}:${pattern.separator ? "sep" : "nosep"}`;
      case "seq":
      case "choice": {
        const patternHash = this.hashPatterns(pattern.patterns || []);
        return `${baseKey}:${((_a = pattern.patterns) == null ? void 0 : _a.length) || 0}:${patternHash}`;
      }
      default:
        return baseKey;
    }
  }
  getRuleContext(rule2) {
    var _a, _b, _c, _d, _e;
    if (!rule2) {
      return "none";
    }
    const hasBuilder = ((_a = rule2.options) == null ? void 0 : _a.build) ? "B" : "";
    const hasErrors = ((_c = (_b = rule2.options) == null ? void 0 : _b.errors) == null ? void 0 : _c.length) ? "E" : "";
    const hasRecovery = ((_d = rule2.options) == null ? void 0 : _d.recovery) ? "R" : "";
    const isSilent = ((_e = rule2.options) == null ? void 0 : _e.silent) ? "S" : "";
    return `${hasBuilder}${hasErrors}${hasRecovery}${isSilent}`;
  }
  hashPatterns(patterns) {
    return patterns.map((p) => `${p.type}${p.silent ? "S" : ""}`).join("");
  }
  getMemoized(key) {
    if (!this.settings.maxCacheSize || this.memoCache.size >= this.settings.maxCacheSize) {
      return { hit: false };
    }
    const cached = this.memoCache.get(key);
    if (cached !== void 0) {
      if (this.isCachedResultValid(cached)) {
        this.memoHits++;
        this.log("verbose", `\u{1F4CB} Memo HIT: ${key} \u2192 ${cached.newIndex}`);
        return { hit: true, result: cached.result, newIndex: cached.newIndex };
      } else {
        this.memoCache.delete(key);
        this.log("verbose", `\u{1F5D1}\uFE0F Memo INVALID: ${key}`);
      }
    }
    this.memoMisses++;
    return { hit: false };
  }
  isCachedResultValid(cached) {
    if (typeof cached.newIndex !== "number" || cached.newIndex < 0) {
      return false;
    }
    if (cached.newIndex > this.tokens.length) {
      return false;
    }
    return true;
  }
  memoize(key, result, startIndex, endIndex) {
    if (!this.settings.maxCacheSize || this.memoCache.size >= this.settings.maxCacheSize) {
      return;
    }
    if (!result.isFullyPassed() && startIndex === endIndex) {
      this.log("verbose", `\u26A0\uFE0F Skip memo (no progress): ${key}`);
      return;
    }
    if (this.errors.length > 0 && this.stats.errorsRecovered > 0) {
      this.log("verbose", `\u26A0\uFE0F Skip memo (error state): ${key}`);
      return;
    }
    if (this.memoCache.size >= this.settings.maxCacheSize * 0.9) {
      this.cleanMemoCache();
    }
    const memoEntry = {
      result: result.clone(),
      newIndex: endIndex,
      cachedAt: Date.now(),
      silentContext: this.isInSilentMode(),
      errorCount: this.errors.length
    };
    this.memoCache.set(key, memoEntry);
    this.log("verbose", `\u{1F4BE} Memo SET: ${key} \u2192 ${endIndex}`);
  }
  shouldUseMemoization(pattern, _parentRule) {
    if (this.stats.errorsRecovered > 0 && this.errors.length > 0) {
      return false;
    }
    if (pattern.type === "token") {
      return false;
    }
    if (pattern.type === "rule" && this.isRecursiveContext()) {
      return false;
    }
    return pattern.type === "rule" || pattern.type === "choice" || pattern.type === "seq" || pattern.type === "optional" || pattern.type === "repeat" && (pattern.min > 1 || pattern.max > 1);
  }
  isRecursiveContext() {
    return this.depth > 10;
  }
  // └────────────────────────────────────────────────────────────────────┘
};
function parse(tokens, rules, settings) {
  const parser = new Parser(rules, settings);
  try {
    return parser.parse(tokens);
  } finally {
    parser.dispose();
  }
}
var createRule = (name, pattern, options = {}) => {
  const finalOptions = __spreadValues2({ name: false }, options);
  return { name, pattern, options: finalOptions };
};
function token(name, value) {
  if (!name || typeof name !== "string") {
    throw new Error("Token name must be a non-empty string");
  }
  return { type: "token", name, value, silent: false };
}
function optional(pattern) {
  if (!pattern || typeof pattern !== "object") {
    throw new Error("Optional pattern must be a valid pattern");
  }
  return { type: "optional", pattern, silent: false };
}
function choice(...patterns) {
  if (patterns.length === 0) {
    throw new Error("Choice must have at least one pattern");
  }
  return { type: "choice", patterns, silent: false };
}
function repeat(pattern, min = 0, max = Infinity, separator) {
  if (min < 0) {
    throw new Error("Minimum repetition count cannot be negative");
  }
  if (max < min) {
    throw new Error("Maximum repetition count cannot be less than minimum");
  }
  return { type: "repeat", pattern, min, max, separator, silent: false };
}
function oneOrMore(pattern, separator) {
  return repeat(pattern, 1, Infinity, separator);
}
function zeroOrMore(pattern, separator) {
  return repeat(pattern, 0, Infinity, separator);
}
function zeroOrOne(pattern, separator) {
  return silent(repeat(pattern, 0, 1, separator));
}
function seq(...patterns) {
  if (patterns.length === 0) {
    throw new Error("Sequence must have at least one pattern");
  }
  return { type: "seq", patterns, silent: false };
}
function rule(name) {
  if (!name || typeof name !== "string") {
    throw new Error("Rule name must be a non-empty string");
  }
  return { type: "rule", name, silent: false };
}
function silent(pattern) {
  return __spreadProps(__spreadValues2({}, pattern), { silent: true });
}
function loud(pattern) {
  return __spreadProps(__spreadValues2({}, pattern), { silent: false });
}
function error(cond, msg, code) {
  return { cond, msg, code: code != null ? code : ERRORS.RECOVERY_CUSTOM };
}
var errorRecoveryStrategies = {
  skipUntil(tokens) {
    return { type: "skipUntil", tokens: Array.isArray(tokens) ? tokens : [tokens] };
  }
};

// lib/syntax.ts
var lexer2 = __toESM(require("@je-es/lexer"));
var Syntax = class _Syntax {
  constructor(config) {
    this.config = config;
    this.parser = new Parser(config.parser, config.settings);
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