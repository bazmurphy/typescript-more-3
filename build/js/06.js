"use strict";
// Index Signatures
const todaysTransactions = {
    Pizza: -10,
    Books: -5,
    Job: 50,
};
console.log(todaysTransactions.Pizza); // -10
let prop = "Pizza";
// If we attempot to access an Object Property DYNAMICALLY
// we get this Error:
// Element implicitly has an 'any' type because expression of type 'string' can't be used to index type 'TransactionObj'.
// No index signature with a parameter of type 'string' was found on type 'TransactionObj'.ts(7053)
// console.log(todaysTransactions[prop]);
// another example:
const todaysNet = (transactions) => {
    let total = 0;
    for (const transaction in transactions) {
        // Element implicitly has an 'any' type because expression of type 'string' can't be used to index type 'TransactionObj'.
        // No index signature with a parameter of type 'string' was found on type 'TransactionObj'.ts(7053)
        // total += transactions[transaction];
    }
    return total;
};
const todaysTransactions2 = {
    Pizza: -10,
    Books: -5,
    Job: 50,
};
let prop2 = "Pizza";
// and now we CAN access the keys dynamically:
console.log(todaysTransactions2[prop2]);
// and again:
const todaysNet2 = (transactions) => {
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
const todaysTransactions3 = {
    Pizza: -10,
    Books: -5,
    Job: 50,
    Baz: 99,
};
const doug = {
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
const bob = {
    name: "Bob",
    GPA: 4.4,
    classes: [300, 400],
};
// we can use the keyword "as" and "keyof" and then the interface
// "keyof" creates a union type of the keys "name | GPA | classes"
for (const key in bob) {
    console.log(`${key}: ${bob[key]}`);
}
// Now imagine we don't know what the TYPE of the student2 object is
// We can use "keyof" "typeof" (the object)
Object.keys(bob).map((key) => {
    console.log(bob[key]);
});
// Bob
// 4.4
// [300, 400]
// we can DEFINE what we are going to use as the "key" with "keyof (object)"
// it defines the key as "name | GPA | classes"
const logStudentKey = (student, key) => {
    console.log(`${key}: ${student[key]}`);
};
logStudentKey(doug, "GPA"); // GPA: 3.5
logStudentKey(doug, "name"); // name: Doug
const monthlyIncomes = {
    salary: 500,
    bonus: 100,
    sidehustle: 250,
};
for (const revenue in monthlyIncomes) {
    console.log(`${revenue} : ${monthlyIncomes[revenue]}`);
}
const monthlyIncomes2 = {
    salary: 500,
    bonus: 100,
    sidehustle: 250,
};
for (const revenue in monthlyIncomes2) {
    // Element implicitly has an 'any' type because expression of type 'string' can't be used to index type 'Incomes2'.
    // No index signature with a parameter of type 'string' was found on type 'Incomes2'.ts(7053)
    // so we need to add "keyof" Incomes2
    console.log(`${revenue} : ${monthlyIncomes2[revenue]}`);
}
// 500
// 100
// 250
// NOTE (!) IF YOU USE the RECORD UTILITY TYPE instead of providing an Index Signature
// you will still have to access "keyof"
