# Application Domain modelling Meta Language

Inspired by the domain modelling language in the book: [Domain Modeling Made Functional](https://pragprog.com/book/swdddf/domain-modeling-made-functional)

## IDE support with Language Server

VS Code support will be coming in the near future. See [Language Server](./Language-Server.md) for more details. An LSP client/server sample implementation has been started in the [lsp](./lsp) folder.
Docs with LSP usage instructions can be found [here](./lsp/docs/Readme.md)

Please help out make this a reality!

## Usage

Open [chevrotain playground](https://sap.github.io/chevrotain/playground/)

- Paste the `src/parser.js` code into the Parser window
- Paste the sample `.aml` source code into the Input window

Check the parser output:

```json
{
  "Lexing": {
    "result": "SUCCESS",
    "num_of_tokens": 220,
    "lexing_errors": []
  },
  "Parsing": {
    "result": "SUCCESS",
    "parsing_errors": []
  }
}
```

## Domain data model

```aml
context: "Order taking"

data Order =
  CustomerInfo
  AND ShippingAddress

data Order_Quantity = UnitQuantity OR KilogramQuantity
data UnitQuantity = integer between 1 and 10
data KilogramQuantity = decimal between 2.02 and 2.3

data WidgetCode = string starting with "W" then 4 digits
data ProductCode = string ending with "P" then 2 digits

data UnvalidatedOrder =
  UnvalidatedCustomerInfo
  AND UnvalidatedShippingAddress
  AND UnvalidatedBillingAddress
  AND list of UnvalidatedOrderLine

data UnvalidatedOrderLine =
  UnvalidatedProductCode
  AND UnvalidatedOrderQuantity
```

## Workflows

```aml
Workflow: "Place order"
  trigger: "Order form received"
  inputs:
    primary: "An order form"
    other: "Product catalog"
    other: "Inventory"
  outputs:
    success:
      OrderAcknowledgementSent
      AND OrderPlaced
      AND BillableOrderPlaced
    error:
      InvalidOrder
  effects:
    send: "Acknowledgement to customer"
  process:
    do ValidateOrder
      if order is invalid then
        add InvalidOrder
        stop
    do ProcessOrder
    do SendAcknowledgementToCustomer
    do OrderPlaced
```

### Workflow substeps

```aml
substep ValidateOrder =
  input: UnvalidatedOrder
  output: ValidatedOrder OR ValidationError
  dependencies: CheckProductCodeExists, CheckAdressExists

  process:
    validate Customer name
    check Shipping and Billing Address exists
    for each line:
      check product code syntax
      check product code exists in ProductCatalog

    if ok then
      return ValidatedOrder
    else
      return ValidationError

substep PriceOrder =
  input: ValidatedOrder
  output: PricedOrder
  dependencies: GetProductPrice

process:
  for each line:
    get price of product
    set price of line

substep SendAcknowledgeMentToCustomer =
  input: PriceOrder
  output: None
  dependencies: None

  process:
    create acknowledgement letter
    send acknowledgement letter and priced order to customer
```
