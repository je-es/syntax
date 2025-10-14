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

    export interface KeywordDoc {
        signature           : string;
        description         : string;
        example?            : string;
    }

    export interface LSPKeywords {
        declarations        : string[];
        types               : string[];
        controlFlow         : string[];
        modifiers           : string[];
        operators           : string[];
        literals            : string[];
        builtins            : string[];
    }

    export interface LSPConfig {
        keywords            : LSPKeywords;
        keywordDocs         : { [key: string]: KeywordDoc };
        builtinDocs         : { [key: string]: string };
        triggerCharacters?  : string[];
        fileExtension?      : string;
    }

    export interface SyntaxConfig {
        name                : string;
        version             : string;
        lexer               : lexer.Rules;
        parser              : parser.Rule[];
        settings            : parser.ParserSettings;
        lsp?                : LSPConfig;
    }

// ╚══════════════════════════════════════════════════════════════════════════════════════╝



// ╔════════════════════════════════════════ CORE ════════════════════════════════════════╗

    /**
     * Represents a syntax with its lexer, parser, and settings.
    */
    export class Syntax {
        public config       : SyntaxConfig;
        public parser       : parser.Parser;
        public lsp?         : LSPConfig;

        constructor(config: SyntaxConfig) {
            this.config     = config;
            this.parser     = new parser.Parser(config.parser, config.settings);
            this.lsp        = config.lsp;
        }

        parse(input: string): parser.ParseResult {
            const tokens = lexer.tokenize(input, this.config.lexer);
            return this.parser.parse(tokens);
        }

        lint(input: string): parser.ParseError[] {
            const tokens = lexer.tokenize(input, this.config.lexer);
            return this.parser.parse(tokens).errors;
        }

        from(ruleName: string, debug: parser.DebugLevel | null = null): Syntax {
            const newConfig = { ...this.config };
            if (debug !== null) {
                newConfig.settings.debug = debug;
            }
            newConfig.settings.startRule = ruleName;
            return new Syntax(newConfig);
        }

        /**
         * Get LSP keywords grouped by category.
         */
        getLSPKeywords(): LSPKeywords | undefined {
            return this.lsp?.keywords;
        }

        /**
         * Get all keywords as a flat array.
         */
        getAllKeywords(): string[] {
            if (!this.lsp?.keywords) return [];
            const { declarations, types, controlFlow, modifiers, operators, literals } = this.lsp.keywords;
            return [...declarations, ...types, ...controlFlow, ...modifiers, ...operators, ...literals];
        }

        /**
         * Get documentation for a specific keyword.
         */
        getKeywordDoc(keyword: string): KeywordDoc | undefined {
            return this.lsp?.keywordDocs?.[keyword];
        }

        /**
         * Get documentation for a builtin.
         */
        getBuiltinDoc(builtin: string): string | undefined {
            return this.lsp?.builtinDocs?.[builtin];
        }

        /**
         * Check if a string is a keyword in this syntax.
         */
        isKeyword(str: string): boolean {
            if (!this.lsp?.keywords) return false;
            const all = this.getAllKeywords();
            return all.includes(str);
        }

        /**
         * Check if a string is a builtin in this syntax.
         */
        isBuiltin(str: string): boolean {
            if (!this.lsp?.keywords) return false;
            return this.lsp.keywords.builtins.includes(str);
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