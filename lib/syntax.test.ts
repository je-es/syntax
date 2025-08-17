// syntax.test.ts
//
// Developed with ❤️ by Maysara.



// ╔════════════════════════════════════════ PACK ════════════════════════════════════════╗

    import * as fs from 'fs';
    import * as path from 'path';

// ╚══════════════════════════════════════════════════════════════════════════════════════╝



// ╔════════════════════════════════════════ INIT ════════════════════════════════════════╗

    // Helper to recursively find all *.case.ts or *.case.js files in a directory
    function findTestFiles(dir: string, pattern = /.case\.(ts|js)$/): string[] {
        let results: string[] = [];
        for (const entry of fs.readdirSync(dir)) {
            const fullPath = path.join(dir, entry);
            const stat = fs.statSync(fullPath);
            if (stat.isDirectory()) {
                results = results.concat(findTestFiles(fullPath, pattern));
            } else if (pattern.test(entry)) {
                results.push(fullPath);
            }
        }
        return results;
    }

    // Find all test files under ./tests/cases/
    const casesRoot = path.join(__dirname, '../tests/');
    const testFiles = findTestFiles(casesRoot);

    // Load all test modules and collect their exports
    type TestModule = {
        syntax: any,
        cases: Record<string, any>
    };

    const allCases: { filename: string, module: TestModule }[] = testFiles.map(file => {
        const mod = require(file);
        const syntax : any = mod.Syntax || mod.default?.Syntax;
        const cases  : any = mod.cases || (mod.default && mod.default.cases) || {};

        return {
            filename: path.relative(casesRoot, file),
            module: { syntax, cases }
        };
    });

// ╚══════════════════════════════════════════════════════════════════════════════════════╝



// ╔════════════════════════════════════════ TEST ════════════════════════════════════════╗

    describe("Parser", () => {
        allCases.forEach(({ filename, module }) => {
            const real_filename = path.parse(filename).base;
            describe(`Test cases from ${filename}`, () => {
                for (const [name, { input, ast = [], errors = [] }] of Object.entries(module.cases)) {
                    it(name, () => {
                        const result = module.syntax.parse(input);
                        expect(result.errors).toEqual(errors);
                        expect(result.ast).toEqual(ast);
                    });
                }
            });
        });
    });

// ╚══════════════════════════════════════════════════════════════════════════════════════╝