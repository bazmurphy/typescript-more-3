// Index Signatures

// useful for when you are creating an object, but you don't know the exact names of the Object keys
// but you do know the shape of the object, and the types of the keys

interface TransactionObj {
  Pizza: number;
  Books: number;
  Job: number;
}

const todaysTransactions: TransactionObj = {
  Pizza: -10,
  Books: -5,
  Job: 50,
};

console.log(todaysTransactions.Pizza); // -10

let prop: string = "Pizza";

// If we attempot to access an Object Property DYNAMICALLY
// we get this Error:

// Element implicitly has an 'any' type because expression of type 'string' can't be used to index type 'TransactionObj'.
// No index signature with a parameter of type 'string' was found on type 'TransactionObj'.ts(7053)
// console.log(todaysTransactions[prop]);

// another example:
const todaysNet = (transactions: TransactionObj) => {
  let total = 0;
  for (const transaction in transactions) {
    // Element implicitly has an 'any' type because expression of type 'string' can't be used to index type 'TransactionObj'.
    // No index signature with a parameter of type 'string' was found on type 'TransactionObj'.ts(7053)
    // total += transactions[transaction];
  }
  return total;
};

// to fix this we need to provide an INDEX SIGNATURE

// This declares an interface called TransactionObj2
// Interfaces define the shape of objects by declaring the keys and value types
// The [key: string] syntax defines an index signature - it means any string can be used as a key
// And the : number syntax means the values for those keys must be numbers

interface TransactionObj2 {
  // all of the keys are going to be strings
  // and all the values are going to be numbers
  [key: string]: number;

  // we can also make it readonly
  // readonly [key: string]: number;
}

const todaysTransactions2: TransactionObj2 = {
  Pizza: -10,
  Books: -5,
  Job: 50,
};

let prop2: string = "Pizza";

// and now we CAN access the keys dynamically:
console.log(todaysTransactions2[prop2]);

// and again:
const todaysNet2 = (transactions: TransactionObj2) => {
  let total = 0;
  for (const transaction in transactions) {
    // Element implicitly has an 'any' type because expression of type 'string' can't be used to index type 'TransactionObj'.
    // No index signature with a parameter of type 'string' was found on type 'TransactionObj'.ts(7053)
    total += transactions[transaction];
  }
  return total;
};

console.log(todaysNet2(todaysTransactions2)); // 35

// When we make the Index Signature "readonly"
// Index signature in type 'TransactionObj2' only permits reading.ts(2542)
// todaysTransactions2.Pizza = 40;

// when we try to access a random key on the object that does NOT exist... TypeScript has no problem (!)
// TypeScript thinks it will return a number (because we stated that in the Index Signature)
// but it actually returns undefined
// because it has no way to know what key names exist on the Object
console.log(todaysTransactions2["Dave"]);

// If we combine both of the above, we can now ALLOW objects to be ADDED to an Object
// but the interface will also REQUIRE Pizza, Books, Job
interface TransactionObj3 {
  readonly [index: string]: number;
  Pizza: number;
  Books: number;
  Job: number;
}

const todaysTransactions3: TransactionObj3 = {
  Pizza: -10,
  Books: -5,
  Job: 50,
  Baz: 99,
};

//////////////////////////////

interface Student {
  // we have to stipulate all possible values the keys could have
  // and when one of the properties is optional we need to provide undefined
  [key: string]: string | number | number[] | undefined;
  name: string;
  GPA: number;
  classes?: number[];
}

const doug: Student = {
  name: "Doug",
  GPA: 3.5,
  classes: [100, 200],
};

// Property 'test' does not exist on type 'Student'.ts(2339)
// console.log(student1.test);

// but when we add the Index Signature above (line 111) now TypeScript doesn't know that "test" doesn't exist
console.log(doug.test);

for (const key in doug) {
  console.log(`${key}: ${doug[key]}`);
}
// name: Doug
// GPA: 3.5
// classes: 100,200

// But what if we want to ITERATE through an Oject WITHOUT using an Index Signature in the Interface ??

interface Student2 {
  // notice no Index Signature
  name: string;
  GPA: number;
  classes?: number[];
}

const bob: Student2 = {
  name: "Bob",
  GPA: 4.4,
  classes: [300, 400],
};

// we can use the keyword "as" and "keyof" and then the interface
// "keyof" creates a union type of the keys "name | GPA | classes"
for (const key in bob) {
  console.log(`${key}: ${bob[key as keyof Student2]}`);
}

// Now imagine we don't know what the TYPE of the student2 object is
// We can use "keyof" "typeof" (the object)
Object.keys(bob).map((key) => {
  console.log(bob[key as keyof typeof bob]);
});
// Bob
// 4.4
// [300, 400]

// we can DEFINE what we are going to use as the "key" with "keyof (object)"
// it defines the key as "name | GPA | classes"
const logStudentKey = (student: Student2, key: keyof Student2): void => {
  console.log(`${key}: ${student[key]}`);
};

logStudentKey(doug, "GPA"); // GPA: 3.5
logStudentKey(doug, "name"); // name: Doug

//////////////////////////////

// UTILITY Type RECORD

// The Record<K, T> keyword is used to create a new type where the properties are keys of type K and the values are of type T.
// It allows you to define a type that represents an object with known properties and value types.

interface Incomes {
  [key: string]: number;
  // An index signature parameter type cannot be a literal type or generic type. Consider using a mapped object type instead.ts(1337)
  // [key: "salary"]: number;
}

const monthlyIncomes: Incomes = {
  salary: 500,
  bonus: 100,
  sidehustle: 250,
};

for (const revenue in monthlyIncomes) {
  console.log(`${revenue} : ${monthlyIncomes[revenue]}`);
}

// Using Record:

// Union Type with Literal Types
type Streams = "salary" | "bonus" | "sidehustle";

// this uses the Record keyword, and we provide the different keys (as Literal Types) that are expected, and then define their type (number)
type Incomes2 = Record<Streams, number>;

const monthlyIncomes2: Incomes2 = {
  salary: 500,
  bonus: 100,
  sidehustle: 250,
};

for (const revenue in monthlyIncomes2) {
  // Element implicitly has an 'any' type because expression of type 'string' can't be used to index type 'Incomes2'.
  // No index signature with a parameter of type 'string' was found on type 'Incomes2'.ts(7053)
  // so we need to add "keyof" Incomes2
  console.log(`${revenue} : ${monthlyIncomes2[revenue as keyof Incomes2]}`);
}
// 500
// 100
// 250

// NOTE (!) IF YOU USE the RECORD UTILITY TYPE instead of providing an Index Signature
// you will still have to access "keyof"
