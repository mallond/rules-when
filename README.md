# rules-when
Simple When Rule Construction



## BizRez When Rules

A simple way to dynamically create when rules - A great example how to use the new Function instead of the 'evil' eval.

<img src="http://upload.wikimedia.org/wikipedia/commons/d/dc/Magneto,_longitudinal_section_(Rankin_Kennedy,_Modern_Engines,_Vol_II).jpg" align="right" width="200px" />

## Intro

Simplicity is elegance.

What we need is a descriptive way to tag Biz(i)ness Rules and catalog, inventory, usage, and change rules dynamically.
Javascript provides a simple way of dynamically creating functions on the fly.


Prime directives, and ables ...
- Easy to understand the code
- Thin
- Self-documenting
- Pattern - not an enforcement
- Crazy fast
- Secure from XXS


## Dependencies

-  Mocha.js for for test infecting the code (good infection)

## A few Use Cases for Usage

- Validations
- Calculations
- Automated business rules - decision engine
- Home security, sprinkler systems, and darn maybe your car...

## Benefits

- Repository of rules
- Traceability
- Modify the rule not the code
- Dynamic changeability - conditions change so do the execution
- Easy to understand and modify
- Extensible
- Maintainable
- Reusable
- Chainable
- Micro foot print and scalable

## Example Setup

```

//Example Setup

var when = {

    isPerson: "return object.isPerson === true //Comment - Yes you can",
    hasLicense: "return object.license === true //Comment",
    isPersonAndHasLicense: "return when['isPerson'](object) && when['hasLicense'](object)",
    payTax: "return object.payTax === true",
    doHula: "return when['isPerson'](object) && when['hasLicense'](object) && when['payTax'](object)"

}

var calculate = {

    adder: "return object.a + object.b //Comment",
    calculateTax: "return object.amount * 1.8",
    addTax: "if (when['payTax'](object)) {return calculate['calculateTax'](object)}; return 0",
    mutate: "object.tada = 'hello Moto'; return true"

}

//Describe Decision Table
var decisionTable = {

    calcNumber: [["return when['isPerson'](object)", "return calculate['adder'](object)", "return true"],
        ["return when['isPerson'](object)", "return calculate['calculateTax'](object)", "return true"],
        ["return when['isPerson'](object)", "return calculate['calculateTax'](object)", "return true"]
    ]

}

```
---
### image 1

Notice: functions stored as strings. These strings will be translated via the new Function operation

![Image](http://lh5.googleusercontent.com/-as9raWNpgYg/VOZR7JqSRrI/AAAAAAAAIgY/BadKY8hUQ3s/w739-h303-no/WhenRule.png?raw=true | width=400px)



### Translate value into functions
```
        //Create When Condtion functions

        function loadwhenConditions(when) {

            //Convert key[value] into real functions
            for (var key in when) {
                when[key] = new Function('object', 'when', 'calculate', when[key]);
            }

        }

        //Create Calculation functions
        function loadCalcualtions(calculate) {
            //Convert key[value] into real functions
            for (var key in calculate) {
                calculate[key] = new Function('object', 'when', 'calculate', calculate[key]);

            }
        }

```

## Example Run

```
rules.loadWhenRules(when);
rules.loadCalcualtions(calculate);
rules.loadDecisionTable(decisionTable);

var person = {isPerson: true, license: true, a: 5, b: 10, amount: 500, payTax: true};

console.log("isPerson:" + rules.when('isPerson', person));
console.log("hasLicense:" + rules.when('hasLicense', person));
console.log("adder:" + rules.calculate('adder', person));
console.log("addTax:" + rules.calculate("addTax", person));
console.log("isPersonAndHasLicense:" + rules.when('isPersonAndHasLicense', person));
console.log(person.tada);
console.log("decisiontable result:" + rules.decisionTable('calcNumber', person));
console.log("doHula:" + rules.when('doHula',person));

```
## An alternative using the evil eval()
```
// From couchDB
var input = {
    id: "tax",
    state: "tx",
    rate: 7.15,
    shows: {
        adder: "function(input) {return input.rate * input.value;}",
        detail: "function(detail){ alert(detail) }"
    }
};

// Construct function with Closure
var fullFunction = "(function () {var counter = 0; return " + input.shows.adder + "})()";

// Construct function
var ad = eval(fullFunction);

var input = {rate:input.rate, value : 10000}
console.log(ad(input));
```
## Mocha Test

mocha ./lib/test


Key: BRE, Decision Table, When, Calculation, BPM Business Process Management
