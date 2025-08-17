import * as lexer from '@je-es/lexer';
export { lexer };
import * as parser from '@je-es/parser';
export { parser };

interface SyntaxConfig {
    name: string;
    version: string;
    lexer: lexer.Rules;
    parser: parser.Rule[];
    settings: parser.ParserSettings;
}
/**
 * Represents a syntax with its lexer, parser, and settings.
*/
declare class Syntax {
    config: SyntaxConfig;
    parser: parser.Parser;
    constructor(config: SyntaxConfig);
    /**
     * Parse a given input string into a structured syntax tree using the
     * syntax's parser.
     *
     * @param input - The string to parse.
     * @returns The parse result, including the syntax tree and any errors.
     */
    parse(input: string): parser.ParseResult;
    /**
     * Similar to parse, but returns only the errors in the parse result.
     *
     * @param input - The string to lint.
     * @returns An array of errors found in the input string.
     */
    lint(input: string): parser.ParseError[];
    /**
     * Create a new Syntax object with the given start rule and debug level,
     * using the current syntax's configuration.
     *
     * @param ruleName  - The start rule for the new syntax.
     * @param debug     - The debug level for the new syntax. If null, the debug level
     *                    from the current syntax's settings will be used.
     * @returns A new Syntax object with the given start rule and debug level.
    */
    from(ruleName: string, debug?: parser.DebugLevel | null): Syntax;
}
/**
 * Create a new syntax object with the given configuration.
 *
 * @param config - The configuration object for the syntax, containing the
 *                 lexer rules, parser rules, and parser settings.
 * @returns A new syntax object.
 */
declare function create(config: SyntaxConfig): Syntax;

export { Syntax, type SyntaxConfig, create };
