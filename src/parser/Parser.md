# Parser

## Multiple start rules

- [Multiple start rules](https://sap.github.io/chevrotain/docs/features/multiple_start_rules.html)

See [Example](https://github.com/SAP/chevrotain/blob/master/examples/parser/multi_start_rules/multi_start_rules.js)

```js
const parser = new MultiStartParser();

function parseStartingWithRule(ruleName) {
  return function(text) {
    const lexResult = PhoneticLexer.tokenize(text);
    // setting a new input will RESET the parser instance's state.
    parser.input = lexResult.tokens;
    // just invoke which ever rule you want as the start rule. its all just plain javascript...
    const cst = parser[ruleName]();

    return {
      cst: cst,
      lexErrors: lexResult.errors,
      parseErrors: parser.errors
    };
  };
}

module.exports = {
  parseFirst: parseStartingWithRule("firstRule"),
  parseSecond: parseStartingWithRule("secondRule"),
  parseThird: parseStartingWithRule("thirdRule")
};
```

## Custom error message

- [Custom error message](https://sap.github.io/chevrotain/docs/features/custom_errors.html)

This can be accomplished by implementing the following interfaces:

- [IParserErrorMessageProvider](https://sap.github.io/chevrotain/documentation/4_3_0/interfaces/iparsererrormessageprovider.html)
- [ILexerErrorMessageProvider](https://sap.github.io/chevrotain/documentation/4_3_0/interfaces/ilexererrormessageprovider.html)

```js
$.RULE("myStatement", () => {
  // ...
  $.CONSUME(SemiColon, {
    ERR_MSG: "expecting semiColon at end of myStatement"
  });
});
```

See [this issue](https://github.com/SAP/chevrotain/issues/924) for more on how to specify custom error messages by supplying a custom `errorMessageProvider` as a parser option.

## Parameterized Rules

- [Parameterized Rules](https://sap.github.io/chevrotain/docs/features/parameterized_rules.html)

Chevrotain supports passing parameters to rules. This means that grammar rules may accept arguments from the calling rule. This is often used in combination with gates to to represent multiple variants of the same parsing rule while avoiding code duplication.

```js
$.RULE("ArgumentInConst", () => {
  $.CONSUME(Name);
  $.CONSUME(Colon);
  // passing the argument using the "ARGS" property
  $.SUBRULE($.Value, { ARGS: [true] });
});

// isConst is a parameter passed from another rule.
$.RULE("Value", isConst => {
  $.OR([
    // the Variable alternative is only possible when "isConst" is Falsey
    { GATE: () => !isConst, ALT: () => $.SUBRULE($.Variable) },
    { ALT: () => $.CONSUME(IntValue) },
    { ALT: () => $.CONSUME(FloatValue) },
    { ALT: () => $.CONSUME(StringValue) }
  ]);
});
```

## Gates

- [Gates](https://sap.github.io/chevrotain/docs/features/gates.html)

Chevrotain supports Gates on parsing DSL method. Gates act as a type of guard condition that prevents an alternative from being taken. Gates are often used in combination with parametrized rules to represent multiple variants of the same parsing rule while avoiding code duplication.
