# Language Server

[Langserver.org](https://langserver.org/)

Langserver.org is a community-driven site, maintained by Sourcegraph, to track development progress of LSP-compatible language servers and clients.

This site contains a huge list of language server implementations for various languages, indicating how much support is included:

- Code completion
- Hover
- Jump to definition
- Workspace symbols
- Find references
- Diagnostics

## VS Code guides

- [Syntax Highlight Guide](https://code.visualstudio.com/api/language-extensions/syntax-highlight-guide)
- [Snippet Guide](https://code.visualstudio.com/api/language-extensions/snippet-guide)
- [Language Configuration Guide](https://code.visualstudio.com/api/language-extensions/language-configuration-guide)
- [Programmatic Language Features](https://code.visualstudio.com/api/language-extensions/programmatic-language-features)
- [Language Server Extension Guide](https://code.visualstudio.com/api/language-extensions/language-server-extension-guide)

- [Protocol specifications](https://microsoft.github.io/language-server-protocol/specification)

### Visual Studio

- [Add a Language Server Protocol extension](https://docs.microsoft.com/en-us/visualstudio/extensibility/adding-an-lsp-extension?view=vs-2017)

## Examples

### VS Code tutorial

- [Implement your own Language Server](https://vscode.readthedocs.io/en/latest/extensions/example-language-server/)

Clone the [lsp-sample repository](https://github.com/Microsoft/vscode-extension-samples/tree/master/lsp-sample) from [Microsoft/vscode-extension-samples] and then do:

```bash
> cd lsp-sample
> npm install
> code .
```

The above installs all dependencies and opens one VS Code instances containing both the client and server code.

Follow the example...

### DOT language

- [Why You Should Know the Language Server Protocol](https://tomassetti.me/what-is-the-language-server-protocol/)
- [Building a Language Server for DOT with Visual Studio Code](https://tomassetti.me/language-server-dot-visual-studio/)
- [repo: server DOT language](https://github.com/unosviluppatore/language-server-dot)

## Language Servers based on Chevrotain languages

### Argdown

- [Argdown](https://github.com/christianvoigt/argdown)
- [Argdown language server](https://github.com/christianvoigt/argdown/tree/master/packages/argdown-language-server)

An editor-agnostic language server for the Argdown language with code linter, code assistance and code completion providers. Implements the language server protocol and depends on @argdown/core and @argdown/node

### Toml

- [Toml tools](https://github.com/bd82/toml-tools)

Infrastructure packages:

- @toml-tools/lexer
- @toml-tools/parser

See [packages](https://github.com/bd82/toml-tools/tree/master/packages)

Tooling Packages:

prettier-plugin-toml
