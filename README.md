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
    A wrapper for @je-es/lexer and @je-es/parser..!
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

- ### Usage

    ```ts
    // [1] create syntax object
    const syntax = Syntax.create({
            name     : 'Kemet',
            version  : '0.0.1',
            lexer    : lexerRules,      // Hint: use `@je-es/lexer`  for lexer rules
            parser   : parserRules,     // Hint: use `@je-es/parser` for parser rules
            settings : parserSettings   // Hint: use `@je-es/parser` for parser settings
        } as syntax.SyntaxConfig
    );
    ```

    ```ts
    // [2] One instruction that abbreviates both: lexer.tokenize() and parser.parse() functions.
    syntax.parse('<your-text>');
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
        Currently I'm working on a larger project, so I'll skip writing documentation for now due to time constraints.
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
        <img src="https://img.shields.io/badge/Made with ❤️ by-Maysara-blue"/>
    </a>
</div>

<!-------------------------------------------------------------------------->