// kemet.rules.ts
//
// Developed with ❤️ by Maysara.



// ╔════════════════════════════════════════ PACK ════════════════════════════════════════╗

    import * as syntax from '../../../lib/syntax';
    import { ExpressionRules } from './Expression';

// ╚══════════════════════════════════════════════════════════════════════════════════════╝



// ╔════════════════════════════════════════ INIT ════════════════════════════════════════╗

    export const lexerRules: syntax.lexer.Rules = {
        // ═══ Whitespace ═══
        ws              : /\s+/,

        // ═══ Comments ═══
        document        : { match: /\/\/\/[!/]?.*/, value: (text: string) => text.slice(3).trim() },
        comment         : { match: /\/\/[!/]?.*/,   value: (text: string) => text.slice(2).trim() },

        // ═══ Literals ═══
        flt             : /(?:[0-9]*\.[0-9]+|[0-9]+\.[0-9]*)(?:[eE][+-]?[0-9]+)?/,
        bin             : /0b[01]+/,
        oct             : /0o[0-7]+/,
        hex             : /0x[0-9a-fA-F]+/,
        dec             : /[0-9]+/,
        str             : { match: /"(?:[^"\\]|\\.)*"/, value: (text: string) => text.slice(1, -1) },
        char            : { match: /'(?:[^'\\]|\\.)*'/, value: (text: string) => text.slice(1, -1) },
        true            : 'true',
        false           : 'false',
        null            : 'null',
        undef           : 'undef',

        // ═══ Keywords ═══
        syntax_error    : '>>$${SYNTAX|_|ERROR}$$<<',   // Temporary Syntax Error for testing purposes
        // let             : 'let',
        mut             : 'mut',
        // if              : 'if',
        // switch          : 'switch',
        // case            : 'case',
        // else            : 'else',
        // while           : 'while',
        // for             : 'for',
        // return          : 'return',
        // break           : 'break',
        // continue        : 'continue',
        // function        : 'fn',

        // ═══ Types ═══
        i_type          : { match: /i[0-9]+/ },
        u_type          : { match: /u[0-9]+/ },
        f_type          : { match: /f[0-9]+/ },
        isize           : 'isize',
        usize           : 'usize',
        bool            : 'bool',
        void            : 'void',
        type            : 'type',
        any             : 'any',
        struct          : 'struct',
        enum            : 'enum',
        comptime        : 'comptime',

        // ═══ Operators ═══
        '->'            : '->',
        '=='            : '==',
        '!='            : '!=',
        '<='            : '<=',
        '>='            : '>=',
        '+='            : '+=',
        '-='            : '-=',
        '*='            : '*=',
        '/='            : '/=',
        '%='            : '%=',
        '**'            : '**',
        '++'            : '++',
        '--'            : '--',
        '<<'            : '<<',
        '>>'            : '>>',
        '&&'            : '&&',
        '||'            : '||',
        '<'             : '<',
        '>'             : '>',
        '|'             : '|',
        '^'             : '^',
        '&'             : '&',
        '='             : '=',
        '+'             : '+',
        '-'             : '-',
        '*'             : '*',
        '/'             : '/',
        '%'             : '%',
        '?'             : '?',
        '!'             : '!',
        '~'             : '~',
        ':'             : ':',
        ';'             : ';',
        ','             : ',',
        '.'             : '.',
        '('             : '(',
        ')'             : ')',
        '{'             : '{',
        '}'             : '}',
        '['             : '[',
        ']'             : ']',

        // ═══ Identifiers ═══
        ident           : /[a-zA-Z_][a-zA-Z0-9_]*/,
    };

    export const parserRules: syntax.parser.Rules = [...[
        syntax.parser.createRule('Root',
            syntax.parser.errorOrArrayOfOne(syntax.parser.silent(syntax.parser.rule('Statement'))),
            {
                build: (matches) => {
                    return {
                        kind    : 'Root',
                        span    : matches[0] && matches[0].span ? matches[0].span : { start: 0, end: 0 },
                        body    : matches[0]
                    };
                },

                silent: false,

                errors: [syntax.parser.error(0, "Expected Statement in Root")],
            }
        ),

        syntax.parser.createRule('Statement',
            syntax.parser.choice(
                syntax.parser.rule('Expression'),
            ),
            {

                build: (matches) => ({
                    kind    : 'Statement',
                    span    : matches[0].span,
                    body    : matches[0]
                }),

                errors: [ syntax.parser.error(0, "Expected Statement" ) ]
            }
        ),
    ], ...ExpressionRules];


    export const parserSettings : syntax.parser.ParserSettings = {
        // Entry rule - where parsing begins
        startRule           : 'Root',

        // Error recovery mode
        errorRecovery       : {
            mode            : 'resilient',          // 'strict' | 'resilient'
            maxErrors       : 0,                    // Stop after N errors (0 = unlimited)
            syncTokens      : []                    // Tokens to sync on during recovery
        },

        ignored             : ['ws', 'comment'],    // Ignore whitespace tokens
        debug               : 'off',                // Disable debug mode
        maxDepth            : 1000,                 // Maximum recursion depth (0 = unlimited)
        maxCacheSize        : 1000,                 // Maximum cache size (0 = unlimited)
    };

    export const Syntax = syntax.create({
        name     : 'Kemet',
        version  : '0.0.1',
        lexer    : lexerRules,
        parser   : parserRules,
        settings : parserSettings
    });

// ╚══════════════════════════════════════════════════════════════════════════════════════╝