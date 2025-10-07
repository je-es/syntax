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
    parse(input: string): parser.ParseResult;
    lint(input: string): parser.ParseError[];
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
