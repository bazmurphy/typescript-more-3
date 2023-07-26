let username = "Baz";
console.log(username);

// let a = 12;
// let b = "6";
// let c = 2;

// let a: number = 12;
// let b: string = "6";
// let c: number = 2;

let a: number = 12;
let b: number = 6;
let c: number = 2;

// The right-hand side of an arithmetic operation must be of type 'any', 'number', 'bigint' or an enum type.ts(2363)
console.log(a / b);

// The right-hand side of an arithmetic operation must be of type 'any', 'number', 'bigint' or an enum type.ts(2363)
console.log(c * b);

let myName: string = "Baz";
// Type 'number' is not assignable to type 'string'.ts(2322)
// myName = 42;
myName = "Bob";

let meaningOfLife: number;
// meaningOfLife = "code";
// Type 'string' is not assignable to type 'number'.ts(2322)
meaningOfLife = 42;

let isLoading: boolean;
// Type 'number' is not assignable to type 'boolean'.ts(2322)
// isLoading = 42;
isLoading = true;

let album: any;
album = "hit me baby one more time";
album = 42;
album = true;

// the + symbol can be used to concatenate, thats why TypeScript isn't sure
// Parameter 'a' implicitly has an 'any' type.ts(7006)
// const sum = (a, b) => {
//   return a + b;
// };

// const sum: (a: number, b: number) => number
const sum = (a: number, b: number) => {
  return a + b;
};

// union type can be either a string or a number
let album2: string | number;
album2 = 1990;
album2 = "hit me baby one more time";
// Type 'boolean' is not assignable to type 'string | number'.ts(2322)
// album2 = true;

// 102 / "102"
let postId: string | number;
// 0 or 1 / true or false / "true" or "false"
let isActive: number | boolean | string;

let expression: RegExp = /\w+/g;
