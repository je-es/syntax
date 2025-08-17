// Expression.ts
//
// Developed with ❤️ by Maysara.



// ╔════════════════════════════════════════ PACK ════════════════════════════════════════╗

    import { parser } from '../../../lib/syntax';

// ╚══════════════════════════════════════════════════════════════════════════════════════╝



// ╔════════════════════════════════════════ INIT ════════════════════════════════════════╗

    export const ExpressionRules: parser.Rules = [

        // ╔═══════════════════════════════════════════════════════════════════════════════════╗
        // ║                                PRIMARY EXPRESSION                                 ║
        // ╚═══════════════════════════════════════════════════════════════════════════════════╝

            parser.createRule('PrimaryExpression',
                parser.choice(
                    parser.rule('Literal'),
                    parser.rule('Identifier'),
                    parser.rule('Parenthesized'),
                ),
                {

                    build: (matches) => ({
                        kind    : 'PrimaryExpression',
                        span    : matches[0].span,
                        body    : matches[0]
                    }),

                    errors: [ parser.error(0, "Expected PrimaryExpression" ) ]
                }
            ),

            parser.createRule('Literal',
                parser.choice(
                    parser.rule('NumberLiteral'),
                    parser.rule('BooleanLiteral'),
                    parser.rule('StringLiteral'),
                    parser.rule('SpecialLiteral'),
                    parser.rule('ArrayLiteral'),
                ),
                {
                    build: (matches) => {
                        return {
                            kind    : 'Literal',
                            span    : matches[0].span,
                            value   : matches[0].value
                        };
                    },

                    errors: [ parser.error(0, "Expected Literal" ) ]
                }
            ),

            parser.createRule('NumberLiteral',
                parser.choice(
                    parser.token('dec'),
                    parser.token('hex'),
                    parser.token('oct'),
                    parser.token('bin'),
                    parser.token('flt')
                ),
                {
                    build: (matches) => ({
                        kind    : 'NumberLiteral',
                        span    : matches[0].span,
                        value   : { type: matches[0].type, value: Number(matches[0].value) }
                    }),
                    errors: [ parser.error(0, "Expected NumberLiteral" ) ]
                }
            ),

            parser.createRule('BooleanLiteral',
                parser.choice(
                    parser.token('true'),
                    parser.token('false'),
                ),
                {
                    build: (matches) => ({
                        kind    : 'BooleanLiteral',
                        span    : matches[0].span,
                        value   : { type: 'bool', value: matches[0].value.toLowerCase() == 'true' ? true : false }
                    }),
                    errors: [ parser.error(0, "Expected BooleanLiteral" ) ]
                }
            ),

            parser.createRule('StringLiteral',
                parser.choice(
                    parser.token('str'),
                    parser.token('char'),
                ),
                {
                    build: (matches) => ({
                        kind    : 'StringLiteral',
                        span    : matches[0].span,
                        value   : { type: matches[0].type, value: matches[0].value }
                    }),
                    errors: [ parser.error(0, "Expected StringLiteral" ) ]
                }
            ),

            parser.createRule('SpecialLiteral',
                parser.choice(
                    parser.token('null'),
                    parser.token('undef'),
                ),
                {
                    build: (matches) => ({
                        kind    : 'SpecialLiteral',
                        span    : matches[0].span,
                        value   : { type: matches[0].type, value: matches[0].type == 'null' ? null : undefined }
                    }),
                    errors: [ parser.error(0, "Expected SpecialLiteral" ) ]
                }
            ),

            parser.createRule('Identifier',
                parser.token('ident'),
                {
                    build: (matches) => ({
                        kind    : 'Identifier',
                        span    : matches[0].span,
                        value   : { type: 'ident', value: matches[0].value }
                    }),
                    errors: [parser.error(0, "Expected identifier")]
                }
            ),

            parser.createRule('ArrayLiteral',
                parser.choice(
                    parser.rule('EmptyArrayLiteral'),
                    parser.rule('FilledArrayLiteral'),
                ),
                {
                    build: (matches) => (matches[0]),
                    errors: [ parser.error(0, "Expected ArrayLiteral" ) ]
                }
            ),

            parser.createRule('EmptyArrayLiteral',
                parser.seq(
                    parser.token('['),
                    parser.token(']'),
                ),
                {
                    build: (matches) => ({
                        kind    : 'EmptyArrayLiteral',
                        span    : parser.getMatchesSpan(matches),
                        value   : { type: 'array', value: [] }
                    }),
                    errors: [
                        parser.error(0, "Expected '[' before ArrayLiteral" ),
                        parser.error(1, "Expected ']' after ArrayLiteral" ),
                    ]
                }
            ),

            parser.createRule('FilledArrayLiteral',
                parser.seq(
                    parser.token('['),
                    parser.oneOrMore(
                        parser.rule('Expression'),
                        parser.token(',')
                    ),
                    parser.token(']'),
                ),
                {
                    build: (matches) => ({
                        kind    : 'FilledArrayLiteral',
                        span    : parser.getMatchesSpan(matches),
                        value   : { type: 'array', value: matches[1] }
                    }),
                    errors: [
                        parser.error(0, "Expected '[' before ArrayLiteral" ),
                        parser.error(2, "Expected ']' after ArrayLiteral" ),
                    ]
                }
            ),

            parser.createRule('Parenthesized',
                parser.seq(
                    parser.token('('),
                    parser.rule('Expression'),
                    parser.token(')')
                ),
                {
                    build: (matches) => ({
                        kind    : 'Parenthesized',
                        span    : parser.getMatchesSpan(matches),
                        body    : matches[1]
                    }),
                    errors: [ parser.error(0, "Expected Parenthesized" ) ]
                }
            ),

        // ╔═══════════════════════════════════════════════════════════════════════════════════╗
        // ║                                POSTFIX EXPRESSION                                 ║
        // ╚═══════════════════════════════════════════════════════════════════════════════════╝

            parser.createRule('PostfixExpression',
                parser.choice(
                    parser.seq(
                        parser.rule('PrimaryExpression'),
                        parser.oneOrMore(
                            parser.choice(
                                parser.rule('ArrayAccess'),
                                parser.rule('CallSuffix'),
                                parser.rule('MemberAccessSuffix'),
                                parser.rule('PointerAccessSuffix'),
                                parser.token('++'),
                                parser.token('--')
                            )
                        ),
                    ),
                    parser.rule('PrimaryExpression'),
                ),
                {

                    build: (matches) => {
                        let base = matches[0];
                        let operations = matches[1] || [];

                        // Apply each operation to the previous result
                        for (let op of operations) {

                            // Post Increment: single token
                            if (op.value === '++') {
                                base = {
                                    kind    : 'PostIncrement',
                                    span    : { start: base.span.start, end: op.span.end },
                                    body    : { base: base }
                                };
                            }

                            // Post Decrement: single token
                            else if (op.value === '--') {
                                base = {
                                    kind    : 'PostDecrement',
                                    span    : { start: base.span.start, end: op.span.end },
                                    body    : { base: base }
                                };
                            }

                            // Pointer Access
                            else if (op.kind === 'PointerAccessSuffix') {
                                base = {
                                    kind    : 'PointerAccess',
                                    span    : { start: base.span.start, end: op.span.end },
                                    body    : { base: base, access: op.value }
                                };
                            }

                            // Member Access
                            else if (op.kind === 'MemberAccessSuffix') {
                                base = {
                                    kind    : 'MemberAccess',
                                    span    : { start: base.span.start, end: op.span.end },
                                    body    : { base: base, index: op.value }
                                };
                            }

                            // Member Access
                            else if (op.kind === 'CallSuffix') {
                                base = {
                                    kind    : 'Call',
                                    span    : { start: base.span.start, end: op.span.end },
                                    body    : { base: base, args: op.value }
                                };
                            }

                            // Array Access
                            else if (op.kind === 'ArrayAccess') {
                                base = {
                                    kind    : 'ArrayAccess',
                                    span    : { start: base.span.start, end: op.span.end },
                                    body    : { base: base, index: op.value }
                                };
                            }
                        }

                        // Return
                        if(matches[1].length > 0) {
                            return {
                                kind    : 'PostfixExpression',
                                span    : { start: matches[0].span.start, end: base.span.end },
                                body    : base,
                            };
                        }
                        else { return matches[0]; }
                    },

                    errors: [ parser.error(0, "Expected PostfixExpression" ) ]
                }
            ),

            parser.createRule('MemberAccessSuffix',
                parser.seq(
                    parser.token('.'),
                    parser.rule('Identifier'),
                ),
                {
                    build: (matches) => ({
                        kind    : 'MemberAccessSuffix',
                        span    : parser.getMatchesSpan(matches),
                        value   : matches[1]
                    }),
                    errors: [
                        parser.error(0, "Expected '.' for member access"),
                        parser.error(1, "Expected identifier after '.'"),
                    ]
                }
            ),

            parser.createRule('PointerAccessSuffix',
                parser.seq(
                    parser.token('->'),
                    parser.rule('Identifier'),
                ),
                {
                    build: (matches) => ({
                        kind    : 'PointerAccessSuffix',
                        span    : parser.getMatchesSpan(matches)!,
                        value   : matches[1]
                    }),
                    errors: [
                        parser.error(0, "Expected '->' for pointer access"),
                        parser.error(1, "Expected identifier after '->'"),
                    ]
                }
            ),

            parser.createRule('CallSuffix',
                parser.choice(
                    parser.seq(
                        parser.token('('),
                        parser.token(')')
                    ),
                    parser.seq(
                        parser.token('('),
                        parser.rule('ArgumentList'),
                        parser.token(')')
                    ),
                ),
                {
                    build: (matches) => ({
                        kind    : 'CallSuffix',
                        span    : parser.getMatchesSpan(matches),
                        value   : matches[1].kind == 'ArgumentList' ? matches[1].value : []
                    }),
                    errors: [
                        parser.error(0, "Expected '(' for function call"),
                        parser.error(1, "Expected ')' for function call"),
                        parser.error(2, "Expected ')' for function call"),
                    ]
                }
            ),

            parser.createRule('ArgumentList',
                parser.zeroOrMore(
                    parser.rule('Expression'),
                    parser.token(',')
                ),
                {
                    build: (matches) => ({
                        kind    : 'ArgumentList',
                        span    : parser.getMatchesSpan(matches),
                        value   : matches
                    }),

                    errors: [
                        parser.error(0, "Expected ArgumentList"),
                    ]
                }
            ),

            parser.createRule('ArrayAccess',
                parser.seq(
                    parser.token('['),
                    parser.rule('Expression'),
                    parser.token(']')
                ),
                {
                    build: (matches) => {
                        return {
                            kind    : 'ArrayAccess',
                            span    : parser.getMatchesSpan(matches),
                            value   : matches[1]
                        }
                    },
                    errors: [
                        parser.error(0, "Expected '[' for array access"),
                        parser.error(1, "Expected Expression for array access"),
                        parser.error(2, "Expected ']' for array access"),
                    ]
                }
            ),

        // ╔═══════════════════════════════════════════════════════════════════════════════════╗
        // ║                                PREFIX EXPRESSION                                  ║
        // ╚═══════════════════════════════════════════════════════════════════════════════════╝

            parser.createRule('PrefixExpression',
                parser.choice(
                    parser.seq(
                        parser.oneOrMore(
                            parser.choice(
                                parser.token('++'),
                                parser.token('--'),
                                parser.token('+'),
                                parser.token('-'),
                                parser.token('!'),
                                parser.token('~'),
                            )
                        ),
                        parser.rule('PostfixExpression')
                    ),
                    parser.rule('PostfixExpression')
                ),
                {
                    build: (matches) => {
                        if (!Array.isArray(matches[0])) {
                            return matches[0];
                        }

                        let prefixes = matches[0];  // operators
                        let base = matches[1];      // PostfixExpression

                        for (let i = prefixes.length - 1; i >= 0; i--) {
                            let op = prefixes[i];

                            if (op.value === '++') {
                                base = {
                                    kind: 'PreIncrement',
                                    span: { start: op.span.start, end: base.span.end },
                                    body: { base }
                                };
                            }
                            else if (op.value === '--') {
                                base = {
                                    kind: 'PreDecrement',
                                    span: { start: op.span.start, end: base.span.end },
                                    body: { base }
                                };
                            }
                            else {
                                base = {
                                    kind: 'UnaryOperator',
                                    span: { start: op.span.start, end: base.span.end },
                                    body: { base, operator: op.value }
                                };
                            }
                        }

                        return {
                            kind: 'PrefixExpression',
                            span: { start: prefixes[0].span.start, end: base.span.end },
                            body: base
                        };
                    },
                    errors: [ parser.error(0, "Expected PrefixExpression") ]
                }
            ),

        // ╔═══════════════════════════════════════════════════════════════════════════════════╗
        // ║                               POWER EXPRESSION                                    ║
        // ╚═══════════════════════════════════════════════════════════════════════════════════╝

            parser.createRule('PowerExpression',
                parser.choice(
                    parser.seq(
                        parser.rule('PrefixExpression'),
                        parser.oneOrMore(
                            parser.seq(
                                parser.token('**'),
                                parser.rule('PrefixExpression')
                            )
                        )
                    ),
                    parser.rule('PrefixExpression')
                ),
                {
                    build: (matches) => {
                        // matches is always an array
                        // If second choice (just PrefixExpression), matches = [PrefixExpression]
                        if (matches.length === 1) {
                            return matches[0];
                        }

                        // First choice: matches = [PrefixExpression, [operations]]
                        let base = matches[0]; // First PrefixExpression
                        let operations = matches[1]; // Array of [**, PrefixExpression] pairs

                        // Power is right-associative: a**b**c = a**(b**c)
                        // Build from right to left
                        let allOperands = [base];

                        // Collect all operands
                        for (let op of operations) {
                            allOperands.push(op[1]); // The PrefixExpression after **
                        }

                        // Build right-associative chain from the end
                        let result = allOperands[allOperands.length - 1];
                        for (let i = allOperands.length - 2; i >= 0; i--) {
                            let left = allOperands[i];
                            result = {
                                kind: 'BinaryOperator',
                                span: { start: left.span.start, end: result.span.end },
                                body: { left, operator: '**', right: result }
                            };
                        }

                        return {
                            kind: 'PowerExpression',
                            span: { start: matches[0].span.start, end: result.span.end },
                            body: result
                        };
                    },
                    errors: [parser.error(0, "Expected PowerExpression")]
                }
            ),

        // ╔═══════════════════════════════════════════════════════════════════════════════════╗
        // ║                            MULTIPLICATIVE EXPRESSION                              ║
        // ╚═══════════════════════════════════════════════════════════════════════════════════╝

            parser.createRule('MultiplicativeExpression',
                parser.choice(
                    parser.seq(
                        parser.rule('PowerExpression'),
                        parser.oneOrMore(
                            parser.seq(
                                parser.choice(
                                    parser.token('*'),
                                    parser.token('/'),
                                    parser.token('%')
                                ),
                                parser.rule('PowerExpression')
                            )
                        )
                    ),
                    parser.rule('PowerExpression')
                ),
                {
                    build: (matches) => {
                        // matches is always an array
                        // If second choice (just PowerExpression), matches = [PowerExpression]
                        if (matches.length === 1) {
                            return matches[0];
                        }

                        // First choice: matches = [PowerExpression, [operations]]
                        let base = matches[0]; // First PowerExpression
                        let operations = matches[1]; // Array of [operator, PowerExpression] pairs

                        // Multiplicative is left-associative: a*b*c = (a*b)*c
                        let result = base;
                        for (let op of operations) {
                            let operator = op[0].value; // *, /, or %
                            let right = op[1]; // PowerExpression

                            result = {
                                kind: 'BinaryOperator',
                                span: { start: result.span.start, end: right.span.end },
                                body: { left: result, operator, right }
                            };
                        }

                        return {
                            kind: 'MultiplicativeExpression',
                            span: { start: matches[0].span.start, end: result.span.end },
                            body: result
                        };
                    },
                    errors: [parser.error(0, "Expected MultiplicativeExpression")]
                }
            ),

        // ╔═══════════════════════════════════════════════════════════════════════════════════╗
        // ║                              ADDITIVE EXPRESSION                                  ║
        // ╚═══════════════════════════════════════════════════════════════════════════════════╝

            parser.createRule('AdditiveExpression',
                parser.choice(
                    parser.seq(
                        parser.rule('MultiplicativeExpression'),
                        parser.oneOrMore(
                            parser.seq(
                                parser.choice(
                                    parser.token('+'),
                                    parser.token('-')
                                ),
                                parser.rule('MultiplicativeExpression')
                            )
                        )
                    ),
                    parser.rule('MultiplicativeExpression')
                ),
                {
                    build: (matches) => {
                        if (matches.length === 1) {
                            return matches[0];
                        }

                        let base = matches[0];
                        let operations = matches[1];

                        // Left-associative: a+b+c = (a+b)+c
                        let result = base;
                        for (let op of operations) {
                            let operator = op[0].value; // + or -
                            let right = op[1];

                            result = {
                                kind: 'BinaryOperator',
                                span: { start: result.span.start, end: right.span.end },
                                body: { left: result, operator, right }
                            };
                        }

                        return {
                            kind: 'AdditiveExpression',
                            span: { start: matches[0].span.start, end: result.span.end },
                            body: result
                        };
                    },
                    errors: [parser.error(0, "Expected AdditiveExpression")]
                }
            ),

        // ╔═══════════════════════════════════════════════════════════════════════════════════╗
        // ║                               SHIFT EXPRESSION                                    ║
        // ╚═══════════════════════════════════════════════════════════════════════════════════╝

            parser.createRule('ShiftExpression',
                parser.choice(
                    parser.seq(
                        parser.rule('AdditiveExpression'),
                        parser.oneOrMore(
                            parser.seq(
                                parser.choice(
                                    parser.token('<<'),
                                    parser.token('>>')
                                ),
                                parser.rule('AdditiveExpression')
                            )
                        )
                    ),
                    parser.rule('AdditiveExpression')
                ),
                {
                    build: (matches) => {
                        if (matches.length === 1) {
                            return matches[0];
                        }

                        let base = matches[0];
                        let operations = matches[1];

                        // Left-associative: a<<b<<c = (a<<b)<<c
                        let result = base;
                        for (let op of operations) {
                            let operator = op[0].value; // << or >>
                            let right = op[1];

                            result = {
                                kind: 'BinaryOperator',
                                span: { start: result.span.start, end: right.span.end },
                                body: { left: result, operator, right }
                            };
                        }

                        return {
                            kind: 'ShiftExpression',
                            span: { start: matches[0].span.start, end: result.span.end },
                            body: result
                        };
                    },
                    errors: [parser.error(0, "Expected ShiftExpression")]
                }
            ),

        // ╔═══════════════════════════════════════════════════════════════════════════════════╗
        // ║                             RELATIONAL EXPRESSION                                 ║
        // ╚═══════════════════════════════════════════════════════════════════════════════════╝

            parser.createRule('RelationalExpression',
                parser.choice(
                    parser.seq(
                        parser.rule('ShiftExpression'),
                        parser.oneOrMore(
                            parser.seq(
                                parser.choice(
                                    parser.token('<'),
                                    parser.token('>'),
                                    parser.token('<='),
                                    parser.token('>=')
                                ),
                                parser.rule('ShiftExpression')
                            )
                        )
                    ),
                    parser.rule('ShiftExpression')
                ),
                {
                    build: (matches) => {
                        if (matches.length === 1) {
                            return matches[0];
                        }

                        let base = matches[0];
                        let operations = matches[1];

                        // Left-associative: a<b<c = (a<b)<c
                        let result = base;
                        for (let op of operations) {
                            let operator = op[0].value; // <, >, <=, >=
                            let right = op[1];

                            result = {
                                kind: 'BinaryOperator',
                                span: { start: result.span.start, end: right.span.end },
                                body: { left: result, operator, right }
                            };
                        }

                        return {
                            kind: 'RelationalExpression',
                            span: { start: matches[0].span.start, end: result.span.end },
                            body: result
                        };
                    },
                    errors: [parser.error(0, "Expected RelationalExpression")]
                }
            ),

        // ╔═══════════════════════════════════════════════════════════════════════════════════╗
        // ║                              EQUALITY EXPRESSION                                  ║
        // ╚═══════════════════════════════════════════════════════════════════════════════════╝

            parser.createRule('EqualityExpression',
                parser.choice(
                    parser.seq(
                        parser.rule('RelationalExpression'),
                        parser.oneOrMore(
                            parser.seq(
                                parser.choice(
                                    parser.token('=='),
                                    parser.token('!=')
                                ),
                                parser.rule('RelationalExpression')
                            )
                        )
                    ),
                    parser.rule('RelationalExpression')
                ),
                {
                    build: (matches) => {
                        if (matches.length === 1) {
                            return matches[0];
                        }

                        let base = matches[0];
                        let operations = matches[1];

                        // Left-associative: a==b==c = (a==b)==c
                        let result = base;
                        for (let op of operations) {
                            let operator = op[0].value; // == or !=
                            let right = op[1];

                            result = {
                                kind: 'BinaryOperator',
                                span: { start: result.span.start, end: right.span.end },
                                body: { left: result, operator, right }
                            };
                        }

                        return {
                            kind: 'EqualityExpression',
                            span: { start: matches[0].span.start, end: result.span.end },
                            body: result
                        };
                    },
                    errors: [parser.error(0, "Expected EqualityExpression")]
                }
            ),

        // ╔═══════════════════════════════════════════════════════════════════════════════════╗
        // ║                            BITWISE AND EXPRESSION                                 ║
        // ╚═══════════════════════════════════════════════════════════════════════════════════╝

            parser.createRule('BitwiseAndExpression',
                parser.choice(
                    parser.seq(
                        parser.rule('EqualityExpression'),
                        parser.oneOrMore(
                            parser.seq(
                                parser.token('&'),
                                parser.rule('EqualityExpression')
                            )
                        )
                    ),
                    parser.rule('EqualityExpression')
                ),
                {
                    build: (matches) => {
                        if (matches.length === 1) {
                            return matches[0];
                        }

                        let base = matches[0];
                        let operations = matches[1];

                        // Left-associative: a&b&c = (a&b)&c
                        let result = base;
                        for (let op of operations) {
                            let operator = op[0].value; // &
                            let right = op[1];

                            result = {
                                kind: 'BinaryOperator',
                                span: { start: result.span.start, end: right.span.end },
                                body: { left: result, operator, right }
                            };
                        }

                        return {
                            kind: 'BitwiseAndExpression',
                            span: { start: matches[0].span.start, end: result.span.end },
                            body: result
                        };
                    },
                    errors: [parser.error(0, "Expected BitwiseAndExpression")]
                }
            ),

        // ╔═══════════════════════════════════════════════════════════════════════════════════╗
        // ║                            BITWISE XOR EXPRESSION                                 ║
        // ╚═══════════════════════════════════════════════════════════════════════════════════╝

            parser.createRule('BitwiseXorExpression',
                parser.choice(
                    parser.seq(
                        parser.rule('BitwiseAndExpression'),
                        parser.oneOrMore(
                            parser.seq(
                                parser.token('^'),
                                parser.rule('BitwiseAndExpression')
                            )
                        )
                    ),
                    parser.rule('BitwiseAndExpression')
                ),
                {
                    build: (matches) => {
                        if (matches.length === 1) {
                            return matches[0];
                        }

                        let base = matches[0];
                        let operations = matches[1];

                        // Left-associative: a^b^c = (a^b)^c
                        let result = base;
                        for (let op of operations) {
                            let operator = op[0].value; // ^
                            let right = op[1];

                            result = {
                                kind: 'BinaryOperator',
                                span: { start: result.span.start, end: right.span.end },
                                body: { left: result, operator, right }
                            };
                        }

                        return {
                            kind: 'BitwiseXorExpression',
                            span: { start: matches[0].span.start, end: result.span.end },
                            body: result
                        };
                    },
                    errors: [parser.error(0, "Expected BitwiseXorExpression")]
                }
            ),

        // ╔═══════════════════════════════════════════════════════════════════════════════════╗
        // ║                            BITWISE OR EXPRESSION                                  ║
        // ╚═══════════════════════════════════════════════════════════════════════════════════╝

            parser.createRule('BitwiseOrExpression',
                parser.choice(
                    parser.seq(
                        parser.rule('BitwiseXorExpression'),
                        parser.oneOrMore(
                            parser.seq(
                                parser.token('|'),
                                parser.rule('BitwiseXorExpression')
                            )
                        )
                    ),
                    parser.rule('BitwiseXorExpression')
                ),
                {
                    build: (matches) => {
                        if (matches.length === 1) {
                            return matches[0];
                        }

                        let base = matches[0];
                        let operations = matches[1];

                        // Left-associative: a|b|c = (a|b)|c
                        let result = base;
                        for (let op of operations) {
                            let operator = op[0].value; // |
                            let right = op[1];

                            result = {
                                kind: 'BinaryOperator',
                                span: { start: result.span.start, end: right.span.end },
                                body: { left: result, operator, right }
                            };
                        }

                        return {
                            kind: 'BitwiseOrExpression',
                            span: { start: matches[0].span.start, end: result.span.end },
                            body: result
                        };
                    },
                    errors: [parser.error(0, "Expected BitwiseOrExpression")]
                }
            ),

        // ╔═══════════════════════════════════════════════════════════════════════════════════╗
        // ║                            LOGICAL AND EXPRESSION                                 ║
        // ╚═══════════════════════════════════════════════════════════════════════════════════╝

            parser.createRule('LogicalAndExpression',
                parser.choice(
                    parser.seq(
                        parser.rule('BitwiseOrExpression'),
                        parser.oneOrMore(
                            parser.seq(
                                parser.token('&&'),
                                parser.rule('BitwiseOrExpression')
                            )
                        )
                    ),
                    parser.rule('BitwiseOrExpression')
                ),
                {
                    build: (matches) => {
                        if (matches.length === 1) {
                            return matches[0];
                        }

                        let base = matches[0];
                        let operations = matches[1];

                        // Left-associative: a&&b&&c = (a&&b)&&c
                        let result = base;
                        for (let op of operations) {
                            let operator = op[0].value; // &&
                            let right = op[1];

                            result = {
                                kind: 'BinaryOperator',
                                span: { start: result.span.start, end: right.span.end },
                                body: { left: result, operator, right }
                            };
                        }

                        return {
                            kind: 'LogicalAndExpression',
                            span: { start: matches[0].span.start, end: result.span.end },
                            body: result
                        };
                    },
                    errors: [parser.error(0, "Expected LogicalAndExpression")]
                }
            ),

        // ╔═══════════════════════════════════════════════════════════════════════════════════╗
        // ║                            LOGICAL OR EXPRESSION                                  ║
        // ╚═══════════════════════════════════════════════════════════════════════════════════╝

            parser.createRule('LogicalOrExpression',
                parser.choice(
                    parser.seq(
                        parser.rule('LogicalAndExpression'),
                        parser.oneOrMore(
                            parser.seq(
                                parser.token('||'),
                                parser.rule('LogicalAndExpression')
                            )
                        )
                    ),
                    parser.rule('LogicalAndExpression')
                ),
                {
                    build: (matches) => {
                        if (matches.length === 1) {
                            return matches[0];
                        }

                        let base = matches[0];
                        let operations = matches[1];

                        // Left-associative: a||b||c = (a||b)||c
                        let result = base;
                        for (let op of operations) {
                            let operator = op[0].value; // ||
                            let right = op[1];

                            result = {
                                kind: 'BinaryOperator',
                                span: { start: result.span.start, end: right.span.end },
                                body: { left: result, operator, right }
                            };
                        }

                        return {
                            kind: 'LogicalOrExpression',
                            span: { start: matches[0].span.start, end: result.span.end },
                            body: result
                        };
                    },
                    errors: [parser.error(0, "Expected LogicalOrExpression")]
                }
            ),

        // ╔═══════════════════════════════════════════════════════════════════════════════════╗
        // ║                             TERNARY EXPRESSION                                    ║
        // ╚═══════════════════════════════════════════════════════════════════════════════════╝

            parser.createRule('TernaryExpression',
                parser.choice(
                    parser.seq(
                        parser.rule('LogicalOrExpression'),
                        parser.token('?'),
                        parser.rule('Expression'),
                        parser.token(':'),
                        parser.rule('TernaryExpression')
                    ),
                    parser.rule('LogicalOrExpression')
                ),
                {
                    build: (matches) => {
                        if (matches.length === 1) {
                            return matches[0];
                        }

                        // matches = [condition, '?', trueExpr, ':', falseExpr]
                        let condition = matches[0];
                        let trueExpr = matches[2];
                        let falseExpr = matches[4];

                        return {
                            kind: 'TernaryExpression',
                            span: { start: condition.span.start, end: falseExpr.span.end },
                            body: {
                                kind: 'TernaryOperator',
                                span: { start: condition.span.start, end: falseExpr.span.end },
                                body: { condition, trueExpr, falseExpr }
                            }
                        };
                    },
                    errors: [
                        parser.error(0, "Expected condition in ternary expression"),
                        parser.error(1, "Expected '?' in ternary expression"),
                        parser.error(2, "Expected true expression in ternary expression"),
                        parser.error(3, "Expected ':' in ternary expression"),
                        parser.error(4, "Expected false expression in ternary expression")
                    ]
                }
            ),

        // ╔═══════════════════════════════════════════════════════════════════════════════════╗
        // ║                            ASSIGNMENT EXPRESSION                                  ║
        // ╚═══════════════════════════════════════════════════════════════════════════════════╝

            parser.createRule('AssignmentExpression',
                parser.choice(
                    parser.seq(
                        parser.rule('TernaryExpression'),
                        parser.choice(
                            parser.token('='),
                            parser.token('+='),
                            parser.token('-='),
                            parser.token('*='),
                            parser.token('/='),
                            parser.token('%=')
                        ),
                        parser.rule('AssignmentExpression')  // Right-associative
                    ),
                    parser.rule('TernaryExpression')
                ),
                {
                    build: (matches) => {
                        if (matches.length === 1) {
                            return matches[0];
                        }

                        // matches = [left, operator, right]
                        let left = matches[0];
                        let operator = matches[1].value;
                        let right = matches[2];

                        return {
                            kind: 'AssignmentExpression',
                            span: { start: left.span.start, end: right.span.end },
                            body: {
                                kind: 'BinaryOperator',
                                span: { start: left.span.start, end: right.span.end },
                                body: { left, operator, right }
                            }
                        };
                    },
                    errors: [
                        parser.error(0, "Expected left-hand side in assignment"),
                        parser.error(1, "Expected assignment operator"),
                        parser.error(2, "Expected right-hand side in assignment")
                    ]
                }
            ),

        // ╔═══════════════════════════════════════════════════════════════════════════════════╗
        // ║                                    EXPRESSION                                     ║
        // ╚═══════════════════════════════════════════════════════════════════════════════════╝

            parser.createRule('Expression',
                parser.errorOrArrayOfOne(parser.silent(parser.rule('AssignmentExpression'))),
                {
                    build: (matches) => {
                        return {
                            kind    : 'Expression',
                            span    : matches[0] && matches[0].span ? matches[0].span : { start: 0, end: 0 },
                            body    : matches[0]
                        };
                    },

                    silent: false,

                    errors: [parser.error(0, "Expected Expression")],
                }
            ),

        // ╔═══════════════════════════════════════════════════════════════════════════════════╗
        // ║                                       ####                                        ║
        // ╚═══════════════════════════════════════════════════════════════════════════════════╝
    ];

// ╚══════════════════════════════════════════════════════════════════════════════════════╝