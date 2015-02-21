//     http://www.bizrez.com
//     (c) 2004-2014 David Mallon
//     Freely distributed under the MIT license.

/*global module: false */

var rules =

    (function () {

        "use strict";

        var when, calculate, decisionTable = {};

        //Create When Condtion functions
        function loadwhenConditions(rules) {

            when = rules;

            //Convert key[value] into real functions
            for (var key in when) {
                when[key] = new Function('object', 'when', 'calculate', when[key]);
            }

        }

        //Create Calculation functions
        function loadCalcualtions(rules) {

            calculate = rules;

            //Convert key[value] into real functions
            for (var key in calculate) {
                calculate[key] = new Function('object', 'when', 'calculate', calculate[key]);

            }
        }

        //Create Decision Table functions
        function loadDecisionTable(rules) {

            decisionTable = rules

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
            when: function (name, object) {
                return when[name](object, when, calculate)
            },
            calculate: function (name, object) {
                return calculate[name](object, when, calculate)
            },
            decisionTable: function (name, object) {
                return executeDecisionTable(name, object, when, calculate)
            },
            loadWhenRules: function (rules) {
                loadwhenConditions(rules)
            },
            loadDecisionTable: function (rules) {
                loadDecisionTable(rules)
            },
            loadCalcualtions: function (rules) {
                loadCalcualtions(rules)
            }
        };

    })();


// NODE
if (typeof exports !== 'undefined') {
    if (typeof module !== 'undefined' && module.exports) {
        module.exports = rules;
    }
    module.exports = rules;
}
// AMD/REQUIRE
else if (typeof define === 'function' && define.amd) {
    define(function (require) {
        return rules;
    });
}
// BROWSER
else if (typeof window !== 'undefined') {
    window.rules = rules;
}







