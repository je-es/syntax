<!----------------------------------- BEG ----------------------------------->
<br>
<div align="center">
    <p>
        <img src="./assets/img/logo.png" alt="syntax" height="80" />
    </p>
</div>

<p align="center">
    <img src="https://img.shields.io/badge/Unified-black"/>
    <img src="https://img.shields.io/badge/Developer%20Friendly-black"/>
    <img src="https://img.shields.io/badge/LSP%20Ready-black"/>
    <img src="https://img.shields.io/badge/Enhanced%20Linting-black"/>
</p>

<p align="center" style="font-style:italic; color:gray">
    A comprehensive wrapper that unifies lexer and <br>
    parser modules into a streamlined interface for creating custom syntax.<br>
    It provides LSP integration, CLI tooling support, and advanced linting with early error detection.
</p>

<div align="center">
    <img src="./assets/img/line.png" alt="line" style="display: block; margin-top:20px;margin-bottom:20px;width:500px;"/>
</div>
<br>

<!--------------------------------------------------------------------------->



<!----------------------------------- HOW ----------------------------------->

## 🚀 Installation

```bash
npm install @je-es/syntax
```

```typescript
import * as syntax from '@je-es/syntax';
```

<br>

## 🌟 How to Use

> The [@je-es/lexer](https://github.com/je-es/lexer) and [@je-es/parser](https://github.com/je-es/parser) modules are designed as completely independent, lightweight components with zero dependencies.
>
> While this modular architecture ensures flexibility and focused functionality, integrating these modules can be complex for end users.

> **@je-es/syntax** solves this by providing a unified wrapper that streamlines the development experience.
>
> This enables you to create different syntaxes through a consistent API, while offering dedicated interfaces for Language Server Protocol (LSP) and CLI applications.
>
> The wrapper facilitates seamless parsing, advanced linting capabilities, and early syntax error detection before code generation.

```ts
const mySyntax = syntax.create({
    name     : 'mySyntax',
    version  : '0.0.1',
    lexer    : { .. },
    parser   : [ .. ],
    settings : { .. }
});

const result = mySyntax.parse('some code');
```

<br>

<!--------------------------------------------------------------------------->



<!----------------------------------- API ----------------------------------->

## 📖 API Reference

- #### Functions

    ```ts
    // Create a new syntax object with the given configuration.
    function create(config: SyntaxConfig): Syntax
    ```

- #### Syntax Class

  - #### Fields

    ```ts
    // The configuration object for the syntax, containing
    // the lexer rules, parser rules, and parser settings.
    public config: SyntaxConfig;
    ```

    ```ts
    // The parser instance used to parse the syntax tree.
    public parser: parser.Parser;
    ```

  - #### Functions

    ```ts
    // Parse a given input string into a structured syntax
    // tree using the syntax's parser.
    parse(input: string): parser.ParseResult
    ```

    ```ts
    // Similar to parse, but returns only the errors in the parse result.
    lint(input: string): parser.ParseError[]
    ```

    ```ts
    // Create a new Syntax object with the given start rule and debug level,
    // using the current syntax's configuration.
    from(ruleName: string, debug: parser.DebugLevel | null = null) : Syntax
    ```

<br>
<div align="center">
<img src="./assets/img/line.png" alt="line" style="display: block; margin-top:20px;margin-bottom:20px;width:500px;"/>
</div>

<!--------------------------------------------------------------------------->



<!----------------------------------- REL ----------------------------------->

- #### 🔗 Related

  - ##### [@je-es/lexer](https://github.com/je-es/lexer)
      > Fundamental lexical analyzer that transforms source text into structured tokens with type and position information.

  - ##### [@je-es/parser](https://github.com/je-es/parser)
      > Advanced syntax analyzer that converts tokens into AST with customizable grammar rules and intelligent error detection.

  - ##### @je-es/syntax
      > Unified wrapper that streamlines syntax creation with integrated lexer-parser coordination, LSP support, and enhanced linting capabilities.

  - ##### [@je-es/program](https://github.com/je-es/program)
      > A high-performance, type-safe program representation library with advanced semantic analysis for programming languages.

<br>
<div align="center">
    <img src="./assets/img/line.png" alt="line" style="display: block; margin-top:20px;margin-bottom:20px;width:500px;"/>
</div>

<!--------------------------------------------------------------------------->



<!----------------------------------- END ----------------------------------->

<br>
<div align="center">
    <a href="https://github.com/maysara-elshewehy">
        <img src="https://img.shields.io/badge/Made with ❤️ by-Maysara-orange"/>
    </a>
</div>

<!--------------------------------------------------------------------------->