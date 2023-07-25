"use strict";
let username = "Baz";
console.log(username);
// let a = 12;
// let b = "6";
// let c = 2;
// let a: number = 12;
// let b: string = "6";
// let c: number = 2;
let a = 12;
let b = 6;
let c = 2;
// The right-hand side of an arithmetic operation must be of type 'any', 'number', 'bigint' or an enum type.ts(2363)
console.log(a / b);
// The right-hand side of an arithmetic operation must be of type 'any', 'number', 'bigint' or an enum type.ts(2363)
console.log(c * b);
