## Debugging Extension development

Add a `.vscode` folder with a `launch.json` file:

Clone [this repo](https://github.com/gctse/syntax-highlighting-VS-Code-example) and try!

```json
// A launch configuration that launches the extension inside a new window
{
  "version": "0.1.0",
  "configurations": [
    {
      "name": "Launch Extension",
      "type": "extensionHost",
      "request": "launch",
      "runtimeExecutable": "${execPath}",
      "args": ["--extensionDevelopmentPath=${workspaceRoot}"]
    }
  ]
}
```
