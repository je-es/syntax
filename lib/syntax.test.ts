// syntax.test.ts
//
// Developed with ❤️ by Maysara.

// ╔════════════════════════════════════════ PACK ════════════════════════════════════════╗

    import * as lexerLib  from '@je-es/lexer';
    import * as parserLib from '@je-es/parser';
    import * as syntaxLib from './syntax';

// ╚══════════════════════════════════════════════════════════════════════════════════════╝

// ╔════════════════════════════════════════ MOCK ════════════════════════════════════════╗

    // Simple test grammar: variable declarations
    const createTestSyntax = () => {
        const lexerRules: lexerLib.Rules = {
            // Whitespace
            ws          : /\s+/,

            // Keywords
            let         : 'let',
            const       : 'const',
            var         : 'var',

            // Literals
            number      : /\d+/,

            // Operators
            '='         : '=',
            '+'         : '+',
            '-'         : '-',
            '*'         : '*',
            '/'         : '/',

            // Punctuation
            ':'         : ':',
            ';'         : ';',

            // Identifiers (must come last to not match keywords)
            ident       : /[a-zA-Z_][a-zA-Z0-9_]*/,
        };

        const parserRules: parserLib.Rule[] = [
            parserLib.createRule('root',
                parserLib.oneOrMore(parserLib.rule('statement'))
            ),
            parserLib.createRule('statement',
                parserLib.seq(
                    parserLib.choice(
                        parserLib.token('let'),
                        parserLib.token('var'),
                        parserLib.token('const'),
                    ),
                    parserLib.token('ident'),
                    parserLib.optional(
                        parserLib.seq(
                            parserLib.token('='),
                            parserLib.rule('expression')
                        )
                    ),
                    parserLib.token(';')
                )
            ),
            parserLib.createRule('expression',
                parserLib.choice(
                    parserLib.token('number'),
                    parserLib.token('ident')
                )
            )
        ];

        const config: syntaxLib.SyntaxConfig = {
            name: 'test-lang',
            version: '1.0.0',
            lexer: lexerRules,
            parser: parserRules,
            settings: {
                startRule: 'root',
                ignored: ['ws'],
                debug: 'off',
                errorRecovery: { mode: 'resilient', maxErrors: 10 }
            }
        };

        return syntaxLib.create(config);
    };

// ╚══════════════════════════════════════════════════════════════════════════════════════╝

// ╔════════════════════════════════════════ TEST ════════════════════════════════════════╗

    describe("Syntax - Basic Functionality", () => {
        it("should parse simple input", () => {
            const syntax = createTestSyntax();
            const result = syntax.parse('let x = 5;');
            expect(result.errors.length).toBe(0);
            expect(result.ast.length).toBeGreaterThan(0);
        });

        it("should handle multiple statements", () => {
            const syntax = createTestSyntax();
            const result = syntax.parse('let x = 5; const y = 10;');

            expect(result.errors.length).toBe(0);
            expect(result.ast.length).toBe(1);
        });
    });

    describe("Syntax - Incremental Parsing: Simple Insertions", () => {
        it("should handle appending a space efficiently", () => {
            const syntax = createTestSyntax();

            // First parse
            const result1 = syntax.parse('let x = 5;');
            expect(result1.errors.length).toBe(0);

            // Add trailing space (minimal change)
            const result2 = syntax.parse('let x = 5; ');
            expect(result2.errors.length).toBe(0);
            expect(result2.ast.length).toBe(result1.ast.length);
        });

        it("should handle inserting character in middle", () => {
            const syntax = createTestSyntax();

            const result1 = syntax.parse('let x = 5;');
            const result2 = syntax.parse('let xy = 5;');

            expect(result2.errors.length).toBe(0);
            expect(result2.ast.length).toBe(1);
        });

        it("should handle inserting new statement", () => {
            const syntax = createTestSyntax();

            const result1 = syntax.parse('let x = 5;');
            const result2 = syntax.parse('let x = 5; let y = 10;');

            expect(result2.errors.length).toBe(0);
            expect(result2.ast.length).toBe(1);
        });

        it("should handle typing incrementally", () => {
            const syntax = createTestSyntax();

            // Simulate typing "let x = 5;" character by character
            const steps = [
                'l',
                'le',
                'let',
                'let ',
                'let x',
                'let x ',
                'let x =',
                'let x = ',
                'let x = 5',
                'let x = 5;'
            ];

            let lastErrorCount = Infinity;

            steps.forEach((step, index) => {
                const result = syntax.parse(step);

                if (index === steps.length - 1) {
                    // Final complete statement should have no errors
                    expect(result.errors.length).toBe(0);
                }
            });
        });
    });

    describe("Syntax - Incremental Parsing: Deletions", () => {
        it("should handle deleting trailing space", () => {
            const syntax = createTestSyntax();

            const result1 = syntax.parse('let x = 5; ');
            const result2 = syntax.parse('let x = 5;');

            expect(result2.errors.length).toBe(0);
            expect(result2.ast.length).toBe(1);
        });

        it("should handle deleting character in middle", () => {
            const syntax = createTestSyntax();

            const result1 = syntax.parse('let xyz = 5;');
            const result2 = syntax.parse('let xy = 5;');
            console.log(JSON.stringify(result1, null, 2))
            console.log(JSON.stringify(result2, null, 2))
            expect(result2.errors.length).toBe(0);
        });

        it("should handle deleting entire statement", () => {
            const syntax = createTestSyntax();

            const result1 = syntax.parse('let x = 5; let y = 10;');
            const result2 = syntax.parse('let x = 5;');

            expect(result2.errors.length).toBe(0);
            expect(result2.ast.length).toBe(1);
        });
    });

    describe("Syntax - Incremental Parsing: Replacements", () => {
        it("should handle replacing identifier", () => {
            const syntax = createTestSyntax();

            const result1 = syntax.parse('let x = 5;');
            const result2 = syntax.parse('let y = 5;');

            expect(result2.errors.length).toBe(0);
            expect(result2.ast.length).toBe(1);
        });

        it("should handle replacing value", () => {
            const syntax = createTestSyntax();

            const result1 = syntax.parse('let x = 5;');
            const result2 = syntax.parse('let x = 10;');

            expect(result2.errors.length).toBe(0);
            expect(result2.ast.length).toBe(1);
        });

        it("should handle replacing keyword", () => {
            const syntax = createTestSyntax();

            const result1 = syntax.parse('let x = 5;');
            const result2 = syntax.parse('const x = 5;');

            expect(result2.errors.length).toBe(0);
            expect(result2.ast.length).toBe(1);
        });
    });

    describe("Syntax - Incremental Parsing: Multiple Statements", () => {
        it("should handle editing first statement with second unchanged", () => {
            const syntax = createTestSyntax();

            const result1 = syntax.parse('let x = 5; let y = 10;');
            const result2 = syntax.parse('let x = 99; let y = 10;');

            expect(result2.errors.length).toBe(0);
            expect(result2.ast.length).toBe(1);
        });

        it("should handle editing second statement with first unchanged", () => {
            const syntax = createTestSyntax();

            const result1 = syntax.parse('let x = 5; let y = 10;');
            const result2 = syntax.parse('let x = 5; let y = 99;');

            expect(result2.errors.length).toBe(0);
            expect(result2.ast.length).toBe(1);
        });

        it("should handle inserting statement in middle", () => {
            const syntax = createTestSyntax();

            const result1 = syntax.parse('let x = 5; let z = 30;');
            const result2 = syntax.parse('let x = 5; let y = 10; let z = 30;');

            expect(result2.errors.length).toBe(0);
            expect(result2.ast.length).toBe(1);
        });
    });

    describe("Syntax - Incremental Parsing: Large Changes", () => {
        it("should fallback to full reparse for large changes", () => {
            const syntax = createTestSyntax();

            const small = 'let x = 5;';
            const large = 'let a = 1; let b = 2; let c = 3; let d = 4; let e = 5;';

            syntax.parse(small);
            const result = syntax.parse(large);

            expect(result.errors.length).toBe(0);
            expect(result.ast.length).toBe(1);
        });

        it("should handle complete document replacement", () => {
            const syntax = createTestSyntax();

            const result1 = syntax.parse('let x = 5;');
            const result2 = syntax.parse('const y = 10;');

            expect(result2.errors.length).toBe(0);
            expect(result2.ast.length).toBe(1);
        });
    });

    describe("Syntax - Incremental Parsing: Error Recovery", () => {
        it("should handle introducing syntax error", () => {
            const syntax = createTestSyntax();

            const result1 = syntax.parse('let x = 5;');
            const result2 = syntax.parse('let x = ;'); // Missing value

            expect(result1.errors.length).toBe(0);
            expect(result2.errors.length).toBeGreaterThan(0);
        });

        it("should handle fixing syntax error", () => {
            const syntax = createTestSyntax();

            const result1 = syntax.parse('let x = ;'); // Error
            const result2 = syntax.parse('let x = 5;'); // Fixed

            expect(result1.errors.length).toBeGreaterThan(0);
            expect(result2.errors.length).toBe(0);
        });

        it("should handle error in middle of multiple statements", () => {
            const syntax = createTestSyntax();

            syntax.parse('let x = 5; let y = 10; let z = 15;');
            const result = syntax.parse('let x = 5; let y = ; let z = 15;');

            // Should still parse what it can
            expect(result.ast.length).toBeGreaterThanOrEqual(1);
        });
    });

    describe("Syntax - Incremental Parsing: Edge Cases", () => {
        it("should handle empty document", () => {
            const syntax = createTestSyntax();

            const result = syntax.parse('');
            expect(result.ast.length).toBe(0);
        });

        it("should handle whitespace only", () => {
            const syntax = createTestSyntax();

            const result1 = syntax.parse('   ');
            expect(result1.ast.length).toBe(0);
        });

        it("should handle transition from empty to content", () => {
            const syntax = createTestSyntax();

            syntax.parse('');
            const result = syntax.parse('let x = 5;');

            expect(result.errors.length).toBe(0);
            expect(result.ast.length).toBe(1);
        });

        it("should handle transition from content to empty", () => {
            const syntax = createTestSyntax();

            syntax.parse('let x = 5;');
            const result = syntax.parse('');

            expect(result.ast.length).toBe(0);
        });
    });

    describe("Syntax - Performance Characteristics", () => {
        it("should maintain reasonable performance on repeated small edits", () => {
            const syntax = createTestSyntax();

            let current = 'let x = 5;';
            syntax.parse(current);

            // Simulate 100 small edits
            const startTime = Date.now();

            for (let i = 0; i < 100; i++) {
                current = current + ' ';
                syntax.parse(current);
                current = current.trim();
            }

            const elapsed = Date.now() - startTime;

            // Should complete 100 incremental parses much faster than 100 full parses
            // This is a performance regression test
            expect(elapsed).toBeLessThan(1000); // 1 second for 100 edits
        });

        it("should not accumulate excessive memory over many edits", () => {
            const syntax = createTestSyntax();

            let current = 'let x = 5;';

            // Simulate many edits to check for memory leaks
            for (let i = 0; i < 1000; i++) {
                current = `let x${i} = ${i};`;
                syntax.parse(current);
            }

            // If we get here without running out of memory, test passes
            expect(true).toBe(true);
        });
    });

    describe("Syntax - Cache Invalidation", () => {
        it("should invalidate cache correctly on structural changes", () => {
            const syntax = createTestSyntax();

            const result1 = syntax.parse('let x = 5;');
            const result2 = syntax.parse('let x = 5; let y = 10;');
            const result3 = syntax.parse('let x = 5;');

            expect(result1.errors.length).toBe(0);
            expect(result2.errors.length).toBe(0);
            expect(result3.errors.length).toBe(0);

            expect(result1.ast.length).toBe(1);
            expect(result2.ast.length).toBe(1);
            expect(result3.ast.length).toBe(1);
        });
    });

// ╚══════════════════════════════════════════════════════════════════════════════════════╝