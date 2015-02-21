//     http://www.bizrez.com
//     (c) 2004-2014 David Mallon
//     Freely distributed under the MIT license.

//     http://www.bizrez.com
//     (c) 2004-2014 David Mallon
//     Freely distributed under the MIT license.

/*global require: false, describe: false, it: false*/

var assert = require("assert");
var rules = require('../rules');



// Declare when, calculate, decisionTable
var when = {

    isPerson: "return object.isPerson === true",
    hasLicense: "return object.license === true",
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

var person = {isPerson: true, license: true, a: 5, b: 10, amount: 500, payTax: true, tada: ""};
console.log("isPerson:" + rules.when('isPerson', person));
console.log("hasLicense:" + rules.when('hasLicense', person));
console.log("adder:" + rules.calculate('adder', person));
console.log("addTax:" + rules.calculate("addTax", person));
console.log("isPersonAndHasLicense:" + rules.when('isPersonAndHasLicense', person));
console.log("mutate property:" + rules.calculate('mutate', person));
console.log(person.tada);
console.log("decisiontable result:" + rules.decisionTable('calcNumber', person));
console.log("doHula:" + rules.when('doHula', person));



(function () {

    "use strict";

    describe('Synchronous Tests ', function () {



        describe("when conditions", function () {

            it('isPerson should return true', function () {

                assert.strictEqual(rules.when('isPerson', person), true);

            });
            it('hasLicense should return true', function () {

                assert.strictEqual(rules.when('hasLicense', person), true);

            });
            it('isPersonAndHasLicense should return true', function () {

                assert.strictEqual(rules.when('isPersonAndHasLicense', person), true);

            });
            it('doHula should return true', function () {

                assert.strictEqual(rules.when('doHula', person), true);

            });

        });

        describe("calculation conditions", function () {

            it('adder should return 15', function () {

                assert.strictEqual(rules.calculate('adder', person), 15);

            });

            it('addTax should return 15', function () {

                assert.strictEqual(rules.calculate("addTax", person), 900);

            });

        });


    });


}());









