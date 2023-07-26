// let stringArr: string[]
let stringArr = ["one", "hello", "Baz"];

// let numsAndChars: (string | number)[]
let numsAndChars = ["abc", 123, "def", 456];

// let mixed: (string | number | boolean)[]
let mixed = ["britney spears", true, 1998];

// Type 'number' is not assignable to type 'string'.ts(2322)
// stringArr[0] = 1;
// Argument of type 'number' is not assignable to parameter of type 'string'.ts(2345)
// stringArr.push(99);
stringArr[3] = "bye";
stringArr.push("hola");

numsAndChars[0] = 789;
// Argument of type 'boolean' is not assignable to parameter of type 'string | number'.ts(2345)
// numsAndChars.unshift(true);
numsAndChars.unshift("ghi");

// Type '(string | number)[]' is not assignable to type 'string[]'.
// Type 'string | number' is not assignable to type 'string'.
// Type 'number' is not assignable to type 'string'.ts(2322)
// stringArr = numsAndChars;

numsAndChars = stringArr;

// Type '(string | number | boolean)[]' is not assignable to type '(string | number)[]'.
// Type 'string | number | boolean' is not assignable to type 'string | number'.
// Type 'boolean' is not assignable to type 'string | number'.ts(2322)
// numsAndChars = mixed;

mixed = numsAndChars;

// let test: any[]
let test = [];

let pokemon: string[] = [];
pokemon.push("Bulbasaur");

// Tuple
// for specific positions and specific lengths
let myTuple: [string, number, boolean] = ["Baz", 99, true];

// this shows its a Union Type
// let moreMixed: (string | number | boolean)[]
let moreMixed = ["Bob", 1, false];

// there is no problem here..
moreMixed = myTuple;

// Type '(string | number | boolean)[]' is not assignable to type '[string, number, boolean]'.
// Target requires 3 element(s) but source may have fewer.ts(2322)
// because the moreMixed MAY HAVE FEWER elements
// myTuple = moreMixed;

// We try to add something to the 4th Position of a pre-defined Tuple
// Type '100' is not assignable to type 'undefined'.ts(2322)
// myTuple[3] = 100;
myTuple[1] = 42;

// Objects
let myObj: object;

// it is re-assignable because array is stil type object in JavaScript
myObj = [];
console.log(typeof myObj); // object
