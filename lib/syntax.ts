// syntax.ts — Unified wrapper that streamlines syntax creation
//             with integrated lexer-parser coordination, LSP support,
//             and enhanced linting capabilities.
//
// repo   : https://github.com/je-es/syntax
// author : https://github.com/maysara-elshewehy
//
// Developed with ❤️ by Maysara.



// ╔════════════════════════════════════════ PACK ════════════════════════════════════════╗

    import * as lexer  from '@je-es/lexer';
    import * as parser from '@je-es/parser';

    export * as lexer  from '@je-es/lexer';
    export * as parser from '@je-es/parser';

// ╚══════════════════════════════════════════════════════════════════════════════════════╝



// ╔════════════════════════════════════════ TYPE ════════════════════════════════════════╗

    export interface SyntaxConfig {
        name        : string;
        version     : string;
        lexer       : lexer.Rules;
        parser      : parser.Rule[];
        settings    : parser.ParserSettings;
    }

// ╚══════════════════════════════════════════════════════════════════════════════════════╝



// ╔════════════════════════════════════════ CORE ════════════════════════════════════════╗

    /**
     * Represents a syntax with its lexer, parser, and settings.
    */
    export class Syntax {
        public config: SyntaxConfig;
        public parser: parser.Parser;

        constructor(config: SyntaxConfig) {
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
        parse(input: string): parser.ParseResult {
            const tokens = lexer.tokenize(input, this.config.lexer);
            return this.parser.parse(tokens);
        }

        /**
         * Similar to parse, but returns only the errors in the parse result.
         *
         * @param input - The string to lint.
         * @returns An array of errors found in the input string.
         */
        lint(input: string): parser.ParseError[] {
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
        from(ruleName: string, debug: parser.DebugLevel | null = null) : Syntax {
            const newConfig = { ...this.config };
            if(debug !== null) {
                newConfig.settings.debug = debug;
            }
            newConfig.settings.startRule = ruleName;
            const newLang = new Syntax(newConfig);
            return newLang;
        }
    }

    /**
     * Create a new syntax object with the given configuration.
     *
     * @param config - The configuration object for the syntax, containing the
     *                 lexer rules, parser rules, and parser settings.
     * @returns A new syntax object.
     */
    export function create(config: SyntaxConfig): Syntax {
        return new Syntax(config);
    }

// ╚══════════════════════════════════════════════════════════════════════════════════════╝