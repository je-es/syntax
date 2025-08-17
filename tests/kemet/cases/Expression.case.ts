// Expression_test.ts
//
// Developed with ❤️ by Maysara.



// ╔════════════════════════════════════════ PACK ════════════════════════════════════════╗

    import * as rules from '../rules/rules';

// ╚══════════════════════════════════════════════════════════════════════════════════════╝



// ╔════════════════════════════════════════ INIT ════════════════════════════════════════╗

    export const Syntax = rules.Syntax.from('Expression');

// ╚══════════════════════════════════════════════════════════════════════════════════════╝



// ╔════════════════════════════════════════ TEST ════════════════════════════════════════╗

    export const cases = {

        // ════ Number Literal ════

        'dec' : {
            input: '1',
            ast: [
                {
                    kind    : 'Expression',
                    span    : { start: 0, end: 1 },
                    body    : {
                        kind    : 'PrimaryExpression',
                        span    : { start: 0, end: 1 },
                        body    : {
                            kind    : 'Literal',
                            span    : { start: 0, end: 1 },
                            value   : { type: 'dec', value: 1, },
                        }
                    }
                }
            ]
        },
        'hex' : {
            input: '0x1',
            ast: [
                {
                    kind    : 'Expression',
                    span    : { start: 0, end: 3 },
                    body    : {
                        kind    : 'PrimaryExpression',
                        span    : { start: 0, end: 3 },
                        body    : {
                            kind    : 'Literal',
                            span    : { start: 0, end: 3 },
                            value   : { type: 'hex', value: 1, },
                        }
                    }
                }
            ]
        },
        'oct': {
            input: '0o1',
            ast: [
                {
                    kind    : 'Expression',
                    span    : { start: 0, end: 3 },
                    body    : {
                        kind    : 'PrimaryExpression',
                        span    : { start: 0, end: 3 },
                        body    : {
                            kind    : 'Literal',
                            span    : { start: 0, end: 3 },
                            value   : { type: 'oct', value: 1, },
                        }
                    }
                }
            ]
        },
        'bin': {
            input: '0b1',
            ast: [
                {
                    kind    : 'Expression',
                    span    : { start: 0, end: 3 },
                    body    : {
                        kind    : 'PrimaryExpression',
                        span    : { start: 0, end: 3 },
                        body    : {
                            kind    : 'Literal',
                            span    : { start: 0, end: 3 },
                            value   : { type: 'bin', value: 1, },
                        }
                    }
                }
            ]
        },
        'flt': {
            input: '1.1',
            ast: [
                {
                    kind    : 'Expression',
                    span    : { start: 0, end: 3 },
                    body    : {
                        kind    : 'PrimaryExpression',
                        span    : { start: 0, end: 3 },
                        body    : {
                            kind    : 'Literal',
                            span    : { start: 0, end: 3 },
                            value   : { type: 'flt', value: 1.1, },
                        }
                    }
                }
            ]
        },

        // ════ Boolean Literal ════

        'true': {
            input: 'true',
            ast: [
                {
                    kind    : 'Expression',
                    span    : { start: 0, end: 4 },
                    body    : {
                        kind    : 'PrimaryExpression',
                        span    : { start: 0, end: 4 },
                        body    : {
                            kind    : 'Literal',
                            span    : { start: 0, end: 4 },
                            value   : { type: 'bool', value: true, },
                        }
                    }
                }
            ]
        },
        'false': {
            input: 'false',
            ast: [
                {
                    kind    : 'Expression',
                    span    : { start: 0, end: 5 },
                    body    : {
                        kind    : 'PrimaryExpression',
                        span    : { start: 0, end: 5 },
                        body    : {
                            kind    : 'Literal',
                            span    : { start: 0, end: 5 },
                            value   : { type: 'bool', value: false, },
                        }
                    }
                }
            ]
        },

        // ════ String Literal ════

        'str': {
            input: '"test"',
            ast: [
                {
                    kind    : 'Expression',
                    span    : { start: 0, end: 6 },
                    body    : {
                        kind    : 'PrimaryExpression',
                        span    : { start: 0, end: 6 },
                        body    : {
                            kind    : 'Literal',
                            span    : { start: 0, end: 6 },
                            value   : { type: 'str', value: 'test', },
                        }
                    }
                }
            ]
        },
        'char': {
            input: "'a'",
            ast: [
                {
                    kind    : 'Expression',
                    span    : { start: 0, end: 3 },
                    body    : {
                        kind    : 'PrimaryExpression',
                        span    : { start: 0, end: 3 },
                        body    : {
                            kind    : 'Literal',
                            span    : { start: 0, end: 3 },
                            value   : { type: 'char', value: 'a', },
                        }
                    }
                }
            ]
        },

        // ════ Special Literal ════

        'null': {
            input: 'null',
            ast: [
                {
                    kind    : 'Expression',
                    span    : { start: 0, end: 4 },
                    body    : {
                        kind    : 'PrimaryExpression',
                        span    : { start: 0, end: 4 },
                        body    : {
                            kind    : 'Literal',
                            span    : { start: 0, end: 4 },
                            value   : { type: 'null', value: null, },
                        }
                    }
                }
            ]
        },
        'undef': {
            input: 'undef',
            ast: [
                {
                    kind    : 'Expression',
                    span    : { start: 0, end: 5 },
                    body    : {
                        kind    : 'PrimaryExpression',
                        span    : { start: 0, end: 5 },
                        body    : {
                            kind    : 'Literal',
                            span    : { start: 0, end: 5 },
                            value   : { type: 'undef', value: undefined, },
                        }
                    }
                }
            ]
        },

        // ════ Identifier Literal ════

        'ident': {
            input: 'Maysara',
            ast: [
                {
                    kind    : 'Expression',
                    span    : { start: 0, end: 7 },
                    body    : {
                        kind    : 'PrimaryExpression',
                        span    : { start: 0, end: 7 },
                        body    : {
                            kind    : 'Identifier',
                            span    : { start: 0, end: 7 },
                            value   : { type: 'ident', value: 'Maysara', },
                        }
                    }
                }
            ]
        },

        // ════ Array Literal ════

        'empty-array': {
            input: '[]',
            ast: [
                {
                    kind    : 'Expression',
                    span    : { start: 0, end: 2 },
                    body    : {
                        kind    : 'PrimaryExpression',
                        span    : { start: 0, end: 2 },
                        body    : {
                            kind    : 'Literal',
                            span    : { start: 0, end: 2 },
                            value   : { type: 'array', value: [], },
                        }
                    }
                }
            ]
        },

        'filled-array': {
            input: '[1, 2, 3]',
            ast: [
                {
                    kind    : 'Expression',
                    span    : { start: 0, end: 9 },
                    body    : {
                        kind    : 'PrimaryExpression',
                        span    : { start: 0, end: 9 },
                        body    : {
                            kind    : 'Literal',
                            span    : { start: 0, end: 9 },
                            value   : {
                                type    : 'array',
                                value   : [
                                    {
                                        kind    : 'Expression',
                                        span    : { start: 1, end: 2 },
                                        body    : {
                                            kind    : 'PrimaryExpression',
                                            span    : { start: 1, end: 2 },
                                            body    : {
                                                kind    : 'Literal',
                                                span    : { start: 1, end: 2 },
                                                value   : { type: 'dec', value: 1 },
                                            }
                                        }
                                    },
                                    {
                                        kind    : 'Expression',
                                        span    : { start: 4, end: 5 },
                                        body    : {
                                            kind    : 'PrimaryExpression',
                                            span    : { start: 4, end: 5 },
                                            body    : {
                                                kind    : 'Literal',
                                                span    : { start: 4, end: 5 },
                                                value   : { type: 'dec', value: 2 },
                                            }
                                        }
                                    },
                                    {
                                        kind    : 'Expression',
                                        span    : { start: 7, end: 8 },
                                        body    : {
                                            kind    : 'PrimaryExpression',
                                            span    : { start: 7, end: 8 },
                                            body    : {
                                                kind    : 'Literal',
                                                span    : { start: 7, end: 8 },
                                                value   : { type: 'dec', value: 3 },
                                            }
                                        }
                                    },
                                ]
                            }
                        }
                    }
                }
            ]
        },

        // ═════ Parenthesized Expression ════

        'parens': {
            input: '(1)',
            ast: [
                {
                    kind    : 'Expression',
                    span    : { start: 0, end: 3 },
                    body    : {
                        kind    : 'PrimaryExpression',
                        span    : { start: 0, end: 3 },
                        body    : {
                            kind    : 'Parenthesized',
                            span    : { start: 0, end: 3 },
                            body    : {
                                kind    : 'Expression',
                                span    : { start: 1, end: 2 },
                                body    : {
                                    kind    : 'PrimaryExpression',
                                    span    : { start: 1, end: 2 },
                                    body    : {
                                        kind    : 'Literal',
                                        span    : { start: 1, end: 2 },
                                        value   : { type: 'dec', value: 1 },
                                    }
                                }
                            }
                        }
                    }
                },
            ]
        },

        // ═════ More ═════
        'empty-input': {
            input: '',
            ast: [],
            errors: []
        },

        'syntax-error': {
            input: '>>$${SYNTAX|_|ERROR}$$<<',
            ast: [],
            errors: [
                {
                    "code": 2457,
                    "msg": "Expected Expression",
                    "span": {
                        "end": 0,
                        "start": 0,
                    },
                },
            ],
        },

        // ═════ PostIncrement/PostDecrement ════

        'post-increment ::basic::(a++)': {
            input: 'a++',
            ast: [
                {
                    kind: 'Expression',
                    span: { start: 0, end: 3 },
                    body: {
                        kind: 'PostfixExpression',
                        span: { start: 0, end: 3 },
                        body: {
                            kind: 'PostIncrement',
                            span: { start: 0, end: 3 },
                            body: {
                                base: {
                                    kind: 'PrimaryExpression',
                                    span: { start: 0, end: 1 },
                                    body: {
                                        kind: 'Identifier',
                                        span: { start: 0, end: 1 },
                                        value: { type: 'ident', value: 'a' },
                                    },
                                }
                            },
                        },
                    },
                },
            ],
        },

        'post-increment ::multi::(a++++)': {
            input: 'a++++',
            ast: [
                {
                    kind: 'Expression',
                    span: { start: 0, end: 5 },
                    body: {
                        kind: 'PostfixExpression',
                        span: { start: 0, end: 5 },
                        body: {
                            kind: 'PostIncrement',
                            span: { start: 0, end: 5 },
                            body: {
                                "base": {
                                    "kind": "PostIncrement",
                                    "span": { "end": 3, "start": 0, },
                                    "body": {
                                        "base": {
                                            "body": {
                                            "kind": "Identifier",
                                            "span": { "end": 1, "start": 0, },
                                            "value": { "type": "ident", "value": "a", },
                                            },
                                            "kind": "PrimaryExpression",
                                            "span": { "end": 1, "start": 0, },
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
            ],
        },

        'post-increment ::basic::(a--)': {
            input: 'a--',
            ast: [
                {
                    kind: 'Expression',
                    span: { start: 0, end: 3 },
                    body: {
                        kind: 'PostfixExpression',
                        span: { start: 0, end: 3 },
                        body: {
                            kind: 'PostDecrement',
                            span: { start: 0, end: 3 },
                            body: {
                                base: {
                                    kind: 'PrimaryExpression',
                                    span: { start: 0, end: 1 },
                                    body: {
                                        kind: 'Identifier',
                                        span: { start: 0, end: 1 },
                                        value: { type: 'ident', value: 'a' },
                                    },
                                }
                            },
                        },
                    },
                },
            ],
        },

        'post-increment ::mix::(a++--++)': {
            input: 'a++--++',
            ast: [
                {
                    kind: 'Expression',
                    span: { start: 0, end: 7 },
                    body: {
                        kind: 'PostfixExpression',
                        span: { start: 0, end: 7 },
                        body: {
                            kind: 'PostIncrement',
                            span: { start: 0, end: 7 },
                            body: {
                                "base": {
                                    "kind": "PostDecrement",
                                    "span": { "end": 5, "start": 0, },
                                    "body": {
                                         "base": {
                                            "kind": "PostIncrement",
                                            "span": { "end": 3, "start": 0, },
                                            "body": {
                                                "base": {
                                                    "body": {
                                                    "kind": "Identifier",
                                                    "span": { "end": 1, "start": 0, },
                                                    "value": { "type": "ident", "value": "a", },
                                                    },
                                                    "kind": "PrimaryExpression",
                                                    "span": { "end": 1, "start": 0, },
                                                },
                                            },
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
            ],
        },

        // ═════ More ════

        'pointer-access': {
            input: 'a->b',
            ast: [
                {
                    kind    : 'Expression',
                    span    : { start: 0, end: 4 },
                    body    : {
                        kind    : 'PostfixExpression',
                        span    : { start: 0, end: 4 },
                        body: {
                            kind    : 'PointerAccess',
                            span    : { start: 0, end: 4 },
                            body    : {
                                base: {
                                    kind    : 'PrimaryExpression',
                                    span    : { start: 0, end: 1 },
                                    body    : {
                                        kind    : 'Identifier',
                                        span    : { start: 0, end: 1 },
                                        value   : { type: 'ident', value: 'a' },
                                    },
                                },
                                access: {
                                    kind    : 'Identifier',
                                    span    : { start: 3, end: 4 },
                                    value   : { type: 'ident', value: 'b' },
                                },
                            },
                        },
                    },
                },
            ]
        },

        'complex': {
            input: 'a->b->c--',
            ast: [
                {
                    "kind": "Expression",
                    "span": { "end": 9, "start": 0, },
                    "body": {
                        "body": {
                            "body": {
                            "base": {
                                "body": {
                                "access": {
                                    "kind": "Identifier",
                                    "span": { "end": 7, "start": 6, },
                                    "value": { "type": "ident", "value": "c", },
                                },
                                "base": {
                                    "kind": "PointerAccess",
                                    "span": { "end": 4, "start": 0, },
                                    "body": {
                                        "access": {
                                            "kind": "Identifier",
                                            "span": { "end": 4, "start": 3, },
                                            "value": { "type": "ident", "value": "b", },
                                        },
                                        "base": {
                                            "kind": "PrimaryExpression",
                                            "span": { "end": 1, "start": 0, },
                                            "body": {
                                                "kind": "Identifier",
                                                "span": { "end": 1, "start": 0, },
                                                "value": { "type": "ident", "value": "a", },
                                            },
                                        },
                                    },
                                },
                                },
                                "kind": "PointerAccess",
                                "span": { "end": 7, "start": 0, },
                            },
                            },
                            "kind": "PostDecrement",
                            "span": { "end": 9, "start": 0, },
                        },
                        "kind": "PostfixExpression",
                        "span": { "end": 9, "start": 0, },
                    },
                },
            ]
        },

        'member-access': {
            input: 'a.b',
            ast: [
                {
                    kind: "Expression",
                    span: { start: 0, end: 3 },
                    body: {
                        kind: "PostfixExpression",
                        span: { start: 0, end: 3 },
                        body: {
                            kind: "MemberAccess",
                            span: { start: 0, end: 3 },
                            body: {
                                base: {
                                    kind: "PrimaryExpression",
                                    span: { start: 0, end: 1 },
                                    body: {
                                        kind: "Identifier",
                                        span: { start: 0, end: 1 },
                                        value: { type: "ident", value: "a" },
                                    },
                                },
                                index: {
                                    kind: "Identifier",
                                    span: { start: 2, end: 3 },
                                    value: { type: "ident", value: "b" },
                                },
                            },
                        }
                    },
                },
            ]
        },

        'complex-member-access': {
            input: 'a.b.c',
            ast: [
                {
                    kind: "Expression",
                    span: { start: 0, end: 5 },
                    body: {
                        kind: "PostfixExpression",
                        span: { start: 0, end: 5 },
                        body: {
                            kind: "MemberAccess",
                            span: { start: 0, end: 5 },
                            body: {
                                base: {
                                    kind: "MemberAccess",
                                    span: { start: 0, end: 3 },
                                    body: {
                                        base: {
                                            kind: "PrimaryExpression",
                                            span: { start: 0, end: 1 },
                                            body: {
                                                kind: "Identifier",
                                                span: { start: 0, end: 1 },
                                                value: { type: "ident", value: "a" },
                                            },
                                        },
                                        index: {
                                            kind: "Identifier",
                                            span: { start: 2, end: 3 },
                                            value: { type: "ident", value: "b" },
                                        },
                                    },
                                },
                                index: {
                                    kind: "Identifier",
                                    span: { start: 4, end: 5 },
                                    value: { type: "ident", value: "c" },
                                },
                            },
                        }
                    },
                },
            ]
        },

        'call-empty': {
            input: 'a()',
            ast: [
                {
                    kind    : 'Expression',
                    span    : { start: 0, end: 3 },
                    body    : {
                        kind    : 'PostfixExpression',
                        span    : { start: 0, end: 3 },
                        body: {
                            kind: "Call",
                            span: { start: 0, end: 3 },
                            body: {
                                args: [],
                                base: {
                                    kind: "PrimaryExpression",
                                    span: { start: 0, end: 1 },
                                    body: {
                                        kind: "Identifier",
                                        span: { start: 0, end: 1 },
                                        value: { type: "ident", value: "a" },
                                    },
                                },
                            },
                        },
                    },
                },
            ]
        },

        'call-with-args': {
            input: 'a(b, c)',
            ast: [
                {
                    kind: 'Expression',
                    span: { start: 0, end: 7 },
                    body: {
                        kind: 'PostfixExpression',
                        span: { start: 0, end: 7 },
                        body: {
                            kind: "Call",
                            span: { end: 7, start: 0 },
                            body: {
                                args: [
                                    {
                                        body: {
                                            body: {
                                                kind: "Identifier",
                                                span: { end: 3, start: 2 },
                                                value: { type: "ident", value: "b" },
                                            },
                                            kind: "PrimaryExpression",
                                            span: { end: 3, start: 2 },
                                        },
                                        kind: "Expression",
                                        span: { end: 3, start: 2 },
                                    },
                                    {
                                        body: {
                                            body: {
                                                kind: "Identifier",
                                                span: { end: 6, start: 5 },
                                                value: { type: "ident", value: "c" },
                                            },
                                            kind: "PrimaryExpression",
                                            span: { end: 6, start: 5 },
                                        },
                                        kind: "Expression",
                                        span: { end: 6, start: 5 },
                                    },
                                ],
                                base: {
                                    body: {
                                        kind: "Identifier",
                                        span: { end: 1, start: 0 },
                                        value: { type: "ident", value: "a" },
                                    },
                                    kind: "PrimaryExpression",
                                    span: { end: 1, start: 0 },
                                },
                            },
                        },
                    },
                },
            ]
        },

        'array-access': {
            input: 'a[1]',
            ast: [
                {
                    kind: "Expression",
                    span: { start: 0, end: 4 },
                    body: {
                        kind: "PostfixExpression",
                        span: { start: 0, end: 4 },
                        body: {
                            kind: "ArrayAccess",
                            span: { start: 0, end: 4 },
                            body: {
                                base: {
                                    kind: "PrimaryExpression",
                                    span: { start: 0, end: 1 },
                                    body: {
                                        kind: "Identifier",
                                        span: { start: 0, end: 1 },
                                        value: { type: "ident", value: "a" },
                                    },
                                },
                                index: {
                                    kind: "Expression",
                                    span: { start: 2, end: 3 },
                                    body: {
                                        kind: "PrimaryExpression",
                                        span: { start: 2, end: 3 },
                                        body: {
                                            kind: "Literal",
                                            span: { start: 2, end: 3 },
                                            value: { type: "dec", value: 1 },
                                        },
                                    }
                                }
                            }
                        }
                    }
                },
            ]
        },

        // ═════ PrefixExpression ════

        // new
        "++a" : {
            input: "++a",
            ast: [
            {
                "kind": "Expression",
                "span": { "end": 3, "start": 0, },
                "body": {
                    "kind": "PrefixExpression",
                    "span": { "end": 3, "start": 0, },
                    "body": {
                        "kind": "PreIncrement",
                        "span": { "end": 3, "start": 0, },
                        "body": {
                            "base": {
                                "kind": "PrimaryExpression",
                                "span": { "end": 3, "start": 2, },
                                "body": {
                                    "kind": "Identifier",
                                    "span": { "end": 3, "start": 2, },
                                    "value": { "type": "ident", "value": "a", },
                                },
                            },
                        },
                    },
                },
            },
        ]
        },

        "--a" : {
            input: "--a",
            ast: [
            {
                "kind": "Expression",
                "span": { "end": 3, "start": 0, },
                "body": {
                    "kind": "PrefixExpression",
                    "span": { "end": 3, "start": 0, },
                    "body": {
                        "kind": "PreDecrement",
                        "span": { "end": 3, "start": 0, },
                        "body": {
                            "base": {
                                "kind": "PrimaryExpression",
                                "span": { "end": 3, "start": 2, },
                                "body": {
                                    "kind": "Identifier",
                                    "span": { "end": 3, "start": 2, },
                                    "value": { "type": "ident", "value": "a", },
                                },
                            },
                        },
                    },
                },
            },
        ]
        },

        '+a' : {
            input: '+a',
            ast: [
            {
                "kind": "Expression",
                "span": { "end": 2, "start": 0, },
                "body": {
                    "kind": "PrefixExpression",
                    "span": { "end": 2, "start": 0, },
                    "body": {
                        "kind": "UnaryOperator",
                        "span": { "end": 2, "start": 0, },
                        "body": {
                            "operator": "+",
                            "base": {
                                "kind": "PrimaryExpression",
                                "span": { "end": 2, "start": 1, },
                                "body": {
                                    "kind": "Identifier",
                                    "span": { "end": 2, "start": 1, },
                                    "value": { "type": "ident", "value": "a", },
                                },
                            },
                        },
                    },
                },
            },
        ]
        },

        '-a' : {
            input: '-a',
            ast: [
            {
                "kind": "Expression",
                "span": { "end": 2, "start": 0, },
                "body": {
                    "kind": "PrefixExpression",
                    "span": { "end": 2, "start": 0, },
                    "body": {
                        "kind": "UnaryOperator",
                        "span": { "end": 2, "start": 0, },
                        "body": {
                            "operator": "-",
                            "base": {
                                "kind": "PrimaryExpression",
                                "span": { "end": 2, "start": 1, },
                                "body": {
                                    "kind": "Identifier",
                                    "span": { "end": 2, "start": 1, },
                                    "value": { "type": "ident", "value": "a", },
                                },
                            },
                        },
                    },
                },
            },
        ]
        },

        '!a' : {
            input: '!a',
            ast: [
            {
                "kind": "Expression",
                "span": { "end": 2, "start": 0, },
                "body": {
                    "kind": "PrefixExpression",
                    "span": { "end": 2, "start": 0, },
                    "body": {
                        "kind": "UnaryOperator",
                        "span": { "end": 2, "start": 0, },
                        "body": {
                            "operator": "!",
                            "base": {
                                "kind": "PrimaryExpression",
                                "span": { "end": 2, "start": 1, },
                                "body": {
                                    "kind": "Identifier",
                                    "span": { "end": 2, "start": 1, },
                                    "value": { "type": "ident", "value": "a", },
                                },
                            },
                        },
                    },
                },
            },
        ]
        },

        '~a' : {
            input: '~a',
            ast: [
            {
                "kind": "Expression",
                "span": { "end": 2, "start": 0, },
                "body": {
                    "kind": "PrefixExpression",
                    "span": { "end": 2, "start": 0, },
                    "body": {
                        "kind": "UnaryOperator",
                        "span": { "end": 2, "start": 0, },
                        "body": {
                            "operator": "~",
                            "base": {
                                "kind": "PrimaryExpression",
                                "span": { "end": 2, "start": 1, },
                                "body": {
                                    "kind": "Identifier",
                                    "span": { "end": 2, "start": 1, },
                                    "value": { "type": "ident", "value": "a", },
                                },
                            },
                        },
                    },
                },
            },
        ]
        },

        '++--a' : {
            input: '++--a',
            ast: [
            {
                "kind": "Expression",
                "span": { "end": 5, "start": 0, },
                "body": {
                    "kind": "PrefixExpression",
                    "span": { "end": 5, "start": 0, },
                    "body": {
                        "kind": "PreIncrement",
                        "span": { "end": 5, "start": 0, },
                        "body": {
                            "base": {
                                "body": {
                                    "base": {
                                        "body": {
                                            "kind": "Identifier",
                                            "span": {
                                                "end": 5,
                                                "start": 4,
                                            },
                                            "value": {
                                                "type": "ident",
                                                "value": "a",
                                            },
                                        },
                                        "kind": "PrimaryExpression",
                                        "span": {
                                            "end": 5,
                                            "start": 4,
                                        },
                                    },
                                },
                                "kind": "PreDecrement",
                                "span": {
                                    "end": 5,
                                    "start": 2,
                                },
                            },
                        },
                    },
                },
            },
        ]
        },

        '!!a' : {
            input: '!!a',
            ast: [
            {
                "kind": "Expression",
                "span": { "end": 3, "start": 0, },
                "body": {
                    "kind": "PrefixExpression",
                    "span": { "end": 3, "start": 0, },
                    "body": {
                        "kind": "UnaryOperator",
                        "span": { "end": 3, "start": 0, },
                        "body": {
                            "base": {
                                "body": {
                                    "base": {
                                    "body": {
                                        "kind": "Identifier",
                                        "span": {
                                        "end": 3,
                                        "start": 2,
                                        },
                                        "value": {
                                        "type": "ident",
                                        "value": "a",
                                        },
                                    },
                                    "kind": "PrimaryExpression",
                                    "span": {
                                        "end": 3,
                                        "start": 2,
                                    },
                                    },
                                    "operator": "!",
                                },
                                "kind": "UnaryOperator",
                                "span": {
                                    "end": 3,
                                    "start": 1,
                                },
                                },
                                "operator": "!",
                        },
                    },
                },
            },
        ]
        },

        '++a--' : {
            input: '++a--',
            ast: [
            {
                "kind": "Expression",
                "span": { "end": 5, "start": 0, },
                "body": {
                    "kind": "PrefixExpression",
                    "span": { "end": 5, "start": 0, },
                    "body": {
                    "body": {
                        "base": {
                        "body": {
                            "body": {
                            "base": {
                                "body": {
                                "kind": "Identifier",
                                "span": {
                                    "end": 3,
                                    "start": 2,
                                },
                                "value": {
                                    "type": "ident",
                                    "value": "a",
                                },
                                },
                                "kind": "PrimaryExpression",
                                "span": {
                                "end": 3,
                                "start": 2,
                                },
                            },
                            },
                            "kind": "PostDecrement",
                            "span": {
                            "end": 5,
                            "start": 2,
                            },
                        },
                        "kind": "PostfixExpression",
                        "span": {
                            "end": 5,
                            "start": 2,
                        },
                        },
                    },
                    "kind": "PreIncrement",
                    "span": {
                        "end": 5,
                        "start": 0,
                    },
                    },
                },
            },
        ]
        },

        '--++!-+a++--' : {
            input: '--++!-+a++--',
            ast: [
            {
                "kind": "Expression",
                "span": { "end": 12, "start": 0, },
                "body": {
                    "kind": "PrefixExpression",
                    "span": { "end": 12, "start": 0, },
                    "body": {
                        "kind": "PreDecrement",
                        "span": { "end": 12, "start": 0, },
                        "body": {
                            "base": {
                            "body": {
                                "base": {
                                "body": {
                                    "base": {
                                    "body": {
                                        "base": {
                                        "body": {
                                            "base": {
                                            "body": {
                                                "body": {
                                                "base": {
                                                    "body": {
                                                    "base": {
                                                        "body": {
                                                        "kind": "Identifier",
                                                        "span": {
                                                            "end": 8,
                                                            "start": 7,
                                                        },
                                                        "value": {
                                                            "type": "ident",
                                                            "value": "a",
                                                        },
                                                        },
                                                        "kind": "PrimaryExpression",
                                                        "span": {
                                                        "end": 8,
                                                        "start": 7,
                                                        },
                                                    },
                                                    },
                                                    "kind": "PostIncrement",
                                                    "span": {
                                                    "end": 10,
                                                    "start": 7,
                                                    },
                                                },
                                                },
                                                "kind": "PostDecrement",
                                                "span": {
                                                "end": 12,
                                                "start": 7,
                                                },
                                            },
                                            "kind": "PostfixExpression",
                                            "span": {
                                                "end": 12,
                                                "start": 7,
                                            },
                                            },
                                            "operator": "+",
                                        },
                                        "kind": "UnaryOperator",
                                        "span": {
                                            "end": 12,
                                            "start": 6,
                                        },
                                        },
                                        "operator": "-",
                                    },
                                    "kind": "UnaryOperator",
                                    "span": {
                                        "end": 12,
                                        "start": 5,
                                    },
                                    },
                                    "operator": "!",
                                },
                                            "kind": "UnaryOperator",
                                "span": {
                                    "end": 12,
                                    "start": 4,
                                },
                                },
                            },
                            "kind": "PreIncrement",
                            "span": {
                                "end": 12,
                                "start": 2,
                            },
                            },
                        },
                    }
                }
            }
        ]
        },

        // ═════ PowerExpression ════

        "a**b": {
            input: "a**b",
            ast: [
                {
                    "kind": "Expression",
                    "span": { "start": 0, "end": 4 },
                    "body": {
                        "kind": "PowerExpression",
                        "span": { "start": 0, "end": 4 },
                        "body": {
                            "kind": "BinaryOperator",
                            "span": { "start": 0, "end": 4 },
                            "body": {
                                "left": {
                                    "kind": "PrimaryExpression",
                                    "span": { "start": 0, "end": 1 },
                                    "body": {
                                        "kind": "Identifier",
                                        "span": { "start": 0, "end": 1 },
                                        "value": { "type": "ident", "value": "a" }
                                    }
                                },
                                "operator": "**",
                                "right": {
                                    "kind": "PrimaryExpression",
                                    "span": { "start": 3, "end": 4 },
                                    "body": {
                                        "kind": "Identifier",
                                        "span": { "start": 3, "end": 4 },
                                        "value": { "type": "ident", "value": "b" }
                                    }
                                }
                            }
                        }
                    }
                }
            ]
        },

        "a**b**c": {
            input: "a**b**c",
            ast: [
                {
                    "kind": "Expression",
                    "span": { "start": 0, "end": 7 },
                    "body": {
                        "kind": "PowerExpression",
                        "span": { "start": 0, "end": 7 },
                        "body": {
                            "kind": "BinaryOperator",
                            "span": { "start": 0, "end": 7 },
                            "body": {
                                "left": {
                                    "kind": "PrimaryExpression",
                                    "span": { "start": 0, "end": 1 },
                                    "body": {
                                        "kind": "Identifier",
                                        "span": { "start": 0, "end": 1 },
                                        "value": { "type": "ident", "value": "a" }
                                    }
                                },
                                "operator": "**",
                                "right": {
                                    "kind": "BinaryOperator",
                                    "span": { "start": 3, "end": 7 },
                                    "body": {
                                        "left": {
                                            "kind": "PrimaryExpression",
                                            "span": { "start": 3, "end": 4 },
                                            "body": {
                                                "kind": "Identifier",
                                                "span": { "start": 3, "end": 4 },
                                                "value": { "type": "ident", "value": "b" }
                                            }
                                        },
                                        "operator": "**",
                                        "right": {
                                            "kind": "PrimaryExpression",
                                            "span": { "start": 6, "end": 7 },
                                            "body": {
                                                "kind": "Identifier",
                                                "span": { "start": 6, "end": 7 },
                                                "value": { "type": "ident", "value": "c" }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            ]
        },

        // ═════ MultiplicativeExpression ════

        "a*b": {
            input: "a*b",
            ast: [
                {
                    "kind": "Expression",
                    "span": { "start": 0, "end": 3 },
                    "body": {
                        "kind": "MultiplicativeExpression",
                        "span": { "start": 0, "end": 3 },
                        "body": {
                            "kind": "BinaryOperator",
                            "span": { "start": 0, "end": 3 },
                            "body": {
                                "left": {
                                    "kind": "PrimaryExpression",
                                    "span": { "start": 0, "end": 1 },
                                    "body": {
                                        "kind": "Identifier",
                                        "span": { "start": 0, "end": 1 },
                                        "value": { "type": "ident", "value": "a" }
                                    }
                                },
                                "operator": "*",
                                "right": {
                                    "kind": "PrimaryExpression",
                                    "span": { "start": 2, "end": 3 },
                                    "body": {
                                        "kind": "Identifier",
                                        "span": { "start": 2, "end": 3 },
                                        "value": { "type": "ident", "value": "b" }
                                    }
                                }
                            }
                        }
                    }
                }
            ]
        },

        "a*b*c": {
            input: "a*b*c",
            ast: [
                {
                    "kind": "Expression",
                    "span": { "start": 0, "end": 5 },
                    "body": {
                        "kind": "MultiplicativeExpression",
                        "span": { "start": 0, "end": 5 },
                        "body": {
                            "kind": "BinaryOperator",
                            "span": { "start": 0, "end": 5 },
                            "body": {
                                "left": {
                                    "kind": "BinaryOperator",
                                    "span": { "start": 0, "end": 3 },
                                    "body": {
                                        "left": {
                                            "kind": "PrimaryExpression",
                                            "span": { "start": 0, "end": 1 },
                                            "body": {
                                                "kind": "Identifier",
                                                "span": { "start": 0, "end": 1 },
                                                "value": { "type": "ident", "value": "a" }
                                            }
                                        },
                                        "operator": "*",
                                        "right": {
                                            "kind": "PrimaryExpression",
                                            "span": { "start": 2, "end": 3 },
                                            "body": {
                                                "kind": "Identifier",
                                                "span": { "start": 2, "end": 3 },
                                                "value": { "type": "ident", "value": "b" }
                                            }
                                        }
                                    }
                                },
                                "operator": "*",
                                "right": {
                                    "kind": "PrimaryExpression",
                                    "span": { "start": 4, "end": 5 },
                                    "body": {
                                        "kind": "Identifier",
                                        "span": { "start": 4, "end": 5 },
                                        "value": { "type": "ident", "value": "c" }
                                    }
                                }
                            }
                        }
                    }
                }
            ]
        },

        // ═════ AdditiveExpression ════

        "a+b": {
            input: "a+b",
            ast: [
                {
                    "kind": "Expression",
                    "span": { "start": 0, "end": 3 },
                    "body": {
                        "kind": "AdditiveExpression",
                        "span": { "start": 0, "end": 3 },
                        "body": {
                            "kind": "BinaryOperator",
                            "span": { "start": 0, "end": 3 },
                            "body": {
                                "left": {
                                    "kind": "PrimaryExpression",
                                    "span": { "start": 0, "end": 1 },
                                    "body": {
                                        "kind": "Identifier",
                                        "span": { "start": 0, "end": 1 },
                                        "value": { "type": "ident", "value": "a" }
                                    }
                                },
                                "operator": "+",
                                "right": {
                                    "kind": "PrimaryExpression",
                                    "span": { "start": 2, "end": 3 },
                                    "body": {
                                        "kind": "Identifier",
                                        "span": { "start": 2, "end": 3 },
                                        "value": { "type": "ident", "value": "b" }
                                    }
                                }
                            }
                        }
                    }
                }
            ]
        },

        "a+b+c": {
            input: "a+b+c",
            ast: [
                {
                    "kind": "Expression",
                    "span": { "start": 0, "end": 5 },
                    "body": {
                        "kind": "AdditiveExpression",
                        "span": { "start": 0, "end": 5 },
                        "body": {
                            "kind": "BinaryOperator",
                            "span": { "start": 0, "end": 5 },
                            "body": {
                                "left": {
                                    "kind": "BinaryOperator",
                                    "span": { "start": 0, "end": 3 },
                                    "body": {
                                        "left": {
                                            "kind": "PrimaryExpression",
                                            "span": { "start": 0, "end": 1 },
                                            "body": {
                                                "kind": "Identifier",
                                                "span": { "start": 0, "end": 1 },
                                                "value": { "type": "ident", "value": "a" }
                                            }
                                        },
                                        "operator": "+",
                                        "right": {
                                            "kind": "PrimaryExpression",
                                            "span": { "start": 2, "end": 3 },
                                            "body": {
                                                "kind": "Identifier",
                                                "span": { "start": 2, "end": 3 },
                                                "value": { "type": "ident", "value": "b" }
                                            }
                                        }
                                    }
                                },
                                "operator": "+",
                                "right": {
                                    "kind": "PrimaryExpression",
                                    "span": { "start": 4, "end": 5 },
                                    "body": {
                                        "kind": "Identifier",
                                        "span": { "start": 4, "end": 5 },
                                        "value": { "type": "ident", "value": "c" }
                                    }
                                }
                            }
                        }
                    }
                }
            ]
        },

        "a-b+c-d": {
            input: "a-b+c-d",
            ast: [
                {
                    "kind": "Expression",
                    "span": { "start": 0, "end": 7 },
                    "body": {
                        "kind": "AdditiveExpression",
                        "span": { "start": 0, "end": 7 },
                        "body": {
                            "kind": "BinaryOperator",
                            "span": { "start": 0, "end": 7 },
                        "body": {
                        "left": {
                            "body": {
                            "left": {
                                "body": {
                                "left": {
                                    "body": {
                                    "kind": "Identifier",
                                    "span": {
                                        "end": 1,
                                        "start": 0,
                                    },
                                    "value": {
                                        "type": "ident",
                                        "value": "a",
                                    },
                                    },
                                    "kind": "PrimaryExpression",
                                    "span": {
                                    "end": 1,
                                    "start": 0,
                                    },
                                },
                                "operator": "-",
                                "right": {
                                    "body": {
                                    "kind": "Identifier",
                                    "span": {
                                        "end": 3,
                                        "start": 2,
                                    },
                                    "value": {
                                        "type": "ident",
                                        "value": "b",
                                    },
                                    },
                                    "kind": "PrimaryExpression",
                                    "span": {
                                    "end": 3,
                                    "start": 2,
                                    },
                                },
                                },
                                "kind": "BinaryOperator",
                                "span": {
                                "end": 3,
                                "start": 0,
                                },
                            },
                            "operator": "+",
                            "right": {
                                "body": {
                                "kind": "Identifier",
                                "span": {
                                    "end": 5,
                                    "start": 4,
                                },
                                "value": {
                                    "type": "ident",
                                    "value": "c",
                                },
                                },
                                "kind": "PrimaryExpression",
                                "span": {
                                "end": 5,
                                "start": 4,
                                },
                            },
                            },
                            "kind": "BinaryOperator",
                            "span": {
                            "end": 5,
                            "start": 0,
                            },
                        },
                        "operator": "-",
                        "right": {
                            "body": {
                            "kind": "Identifier",
                            "span": {
                                "end": 7,
                                "start": 6,
                            },
                            "value": {
                                "type": "ident",
                                "value": "d",
                            },
                            },
                            "kind": "PrimaryExpression",
                            "span": {
                            "end": 7,
                            "start": 6,
                            },
                        },
                        },
                        }
                    }
                }
            ]
        },

        // ═════ ShiftExpression ════

        "a<<b": {
            input: "a<<b",
            ast: [
                {
                    "kind": "Expression",
                    "span": { "start": 0, "end": 4 },
                    "body": {
                        "kind": "ShiftExpression",
                        "span": { "start": 0, "end": 4 },
                        "body": {
                            "kind": "BinaryOperator",
                            "span": { "start": 0, "end": 4 },
                            "body": {
                                "left": {
                                    "kind": "PrimaryExpression",
                                    "span": { "start": 0, "end": 1 },
                                    "body": {
                                        "kind": "Identifier",
                                        "span": { "start": 0, "end": 1 },
                                        "value": { "type": "ident", "value": "a" }
                                    }
                                },
                                "operator": "<<",
                                "right": {
                                    "kind": "PrimaryExpression",
                                    "span": { "start": 3, "end": 4 },
                                    "body": {
                                        "kind": "Identifier",
                                        "span": { "start": 3, "end": 4 },
                                        "value": { "type": "ident", "value": "b" }
                                    }
                                }
                            }
                        }
                    }
                }
            ]
        },

        "a>>b": {
            input: "a>>b",
            ast: [
                {
                    "kind": "Expression",
                    "span": { "start": 0, "end": 4 },
                    "body": {
                        "kind": "ShiftExpression",
                        "span": { "start": 0, "end": 4 },
                        "body": {
                            "kind": "BinaryOperator",
                            "span": { "start": 0, "end": 4 },
                            "body": {
                                "left": {
                                    "kind": "PrimaryExpression",
                                    "span": { "start": 0, "end": 1 },
                                    "body": {
                                        "kind": "Identifier",
                                        "span": { "start": 0, "end": 1 },
                                        "value": { "type": "ident", "value": "a" }
                                    }
                                },
                                "operator": ">>",
                                "right": {
                                    "kind": "PrimaryExpression",
                                    "span": { "start": 3, "end": 4 },
                                    "body": {
                                        "kind": "Identifier",
                                        "span": { "start": 3, "end": 4 },
                                        "value": { "type": "ident", "value": "b" }
                                    }
                                }
                            }
                        }
                    }
                }
            ]
        },

        "a<<b>>c<<d": {
            input: "a<<b>>c<<d",
            ast: [
                {
                    "kind": "Expression",
                    "span": { "start": 0, "end": 10 },
                    "body": {
                        "kind": "ShiftExpression",
                        "span": { "start": 0, "end": 10 },
                        "body": {
                            "kind": "BinaryOperator",
                            "span": { "start": 0, "end": 10 },
                            "body": {
                            "left": {
                                "body": {
                                "left": {
                                    "body": {
                                    "left": {
                                        "body": {
                                        "kind": "Identifier",
                                        "span": {
                                            "end": 1,
                                            "start": 0,
                                        },
                                        "value": {
                                            "type": "ident",
                                            "value": "a",
                                        },
                                        },
                                        "kind": "PrimaryExpression",
                                        "span": {
                                        "end": 1,
                                        "start": 0,
                                        },
                                    },
                                    "operator": "<<",
                                    "right": {
                                        "body": {
                                        "kind": "Identifier",
                                        "span": {
                                            "end": 4,
                                            "start": 3,
                                        },
                                        "value": {
                                            "type": "ident",
                                            "value": "b",
                                        },
                                        },
                                        "kind": "PrimaryExpression",
                                        "span": {
                                        "end": 4,
                                        "start": 3,
                                        },
                                    },
                                    },
                                    "kind": "BinaryOperator",
                                    "span": {
                                    "end": 4,
                                    "start": 0,
                                    },
                                },
                                "operator": ">>",
                                "right": {
                                    "body": {
                                    "kind": "Identifier",
                                    "span": {
                                        "end": 7,
                                        "start": 6,
                                    },
                                    "value": {
                                        "type": "ident",
                                        "value": "c",
                                    },
                                    },
                                    "kind": "PrimaryExpression",
                                    "span": {
                                    "end": 7,
                                    "start": 6,
                                    },
                                },
                                },
                                "kind": "BinaryOperator",
                                "span": {
                                "end": 7,
                                "start": 0,
                                },
                            },
                            "operator": "<<",
                            "right": {
                                "body": {
                                "kind": "Identifier",
                                "span": {
                                    "end": 10,
                                    "start": 9,
                                },
                                "value": {
                                    "type": "ident",
                                    "value": "d",
                                },
                                },
                                "kind": "PrimaryExpression",
                                "span": {
                                "end": 10,
                                "start": 9,
                                },
                            },
                            },
                        }
                    }
                }
            ]
        },

        // ═════ RelationalExpression ════

        "a<b": {
            input: "a<b",
            ast: [
                {
                    "kind": "Expression",
                    "span": { "start": 0, "end": 3 },
                    "body": {
                        "kind": "RelationalExpression",
                        "span": { "start": 0, "end": 3 },
                        "body": {
                            "kind": "BinaryOperator",
                            "span": { "start": 0, "end": 3 },
                            "body": {
                                "left": {
                                    "body": {
                                        "kind": "Identifier",
                                        "span": {
                                            "end": 1,
                                            "start": 0,
                                        },
                                        "value": {
                                            "type": "ident",
                                            "value": "a",
                                        },
                                    },
                                    "kind": "PrimaryExpression",
                                    "span": {
                                        "end": 1,
                                        "start": 0,
                                    },
                                },
                                "operator": "<",
                                "right": {
                                    "body": {
                                        "kind": "Identifier",
                                        "span": {
                                            "end": 3,
                                            "start": 2,
                                        },
                                        "value": {
                                            "type": "ident",
                                            "value": "b",
                                        },
                                    },
                                    "kind": "PrimaryExpression",
                                    "span": {
                                        "end": 3,
                                        "start": 2,
                                    },
                                },
                            },
                        },
                    }
                }
            ]
        },

        "a>b": {
            input: "a>b",
            ast: [
                {
                    "kind": "Expression",
                    "span": { "start": 0, "end": 3 },
                    "body": {
                        "kind": "RelationalExpression",
                        "span": { "start": 0, "end": 3 },
                        "body": {
                            "kind": "BinaryOperator",
                            "span": { "start": 0, "end": 3 },
                            "body": {
                                "left": {
                                    "body": {
                                        "kind": "Identifier",
                                        "span": {
                                            "end": 1,
                                            "start": 0,
                                        },
                                        "value": {
                                            "type": "ident",
                                            "value": "a",
                                        },
                                    },
                                    "kind": "PrimaryExpression",
                                    "span": {
                                        "end": 1,
                                        "start": 0,
                                    },
                                },
                                "operator": ">",
                                "right": {
                                    "body": {
                                        "kind": "Identifier",
                                        "span": {
                                            "end": 3,
                                            "start": 2,
                                        },
                                        "value": {
                                            "type": "ident",
                                            "value": "b",
                                        },
                                    },
                                    "kind": "PrimaryExpression",
                                    "span": {
                                        "end": 3,
                                        "start": 2,
                                    },
                                },
                            },
                        },
                    }
                }
            ]
        },

        "a<=b": {
            input: "a<=b",
            ast: [
                {
                    "kind": "Expression",
                    "span": { "start": 0, "end": 4 },
                    "body": {
                        "kind": "RelationalExpression",
                        "span": { "start": 0, "end": 4 },
                        "body": {
                            "kind": "BinaryOperator",
                            "span": { "start": 0, "end": 4 },
                            "body": {
                                "left": {
                                    "body": {
                                        "kind": "Identifier",
                                        "span": {
                                            "end": 1,
                                            "start": 0,
                                        },
                                        "value": {
                                            "type": "ident",
                                            "value": "a",
                                        },
                                    },
                                    "kind": "PrimaryExpression",
                                    "span": {
                                        "end": 1,
                                        "start": 0,
                                    },
                                },
                                "operator": "<=",
                                "right": {
                                    "body": {
                                        "kind": "Identifier",
                                        "span": {
                                            "end": 4,
                                            "start": 3,
                                        },
                                        "value": {
                                            "type": "ident",
                                            "value": "b",
                                        },
                                    },
                                    "kind": "PrimaryExpression",
                                    "span": {
                                        "end": 4,
                                        "start": 3,
                                    },
                                },
                            },
                        },
                    }
                }
            ]
        },

        "a>=b": {
            input: "a>=b",
            ast: [
                {
                    "kind": "Expression",
                    "span": { "start": 0, "end": 4 },
                    "body": {
                        "kind": "RelationalExpression",
                        "span": { "start": 0, "end": 4 },
                        "body": {
                            "kind": "BinaryOperator",
                            "span": { "start": 0, "end": 4 },
                            "body": {
                                "left": {
                                    "body": {
                                        "kind": "Identifier",
                                        "span": {
                                            "end": 1,
                                            "start": 0,
                                        },
                                        "value": {
                                            "type": "ident",
                                            "value": "a",
                                        },
                                    },
                                    "kind": "PrimaryExpression",
                                    "span": {
                                        "end": 1,
                                        "start": 0,
                                    },
                                },
                                "operator": ">=",
                                "right": {
                                    "body": {
                                        "kind": "Identifier",
                                        "span": {
                                            "end": 4,
                                            "start": 3,
                                        },
                                        "value": {
                                            "type": "ident",
                                            "value": "b",
                                        },
                                    },
                                    "kind": "PrimaryExpression",
                                    "span": {
                                        "end": 4,
                                        "start": 3,
                                    },
                                },
                            },
                        },
                    }
                }
            ]
        },

        "a<b>c<=d>=e": {
            input: "a<b>c<=d>=e",
            ast: [
                {
                    "kind": "Expression",
                    "span": { "start": 0, "end": 11 },
                    "body": {
                    "body": {
                        "body": {
                        "left": {
                            "body": {
                            "left": {
                                "body": {
                                "left": {
                                    "body": {
                                    "left": {
                                        "body": {
                                        "kind": "Identifier",
                                        "span": {
                                            "end": 1,
                                            "start": 0,
                                        },
                                        "value": {
                                            "type": "ident",
                                            "value": "a",
                                        },
                                        },
                                        "kind": "PrimaryExpression",
                                        "span": {
                                        "end": 1,
                                        "start": 0,
                                        },
                                    },
                                    "operator": "<",
                                    "right": {
                                        "body": {
                                        "kind": "Identifier",
                                        "span": {
                                            "end": 3,
                                            "start": 2,
                                        },
                                        "value": {
                                            "type": "ident",
                                            "value": "b",
                                        },
                                        },
                                        "kind": "PrimaryExpression",
                                        "span": {
                                        "end": 3,
                                        "start": 2,
                                        },
                                    },
                                    },
                                    "kind": "BinaryOperator",
                                    "span": {
                                    "end": 3,
                                    "start": 0,
                                    },
                                },
                                "operator": ">",
                                "right": {
                                    "body": {
                                    "kind": "Identifier",
                                    "span": {
                                        "end": 5,
                                        "start": 4,
                                    },
                                    "value": {
                                        "type": "ident",
                                        "value": "c",
                                    },
                                    },
                                    "kind": "PrimaryExpression",
                                    "span": {
                                    "end": 5,
                                    "start": 4,
                                    },
                                },
                                },
                                "kind": "BinaryOperator",
                                "span": {
                                "end": 5,
                                "start": 0,
                                },
                            },
                            "operator": "<=",
                            "right": {
                                "body": {
                                "kind": "Identifier",
                                "span": {
                                    "end": 8,
                                    "start": 7,
                                },
                                "value": {
                                    "type": "ident",
                                    "value": "d",
                                },
                                },
                                "kind": "PrimaryExpression",
                                "span": {
                                "end": 8,
                                "start": 7,
                                },
                            },
                            },
                            "kind": "BinaryOperator",
                            "span": {
                            "end": 8,
                            "start": 0,
                            },
                        },
                        "operator": ">=",
                        "right": {
                            "body": {
                            "kind": "Identifier",
                            "span": {
                                "end": 11,
                                "start": 10,
                            },
                            "value": {
                                "type": "ident",
                                "value": "e",
                            },
                            },
                            "kind": "PrimaryExpression",
                            "span": {
                            "end": 11,
                            "start": 10,
                            },
                        },
                        },
                        "kind": "BinaryOperator",
                        "span": {
                        "end": 11,
                        "start": 0,
                        },
                    },
                    "kind": "RelationalExpression",
                    "span": {
                        "end": 11,
                        "start": 0,
                    },
                    },
                }
            ]
        },

        // ═════ EqualityExpression ════

        "a==b": {
            input: "a==b",
            ast: [
            {
            "body": {
            "body": {
            "body": {
                "left": {
                "body": {
                    "kind": "Identifier",
                    "span": {
                    "end": 1,
                    "start": 0,
                    },
                    "value": {
                    "type": "ident",
                    "value": "a",
                    },
                },
                "kind": "PrimaryExpression",
                "span": {
                    "end": 1,
                    "start": 0,
                },
                },
                "operator": "==",
                "right": {
                "body": {
                    "kind": "Identifier",
                    "span": {
                    "end": 4,
                    "start": 3,
                    },
                    "value": {
                    "type": "ident",
                    "value": "b",
                    },
                },
                "kind": "PrimaryExpression",
                "span": {
                    "end": 4,
                    "start": 3,
                },
                },
            },
            "kind": "BinaryOperator",
            "span": {
                "end": 4,
                "start": 0,
            },
            },
            "kind": "EqualityExpression",
            "span": {
            "end": 4,
            "start": 0,
            },
            },
            "kind": "Expression",
            "span": {
            "end": 4,
            "start": 0,
            },
            },
            ]
        },

        "a!=b": {
            input: "a!=b",
            ast: [
            {
            "body": {
            "body": {
            "body": {
                "left": {
                "body": {
                    "kind": "Identifier",
                    "span": {
                    "end": 1,
                    "start": 0,
                    },
                    "value": {
                    "type": "ident",
                    "value": "a",
                    },
                },
                "kind": "PrimaryExpression",
                "span": {
                    "end": 1,
                    "start": 0,
                },
                },
                "operator": "!=",
                "right": {
                "body": {
                    "kind": "Identifier",
                    "span": {
                    "end": 4,
                    "start": 3,
                    },
                    "value": {
                    "type": "ident",
                    "value": "b",
                    },
                },
                "kind": "PrimaryExpression",
                "span": {
                    "end": 4,
                    "start": 3,
                },
                },
            },
            "kind": "BinaryOperator",
            "span": {
                "end": 4,
                "start": 0,
            },
            },
            "kind": "EqualityExpression",
            "span": {
            "end": 4,
            "start": 0,
            },
            },
            "kind": "Expression",
            "span": {
            "end": 4,
            "start": 0,
            },
            },
            ]
        },

        "a==b!=c==d": {
            input: 'a==b!=c==d',
            ast:[
                {
                  "body": {
                    "body": {
                    "body": {
                        "left": {
                        "body": {
                            "left": {
                            "body": {
                                "left": {
                                "body": {
                                    "kind": "Identifier",
                                    "span": {
                                    "end": 1,
                                    "start": 0,
                                    },
                                    "value": {
                                    "type": "ident",
                                    "value": "a",
                                    },
                                },
                                "kind": "PrimaryExpression",
                                "span": {
                                    "end": 1,
                                    "start": 0,
                                },
                                },
                                "operator": "==",
                                "right": {
                                "body": {
                                    "kind": "Identifier",
                                    "span": {
                                    "end": 4,
                                    "start": 3,
                                    },
                                    "value": {
                                    "type": "ident",
                                    "value": "b",
                                    },
                                },
                                "kind": "PrimaryExpression",
                                "span": {
                                    "end": 4,
                                    "start": 3,
                                },
                                },
                            },
                            "kind": "BinaryOperator",
                            "span": {
                                "end": 4,
                                "start": 0,
                            },
                            },
                            "operator": "!=",
                            "right": {
                            "body": {
                                "kind": "Identifier",
                                "span": {
                                "end": 7,
                                "start": 6,
                                },
                                "value": {
                                "type": "ident",
                                "value": "c",
                                },
                            },
                            "kind": "PrimaryExpression",
                            "span": {
                                "end": 7,
                                "start": 6,
                            },
                            },
                        },
                        "kind": "BinaryOperator",
                        "span": {
                            "end": 7,
                            "start": 0,
                        },
                        },
                        "operator": "==",
                        "right": {
                        "body": {
                            "kind": "Identifier",
                            "span": {
                            "end": 10,
                            "start": 9,
                            },
                            "value": {
                            "type": "ident",
                            "value": "d",
                            },
                        },
                        "kind": "PrimaryExpression",
                        "span": {
                            "end": 10,
                            "start": 9,
                        },
                        },
                    },
                    "kind": "BinaryOperator",
                    "span": {
                        "end": 10,
                        "start": 0,
                    },
                    },
                    "kind": "EqualityExpression",
                    "span": {
                    "end": 10,
                    "start": 0,
                    },
                    },
                    "kind": "Expression",
                    "span": {
                        "end": 10,
                        "start": 0,
                    },
                }
            ]
        },

        // ═════ BitwiseAndExpression ════

        "a&b": {
            input: 'a&b',
            ast: [
                {
                    "kind": "Expression",
                    "span": { "end": 3, "start": 0 },
                    "body": {
                        "kind": "BitwiseAndExpression",
                        "span": { "end": 3, "start": 0 },
                        "body": {
                            "kind": "BinaryOperator",
                            "span": { "end": 3, "start": 0 },
                            "body": {
                                "left": {
                                    "kind": "PrimaryExpression",
                                    "span": { "end": 1, "start": 0 },
                                    "body": {
                                        "kind": "Identifier",
                                        "span": { "end": 1, "start": 0 },
                                        "value": { "type": "ident", "value": "a" }
                                    }
                                },
                                "operator": "&",
                                "right": {
                                    "kind": "PrimaryExpression",
                                    "span": { "end": 3, "start": 2 },
                                    "body": {
                                        "kind": "Identifier",
                                        "span": { "end": 3, "start": 2 },
                                        "value": { "type": "ident", "value": "b" }
                                    }
                                }
                            }
                        }
                    }
                },
            ]
        },

        "a&b&c": {
            input: 'a&b&c',
            ast: [
                {
                    "kind": "Expression",
                    "span": { "end": 5, "start": 0 },
                    "body": {
                        "kind": "BitwiseAndExpression",
                        "span": { "end": 5, "start": 0 },
                        "body": {
                            "body": {
                                "left": {
                                "body": {
                                    "left": {
                                    "body": {
                                        "kind": "Identifier",
                                        "span": {
                                        "end": 1,
                                        "start": 0,
                                        },
                                        "value": {
                                        "type": "ident",
                                        "value": "a",
                                        },
                                    },
                                    "kind": "PrimaryExpression",
                                    "span": {
                                        "end": 1,
                                        "start": 0,
                                    },
                                    },
                                    "operator": "&",
                                    "right": {
                                    "body": {
                                        "kind": "Identifier",
                                        "span": {
                                        "end": 3,
                                        "start": 2,
                                        },
                                        "value": {
                                        "type": "ident",
                                        "value": "b",
                                        },
                                    },
                                    "kind": "PrimaryExpression",
                                    "span": {
                                        "end": 3,
                                        "start": 2,
                                    },
                                    },
                                },
                                "kind": "BinaryOperator",
                                "span": {
                                    "end": 3,
                                    "start": 0,
                                },
                                },
                                "operator": "&",
                                "right": {
                                "body": {
                                    "kind": "Identifier",
                                    "span": {
                                    "end": 5,
                                    "start": 4,
                                    },
                                    "value": {
                                    "type": "ident",
                                    "value": "c",
                                    },
                                },
                                "kind": "PrimaryExpression",
                                "span": {
                                    "end": 5,
                                    "start": 4,
                                },
                                },
                            },
                            "kind": "BinaryOperator",
                            "span": {
                                "end": 5,
                                "start": 0,
                            },
                        },
                    },
                },
            ]
        },

        // ═════ BitwiseXorExpression ════

        "a^b": {
            input: 'a^b',
            ast: [
                {
                    "kind": "Expression",
                    "span": { "end": 3, "start": 0 },
                    "body": {
                        "kind": "BitwiseXorExpression",
                        "span": { "end": 3, "start": 0 },
                        "body": {
                            "kind": "BinaryOperator",
                            "span": { "end": 3, "start": 0 },
                            "body": {
                                "left": {
                                    "kind": "PrimaryExpression",
                                    "span": { "end": 1, "start": 0 },
                                    "body": {
                                        "kind": "Identifier",
                                        "span": { "end": 1, "start": 0 },
                                        "value": { "type": "ident", "value": "a" }
                                    }
                                },
                                "operator": "^",
                                "right": {
                                    "kind": "PrimaryExpression",
                                    "span": { "end": 3, "start": 2 },
                                    "body": {
                                        "kind": "Identifier",
                                        "span": { "end": 3, "start": 2 },
                                        "value": { "type": "ident", "value": "b" }
                                    }
                                }
                            }
                        }
                    }
                },
            ]
        },

        "a^b^c": {
            input: 'a^b^c',
            ast: [
                {
                    "kind": "Expression",
                    "span": { "end": 5, "start": 0 },
                    "body": {
                        "kind": "BitwiseXorExpression",
                        "span": { "end": 5, "start": 0 },
                        "body": {
                            "body": {
                                "left": {
                                "body": {
                                    "left": {
                                    "body": {
                                        "kind": "Identifier",
                                        "span": {
                                        "end": 1,
                                        "start": 0,
                                        },
                                        "value": {
                                        "type": "ident",
                                        "value": "a",
                                        },
                                    },
                                    "kind": "PrimaryExpression",
                                    "span": {
                                        "end": 1,
                                        "start": 0,
                                    },
                                    },
                                    "operator": "^",
                                    "right": {
                                    "body": {
                                        "kind": "Identifier",
                                        "span": {
                                        "end": 3,
                                        "start": 2,
                                        },
                                        "value": {
                                        "type": "ident",
                                        "value": "b",
                                        },
                                    },
                                    "kind": "PrimaryExpression",
                                    "span": {
                                        "end": 3,
                                        "start": 2,
                                    },
                                    },
                                },
                                "kind": "BinaryOperator",
                                "span": {
                                    "end": 3,
                                    "start": 0,
                                },
                                },
                                "operator": "^",
                                "right": {
                                "body": {
                                    "kind": "Identifier",
                                    "span": {
                                    "end": 5,
                                    "start": 4,
                                    },
                                    "value": {
                                    "type": "ident",
                                    "value": "c",
                                    },
                                },
                                "kind": "PrimaryExpression",
                                "span": {
                                    "end": 5,
                                    "start": 4,
                                },
                                },
                            },
                            "kind": "BinaryOperator",
                            "span": {
                                "end": 5,
                                "start": 0,
                            },
                        },
                    },
                },
            ]
        },

        // ═════ BitwiseOrExpression ════

        "a|b": {
            input: 'a|b',
            ast: [
                {
                    "kind": "Expression",
                    "span": { "end": 3, "start": 0 },
                    "body": {
                        "kind": "BitwiseOrExpression",
                        "span": { "end": 3, "start": 0 },
                        "body": {
                            "kind": "BinaryOperator",
                            "span": { "end": 3, "start": 0 },
                            "body": {
                                "left": {
                                    "kind": "PrimaryExpression",
                                    "span": { "end": 1, "start": 0 },
                                    "body": {
                                        "kind": "Identifier",
                                        "span": { "end": 1, "start": 0 },
                                        "value": { "type": "ident", "value": "a" }
                                    }
                                },
                                "operator": "|",
                                "right": {
                                    "kind": "PrimaryExpression",
                                    "span": { "end": 3, "start": 2 },
                                    "body": {
                                        "kind": "Identifier",
                                        "span": { "end": 3, "start": 2 },
                                        "value": { "type": "ident", "value": "b" }
                                    }
                                }
                            }
                        }
                    }
                },
            ]
        },

        "a|b|c": {
            input: 'a|b|c',
            ast: [
                {
                    "kind": "Expression",
                    "span": { "end": 5, "start": 0 },
                    "body": {
                        "kind": "BitwiseOrExpression",
                        "span": { "end": 5, "start": 0 },
                        "body": {
                            "body": {
                                "left": {
                                "body": {
                                    "left": {
                                    "body": {
                                        "kind": "Identifier",
                                        "span": {
                                        "end": 1,
                                        "start": 0,
                                        },
                                        "value": {
                                        "type": "ident",
                                        "value": "a",
                                        },
                                    },
                                    "kind": "PrimaryExpression",
                                    "span": {
                                        "end": 1,
                                        "start": 0,
                                    },
                                    },
                                    "operator": "|",
                                    "right": {
                                    "body": {
                                        "kind": "Identifier",
                                        "span": {
                                        "end": 3,
                                        "start": 2,
                                        },
                                        "value": {
                                        "type": "ident",
                                        "value": "b",
                                        },
                                    },
                                    "kind": "PrimaryExpression",
                                    "span": {
                                        "end": 3,
                                        "start": 2,
                                    },
                                    },
                                },
                                "kind": "BinaryOperator",
                                "span": {
                                    "end": 3,
                                    "start": 0,
                                },
                                },
                                "operator": "|",
                                "right": {
                                "body": {
                                    "kind": "Identifier",
                                    "span": {
                                    "end": 5,
                                    "start": 4,
                                    },
                                    "value": {
                                    "type": "ident",
                                    "value": "c",
                                    },
                                },
                                "kind": "PrimaryExpression",
                                "span": {
                                    "end": 5,
                                    "start": 4,
                                },
                                },
                            },
                            "kind": "BinaryOperator",
                            "span": {
                                "end": 5,
                                "start": 0,
                            },
                        },
                    },
                },
            ]
        },

        // ═════ LogicalAndExpression ════

        "a&&b": {
            input: 'a&&b',
            ast: [
                {
                    "kind": "Expression",
                    "span": { "end": 4, "start": 0 },
                    "body": {
                        "kind": "LogicalAndExpression",
                        "span": { "end": 4, "start": 0 },
                        "body": {
                            "kind": "BinaryOperator",
                            "span": { "end": 4, "start": 0 },
                            "body": {
                                "left": {
                                    "kind": "PrimaryExpression",
                                    "span": { "end": 1, "start": 0 },
                                    "body": {
                                        "kind": "Identifier",
                                        "span": { "end": 1, "start": 0 },
                                        "value": { "type": "ident", "value": "a" }
                                    }
                                },
                                "operator": "&&",
                                "right": {
                                    "kind": "PrimaryExpression",
                                    "span": { "end": 4, "start": 3 },
                                    "body": {
                                        "kind": "Identifier",
                                        "span": { "end": 4, "start": 3 },
                                        "value": { "type": "ident", "value": "b" }
                                    }
                                }
                            }
                        }
                    }
                },
            ]
        },

        "a&&b&&c": {
            input: 'a&&b&&c',
            ast: [
                {
                    "kind": "Expression",
                    "span": { "end": 7, "start": 0 },
                    "body": {
                        "kind": "LogicalAndExpression",
                        "span": { "end": 7, "start": 0 },
                        "body": {
                            "body": {
                                "left": {
                                "body": {
                                    "left": {
                                    "body": {
                                        "kind": "Identifier",
                                        "span": {
                                        "end": 1,
                                        "start": 0,
                                        },
                                        "value": {
                                        "type": "ident",
                                        "value": "a",
                                        },
                                    },
                                    "kind": "PrimaryExpression",
                                    "span": {
                                        "end": 1,
                                        "start": 0,
                                    },
                                    },
                                    "operator": "&&",
                                    "right": {
                                    "body": {
                                        "kind": "Identifier",
                                        "span": {
                                        "end": 4,
                                        "start": 3,
                                        },
                                        "value": {
                                        "type": "ident",
                                        "value": "b",
                                        },
                                    },
                                    "kind": "PrimaryExpression",
                                    "span": {
                                        "end": 4,
                                        "start": 3,
                                    },
                                    },
                                },
                                "kind": "BinaryOperator",
                                "span": {
                                    "end": 4,
                                    "start": 0,
                                },
                                },
                                "operator": "&&",
                                "right": {
                                "body": {
                                    "kind": "Identifier",
                                    "span": {
                                    "end": 7,
                                    "start": 6,
                                    },
                                    "value": {
                                    "type": "ident",
                                    "value": "c",
                                    },
                                },
                                "kind": "PrimaryExpression",
                                "span": {
                                    "end": 7,
                                    "start": 6,
                                },
                                },
                            },
                            "kind": "BinaryOperator",
                            "span": {
                                "end": 7,
                                "start": 0,
                            },
                        },
                    },
                },
            ]
        },

        // ═════ LogicalOrExpression ════

        "a||b": {
            input: 'a||b',
            ast: [
                {
                    "kind": "Expression",
                    "span": { "end": 4, "start": 0 },
                    "body": {
                        "kind": "LogicalOrExpression",
                        "span": { "end": 4, "start": 0 },
                        "body": {
                            "kind": "BinaryOperator",
                            "span": { "end": 4, "start": 0 },
                            "body": {
                                "left": {
                                    "kind": "PrimaryExpression",
                                    "span": { "end": 1, "start": 0 },
                                    "body": {
                                        "kind": "Identifier",
                                        "span": { "end": 1, "start": 0 },
                                        "value": { "type": "ident", "value": "a" }
                                    }
                                },
                                "operator": "||",
                                "right": {
                                    "kind": "PrimaryExpression",
                                    "span": { "end": 4, "start": 3 },
                                    "body": {
                                        "kind": "Identifier",
                                        "span": { "end": 4, "start": 3 },
                                        "value": { "type": "ident", "value": "b" }
                                    }
                                }
                            }
                        }
                    }
                },
            ]
        },

        "a||b||c": {
            input: 'a||b||c',
            ast: [
                {
                    "kind": "Expression",
                    "span": { "end": 7, "start": 0 },
                    "body": {
                        "kind": "LogicalOrExpression",
                        "span": { "end": 7, "start": 0 },
                        "body": {
                            "body": {
                                "left": {
                                "body": {
                                    "left": {
                                    "body": {
                                        "kind": "Identifier",
                                        "span": {
                                        "end": 1,
                                        "start": 0,
                                        },
                                        "value": {
                                        "type": "ident",
                                        "value": "a",
                                        },
                                    },
                                    "kind": "PrimaryExpression",
                                    "span": {
                                        "end": 1,
                                        "start": 0,
                                    },
                                    },
                                    "operator": "||",
                                    "right": {
                                    "body": {
                                        "kind": "Identifier",
                                        "span": {
                                        "end": 4,
                                        "start": 3,
                                        },
                                        "value": {
                                        "type": "ident",
                                        "value": "b",
                                        },
                                    },
                                    "kind": "PrimaryExpression",
                                    "span": {
                                        "end": 4,
                                        "start": 3,
                                    },
                                    },
                                },
                                "kind": "BinaryOperator",
                                "span": {
                                    "end": 4,
                                    "start": 0,
                                },
                                },
                                "operator": "||",
                                "right": {
                                "body": {
                                    "kind": "Identifier",
                                    "span": {
                                    "end": 7,
                                    "start": 6,
                                    },
                                    "value": {
                                    "type": "ident",
                                    "value": "c",
                                    },
                                },
                                "kind": "PrimaryExpression",
                                "span": {
                                    "end": 7,
                                    "start": 6,
                                },
                                },
                            },
                            "kind": "BinaryOperator",
                            "span": {
                                "end": 7,
                                "start": 0,
                            },
                        },
                    },
                },
            ]
        },

        // ═════ TernaryExpression ════

        "a?b:c": {
            input: 'a?b:c',
            ast: [
                {
                    "kind": "Expression",
                    "span": { "end": 5, "start": 0 },
                    "body": {
                        "body": {
                        "body": {
                            "condition": {
                            "body": {
                                "kind": "Identifier",
                                "span": {
                                "end": 1,
                                "start": 0,
                                },
                                "value": {
                                "type": "ident",
                                "value": "a",
                                },
                            },
                            "kind": "PrimaryExpression",
                            "span": {
                                "end": 1,
                                "start": 0,
                            },
                            },
                            "falseExpr": {
                            "body": {
                                "kind": "Identifier",
                                "span": {
                                "end": 5,
                                "start": 4,
                                },
                                "value": {
                                "type": "ident",
                                "value": "c",
                                },
                            },
                            "kind": "PrimaryExpression",
                            "span": {
                                "end": 5,
                                "start": 4,
                            },
                            },
                            "trueExpr": {
                            "body": {
                                "body": {
                                "kind": "Identifier",
                                "span": {
                                    "end": 3,
                                    "start": 2,
                                },
                                "value": {
                                    "type": "ident",
                                    "value": "b",
                                },
                                },
                                "kind": "PrimaryExpression",
                                "span": {
                                "end": 3,
                                "start": 2,
                                },
                            },
                            "kind": "Expression",
                            "span": {
                                "end": 3,
                                "start": 2,
                            },
                            },
                        },
                        "kind": "TernaryOperator",
                        "span": {
                            "end": 5,
                            "start": 0,
                        },
                        },
                        "kind": "TernaryExpression",
                        "span": {
                        "end": 5,
                        "start": 0,
                        },
                    },
                },
            ]
        },

        "a?b:c?d:e": {
            input: 'a?b:c?d:e',
            ast: [
                {
                "body": {
                    "body": {
                    "body": {
                        "condition": {
                        "body": {
                            "kind": "Identifier",
                            "span": {
                            "end": 1,
                            "start": 0,
                            },
                            "value": {
                            "type": "ident",
                            "value": "a",
                            },
                        },
                        "kind": "PrimaryExpression",
                        "span": {
                            "end": 1,
                            "start": 0,
                        },
                        },
                        "falseExpr": {
                        "body": {
                            "body": {
                            "condition": {
                                "body": {
                                "kind": "Identifier",
                                "span": {
                                    "end": 5,
                                    "start": 4,
                                },
                                "value": {
                                    "type": "ident",
                                    "value": "c",
                                },
                                },
                                "kind": "PrimaryExpression",
                                "span": {
                                "end": 5,
                                "start": 4,
                                },
                            },
                            "falseExpr": {
                                "body": {
                                "kind": "Identifier",
                                "span": {
                                    "end": 9,
                                    "start": 8,
                                },
                                "value": {
                                    "type": "ident",
                                    "value": "e",
                                },
                                },
                                "kind": "PrimaryExpression",
                                "span": {
                                "end": 9,
                                "start": 8,
                                },
                            },
                            "trueExpr": {
                                "body": {
                                "body": {
                                    "kind": "Identifier",
                                    "span": {
                                    "end": 7,
                                    "start": 6,
                                    },
                                    "value": {
                                    "type": "ident",
                                    "value": "d",
                                    },
                                },
                                "kind": "PrimaryExpression",
                                "span": {
                                    "end": 7,
                                    "start": 6,
                                },
                                },
                                "kind": "Expression",
                                "span": {
                                "end": 7,
                                "start": 6,
                                },
                            },
                            },
                            "kind": "TernaryOperator",
                            "span": {
                            "end": 9,
                            "start": 4,
                            },
                        },
                        "kind": "TernaryExpression",
                        "span": {
                            "end": 9,
                            "start": 4,
                        },
                        },
                        "trueExpr": {
                        "body": {
                            "body": {
                            "kind": "Identifier",
                            "span": {
                                "end": 3,
                                "start": 2,
                            },
                            "value": {
                                "type": "ident",
                                "value": "b",
                            },
                            },
                            "kind": "PrimaryExpression",
                            "span": {
                            "end": 3,
                            "start": 2,
                            },
                        },
                        "kind": "Expression",
                        "span": {
                            "end": 3,
                            "start": 2,
                        },
                        },
                    },
                    "kind": "TernaryOperator",
                    "span": {
                        "end": 9,
                        "start": 0,
                    },
                    },
                    "kind": "TernaryExpression",
                    "span": {
                    "end": 9,
                    "start": 0,
                    },
                },
                "kind": "Expression",
                "span": {
                    "end": 9,
                    "start": 0,
                },
                },
            ]
        },

        "a ? b & c : d ? e ^ f : g || h ? i : j & k": {
            input: 'a ? b & c : d ? e ^ f : g || h ? i : j & k',
            ast: [
            {
                "body": {
                "body": {
                    "body": {
                    "condition": {
                        "body": {
                        "kind": "Identifier",
                        "span": {
                            "end": 1,
                            "start": 0,
                        },
                        "value": {
                            "type": "ident",
                            "value": "a",
                        },
                        },
                        "kind": "PrimaryExpression",
                        "span": {
                        "end": 1,
                        "start": 0,
                        },
                    },
                    "falseExpr": {
                        "body": {
                        "body": {
                            "condition": {
                            "body": {
                                "kind": "Identifier",
                                "span": {
                                "end": 13,
                                "start": 12,
                                },
                                "value": {
                                "type": "ident",
                                "value": "d",
                                },
                            },
                            "kind": "PrimaryExpression",
                            "span": {
                                "end": 13,
                                "start": 12,
                            },
                            },
                            "falseExpr": {
                            "body": {
                                "body": {
                                "condition": {
                                    "body": {
                                    "body": {
                                        "left": {
                                        "body": {
                                            "kind": "Identifier",
                                            "span": {
                                            "end": 25,
                                            "start": 24,
                                            },
                                            "value": {
                                            "type": "ident",
                                            "value": "g",
                                            },
                                        },
                                        "kind": "PrimaryExpression",
                                        "span": {
                                            "end": 25,
                                            "start": 24,
                                        },
                                        },
                                        "operator": "||",
                                        "right": {
                                        "body": {
                                            "kind": "Identifier",
                                            "span": {
                                            "end": 30,
                                            "start": 29,
                                            },
                                            "value": {
                                            "type": "ident",
                                            "value": "h",
                                            },
                                        },
                                        "kind": "PrimaryExpression",
                                        "span": {
                                            "end": 30,
                                            "start": 29,
                                        },
                                        },
                                    },
                                    "kind": "BinaryOperator",
                                    "span": {
                                        "end": 30,
                                        "start": 24,
                                    },
                                    },
                                    "kind": "LogicalOrExpression",
                                    "span": {
                                    "end": 30,
                                    "start": 24,
                                    },
                                },
                                "falseExpr": {
                                    "body": {
                                    "body": {
                                        "left": {
                                        "body": {
                                            "kind": "Identifier",
                                            "span": {
                                            "end": 38,
                                            "start": 37,
                                            },
                                            "value": {
                                            "type": "ident",
                                            "value": "j",
                                            },
                                        },
                                        "kind": "PrimaryExpression",
                                        "span": {
                                            "end": 38,
                                            "start": 37,
                                        },
                                        },
                                        "operator": "&",
                                        "right": {
                                        "body": {
                                            "kind": "Identifier",
                                            "span": {
                                            "end": 42,
                                            "start": 41,
                                            },
                                            "value": {
                                            "type": "ident",
                                            "value": "k",
                                            },
                                        },
                                        "kind": "PrimaryExpression",
                                        "span": {
                                            "end": 42,
                                            "start": 41,
                                        },
                                        },
                                    },
                                    "kind": "BinaryOperator",
                                    "span": {
                                        "end": 42,
                                        "start": 37,
                                    },
                                    },
                                    "kind": "BitwiseAndExpression",
                                    "span": {
                                    "end": 42,
                                    "start": 37,
                                    },
                                },
                                "trueExpr": {
                                    "body": {
                                    "body": {
                                        "kind": "Identifier",
                                        "span": {
                                        "end": 34,
                                        "start": 33,
                                        },
                                        "value": {
                                        "type": "ident",
                                        "value": "i",
                                        },
                                    },
                                    "kind": "PrimaryExpression",
                                    "span": {
                                        "end": 34,
                                        "start": 33,
                                    },
                                    },
                                    "kind": "Expression",
                                    "span": {
                                    "end": 34,
                                    "start": 33,
                                    },
                                },
                                },
                                "kind": "TernaryOperator",
                                "span": {
                                "end": 42,
                                "start": 24,
                                },
                            },
                            "kind": "TernaryExpression",
                            "span": {
                                "end": 42,
                                "start": 24,
                            },
                            },
                            "trueExpr": {
                            "body": {
                                "body": {
                                "body": {
                                    "left": {
                                    "body": {
                                        "kind": "Identifier",
                                        "span": {
                                        "end": 17,
                                        "start": 16,
                                        },
                                        "value": {
                                        "type": "ident",
                                        "value": "e",
                                        },
                                    },
                                    "kind": "PrimaryExpression",
                                    "span": {
                                        "end": 17,
                                        "start": 16,
                                    },
                                    },
                                    "operator": "^",
                                    "right": {
                                    "body": {
                                        "kind": "Identifier",
                                        "span": {
                                        "end": 21,
                                        "start": 20,
                                        },
                                        "value": {
                                        "type": "ident",
                                        "value": "f",
                                        },
                                    },
                                    "kind": "PrimaryExpression",
                                    "span": {
                                        "end": 21,
                                        "start": 20,
                                    },
                                    },
                                },
                                "kind": "BinaryOperator",
                                "span": {
                                    "end": 21,
                                    "start": 16,
                                },
                                },
                                "kind": "BitwiseXorExpression",
                                "span": {
                                "end": 21,
                                "start": 16,
                                },
                            },
                            "kind": "Expression",
                            "span": {
                                "end": 21,
                                "start": 16,
                            },
                            },
                        },
                        "kind": "TernaryOperator",
                        "span": {
                            "end": 42,
                            "start": 12,
                        },
                        },
                        "kind": "TernaryExpression",
                        "span": {
                        "end": 42,
                        "start": 12,
                        },
                    },
                    "trueExpr": {
                        "body": {
                        "body": {
                            "body": {
                            "left": {
                                "body": {
                                "kind": "Identifier",
                                "span": {
                                    "end": 5,
                                    "start": 4,
                                },
                                "value": {
                                    "type": "ident",
                                    "value": "b",
                                },
                                },
                                "kind": "PrimaryExpression",
                                "span": {
                                "end": 5,
                                "start": 4,
                                },
                            },
                            "operator": "&",
                            "right": {
                                "body": {
                                "kind": "Identifier",
                                "span": {
                                    "end": 9,
                                    "start": 8,
                                },
                                "value": {
                                    "type": "ident",
                                    "value": "c",
                                },
                                },
                                "kind": "PrimaryExpression",
                                "span": {
                                "end": 9,
                                "start": 8,
                                },
                            },
                            },
                            "kind": "BinaryOperator",
                            "span": {
                            "end": 9,
                            "start": 4,
                            },
                        },
                        "kind": "BitwiseAndExpression",
                        "span": {
                            "end": 9,
                            "start": 4,
                        },
                        },
                        "kind": "Expression",
                        "span": {
                        "end": 9,
                        "start": 4,
                        },
                    },
                    },
                    "kind": "TernaryOperator",
                    "span": {
                    "end": 42,
                    "start": 0,
                    },
                },
                "kind": "TernaryExpression",
                "span": {
                    "end": 42,
                    "start": 0,
                },
                },
                "kind": "Expression",
                "span": {
                "end": 42,
                "start": 0,
                },
            },
            ]
        },

        // ═════ AssignmentExpression ════

        "a=b": {
            input: 'a=b',
            ast: [
                {
                    "body": {
                    "body": {
                        "body": {
                        "left": {
                            "body": {
                            "kind": "Identifier",
                            "span": {
                                "end": 1,
                                "start": 0,
                            },
                            "value": {
                                "type": "ident",
                                "value": "a",
                            },
                            },
                            "kind": "PrimaryExpression",
                            "span": {
                            "end": 1,
                            "start": 0,
                            },
                        },
                        "operator": "=",
                        "right": {
                            "body": {
                            "kind": "Identifier",
                            "span": {
                                "end": 3,
                                "start": 2,
                            },
                            "value": {
                                "type": "ident",
                                "value": "b",
                            },
                            },
                            "kind": "PrimaryExpression",
                            "span": {
                            "end": 3,
                            "start": 2,
                            },
                        },
                        },
                        "kind": "BinaryOperator",
                        "span": {
                        "end": 3,
                        "start": 0,
                        },
                    },
                    "kind": "AssignmentExpression",
                    "span": {
                        "end": 3,
                        "start": 0,
                    },
                    },
                    "kind": "Expression",
                    "span": {
                    "end": 3,
                    "start": 0,
                    },
                },
            ],
        },

        "a+=b": {
            input: 'a+=b',
            ast: [
                {
                    "body": {
                    "body": {
                        "body": {
                        "left": {
                            "body": {
                            "kind": "Identifier",
                            "span": {
                                "end": 1,
                                "start": 0,
                            },
                            "value": {
                                "type": "ident",
                                "value": "a",
                            },
                            },
                            "kind": "PrimaryExpression",
                            "span": {
                            "end": 1,
                            "start": 0,
                            },
                        },
                        "operator": "+=",
                        "right": {
                            "body": {
                            "kind": "Identifier",
                            "span": {
                                "end": 4,
                                "start": 3,
                            },
                            "value": {
                                "type": "ident",
                                "value": "b",
                            },
                            },
                            "kind": "PrimaryExpression",
                            "span": {
                            "end": 4,
                            "start": 3,
                            },
                        },
                        },
                        "kind": "BinaryOperator",
                        "span": {
                        "end": 4,
                        "start": 0,
                        },
                    },
                    "kind": "AssignmentExpression",
                    "span": {
                        "end": 4,
                        "start": 0,
                    },
                    },
                    "kind": "Expression",
                    "span": {
                    "end": 4,
                    "start": 0,
                    },
                },
            ],
        },

        "a-=b": {
            input: 'a-=b',
            ast: [
                {
                    "body": {
                    "body": {
                        "body": {
                        "left": {
                            "body": {
                            "kind": "Identifier",
                            "span": {
                                "end": 1,
                                "start": 0,
                            },
                            "value": {
                                "type": "ident",
                                "value": "a",
                            },
                            },
                            "kind": "PrimaryExpression",
                            "span": {
                            "end": 1,
                            "start": 0,
                            },
                        },
                        "operator": "-=",
                        "right": {
                            "body": {
                            "kind": "Identifier",
                            "span": {
                                "end": 4,
                                "start": 3,
                            },
                            "value": {
                                "type": "ident",
                                "value": "b",
                            },
                            },
                            "kind": "PrimaryExpression",
                            "span": {
                            "end": 4,
                            "start": 3,
                            },
                        },
                        },
                        "kind": "BinaryOperator",
                        "span": {
                        "end": 4,
                        "start": 0,
                        },
                    },
                    "kind": "AssignmentExpression",
                    "span": {
                        "end": 4,
                        "start": 0,
                    },
                    },
                    "kind": "Expression",
                    "span": {
                    "end": 4,
                    "start": 0,
                    },
                },
            ],
        },

        "a*=b": {
            input: 'a*=b',
            ast: [
                {
                    "body": {
                    "body": {
                        "body": {
                        "left": {
                            "body": {
                            "kind": "Identifier",
                            "span": {
                                "end": 1,
                                "start": 0,
                            },
                            "value": {
                                "type": "ident",
                                "value": "a",
                            },
                            },
                            "kind": "PrimaryExpression",
                            "span": {
                            "end": 1,
                            "start": 0,
                            },
                        },
                        "operator": "*=",
                        "right": {
                            "body": {
                            "kind": "Identifier",
                            "span": {
                                "end": 4,
                                "start": 3,
                            },
                            "value": {
                                "type": "ident",
                                "value": "b",
                            },
                            },
                            "kind": "PrimaryExpression",
                            "span": {
                            "end": 4,
                            "start": 3,
                            },
                        },
                        },
                        "kind": "BinaryOperator",
                        "span": {
                        "end": 4,
                        "start": 0,
                        },
                    },
                    "kind": "AssignmentExpression",
                    "span": {
                        "end": 4,
                        "start": 0,
                    },
                    },
                    "kind": "Expression",
                    "span": {
                    "end": 4,
                    "start": 0,
                    },
                },
            ],
        },

        "a/=b": {
            input: 'a/=b',
            ast: [
                {
                    "body": {
                    "body": {
                        "body": {
                        "left": {
                            "body": {
                            "kind": "Identifier",
                            "span": {
                                "end": 1,
                                "start": 0,
                            },
                            "value": {
                                "type": "ident",
                                "value": "a",
                            },
                            },
                            "kind": "PrimaryExpression",
                            "span": {
                            "end": 1,
                            "start": 0,
                            },
                        },
                        "operator": "/=",
                        "right": {
                            "body": {
                            "kind": "Identifier",
                            "span": {
                                "end": 4,
                                "start": 3,
                            },
                            "value": {
                                "type": "ident",
                                "value": "b",
                            },
                            },
                            "kind": "PrimaryExpression",
                            "span": {
                            "end": 4,
                            "start": 3,
                            },
                        },
                        },
                        "kind": "BinaryOperator",
                        "span": {
                        "end": 4,
                        "start": 0,
                        },
                    },
                    "kind": "AssignmentExpression",
                    "span": {
                        "end": 4,
                        "start": 0,
                    },
                    },
                    "kind": "Expression",
                    "span": {
                    "end": 4,
                    "start": 0,
                    },
                },
            ],
        },

        "a%=b": {
            input: 'a%=b',
            ast: [
                {
                    "body": {
                    "body": {
                        "body": {
                        "left": {
                            "body": {
                            "kind": "Identifier",
                            "span": {
                                "end": 1,
                                "start": 0,
                            },
                            "value": {
                                "type": "ident",
                                "value": "a",
                            },
                            },
                            "kind": "PrimaryExpression",
                            "span": {
                            "end": 1,
                            "start": 0,
                            },
                        },
                        "operator": "%=",
                        "right": {
                            "body": {
                            "kind": "Identifier",
                            "span": {
                                "end": 4,
                                "start": 3,
                            },
                            "value": {
                                "type": "ident",
                                "value": "b",
                            },
                            },
                            "kind": "PrimaryExpression",
                            "span": {
                            "end": 4,
                            "start": 3,
                            },
                        },
                        },
                        "kind": "BinaryOperator",
                        "span": {
                        "end": 4,
                        "start": 0,
                        },
                    },
                    "kind": "AssignmentExpression",
                    "span": {
                        "end": 4,
                        "start": 0,
                    },
                    },
                    "kind": "Expression",
                    "span": {
                    "end": 4,
                    "start": 0,
                    },
                },
            ],
        },

        "a+=b-=c/=d%=e": {
            input: 'a+=b-=c/=d%=e',
            ast: [
            {
                "body": {
                "body": {
                    "body": {
                    "left": {
                        "body": {
                        "kind": "Identifier",
                        "span": {
                            "end": 1,
                            "start": 0,
                        },
                        "value": {
                            "type": "ident",
                            "value": "a",
                        },
                        },
                        "kind": "PrimaryExpression",
                        "span": {
                        "end": 1,
                        "start": 0,
                        },
                    },
                    "operator": "+=",
                    "right": {
                        "body": {
                        "body": {
                            "left": {
                            "body": {
                                "kind": "Identifier",
                                "span": {
                                "end": 4,
                                "start": 3,
                                },
                                "value": {
                                "type": "ident",
                                "value": "b",
                                },
                            },
                            "kind": "PrimaryExpression",
                            "span": {
                                "end": 4,
                                "start": 3,
                            },
                            },
                            "operator": "-=",
                            "right": {
                            "body": {
                                "body": {
                                "left": {
                                    "body": {
                                    "kind": "Identifier",
                                    "span": {
                                        "end": 7,
                                        "start": 6,
                                    },
                                    "value": {
                                        "type": "ident",
                                        "value": "c",
                                    },
                                    },
                                    "kind": "PrimaryExpression",
                                    "span": {
                                    "end": 7,
                                    "start": 6,
                                    },
                                },
                                "operator": "/=",
                                "right": {
                                    "body": {
                                    "body": {
                                        "left": {
                                        "body": {
                                            "kind": "Identifier",
                                            "span": {
                                            "end": 10,
                                            "start": 9,
                                            },
                                            "value": {
                                            "type": "ident",
                                            "value": "d",
                                            },
                                        },
                                        "kind": "PrimaryExpression",
                                        "span": {
                                            "end": 10,
                                            "start": 9,
                                        },
                                        },
                                        "operator": "%=",
                                        "right": {
                                        "body": {
                                            "kind": "Identifier",
                                            "span": {
                                            "end": 13,
                                            "start": 12,
                                            },
                                            "value": {
                                            "type": "ident",
                                            "value": "e",
                                            },
                                        },
                                        "kind": "PrimaryExpression",
                                        "span": {
                                            "end": 13,
                                            "start": 12,
                                        },
                                        },
                                    },
                                    "kind": "BinaryOperator",
                                    "span": {
                                        "end": 13,
                                        "start": 9,
                                    },
                                    },
                                    "kind": "AssignmentExpression",
                                    "span": {
                                    "end": 13,
                                    "start": 9,
                                    },
                                },
                                },
                                "kind": "BinaryOperator",
                                "span": {
                                "end": 13,
                                "start": 6,
                                },
                            },
                            "kind": "AssignmentExpression",
                            "span": {
                                "end": 13,
                                "start": 6,
                            },
                            },
                        },
                        "kind": "BinaryOperator",
                        "span": {
                            "end": 13,
                            "start": 3,
                        },
                        },
                        "kind": "AssignmentExpression",
                        "span": {
                        "end": 13,
                        "start": 3,
                        },
                    },
                    },
                    "kind": "BinaryOperator",
                    "span": {
                    "end": 13,
                    "start": 0,
                    },
                },
                "kind": "AssignmentExpression",
                "span": {
                    "end": 13,
                    "start": 0,
                },
                },
                "kind": "Expression",
                "span": {
                "end": 13,
                "start": 0,
                },
            },
            ],
        },
    };

// ╚══════════════════════════════════════════════════════════════════════════════════════╝