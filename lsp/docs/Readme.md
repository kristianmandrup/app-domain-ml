# LSP Example

Heavily documented sample code for https://code.visualstudio.com/api/language-extensions/language-server-extension-guide

See [language-server-dot-visual-studio](https://tomassetti.me/language-server-dot-visual-studio/) for a more complete example

## Create LSP project

To create an LSP project from scratch, use the Yo code generator:

```bash
$ npm install -g yo generator-code
$ yo code
```

![](./images/yo-generator.png)

## Functionality

This Language Server works for plain text file. It has the following language features:

- Completions
- Diagnostics regenerated on each file change or configuration change

It also includes an End-to-End test.

## Structure

The LSP is maintained in the `lsp` folder in the project root.

```
.
├── client // Language Client
│   ├── src
│   │   ├── test // End to End tests for Language Client / Server
│   │   └── extension.ts // Language Client entry point
├── package.json // The extension manifest.
└── server // Language Server
    └── src
        └── server.ts // Language Server entry point
```

## Running the Sample

- Run `npm install` in the `lsp` folder. This installs all necessary npm modules in both the client and server folder

- Open VS Code on this folder.

### Build project

- Press Ctrl+Shift+B to compile the client and server.
- Alternatively: Cmd+P (or Ctrl+P on Windows/Linux), then `> tasks: build`

The build should generate:

#### compiled server

- `server/out`

With `server.js`

#### compiled client

- `client/out/`

with `extension.js`

### Debug

Start an Extension debug session

- Switch to the Debug viewlet (bug icon).

![](./images/viewlets.png)

- Select `Launch Client` from the drop down.

![](./images/debug.png)

- Run the launch config (Green arrow button)

#### Debug session window

This should open a new Visual Studio Code with

![](./images/debug-session-window.png)

When the Debug window loads, make sure any extensions causing errors are disabled.
I had to disable a .NET Solution Explorer extension (for `.sln` files).

#### Write text file

Create a test file in the root folder of the Debug project (save anywhere)

Create a file such as `test.txt`

```txt
typescrip is a typed superset of JavaScript that compiles to plain JavaScript.
Any browser. Any host. Any OS. Open Source.
```

Now write the missing ending `t` in the word `typescript`.

```txt
typescript is a typed superset of JavaScript that compiles to plain JavaScript.
Any browser. Any host. Any OS. Open Source.
```

You should see a code hint (popup) with suggestions (actions), such as changing the word to `TypeScript`. Select the suggestion and see the word change to reflect the suggestion.

![](./images/code-hint.png)

Awesome!

## Debug server

- If you want to debug the server as well use the launch configuration `Attach to Server`
- In the [Extension Development Host] instance of VSCode, open a document in 'plain text' language mode.
  - Type `j` or `t` to see `Javascript` and `TypeScript` completion.
  - Enter text content such as `AAA aaa BBB`. The extension will emit diagnostics for all words in all-uppercase.

## Continue from here

Please see the other resources in [../../Language-Server.md]

The VS Code guide [Implement your own Language Server](https://vscode.readthedocs.io/en/latest/extensions/example-language-server/) contains a reference to a repo with many useful examples, such as

[lsp-sample repository](https://github.com/Microsoft/vscode-extension-samples/tree/master/lsp-sample) from [Microsoft/vscode-extension-samples] which has been used as a base for this example.

In particular, look at the blog post and repo for the DOT language as a useful guide:

- [Building a Language Server for DOT with Visual Studio Code](https://tomassetti.me/language-server-dot-visual-studio/)
- [repo: server DOT language](https://github.com/unosviluppatore/language-server-dot)
