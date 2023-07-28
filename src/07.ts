// Generics

// Sometimes we don't know what types will be passed in
// Generics allow us to provide a Placeholder (like a Type "Variable")

const stringEcho = (arg: string): string => {
  return arg;
};

// this function only works with a string
// what if we wanted to write a more generic function, and abstract the type out

// we use the angle brackets to contain the placeholder (Type "variable")
// T is just a convention, it can be called anything
// we then use that Variable in the parameter type, and then also in the return type
const echo = <T>(arg: T): T => {
  return arg;
};

const isObject = <T>(arg: T): boolean => {
  // note: null also returns typeof "object"
  return typeof arg === "object" && !Array.isArray(arg) && arg !== null;
};

console.log(isObject(true)); // false
console.log(isObject("John")); // false
console.log(isObject([1, 2, 3])); // false
console.log(isObject({ name: "John" })); // true
console.log(isObject(null)); // false

// One good indication that you need a Generic is when your function has to do some logic about what it needs to return
const isTrue = <T>(arg: T): { arg: T; is: boolean } => {
  if (Array.isArray(arg) && !arg.length) {
    return { arg, is: false };
  }
  // normally an empty object is truthy but we don't want that to be true in this custom function
  // so we get the length and coerce it to a boolean
  // when we try to look at the keys, we need to use an Assertion (regarding: Index Signature)
  if (isObject(arg) && !Object.keys(arg as keyof T).length) {
    return { arg, is: false };
  }
  return { arg, is: !!arg };
};

// so we can pass in any type of data
// and we used our T not only in the params and return, but also in the function in the Object.keys
console.log(isTrue(false)); // false
console.log(isTrue(0)); // false
console.log(isTrue(true)); // true
console.log(isTrue(1)); // true
console.log(isTrue("")); // false
console.log(isTrue("Baz")); // true
console.log(isTrue(null)); // false
console.log(isTrue(undefined)); // false
console.log(isTrue({})); // false (MODIFIED from default behaviour)
console.log(isTrue({ name: "Baz" })); // true
console.log(isTrue([])); // false (MODIFIED from default behaviour)
console.log(isTrue([1, 2, 3])); // true
console.log(isTrue(NaN)); // false
console.log(isTrue(-0)); // false

// Let's re-do the function with an interface

interface BooleanCheck<T> {
  value: T;
  is: boolean;
}

const checkBooleanValue = <T>(arg: T): BooleanCheck<T> => {
  if (Array.isArray(arg) && !arg.length) {
    return { value: arg, is: false };
  }
  if (isObject(arg) && !Object.keys(arg as keyof T).length) {
    return { value: arg, is: false };
  }
  return { value: arg, is: !!arg };
};

//////////////////////////////

// "EXTENDS" keyword

interface hasId {
  id: number;
}

// we can use the "extends" keyword
// and we are NARROWING that Generic Type
// the Type will HAVE TO HAVE an "id" property
const processUser = <T extends hasId>(user: T): T => {
  // process the user with logic here
  return user;
};

console.log(processUser({ id: 1, name: "Baz" }));
// Argument of type '{ name: string; }' is not assignable to parameter of type 'hasId'.
// Object literal may only specify known properties, and 'name' does not exist in type 'hasId'.ts(2345)
// console.log(processUser({ name: "Bob" }));

// we can build the generic type K as a keyof the T we pass in

// T is a user object with has an ID
// K is the keys of the T user object

// we didn't need to use an Assertion for the Key, because we used the "extends keyof T"
const getUsersProperty = <T extends hasId, K extends keyof T>(
  users: T[], // we pass in an array of users
  key: K // and we pass in a key
): T[K][] => {
  // and it will return an array of keys
  return users.map((user) => user[key]);
};

const usersArray = [
  {
    id: 1,
    name: "Leanne Graham",
    username: "Bret",
    email: "Sincere@april.biz",
    address: {
      street: "Kulas Light",
      suite: "Apt. 556",
      city: "Gwenborough",
      zipcode: "92998-3874",
      geo: {
        lat: "-37.3159",
        lng: "81.1496",
      },
    },
    phone: "1-770-736-8031 x56442",
    website: "hildegard.org",
    company: {
      name: "Romaguera-Crona",
      catchPhrase: "Multi-layered client-server neural-net",
      bs: "harness real-time e-markets",
    },
  },
  {
    id: 2,
    name: "Ervin Howell",
    username: "Antonette",
    email: "Shanna@melissa.tv",
    address: {
      street: "Victor Plains",
      suite: "Suite 879",
      city: "Wisokyburgh",
      zipcode: "90566-7771",
      geo: {
        lat: "-43.9509",
        lng: "-34.4618",
      },
    },
    phone: "010-692-6593 x09125",
    website: "anastasia.net",
    company: {
      name: "Deckow-Crist",
      catchPhrase: "Proactive didactic contingency",
      bs: "synergize scalable supply-chains",
    },
  },
];

console.log(getUsersProperty(usersArray, "email"));
// [ "Sincere@april.biz", "Shanna@melissa.tv" ]
console.log(getUsersProperty(usersArray, "username"));
// [ "Bret", "Antonette" ]

//////////////////////////////

// GENERICS in a Class

class StateObject<T> {
  private data: T;

  constructor(value: T) {
    this.data = value;
  }

  get state(): T {
    return this.data;
  }

  // usually we would put :void as the return type BUT:
  // A 'set' accessor cannot have a return type annotation.ts(1095)
  set state(value: T) {
    this.data = value;
  }
}

const store = new StateObject("Baz");
console.log(store.state); // Baz

store.state = "Bob";

// But if we try to put in a different type
// Type 'number' is not assignable to type 'string'.ts(2322)
// store.state = 12;

// Because when we first created the object and gave it "Baz"
// TypeScript inferred that the type of our "state" is string
// and so it will not accept another type

// we can see if we don't pass any parameter its type unknown
// constructor StateObject<unknown>(value: unknown): StateObject<unknown>
// const store2 = new StateObject();

// if we pass a number, its type number
// constructor StateObject<number>(value: number): StateObject<number>
const store3 = new StateObject(0);

// we can instead define the type when we Instantiate
const store4 = new StateObject<string>("Bill");
const store5 = new StateObject<number>(1);
// we can even use union types, to state its an array of string/number/booleans
const store6 = new StateObject<(string | number | boolean)[]>([15]);
store6.state = ["Baz", 99, true];
console.log(store6.state); // [ "Baz", 99, true ]
