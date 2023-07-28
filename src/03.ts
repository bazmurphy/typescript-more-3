// Type Aliases - representing them with a name

type stringOrNumber = string | number;

type stringOrNumberArray = (string | number)[];

type Pokemon3 = {
  name: string;
  evolves: boolean;
  types: string[];
  generation: stringOrNumberArray;
};

type userId = stringOrNumber;

// but we cannot do this with an "interface"
// Think about interfaces as Objects/Classes
// 'stringOrNumber' only refers to a type, but is being used as a value here.
// interface PostId = stringOrNumber;

// Think about types as an alias for any type of typescript type that we might assign

// Literal Types

// We can literally assign a value to a type

let myName2: "Baz";
// Type '"Bob"' is not assignable to type '"Baz"'.ts(2322)
// myName2 = "Bob";
// So a literal type with only one value is like saying const myName = "Baz"

// but when used with Union Types it is useful to limit it to certain values
let username2: "Baz" | "Bob" | "Bill";
// Type '"Jane"' is not assignable to type '"Baz" | "Bob" | "Bill"'.ts(2322)
// username2 = "Jane";
username2 = "Bob";

// Functions
// add the return value after the parameters
const add = (a: number, b: number): number => {
  return a + b;
};

// functions with no return type - return void
const logMessage = (message: any): void => {
  console.log(message);
};

logMessage("Hello!");
logMessage(add(2, 3));
// Argument of type 'string' is not assignable to parameter of type 'number'.ts(2345)
// logMessage(add("a", 3));

// we can use the function keyword (instead of an arrow function)
// and it works in the same way
let subtract = function (c: number, d: number): number {
  return c - d;
};

// Type Alias example for a Type Definition
type mathFunction = (a: number, b: number) => number;

// interface example
interface mathFunction2 {
  (a: number, b: number): number;
}

// but typically when we think about interfaces we should think about Classes, which we can extend.. etc
// and when thinking of basic types and function we should think about Type Aliases

// let multiply: mathFunction
let multiply: mathFunction = function (c, d) {
  return c * d;
};

let multiply2: mathFunction2 = function (c, d) {
  return c * d;
};

logMessage(multiply(2, 2)); // 4
logMessage(multiply2(2, 2)); // 4

// Optional Parameters
// c is optional
const addAll = (a: number, b: number, c?: number): number => {
  // 'c' is possibly 'undefined'.ts(18048)
  // return a + b + c;
  if (typeof c !== "undefined") {
    return a + b + c;
  }
  return a + b;
};

// default value for a parameter
const addAll2 = (a: number, b: number, c: number = 2): number => {
  return a + b + c;
};

logMessage(addAll(2, 3, 2)); // 7
logMessage(addAll(2, 3)); // 5

// this has a default value when we don't provide it
logMessage(addAll2(2, 3)); // 7

// usually default parameters go at the end, but if you need to put it at the front
const addAll3 = (a: number = 3, b: number, c: number = 2): number => {
  return a + b + c;
};

// if we want to call it, without a, we need to explicitly state the first parameter is undefined (but we can omit c)
logMessage(addAll3(undefined, 4)); // 9
logMessage(addAll3(undefined, 4, 6)); // 13

// the REST operator (the rest of the parameters) (we use an Array type)
const total = (...nums: number[]): number => {
  return nums.reduce((acc, cv) => acc + cv, 0);
};

// but we do not pass in an array when calling it
logMessage(total(1, 2, 3, 4));

// if we want a neccessary first parameter and then REST operator
const total2 = (a: number, ...nums: number[]): number => {
  return a + nums.reduce((acc, cv) => acc + cv, 0);
};

logMessage(total2(1)); // 1
logMessage(total2(1, 2, 3)); // 6
logMessage(total2(10, 2, 3)); // 15

// NEVER Type

// returns an Error

// const createError: (errorMessage: string) => never
const createError = (errorMessage: string): never => {
  throw new Error(errorMessage);
};

// NEVER: infinite or endless loop
// const infinite: () => never
const infinite = () => {
  let i: number = 1;
  while (true) {
    i++;
  }
};

// const infinite2: () => void;
const infinite2 = () => {
  let i: number = 1;
  while (true) {
    i++;
    if (i > 100) {
      break;
    }
  }
};

// when could this never type be useful?

// Use of the NEVER Type

const numberOrString2 = (value: number | string): string => {
  // Function lacks ending return statement and return type does not include 'undefined'.ts(2366)

  // we use Type Guards to check the value
  if (typeof value === "string") {
    return "string";
  }
  if (typeof value === "number") {
    return "number";
  }

  // we can't just return undefined like in JS
  // return;
  // Type 'undefined' is not assignable to type 'string'.ts(2322)

  // but we can return an error
  return createError("This should never happen!");
};

// if we use Type Guards repeatedly, we should encapsulate them and re-use them
const isNumber = (value: any): boolean => {
  return typeof value === "number" ? true : false;
};

const isString = (value: any): boolean => {
  return typeof value === "string" ? true : false;
};

const numberOrString3 = (value: number | string): string => {
  if (isString(value)) return "string";
  if (isNumber(value)) return "number";
  return createError("This should never happen");
};
