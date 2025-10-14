import * as lexer from '@je-es/lexer';
export { lexer };
import * as parser from '@je-es/parser';
export { parser };

interface KeywordDoc {
    signature: string;
    description: string;
    example?: string;
}
interface LSPKeywords {
    declarations: string[];
    types: string[];
    controlFlow: string[];
    modifiers: string[];
    operators: string[];
    literals: string[];
    builtins: string[];
}
interface LSPConfig {
    keywords: LSPKeywords;
    keywordDocs: {
        [key: string]: KeywordDoc;
    };
    builtinDocs: {
        [key: string]: string;
    };
    triggerCharacters?: string[];
    fileExtension?: string;
}
interface SyntaxConfig {
    name: string;
    version: string;
    lexer: lexer.Rules;
    parser: parser.Rule[];
    settings: parser.ParserSettings;
    lsp?: LSPConfig;
}
/**
 * Represents a syntax with its lexer, parser, and settings.
*/
declare class Syntax {
    config: SyntaxConfig;
    parser: parser.Parser;
    lsp?: LSPConfig;
    constructor(config: SyntaxConfig);
    parse(input: string): parser.ParseResult;
    lint(input: string): parser.ParseError[];
    from(ruleName: string, debug?: parser.DebugLevel | null): Syntax;
    /**
     * Get LSP keywords grouped by category.
     */
    getLSPKeywords(): LSPKeywords | undefined;
    /**
     * Get all keywords as a flat array.
     */
    getAllKeywords(): string[];
    /**
     * Get documentation for a specific keyword.
     */
    getKeywordDoc(keyword: string): KeywordDoc | undefined;
    /**
     * Get documentation for a builtin.
     */
    getBuiltinDoc(builtin: string): string | undefined;
    /**
     * Check if a string is a keyword in this syntax.
     */
    isKeyword(str: string): boolean;
    /**
     * Check if a string is a builtin in this syntax.
     */
    isBuiltin(str: string): boolean;
}
/**
 * Create a new syntax object with the given configuration.
 *
 * @param config - The configuration object for the syntax, containing the
 *                 lexer rules, parser rules, and parser settings.
 * @returns A new syntax object.
 */
declare function create(config: SyntaxConfig): Syntax;

export { type KeywordDoc, type LSPConfig, type LSPKeywords, Syntax, type SyntaxConfig, create };
