<!----------------------------------- BEG ----------------------------------->
<br>
<div align="center">
    <p>
        <img src="./assets/img/logo.png" alt="syntax" style="" height="50" />
    </p>
</div>


<div align="center">
    <p align="center" style="font-style:italic; color:gray;">
        Defines the formal grammar and syntax rules.<br>
        Acts as the single source of truth for all language constructs and structures.
        <br>
    </p>
    <img src="https://img.shields.io/badge/Version-0.2.3-black"/>
    <a href="https://github.com/je-es"><img src="https://img.shields.io/badge/Part_of-@je--es-black"/></a>
    <a href="https://github.com/kemet-lang"><img src="https://img.shields.io/badge/Built_for-@kemet--lang-black"/></a>
</div>


<div align="center">
    <img src="./assets/img/line.png" alt="line" style="display: block; margin-top:20px;margin-bottom:20px;width:500px;"/>
    <br>
</div>

<!--------------------------------------------------------------------------->



<!----------------------------------- --- ----------------------------------->

- ### Install

    ```bash
    npm install @je-es/syntax
    ```

    ```ts
    import * as Syntax from "@je-es/syntax";
    ```

    <div align="center"> <br> <img src="./assets/img/line.png" alt="line" style="display: block; margin-top:20px;margin-bottom:20px;width:500px;"/> <br> </div>

- ### Usage

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

    <div align="center"> <br> <img src="./assets/img/line.png" alt="line" style="display: block; margin-top:20px;margin-bottom:20px;width:500px;"/> <br> </div>


- ### Related

    - #### [kemet-lang (MVP)](https://github.com/kemet-lang/.github/blob/main/profile/roadmap/MVP.md)

        > #### 1. [@je-es/lexer](https://github.com/je-es/lexer)

        > #### 2. [@je-es/parser](https://github.com/je-es/parser)

        > #### 3. [@je-es/ast](https://github.com/je-es/ast)

        > #### 4. [`@je-es/syntax`](https://github.com/je-es/syntax)

        > #### 5. [@je-es/ast-analyzer](https://github.com/je-es/ast-analyzer)

        > #### 6. [@je-es/project](https://github.com/je-es/project)

        > #### 7. [@je-es/lsp](https://github.com/je-es/lsp)

        > #### 8. [@je-es/codegen](https://github.com/je-es/codegen)

        > #### 9. [@je-es/compiler](https://github.com/je-es/compiler)



<!--------------------------------------------------------------------------->



<!----------------------------------- END ----------------------------------->

<br>
<div align="center">
    <img src="./assets/img/line.png" alt="line" style="display: block; margin-top:20px;margin-bottom:20px;width:500px;"/>
</div>
<br>

<div align="center">
    <a href="https://github.com/maysara-elshewehy">
        <img src="https://img.shields.io/badge/by-Maysara-blue"/>
    </a>
</div>

<!-------------------------------------------------------------------------->