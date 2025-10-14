<!----------------------------------- BEG ----------------------------------->
<br>
<div align="center">
    <p>
        <img src="./assets/img/logo.png" alt="syntax" height="50" />
    </p>
</div>

<div align="center">
    <img src="./assets/img/line.png" alt="line" style="display: block; margin-top:20px;margin-bottom:20px;width:500px;"/>
</div>

<p align="center" style="font-style:italic; color:gray;">
    <br>
    Unified wrapper that streamlines syntax creation<br>
    with integrated lexer-parser coordination, LSP support, and enhanced linting capabilities..!
    <br>
</p>

<div align="center">
    <img src="./assets/img/line.png" alt="line" style="display: block; margin-top:20px;margin-bottom:20px;width:500px;"/>
</div>
<br>

<!--------------------------------------------------------------------------->



<!----------------------------------- HMM ----------------------------------->

## [3] [`@je-es/syntax`](https://github.com/je-es/syntax) 🚀

> _To understand the full context, please refer to [these documents](https://github.com/kemet-lang/.github/blob/main/profile/roadmap/MVP.md)._

- ### Install

    ```bash
    npm install @je-es/syntax
    ```

    ```ts
    import * as Syntax from "@je-es/syntax";
    ```

- ### Basic Usage

    ```ts
    // [1] Create syntax object
    const syntax = Syntax.create({
        name     : 'Kemet',
        version  : '0.0.1',
        lexer    : lexerRules,      // Hint: use `@je-es/lexer`  for lexer rules
        parser   : parserRules,     // Hint: use `@je-es/parser` for parser rules
        settings : parserSettings   // Hint: use `@je-es/parser` for parser settings
        lsp      : lspConfig        // Hint: use `@je-es/lsp`    for lsp config
    } as Syntax.SyntaxConfig);
    ```

    ```ts
    // [2] One instruction that abbreviates both: lexer.tokenize() and parser.parse()
    syntax.parse('<your-text>');
    ```

- ### LSP Integration

    > The `@je-es/syntax` package now supports LSP (Language Server Protocol) configuration, allowing you to define language-specific features for IDE integration.

    - #### Define LSP Configuration

        ```ts
        import type { LSPConfig } from '@je-es/syntax';

        const lspConfig: LSPConfig = {

            keywords: {
                declarations    : ['let', 'fn', 'def', 'use', 'pub'],
                types           : ['i8', 'i16', 'i32', 'i64', 'bool', 'str'],
                controlFlow     : ['if', 'else', 'while', 'for', 'return'],
                modifiers       : ['mut', 'pub', 'static', 'inline'],
                operators       : ['as', 'typeof', 'sizeof', 'try', 'catch'],
                literals        : ['true', 'false', 'null', 'und'],
                builtins        : ['@print', '@i', 'self']
            },

            keywordDocs: {
                'let': {
                    signature   : '[pub] let [mut] name: type = value',
                    description : 'Declare a variable',
                    example     : 'let mut counter: i32 = 0;'
                },
                'fn': {
                    signature   : '[pub] fn name(params) -> type { }',
                    description : 'Declare a function',
                    example     : 'pub fn add(a: i32, b: i32) -> i32 { return a + b; }'
                }
                // ...
            },

            builtinDocs: {
                '@print'        : '```kemet\nfn @print(text: str) -> void\n```\n\nBuilt-in function to print text.',
                // ...
            },

            triggerCharacters   : ['.', ':', '@', ' '],
            fileExtension       : '.k'
        };
        ```

    - #### Use in LSP Server

        ```ts
        import { LSP } from '@je-es/lsp';
        import { kemetSyntax } from '@kemet-rules/lang';

        const lsp = new LSP(connection, documents, {
            syntax   : kemetSyntax,  // ← Pass syntax with LSP config
            rootPath : process.cwd()
        });

        lsp.start();
        ```

---

> #### 1. [@je-es/lexer](https://github.com/je-es/lexer)
> #### 2. [@je-es/parser](https://github.com/je-es/parser)
> #### 3. [`@je-es/syntax`](https://github.com/je-es/syntax)
> #### 4. [@je-es/ast](https://github.com/je-es/ast)
> #### 5. [@kemet-lang/rules](https://github.com/kemet-lang/rules)
> #### 6. [@je-es/ast-analyzer](https://github.com/je-es/ast-analyzer)
> #### 7. [@je-es/project](https://github.com/je-es/project)
> #### 8. [@je-es/lsp](https://github.com/je-es/lsp)

<div align="center">
    <img src="./assets/img/line.png" alt="line" style="display: block; margin-top:20px;margin-bottom:20px;width:500px;"/>
</div>

<p align="center">
    <b>
        <br>
        <i style="color: gray;">"
        Currently I'm working on a larger lsp, so I'll skip writing documentation for now due to time constraints.
        "</i>
        <br>
    </b>
</p>

<div align="center">
    <img src="./assets/img/line.png" alt="line" style="display: block; margin-top:20px;margin-bottom:20px;width:500px;"/>
</div>

<!--------------------------------------------------------------------------->



<!----------------------------------- END ----------------------------------->

<br>
<div align="center">
    <a href="https://github.com/maysara-elshewehy">
        <img src="https://img.shields.io/badge/by-Maysara-blue"/>
    </a>
</div>

<!-------------------------------------------------------------------------->