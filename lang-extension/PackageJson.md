## package.json extension config

The `package.json` defined the meta data used to declare your extension.

```json
{
  "name": "log-example",
  "displayName": "log-example",
  "description": "A simple extension for log syntax highlighting.",
  "version": "0.0.1",
  "publisher": "gcroteau",
  "engines": {
    "vscode": "^1.5.0"
  },
  "categories": ["Languages"],
  "contributes": {
    "languages": [
      {
        "id": "log",
        "aliases": ["log", "log"],
        "extensions": [".log"],
        "configuration": "./language-configuration.json"
      }
    ],
    "grammars": [
      {
        "language": "log",
        "scopeName": "source.log",
        "path": "./syntaxes/log.tmLanguage.json"
      }
    ]
  }
}
```

## name

The name of the extension (no whitespace)

```js
  "name": "log-example",
```

## displayName

The "pretty" name of the extension (may have whitespace)

```json
  "displayName": "log example",
```

## description

A one liner - what the extension provides

```js
  "description": "A simple extension for log syntax highlighting.",
```

## categories

What categories are provided.

```json
  "categories": [
      "Languages"
  ],
```

## contributes

Definition of what the extension contributes

```json
  "contributes": {
      "languages": [{
          "id": "log",
          "aliases": ["log", "log"],
          "extensions": [".log"],
          "configuration": "./language-configuration.json"
      }],
      "grammars": [{
          "language": "log",
          "scopeName": "source.log",
          "path": "./syntaxes/log.tmLanguage.json"
      }]
  }
```

### languages

#### extensions

What extensions are matched

```json
"extensions": [".log"],
```

#### configuration

Where the detailed language configuration file can be found

```json
  "configuration": "./language-configuration.json"
```

### grammars

```json
  "grammars": [{
      "language": "log",
      "scopeName": "source.log",
      "path": "./syntaxes/log.tmLanguage.json"
  }]
```

#### language

The name of the language

```json
  "language": "log",
```

#### path

The path to the file providing the [grammar](https://macromates.com/manual/en/language_grammars)

```json
  "path": "./syntaxes/log.tmLanguage.json"
```

The concrete grammar for the `log` language can be found [here](https://github.com/gctse/syntax-highlighting-VS-Code-example/blob/master/log-example/syntaxes/log.tmLanguage.json)

### Example grammar

For the `grammars` section (`"path": "./syntaxes/log.tmLanguage.json"`)

```js
 1  {  scopeName = 'source.untitled';
 2     fileTypes = ( );
 3     foldingStartMarker = '\{\s*$';
 4     foldingStopMarker = '^\s*\}';
 5     patterns = (
 6        {  name = 'keyword.control.untitled';
 7           match = '\b(if|while|for|return)\b';
 8        },
 9        {  name = 'string.quoted.double.untitled';
10           begin = '"';
11           end = '"';
12           patterns = (
13              {  name = 'constant.character.escape.untitled';
14                 match = '\\.';
15              }
16           );
17        },
18     );
19  }
```

`scopeName` (line 1) — this should be a unique name for the grammar, following the convention of being a dot-separated name where each new (left-most) part specializes the name. Normally it would be a two-part name where the first is either text or source and the second is the name of the language or document type. But if you are specializing an existing type, you probably want to derive the name from the type you are specializing. For example Markdown is text.html.markdown and Ruby on Rails (rhtml files) is text.html.rails. The advantage of deriving it from (in this case) text.html is that everything which works in the text.html scope will also work in the text.html.«something» scope (but with a lower precedence than something specifically targeting text.html.«something»).

`fileTypes` (line 2) — this is an array of file type extensions that the grammar should (by default) be used with. This is referenced when TextMate does not know what grammar to use for a file the user opens. If however the user selects a grammar from the language pop-up in the status bar, TextMate will remember that choice.

`foldingStartMarker` / `foldingStopMarker` (line 3-4) — these are regular expressions that lines (in the document) are matched against. If a line matches one of the patterns (but not both), it becomes a folding marker (see the foldings section for more info).

`patterns` (line 5-18) — this is an array with the actual rules used to parse the document. In this example there are two rules (line 6-8 and 9-17). Rules will be explained in the next section.

### Language rules

A language rule is responsible for matching a portion of the document. Generally a rule will specify a name which gets assigned to the part of the document which is matched by that rule.

There are two ways a rule can match the document. It can either provide:

- a single regular expression, or two.
- two regular expressions

As with the match key in the first rule above (lines 6-8), everything which matches that regular expression will then get the name specified by that rule. For example the first rule above assigns the name `keyword.control.untitled` to the following keywords: `if`, `while`, `for` and `return`. We can then use a scope selector of `keyword.control` to have our theme style these keywords.

The other type of match is the one used by the second rule (lines 9-17). Here two regular expressions are given using the `begin` and `end` keys. The name of the rule will be assigned from where the begin pattern matches to where the end pattern matches (including both matches). If there is no match for the end pattern, the end of the document is used.

In this latter form, the rule can have _sub-rules_ which are matched against the part _between_ the `begin` and `end` matches. In our example here we match _strings_ that start and end with a _quote_ character and escape characters are marked up as constant.character.escape.untitled inside the matched strings (line 13-15).
