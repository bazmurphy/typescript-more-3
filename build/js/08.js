"use strict";
// Utility Types
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// pass in an object, and then return that object with the props we want to update
const updateAssignment = (assign, propsToUpdate) => {
    return Object.assign(Object.assign({}, assign), propsToUpdate);
};
const assign1 = {
    studentId: "compsci123",
    title: "Final Project",
    grade: 0,
};
console.log(assign1);
// { studentId: "compsci123", title: "Final Project", grade: 0 }
// we create a new object and call the function where we update the grade
const assignGraded = updateAssignment(assign1, { grade: 95 });
console.log(assignGraded);
// { studentId: "compsci123", title: "Final Project", grade: 95 }
//////////////////////////////
// Required Utility Type
// The Required utility type makes all properties of an object type required.
// - It removes optionality from all properties of the type passed in.
// - The new required type can be used to catch missing props during development.
// - At runtime, required types have no effect - they are only for type checking.
// - Required can be useful when strict checks on the shape of objects is desired.
// - It works with interfaces, types, and mapped types like Record and Partial.
const recordAssignment = (assign) => {
    // send to the database etc..
    return assign;
};
//////////////////////////////
// Readonly Utility Type
// The Readonly utility takes an object type and makes all its properties readonly, preventing reassignment
// - All properties become readonly and cannot be reassigned.
// - The original object type passed in is not modified.
// - Useful for preventing mutation of objects where necessary.
// - Readonly types only affect type checking not runtime behavior.
// - Works with interfaces, types, mapped types like Partial and Record.
// - Can be used with utility types like Pick and Required.
const assignVerified = Object.assign(Object.assign({}, assignGraded), { verified: true });
// this won't work because we are trying to mutate a property
// assignVerified.grade = 88;
// Cannot assign to 'grade' because it is a read-only property.ts(2540)
// this won't work because we are missing a property "verified"
// recordAssignment(assignGraded);
// Argument of type 'Assignment' is not assignable to parameter of type 'Required<Assignment>'.
// Types of property 'verified' are incompatible.
// Type 'boolean | undefined' is not assignable to type 'boolean'.
// Type 'undefined' is not assignable to type 'boolean'.ts(2345)
// this is now Ok, because it has all of the properties it requires...
recordAssignment(Object.assign(Object.assign({}, assignGraded), { verified: true }));
//////////////////////////////
// Record Utility Type
// The Record<K, T> utility type allows you to create a new type where the keys are of type K and the values are of type T.
// It creates an object type where each property keys are constrained to a specific key type.
// The key advantage of Record is that it allows us to define constraints for the keys and values separately, creating reusable, modular types.
const hexColorMap = {
    red: "FF0000",
    green: "00FF00",
    blue: "0000FF",
};
const anotherExample = {
    test1: [1, 2, 3],
    test2: [4, 5, 6],
    test3: [7, 8, 9],
};
// this statisifes both of the above
const finalGrades = {
    Sara: "B",
    Kelly: "U",
};
const gradeData = {
    Sara: { assign1: 85, assign2: 93 },
    Kelly: { assign1: 76, assign2: 15 },
};
const score = {
    studentId: "k123",
    grade: 85,
};
const preview = {
    studentId: "k123",
    title: "Final Project",
};
// then we use this as the return type
const createNewAssign = (title, points) => {
    return { title, points };
};
const randomAssign = createNewAssign("some title", 100);
console.log(randomAssign);
// { title: "some title", points: 100 }
// but if we change the function, we then have to change the type we created above to match the return
// so a solution to this is to use a ReturnType that updates dynamically
const createNewAssign2 = (title, points) => {
    return { title, points };
};
const randomAssign2 = createNewAssign2("some title", 100);
console.log(randomAssign2);
// { title: "some title", points: 100 }
// now if we change the function it will always update the Return Type
const createNewAssign3 = (title, points, info) => {
    return { title, points, info };
};
const randomAssign3 = createNewAssign3("some title", 100, "some info");
console.log(randomAssign3);
// type AssignParams = [title: string, points: number, info: string]
const assignArgs = ["Generics", 100];
const randomAssign4 = createNewAssign(...assignArgs);
console.log(randomAssign4);
const fetchUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield fetch("https://jsonplaceholder.typicode.com/users")
        .then((res) => {
        return res.json();
    })
        .catch((err) => {
        if (err instanceof Error) {
            console.log(err.message);
        }
    });
    return data;
});
// now when we mouseover, it says:
// type FetchUsersReturnType2 = User[]
// which is what we want, our Array of Users
// const allUsers: FetchUsersReturnType2 = await fetchUsers();
