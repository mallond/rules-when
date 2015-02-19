# rules-when
Simple When Rule Construction

[W I P Initial Feb 18th, 2015]


## BizRez When Rules

A simple way to dynamically create when rules - A great example how to use the new Function instead of the 'evil' eval.

<img src="http://upload.wikimedia.org/wikipedia/commons/d/dc/Magneto,_longitudinal_section_(Rankin_Kennedy,_Modern_Engines,_Vol_II).jpg" align="right" width="200px" />

## Intro

Simplicity is elegance.

Prime directives, and ables ...
- Stateless
- Simple input, output, and process
- Asynchronous non-blocking invocations
- Rules to be self contained and serializable to a database (persistable)
- Rules to be versioned (versionable)
- Rules to be inventoried and stored in a library (sharable)
- Rules can be modified on-the-fly (adaptable)
- Rules can be unit tested independently (testable)
- Crazy fast


## Dependencies

-  Underscore.js for Mapreduce Decision Tables
-  Async.js for asynchronous hooks and behavior
-  Mocha.js for for test infecting the code (good infection)
-  Require.js for the module loader

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

## Design - IPO (Input Process Output)
