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
    import * as AST from '@je-es/ast';

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

    export interface BuiltinConfig {
        types               : Builtin[]; // as type
        functions           : Builtin[]; // as function
    }

    export interface Builtin {
        stmt                : AST.StmtNode;
        mode                : 'type' | 'function';
        metadata?           : {
            [key: string]: any
        };
    }

    export type DefaultArg = { ind: number, value: AST.ExprNode };

    export interface SyntaxConfig {
        name                : string;
        version             : string;
        lexer               : lexer.Rules;
        parser              : parser.Rule[];
        settings            : parser.ParserSettings;
        lsp?                : LSPConfig;
        builtin             : BuiltinConfig;
    }

// ╚══════════════════════════════════════════════════════════════════════════════════════╝



// ╔════════════════════════════════════════ CORE ════════════════════════════════════════╗

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

        getLSPKeywords(): LSPKeywords | undefined {
            return this.lsp?.keywords;
        }

        getAllKeywords(): string[] {
            if (!this.lsp?.keywords) return [];
            const { declarations, types, controlFlow, modifiers, operators, literals } = this.lsp.keywords;
            return [...declarations, ...types, ...controlFlow, ...modifiers, ...operators, ...literals];
        }

        getKeywordDoc(keyword: string): KeywordDoc | undefined {
            return this.lsp?.keywordDocs?.[keyword];
        }

        getBuiltinDoc(builtin: string): string | undefined {
            return this.lsp?.builtinDocs?.[builtin];
        }

        isKeyword(str: string): boolean {
            if (!this.lsp?.keywords) return false;
            const all = this.getAllKeywords();
            return all.includes(str);
        }

        isBuiltin(str: string): boolean {
            if (!this.lsp?.keywords) return false;
            return this.lsp.keywords.builtins.includes(str);
        }
    }

    export function create(config: SyntaxConfig): Syntax {
        return new Syntax(config);
    }

// ╚══════════════════════════════════════════════════════════════════════════════════════╝