import * as lexer from '@je-es/lexer';
export { lexer };
import * as parser from '@je-es/parser';
export { parser };
import * as AST from '@je-es/ast';

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
interface BuiltinConfig {
    types: Builtin[];
    functions: Builtin[];
}
interface Builtin {
    name: string;
    desc: string;
    mode: 'type' | 'function';
    type: AST.TypeNode | null;
    callable?: boolean;
    default_args?: DefaultArg[];
    metadata?: any;
}
type DefaultArg = {
    ind: number;
    value: AST.ExprNode;
};
interface SyntaxConfig {
    name: string;
    version: string;
    lexer: lexer.Rules;
    parser: parser.Rule[];
    settings: parser.ParserSettings;
    lsp?: LSPConfig;
    builtin: BuiltinConfig;
}
declare class Syntax {
    config: SyntaxConfig;
    parser: parser.Parser;
    lsp?: LSPConfig;
    constructor(config: SyntaxConfig);
    parse(input: string): parser.ParseResult;
    lint(input: string): parser.ParseError[];
    from(ruleName: string, debug?: parser.DebugLevel | null): Syntax;
    getLSPKeywords(): LSPKeywords | undefined;
    getAllKeywords(): string[];
    getKeywordDoc(keyword: string): KeywordDoc | undefined;
    getBuiltinDoc(builtin: string): string | undefined;
    isKeyword(str: string): boolean;
    isBuiltin(str: string): boolean;
}
declare function create(config: SyntaxConfig): Syntax;

export { type Builtin, type BuiltinConfig, type DefaultArg, type KeywordDoc, type LSPConfig, type LSPKeywords, Syntax, type SyntaxConfig, create };
