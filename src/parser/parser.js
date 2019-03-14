(function calculatorExampleCst() {
  "use strict";
  /**
   * An Example of implementing a Calculator with separated grammar and semantics (actions).
   * This separation makes it easier to maintain the grammar and reuse it in different use cases.
   *
   * This is accomplished by using the automatic CST (Concrete Syntax Tree) output capabilities
   * of chevrotain.
   *
   * See farther details here:
   * https://github.com/SAP/chevrotain/blob/master/docs/concrete_syntax_tree.md
   */
  const createToken = chevrotain.createToken;
  const tokenMatcher = chevrotain.tokenMatcher;
  const Lexer = chevrotain.Lexer;
  const Parser = chevrotain.Parser;

  const WorkflowLiteral = createToken({
    name: "WorkflowLiteral",
    pattern: /Workflow/
  });

  const Comma = createToken({ name: "Comma", pattern: /,/ });
  const Colon = createToken({ name: "Colon", pattern: /:/ });
  const Equal = createToken({ name: "Equal", pattern: /=/ });
  const And = createToken({ name: "And", pattern: /AND/ });
  const AndLiteral = createToken({ name: "AndLiteral", pattern: /and/ });
  const Or = createToken({ name: "Or", pattern: /OR/ });
  const GetLit = createToken({ name: "GetLit", pattern: /get/ });
  const SetLit = createToken({ name: "SetLit", pattern: /set/ });
  const TodoLit = createToken({ name: "TodoLit", pattern: /TODO/ });
  const ToLit = createToken({ name: "ToLit", pattern: /to/ });
  const FromLit = createToken({ name: "FromLit", pattern: /from/ });
  const InLit = createToken({ name: "InLit", pattern: /in/ });

  const StringTypeLiteral = createToken({
    name: "StringTypeLiteral",
    pattern: /string/
  });
  const IntegerTypeLiteral = createToken({
    name: "IntegerTypeLiteral",
    pattern: /integer/
  });
  const DecimalTypeLiteral = createToken({
    name: "DecimalTypeLiteral",
    pattern: /decimal/
  });

  const StartingLiteral = createToken({
    name: "StartingLiteral",
    pattern: /starting/
  });

  const EndingLiteral = createToken({
    name: "EndingLiteral",
    pattern: /ending/
  });

  const WithLiteral = createToken({
    name: "WithLiteral",
    pattern: /with/
  });

  const Then = createToken({ name: "Then", pattern: /then/ });
  const Digits = createToken({ name: "Digits", pattern: /digits/ });
  const BetweenLiteral = createToken({
    name: "BetweenLiteral",
    pattern: /between/
  });

  const NumberLiteral = createToken({
    name: "NumberLiteral",
    pattern: /-?[1-9]\d*/
  });

  const DecimalLiteral = createToken({
    name: "DecimalLiteral",
    pattern: /-?(0|([1-9]\d*))\.(\d+)?/
  });

  const TriggerLiteral = createToken({
    name: "TriggerLiteral",
    pattern: /trigger/
  });
  const InputsLiteral = createToken({
    name: "InputsLiteral",
    pattern: /inputs/
  });
  const OutputsLiteral = createToken({
    name: "OutputsLiteral",
    pattern: /outputs/
  });
  const PrimaryLiteral = createToken({
    name: "PrimaryLiteral",
    pattern: /primary/
  });
  const OtherLiteral = createToken({ name: "OtherLiteral", pattern: /other/ });
  const EventLiteral = createToken({ name: "EventLiteral", pattern: /event/ });
  const EffectsLiteral = createToken({
    name: "EffectsLiteral",
    pattern: /effects/
  });

  const Substep = createToken({ name: "Substep", pattern: /substep/ });

  const BoundedContextLiteral = createToken({
    name: "BoundedContextLiteral",
    pattern: /context/
  });
  const DataLiteral = createToken({ name: "DataLiteral", pattern: /data/ });
  const ListOfLiteral = createToken({
    name: "ListOfLiteral",
    pattern: /list of/
  });

  const ProcessLiteral = createToken({
    name: "ProcessLiteral",
    pattern: /process/
  });

  const If = createToken({ name: "If", pattern: /if/ });
  const Else = createToken({ name: "Else", pattern: /else/ });
  const While = createToken({ name: "While", pattern: /while/ });
  const Do = createToken({ name: "Do", pattern: /do/ });
  const Is = createToken({ name: "Is", pattern: /is/ });
  const Not = createToken({ name: "Not", pattern: /not/ });
  const For = createToken({ name: "For", pattern: /for/ });
  const Each = createToken({ name: "Each", pattern: /each/ });

  const Return = createToken({ name: "Return", pattern: /return/ });
  const Valid = createToken({ name: "Valid", pattern: /valid/ });
  const Invalid = createToken({ name: "Invalid", pattern: /invalid/ });
  const Add = createToken({ name: "Add", pattern: /add/ });
  const Update = createToken({ name: "Update", pattern: /update/ });
  const Create = createToken({ name: "Create", pattern: /create/ });
  const Delete = createToken({ name: "Delete", pattern: /delete/ });
  const Send = createToken({ name: "Send", pattern: /send/ });
  const Verify = createToken({ name: "Verify", pattern: /verify/ });
  const Match = createToken({ name: "Match", pattern: /match/ });

  const Stop = createToken({ name: "Stop", pattern: /stop/ });
  const Input = createToken({ name: "Input", pattern: /input/ });
  const Output = createToken({ name: "Output", pattern: /output/ });
  const Dependencies = createToken({
    name: "Dependencies",
    pattern: /dependencies/
  });
  const Validate = createToken({ name: "Validate", pattern: /validate/ });
  const Check = createToken({ name: "Check", pattern: /check/ });
  const SuccessLiteral = createToken({
    name: "SuccessLiteral",
    pattern: /success/
  });
  const ErrorLiteral = createToken({ name: "ErrorLiteral", pattern: /error/ });

  const Identifier = createToken({
    name: "Identifier",
    pattern: /[a-zA-z_]\w+/
  });

  const StringLiteral = createToken({
    name: "StringLiteral",
    pattern: /"(:?[^\\"\n\r]+|\\(:?[bfnrtv"\\/]|u[0-9a-fA-F]{4}))*"/
  });

  // marking WhiteSpace as 'SKIPPED' makes the lexer skip it.
  const WhiteSpace = createToken({
    name: "WhiteSpace",
    pattern: /\s+/,
    group: Lexer.SKIPPED
  });

  const allTokens = [
    WhiteSpace, // whitespace is normally very common so it should be placed first to speed up the lexer's performance
    Equal,
    And,
    AndLiteral,
    Or,
    ToLit,
    GetLit,
    SetLit,
    Comma,
    Colon,
    TodoLit,
    FromLit,
    For,
    Each,
    If,
    Else,
    While,
    Do,
    Is,
    Not,
    Validate,
    Valid,
    Check,
    Add,
    Update,
    Create,
    Delete,
    Send,
    Verify,
    Match,
    Stop,
    Return,
    Substep,
    InputsLiteral,
    Input,
    Invalid,
    IntegerTypeLiteral,
    InLit,
    OutputsLiteral,
    Output,
    Dependencies,
    SuccessLiteral,
    ErrorLiteral,
    StringTypeLiteral,
    DecimalTypeLiteral,
    StartingLiteral,
    EndingLiteral,
    WithLiteral,
    BetweenLiteral,
    Then,
    Digits,
    ProcessLiteral,
    DecimalLiteral,
    NumberLiteral,
    WorkflowLiteral,
    TriggerLiteral,
    PrimaryLiteral,
    OtherLiteral,
    EventLiteral,
    EffectsLiteral,
    BoundedContextLiteral,
    DataLiteral,
    ListOfLiteral,
    StringLiteral,
    Identifier
  ];
  const CalculatorLexer = new Lexer(allTokens);

  // ----------------- parser -----------------
  // Note that this is a Pure grammar, it only describes the grammar
  // Not any actions (semantics) to perform during parsing.
  class CalculatorPure extends Parser {
    constructor() {
      super(allTokens);

      const $ = this;

      $.RULE("expression", () => {
        $.MANY(() => {
          $.OR([
            { ALT: () => $.SUBRULE($.workflowExpression) },
            { ALT: () => $.SUBRULE($.domainExpression) },
            { ALT: () => $.SUBRULE($.substepExpression) }
          ]);
        });
      });

      $.RULE("triggerExpression", () => {
        $.CONSUME(TriggerLiteral);
        $.CONSUME(Colon);
        $.CONSUME(StringLiteral);
      });

      $.RULE("inputsExpression", () => {
        $.CONSUME(InputsLiteral);
        $.CONSUME(Colon);
        $.SUBRULE($.primaryExpression, { LABEL: "primary" });
        $.MANY(() => {
          $.SUBRULE($.otherExpression, { LABEL: "other" });
        });
      });

      $.RULE("sendExpression", () => {
        $.CONSUME(Send);
        $.CONSUME(Colon);
        $.CONSUME(StringLiteral);
      });

      $.RULE("toAction", () => {
        $.OR([{ ALT: () => $.CONSUME(Add) }, { ALT: () => $.CONSUME(Send) }]);
      });

      $.RULE("fromAction", () => {
        $.OR([
          { ALT: () => $.CONSUME(Delete) },
          { ALT: () => $.CONSUME(GetLit) }
        ]);
      });

      $.RULE("inAction", () => {
        $.OR([
          { ALT: () => $.CONSUME(Create) },
          { ALT: () => $.CONSUME(Update) },
          {
            ALT: () => $.CONSUME(Check)
          }
        ]);
      });

      $.RULE("actToExpression", () => {
        $.SUBRULE($.toAction, { LABEL: "actionTo" });
        $.SUBRULE($.multipleIdentifiersExpression, { LABEL: "ids" });
        $.OPTION(() => {
          $.SUBRULE($.toExpression, { LABEL: "to" });
        });
      });

      $.RULE("actInExpression", () => {
        $.SUBRULE($.inAction, { LABEL: "actionIn" });
        $.SUBRULE($.multipleIdentifiersExpression, { LABEL: "ids" });
        $.OPTION(() => {
          $.SUBRULE($.inExpression, { LABEL: "in" });
        });
      });

      $.RULE("actFromExpression", () => {
        $.SUBRULE($.fromAction, { LABEL: "actionFrom" });
        $.SUBRULE($.multipleIdentifiersExpression, { LABEL: "ids" });
        $.OPTION(() => {
          $.SUBRULE($.fromExpression, { LABEL: "from" });
        });
      });

      $.RULE("inExpression", () => {
        $.CONSUME(InLit);
        $.SUBRULE($.nestedIdentifierExpression, { LABEL: "nestedId" });
      });

      $.RULE("toExpression", () => {
        $.CONSUME(ToLit);
        $.SUBRULE($.nestedIdentifierExpression, { LABEL: "nestedId" });
      });

      $.RULE("fromExpression", () => {
        $.CONSUME(FromLit);
        $.SUBRULE($.nestedIdentifierExpression, { LABEL: "nestedId" });
      });

      $.RULE("effectsExpression", () => {
        $.CONSUME(EffectsLiteral);
        $.CONSUME(Colon);
        $.MANY(() => {
          $.SUBRULE($.sendExpression, { LABEL: "send" });
        });
      });

      $.RULE("eventsExpression", () => {
        $.MANY(() => {
          $.SUBRULE($.eventExpression, { LABEL: "event" });
        });
      });

      $.RULE("outputsExpression", () => {
        $.CONSUME(OutputsLiteral);
        $.CONSUME(Colon);
        $.SUBRULE($.successExpression, { LABEL: "success" });
        $.SUBRULE($.errorExpression, { LABEL: "error" });
      });

      $.RULE("successExpression", () => {
        $.CONSUME(SuccessLiteral);
        $.CONSUME(Colon);
        $.SUBRULE($.dataBodyExpression, { LABEL: "dataBody" });
      });

      $.RULE("errorExpression", () => {
        $.CONSUME(ErrorLiteral);
        $.CONSUME(Colon);
        $.SUBRULE($.dataBodyExpression, { LABEL: "dataBody" });
      });

      $.RULE("stopExpression", () => {
        $.CONSUME(Stop);
      });

      $.RULE("actionLineExpression", () => {
        $.OR([
          { ALT: () => $.SUBRULE($.actionExpression) },
          { ALT: () => $.SUBRULE($.stopExpression) }
        ]);
      });

      $.RULE("doBodyExpression", () => {
        $.MANY(() => {
          $.SUBRULE($.actionLineExpression, { LABEL: "actionLine" });
        });
      });

      $.RULE("eventExpression", () => {
        $.CONSUME(EventLiteral);
        $.CONSUME(Colon);
        $.CONSUME(StringLiteral);
      });

      $.RULE("primaryExpression", () => {
        $.CONSUME(PrimaryLiteral);
        $.CONSUME(Colon);
        $.CONSUME(StringLiteral);
      });

      $.RULE("otherExpression", () => {
        $.CONSUME(OtherLiteral);
        $.CONSUME(Colon);
        $.CONSUME(StringLiteral);
      });

      $.RULE("boundedContextExpression", () => {
        $.CONSUME(BoundedContextLiteral);
        $.CONSUME(Colon);
        $.CONSUME(StringLiteral);
      });

      $.RULE("dataExpression", () => {
        $.CONSUME(DataLiteral);
        $.CONSUME(Identifier);
        $.CONSUME(Equal);
        $.SUBRULE($.dataBodyExpression, { LABEL: "dataBody" });
      });

      $.RULE("andDataBodyExpression", () => {
        $.CONSUME(And);
        $.OPTION(() => $.CONSUME(ListOfLiteral));
        $.CONSUME(Identifier);
      });

      $.RULE("orDataBodyExpression", () => {
        $.CONSUME(Or);
        $.CONSUME(Identifier);
      });

      $.RULE("stringThenDigitsExpression", () => {
        $.CONSUME(NumberLiteral);
        $.CONSUME(Digits);
      });

      $.RULE("stringThenConstraintExpression", () => {
        $.CONSUME(Then);
        $.OR([
          {
            ALT: () =>
              $.SUBRULE($.stringThenDigitsExpression, { LABEL: "digits" })
          }
        ]);
      });

      $.RULE("withStringExpression", () => {
        $.CONSUME(WithLiteral);
        $.CONSUME(StringLiteral);
      });

      $.RULE("positionExpression", () => {
        $.OR([
          { ALT: () => $.CONSUME(StartingLiteral) },
          { ALT: () => $.CONSUME(EndingLiteral) }
        ]);
      });

      $.RULE("stringIfConstraintExpression", () => {
        $.CONSUME(StringTypeLiteral);
        $.SUBRULE($.positionExpression, { LABEL: "pos" });
        $.SUBRULE($.withStringExpression, { LABEL: "with" });
        $.OPTION(() => {
          $.SUBRULE($.stringThenConstraintExpression, { LABEL: "then" });
        });
      });

      $.RULE("integerConstraintExpression", () => {
        $.CONSUME(IntegerTypeLiteral);
        $.CONSUME(BetweenLiteral);
        $.SUBRULE($.integerBetweenExpression, { LABEL: "between" });
      });

      $.RULE("integerBetweenExpression", () => {
        $.AT_LEAST_ONE_SEP({
          SEP: AndLiteral,
          DEF: () => {
            $.CONSUME(NumberLiteral);
          }
        });
      });

      $.RULE("decimalBetweenExpression", () => {
        $.AT_LEAST_ONE_SEP({
          SEP: AndLiteral,
          DEF: () => {
            $.CONSUME(DecimalLiteral);
          }
        });
      });

      $.RULE("decimalConstraintExpression", () => {
        $.CONSUME(DecimalTypeLiteral);
        $.CONSUME(BetweenLiteral);
        $.SUBRULE($.decimalBetweenExpression, { LABEL: "between" });
      });

      $.RULE("moreDataBodyExpression", () => {
        $.MANY(() => {
          $.OR([
            { ALT: () => $.SUBRULE($.andDataBodyExpression, { LABEL: "and" }) },
            { ALT: () => $.SUBRULE($.orDataBodyExpression, { LABEL: "or" }) }
          ]);
        });
      });

      $.RULE("dataIdentityExpression", () => {
        $.CONSUME(Identifier);
        $.SUBRULE($.moreDataBodyExpression, { LABEL: "and" });
      });

      $.RULE("dataConstraintExpression", () => {
        $.OR([
          {
            ALT: () =>
              $.SUBRULE($.integerConstraintExpression, { LABEL: "integer" })
          },
          {
            ALT: () =>
              $.SUBRULE($.decimalConstraintExpression, { LABEL: "decimal" })
          },
          {
            ALT: () =>
              $.SUBRULE($.stringIfConstraintExpression, { LABEL: "string" })
          }
        ]);
      });

      $.RULE("dataBodyExpression", () => {
        $.OR([
          {
            ALT: () => $.SUBRULE($.dataIdentityExpression, { LABEL: "idExpr" })
          },
          {
            ALT: () =>
              $.SUBRULE($.dataConstraintExpression, { LABEL: "constraint" })
          }
        ]);
      });

      $.RULE("domainExpression", () => {
        $.SUBRULE($.boundedContextExpression, { LABEL: "context" });
        $.MANY(() => {
          $.SUBRULE($.dataExpression, { LABEL: "data" });
        });
      });

      $.RULE("workflowBodyExpression", () => {
        $.SUBRULE($.triggerExpression, { LABEL: "body" });
        $.SUBRULE($.inputsExpression, { LABEL: "inputs" });
        $.SUBRULE($.outputsExpression, { LABEL: "outputs" });
        $.SUBRULE($.effectsExpression, { LABEL: "effects" });
        $.OPTION(() => {
          $.SUBRULE($.processExpression, { LABEL: "process" });
        });
      });

      $.RULE("substepBodyExpression", () => {
        $.SUBRULE($.inputExpression, { LABEL: "input" });
        $.SUBRULE($.outputExpression, { LABEL: "output" });
        $.SUBRULE($.dependenciesExpression, { LABEL: "dependencies" });
        $.SUBRULE($.subProcessExpression, { LABEL: "subProcess" });
      });

      $.RULE("inputExpression", () => {
        $.CONSUME(Input);
        $.CONSUME(Colon);
        $.CONSUME(Identifier);
      });

      $.RULE("outputExpression", () => {
        $.CONSUME(Output);
        $.CONSUME(Colon);
        $.SUBRULE($.dataBodyExpression, { LABEL: "dataBody" });
      });

      $.RULE("dependenciesExpression", () => {
        $.CONSUME(Dependencies);
        $.CONSUME(Colon);
        $.SUBRULE($.identifiersExpression, { LABEL: "ids" });
      });

      $.RULE("loopExpression", () => {
        $.CONSUME(For);
        $.CONSUME(Each);
        $.CONSUME(Identifier);
        $.CONSUME(Colon);
        $.SUBRULE($.processBodyExpression, { LABEL: "processBody" });
      });

      $.RULE("processExpression", () => {
        $.CONSUME(ProcessLiteral);
        $.CONSUME(Colon);
        $.SUBRULE($.doStepsExpression, { LABEL: "doSteps" });
      });

      $.RULE("subProcessExpression", () => {
        $.CONSUME(ProcessLiteral);
        $.CONSUME(Colon);
        $.SUBRULE($.processBodyExpression, { LABEL: "processBody" });
      });

      $.RULE("processBodyExpression", () => {
        $.OR([
          {
            ALT: () => $.CONSUME(TodoLit)
          },
          {
            ALT: () =>
              $.SUBRULE($.processBodyLinesExpression, { LABEL: "lines" })
          }
        ]);
      });

      $.RULE("processBodyLinesExpression", () => {
        $.MANY(() => {
          $.SUBRULE($.processBodyLineExpression, { LABEL: "subProcessLines" });
        });
      });

      $.RULE("processBodyLineExpression", () => {
        $.OR([
          {
            ALT: () => $.SUBRULE($.actInExpression, { LABEL: "actIn" })
          },
          {
            ALT: () => $.SUBRULE($.actFromExpression, { LABEL: "actFrom" })
          },
          {
            ALT: () => $.SUBRULE($.actToExpression, { LABEL: "actTo" })
          },
          {
            ALT: () => $.SUBRULE($.ifThenElseExpression, { LABEL: "if" })
          },
          {
            ALT: () => $.SUBRULE($.loopExpression, { LABEL: "loop" })
          },
          {
            ALT: () => $.SUBRULE($.actionExpression, { LABEL: "action" })
          }
        ]);
      });

      $.RULE("identifiersExpression", () => {
        $.AT_LEAST_ONE_SEP({
          SEP: Comma,
          DEF: () => {
            $.CONSUME(Identifier);
          }
        });
      });

      $.RULE("nestedIdentifierExpression", () => {
        $.MANY(() => {
          $.CONSUME(Identifier);
        });
      });

      $.RULE("returnExpression", () => {
        $.CONSUME(Return);
        $.CONSUME(Identifier);
      });

      $.RULE("multipleIdentifiersExpression", () => {
        $.MANY_SEP({
          SEP: AndLiteral,
          DEF: () => {
            $.SUBRULE($.nestedIdentifierExpression, { LABEL: "nestedId" });
          }
        });
      });

      $.RULE("action", () => {
        $.OR([
          {
            ALT: () => $.CONSUME(Verify)
          },
          {
            ALT: () => $.CONSUME(Match)
          },
          {
            ALT: () => $.CONSUME(Validate)
          },
          {
            ALT: () => $.CONSUME(SetLit)
          }
        ]);
      });

      $.RULE("actionExpression", () => {
        $.SUBRULE($.action, { LABEL: "actionLit" });
        $.SUBRULE($.multipleIdentifiersExpression, { LABEL: "multiIds" });
      });

      $.RULE("doStepExpression", () => {
        $.CONSUME(Do);
        $.CONSUME(Identifier);
        $.OPTION(() => {
          $.SUBRULE($.processBodyExpression, { LABEL: "processBody" });
        });
      });

      $.RULE("validExpression", () => {
        $.OR([
          {
            ALT: () => $.CONSUME(Valid)
          },
          {
            ALT: () => $.CONSUME(Invalid)
          }
        ]);
      });

      $.RULE("conditionalExpression", () => {
        $.CONSUME(Identifier);
        $.OPTION(() => {
          $.CONSUME(Is);
          $.SUBRULE($.validExpression, { LABEL: "valid" });
        });
      });

      $.RULE("ifThenElseExpression", () => {
        $.CONSUME(If);
        $.SUBRULE($.conditionalExpression, { LABEL: "condition" });
        $.SUBRULE($.thenExpression, { LABEL: "then" });
        $.SUBRULE($.elseExpression, { LABEL: "else" });
      });

      $.RULE("thenExpression", () => {
        $.CONSUME(Then);
        $.SUBRULE($.doBodyExpression, { LABEL: "thenBody" });
        $.OPTION(() => {
          $.SUBRULE($.returnExpression, { LABEL: "return" });
        });
      });

      $.RULE("elseExpression", () => {
        $.OPTION(() => {
          $.CONSUME(Else);
          $.SUBRULE($.elseBodyExpression, { LABEL: "elseBody" });
        });
      });

      $.RULE("elseBodyExpression", () => {
        $.SUBRULE($.doBodyExpression, { LABEL: "thenBody" });
        $.OPTION(() => {
          $.SUBRULE($.returnExpression, { LABEL: "return" });
        });
      });

      $.RULE("doStepsExpression", () => {
        $.MANY(() => {
          $.SUBRULE($.doStepExpression, { LABEL: "doStep" });
        });
      });

      $.RULE("substepExpression", () => {
        $.CONSUME(Substep);
        $.CONSUME(Identifier);
        $.CONSUME(Equal);
        $.SUBRULE($.substepBodyExpression, { LABEL: "substepBody" });
      });

      $.RULE("workflowExpression", () => {
        $.CONSUME(WorkflowLiteral);
        $.CONSUME(Colon);
        $.CONSUME(StringLiteral);
        $.SUBRULE($.workflowBodyExpression, { LABEL: "body" });
      });

      // very important to call this after all the rules have been defined.
      // otherwise the parser may not work correctly as it will lack information
      // derived during the self analysis phase.
      this.performSelfAnalysis();
    }
  }

  // wrapping it all together
  // reuse the same parser instance.
  const parser = new CalculatorPure([]);

  // ----------------- Interpreter -----------------
  const BaseCstVisitor = parser.getBaseCstVisitorConstructor();

  class CalculatorInterpreter extends BaseCstVisitor {
    constructor() {
      super();
      // This helper will detect any missing or redundant methods on this visitor
      this.validateVisitor();
    }

    expression(ctx) {
      return this.visit(ctx.workflowExpression);
    }

    workflowExpression(ctx) {
      let result = this.visit(ctx.workflowExpression);
    }

    domainExpression(ctx) {
      let result = this.visit(ctx.domainExpression);
    }

    returnExpression(ctx) {
      let result = this.visit(ctx.returnExpression);
    }

    subProcessExpression(ctx) {
      let result = this.visit(ctx.subProcess);
    }

    subProcessBodyExpression(ctx) {
      let result = this.visit(ctx.subProcessBody);
    }

    identifiersExpression(ctx) {
      let result = this.visit(ctx.ids);
    }

    multipleIdentifiersExpression(ctx) {
      let result = this.visit(ctx.ids);
    }

    nestedIdentifierExpression(ctx) {
      let result = this.visit(ctx.ids);
    }

    loopExpression(ctx) {
      let result = this.visit(ctx.loop);
    }

    processBodyExpression(ctx) {
      let result = this.visit(ctx.processBody);
    }

    processBodyLinesExpression(ctx) {
      let result = this.visit(ctx.processBodyLines);
    }

    processBodyLineExpression(ctx) {
      let result = this.visit(ctx.processBodyLine);
    }

    validateExpression(ctx) {
      let result = this.visit(ctx.validate);
    }

    substepExpression(ctx) {
      let result = this.visit(ctx.substep);
    }

    substepBodyExpression(ctx) {
      let result = this.visit(ctx.substepBody);
    }

    inputExpression(ctx) {
      let result = this.visit(ctx.input);
    }

    outputExpression(ctx) {
      let result = this.visit(ctx.output);
    }

    dependenciesExpression(ctx) {
      let result = this.visit(ctx.dependencies);
    }

    boundedContextExpression(ctx) {
      let result = this.visit(ctx.context);
    }

    eventsExpression(ctx) {
      let result = this.visit(ctx.events);
    }

    successExpression(ctx) {
      let result = this.visit(ctx.success);
    }

    errorExpression(ctx) {
      let result = this.visit(ctx.error);
    }

    dataExpression(ctx) {
      let result = this.visit(ctx.data);
    }

    dataBodyExpression(ctx) {
      let result = this.visit(ctx.body);
    }

    andDataBodyExpression(ctx) {
      let result = this.visit(ctx.and);
    }

    withStringExpression(ctx) {
      let result = this.visit(ctx.with);
    }

    orDataBodyExpression(ctx) {
      let result = this.visit(ctx.or);
    }

    moreDataBodyExpression(ctx) {
      let result = this.visit(ctx.more);
    }

    dataIdentityExpression(ctx) {
      let result = this.visit(ctx.id);
    }

    dataConstraintExpression(ctx) {
      let result = this.visit(ctx.constraint);
    }

    integerBetweenExpression(ctx) {
      let result = this.visit(ctx.int);
    }

    decimalBetweenExpression(ctx) {
      let result = this.visit(ctx.int);
    }

    integerConstraintExpression(ctx) {
      let result = this.visit(ctx.int);
    }

    decimalConstraintExpression(ctx) {
      let result = this.visit(ctx.decimal);
    }

    positionExpression(ctx) {
      let result = this.visit(ctx.pos);
    }

    stringIfConstraintExpression(ctx) {
      let result = this.visit(ctx.if);
    }

    stringThenConstraintExpression(ctx) {
      let result = this.visit(ctx.then);
    }

    stringThenDigitsExpression(ctx) {
      let result = this.visit(ctx.digits);
    }

    workflowBodyExpression(ctx) {
      let result = this.visit(ctx.body);
    }

    triggerExpression(ctx) {
      let result = this.visit(ctx.trigger);
    }

    sendExpression(ctx) {
      let result = this.visit(ctx.send);
    }

    effectsExpression(ctx) {
      let result = this.visit(ctx.effects);
    }

    inputsExpression(ctx) {
      let result = this.visit(ctx.inputs);
    }

    outputsExpression(ctx) {
      let result = this.visit(ctx.outputs);
    }

    eventExpression(ctx) {
      let result = this.visit(ctx.event);
    }

    processExpression(ctx) {
      let result = this.visit(ctx.process);
    }

    ifThenElseExpression(ctx) {
      let result = this.visit(ctx.if);
    }

    thenExpression(ctx) {
      let result = this.visit(ctx.then);
    }

    elseExpression(ctx) {
      let result = this.visit(ctx.else);
    }

    elseBodyExpression(ctx) {
      let result = this.visit(ctx.elseBody);
    }

    doStepsExpression(ctx) {
      let result = this.visit(ctx.doSteps);
    }

    doStepExpression(ctx) {
      let result = this.visit(ctx.doStep);
    }

    stopExpression(ctx) {
      let result = this.visit(ctx.stop);
    }

    actionExpression(ctx) {
      let result = this.visit(ctx.action);
    }

    actionLineExpression(ctx) {
      let result = this.visit(ctx.actionLine);
    }

    action(ctx) {
      let result = this.visit(ctx.act);
    }

    toAction(ctx) {
      let result = this.visit(ctx.action);
    }

    actToExpression(ctx) {
      let result = this.visit(ctx.actTo);
    }

    inAction(ctx) {
      let result = this.visit(ctx.action);
    }

    actInExpression(ctx) {
      let result = this.visit(ctx.actIn);
    }

    fromAction(ctx) {
      let result = this.visit(ctx.action);
    }

    actFromExpression(ctx) {
      let result = this.visit(ctx.actFrom);
    }

    toExpression(ctx) {
      let result = this.visit(ctx.to);
    }

    inExpression(ctx) {
      let result = this.visit(ctx.in);
    }

    fromExpression(ctx) {
      let result = this.visit(ctx.from);
    }

    doBodyExpression(ctx) {
      let result = this.visit(ctx.doBody);
    }

    validExpression(ctx) {
      let result = this.visit(ctx.valid);
    }

    conditionalExpression(ctx) {
      let result = this.visit(ctx.condition);
    }

    primaryExpression(ctx) {
      let result = this.visit(ctx.primary);
    }

    otherExpression(ctx) {
      let result = this.visit(ctx.other);
    }
  }

  // for the playground to work the returned object must contain these fields
  return {
    lexer: CalculatorLexer,
    parser: CalculatorPure,
    visitor: CalculatorInterpreter,
    defaultRule: "expression"
  };
})();
