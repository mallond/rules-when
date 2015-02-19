//     http://www.bizrez.com
//     (c) 2004-2014 David Mallon
//     Freely distributed under the MIT license.

/*global moduel: false */

var rules =

    (function () {

        "use strict";

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

        //Create Decision Table functions
        function loadDecisionTable(decisionTable) {

            //Convert key[value] into real functions
            for (var key in decisionTable) {
                for (var i = 0; i < decisionTable[key].length; i++) {
                    decisionTable[key][i][0] = new Function('object', 'when', 'calculate', decisionTable[key][i][0]);
                    decisionTable[key][i][1] = new Function('object', 'when', 'calculate', decisionTable[key][i][1]);
                    decisionTable[key][i][2] = new Function('object', 'when', 'calculate', decisionTable[key][i][2]);
                }


            }
        }

        //Execute decision table
        function executeDecisionTable(name, person, when, calculate) {
            //Execute Decision Table
            var key = name;

            var sum = 0;
            for (var i = 0; i < decisionTable[key].length; i++) {

                if (decisionTable[key][i][0](person, when, calculate) && decisionTable[key][i][0](person, when, calculate)) {
                    sum += decisionTable[key][i][1](person, when, calculate);
                }

            }
            return sum;

        }

        //Closure secure methods - input string, object.properties
        return {
            when: function(name, object) {return when[name](object, when, calculate)},
            calculate: function(name, object) {return calculate[name](object, when, calculate)},
            decisionTable: function(name, object) {return executeDecisionTable(name, object, when, calculate)},
            loadWhenRules: function(rules) {loadwhenConditions(rules)},
            loadDecisionTable: function(rules) {loadDecisionTable(rules)},
            loadCalcualtions: function(rules) {loadCalcualtions(rules)}
        };

    })();

module.exports = rules;

//Example Run

var when = {

    isPerson: "return object.isPerson === true //Comment",
    hasLicense: "return object.license === true //Comment",
    isPersonAndHasLicense: "return when['isPerson'](object) && when['hasLicense'](object)",
    payTax: "return object.payTax === true",
    doHula: "return when['isPerson'](object) && when['hasLicense'](object) && when['payTax'](object)"

};

var calculate = {

    adder: "return object.a + object.b //Comment",
    calculateTax: "return object.amount * 1.8",
    addTax: "if (when['payTax'](object)) {return calculate['calculateTax'](object)}; return 0",
    mutate: "object.tada = 'hello Moto'; return true"

};

//Describe Decision Table
var decisionTable = {

    calcNumber: [["return when['isPerson'](object)", "return calculate['adder'](object)", "return true"],
        ["return when['isPerson'](object)", "return calculate['calculateTax'](object)", "return true"],
        ["return when['isPerson'](object)", "return calculate['calculateTax'](object)", "return true"]
    ]

};

rules.loadWhenRules(when);
rules.loadCalcualtions(calculate);
rules.loadDecisionTable(decisionTable);

var person = {isPerson: true, license: true, a: 5, b: 10, amount: 500, payTax: true, tada:""};

console.log("isPerson:" + rules.when('isPerson', person));
console.log("hasLicense:" + rules.when('hasLicense', person));
console.log("adder:" + rules.calculate('adder', person));
console.log("addTax:" + rules.calculate("addTax", person));
console.log("isPersonAndHasLicense:" + rules.when('isPersonAndHasLicense', person));
console.log("mutate property:" + rules.calculate('mutate',person));
console.log(person.tada);
console.log("decisiontable result:" + rules.decisionTable('calcNumber', person));
console.log("doHula:" + rules.when('doHula',person));






