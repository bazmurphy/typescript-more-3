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

// it is re-assignable because array is still type object in JavaScript
myObj = [];
console.log(typeof myObj); // object
myObj = pokemon;
myObj = {};

const exampleObj = {
  prop1: "Baz",
  prop2: true,
};

// Type 'number' is not assignable to type 'string'.ts(2322)
// exampleObj.prop1 = 1;
exampleObj.prop1 = "Bob";

// Type 'number' is not assignable to type 'boolean'.ts(2322)
// exampleObj.prop2 = 99;
exampleObj.prop2 = false;

// Type Alias
type Pokemon = {
  name: string;
  evolves: boolean;
  types: string[];
  isCute?: true; // boolean | undefined
};

// Interface (can use when defining a class etc)
// interface Pokemon {
//   name: string;
//   evolves: boolean;
//   types: string[];
//   isCute?: true; // boolean | undefined
// }

let bulbasaur: Pokemon = {
  name: "Bulbasaur",
  evolves: true,
  types: ["Grass"],
};

let squirtle: Pokemon = {
  name: "Squirtle",
  evolves: true,
  types: ["Water"],
  isCute: true,
};

// Property 'generation' does not exist on type 'Pokemon'.ts(2339)
// bulbasaur.generation = 1;

// we can use the Type Alias
const greetPokemon = (pokemon: Pokemon) => {
  console.log(`Hello ${pokemon.name}!`);
};

type Pokemon2 = {
  name?: string;
  evolves: boolean;
  types: string[];
};

const charmander: Pokemon2 = {
  evolves: true,
  types: ["Fire"],
};

const greetPokemon2 = (pokemon: Pokemon2) => {
  // the name is optional above but typescript doesn't realise that
  // if we try to use a method on it, it will complain:
  // 'pokemon.name' is possibly 'undefined'.ts(18048)
  // console.log(`Hello ${pokemon.name.toUpperCase()}!`);
  // we can use "Narrowing":
  if (pokemon.name) {
    console.log(`Hello ${pokemon.name.toUpperCase()}!`);
  }
  console.log(`Hello!`);
};

console.log(greetPokemon2(charmander));
// Hello!

// Enums

// Enums are one of the few features TypeScript has which is not a type-level extension of JavaScript.
// Enums allow a developer to define a set of named constants. Using enums can make it easier to document intent, or create a set of distinct cases. TypeScript provides both numeric and string-based enums.

enum Grade {
  U,
  D,
  C,
  B,
  A,
}

console.log(Grade.U); // 0
// they are enumerated and start at position 0

// you can start them at a specific number
enum Grade2 {
  U = 1,
  D,
  C,
  B,
  A,
}

console.log(Grade2.U); // 1
console.log(Grade2.B); // 4
