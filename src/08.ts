// Utility Types

// Partial Utility Type (only has to have one property of the original Type)

interface Assignment {
  studentId: string;
  title: string;
  grade: number;
  verified?: boolean;
}

// pass in an object, and then return that object with the props we want to update
const updateAssignment = (
  assign: Assignment,
  propsToUpdate: Partial<Assignment>
): Assignment => {
  return { ...assign, ...propsToUpdate };
};

const assign1: Assignment = {
  studentId: "compsci123",
  title: "Final Project",
  grade: 0,
};

console.log(assign1);
// { studentId: "compsci123", title: "Final Project", grade: 0 }

// we create a new object and call the function where we update the grade
const assignGraded: Assignment = updateAssignment(assign1, { grade: 95 });

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

const recordAssignment = (assign: Required<Assignment>): Assignment => {
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

const assignVerified: Readonly<Assignment> = {
  ...assignGraded,
  verified: true,
};

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
recordAssignment({ ...assignGraded, verified: true });

//////////////////////////////

// Record Utility Type

// The Record<K, T> utility type allows you to create a new type where the keys are of type K and the values are of type T.
// It creates an object type where each property keys are constrained to a specific key type.
// The key advantage of Record is that it allows us to define constraints for the keys and values separately, creating reusable, modular types.

const hexColorMap: Record<string, string> = {
  red: "FF0000",
  green: "00FF00",
  blue: "0000FF",
};

const anotherExample: Record<string, number[]> = {
  test1: [1, 2, 3],
  test2: [4, 5, 6],
  test3: [7, 8, 9],
};

// string literal types to use in the <Record>
type Students = "Sara" | "Kelly";
type LetterGrades = "A" | "B" | "C" | "D" | "U";

// this statisifes both of the above
const finalGrades: Record<Students, LetterGrades> = {
  Sara: "B",
  Kelly: "U",
};

// interface to use in the <Record>
interface Grades {
  assign1: number;
  assign2: number;
}

const gradeData: Record<Students, Grades> = {
  Sara: { assign1: 85, assign2: 93 },
  Kelly: { assign1: 76, assign2: 15 },
};

//////////////////////////////

// Pick Utility Type

// The Pick utility type in TypeScript allows you to create a new type by picking a set of properties from an existing type.

// pick the two properties studentId and grade
type AssignResult = Pick<Assignment, "studentId" | "grade">;

const score: AssignResult = {
  studentId: "k123",
  grade: 85,
};

//////////////////////////////

// Omit Utility Type

// The Omit utility type in TypeScript allows you to create a new type by picking all properties from an existing type except some that you want to omit.
// This is useful for creating a subset type from an existing type.

type AssignPreview = Omit<Assignment, "grade" | "verified">;

const preview: AssignPreview = {
  studentId: "k123",
  title: "Final Project",
};

//////////////////////////////

// Exclude & Extract Utility Type (doesn't work with Interface)

// The Exclude<T, U> utility type in TypeScript takes a union type T, and excludes any types from T that are assignable to the type U.

// The Extract<T, U> utility type in TypeScript extracts from a union type T, only those types that are assignable to the type U.

type AdjustedGrades = Exclude<LetterGrades, "U">;
// type adjustedGrades = "A" | "B" | "C" | "D"

type HighGrades = Extract<LetterGrades, "A" | "B">;
// type highGrades = "A" | "B"

//////////////////////////////

// Non Nullable Utility Type

// The NonNullable<T> utility type in TypeScript returns the non-nullable version of a type T.

type AllPossibleGrades = "Baz" | "Bob" | null | undefined;
type NamesOnly = NonNullable<AllPossibleGrades>;

//////////////////////////////

// ReturnType

// in this initial example.. we setup a type (that will return from the function)
type NewAssign = { title: string; points: number };

// then we use this as the return type
const createNewAssign = (title: string, points: number): NewAssign => {
  return { title, points };
};

const randomAssign: NewAssign = createNewAssign("some title", 100);

console.log(randomAssign);
// { title: "some title", points: 100 }

// but if we change the function, we then have to change the type we created above to match the return

// so a solution to this is to use a ReturnType that updates dynamically
const createNewAssign2 = (title: string, points: number) => {
  return { title, points };
};

type NewAssign2 = ReturnType<typeof createNewAssign2>;

const randomAssign2: NewAssign2 = createNewAssign2("some title", 100);

console.log(randomAssign2);
// { title: "some title", points: 100 }

// now if we change the function it will always update the Return Type

const createNewAssign3 = (title: string, points: number, info: string) => {
  return { title, points, info };
};

type NewAssign3 = ReturnType<typeof createNewAssign3>;

const randomAssign3: NewAssign3 = createNewAssign3(
  "some title",
  100,
  "some info"
);

console.log(randomAssign3);
// { title: "some title", points: 100, info: "some info" }

//////////////////////////////

// Parameters

// The Parameters<T> utility type in TypeScript extracts the parameter types of a function type T.
// It extracts the parameter types into a tuple type.

type AssignParams = Parameters<typeof createNewAssign2>;
// type AssignParams = [title: string, points: number, info: string]

const assignArgs: AssignParams = ["Generics", 100];

const randomAssign4: NewAssign2 = createNewAssign(...assignArgs);

console.log(randomAssign4);
// { title: "Generics", points: 100 }

//////////////////////////////

// Awaited - helps us with the ReturnType of a Promise

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
}

const fetchUsers = async (): Promise<User[]> => {
  const data = await fetch("https://jsonplaceholder.typicode.com/users")
    .then((res) => {
      return res.json();
    })
    .catch((err) => {
      if (err instanceof Error) {
        console.log(err.message);
      }
    });
  return data;
};

type FetchUsersReturnType = ReturnType<typeof fetchUsers>;
// but the problem is, when we mouseover, it says:
// type FetchUsersReturnType = Promise<User[]>;

// but we don't really want the Promise, we want the Result...
// so the solution is to wrap everything in the Awaited<> Utility Type

type FetchUsersReturnType2 = Awaited<ReturnType<typeof fetchUsers>>;
// now when we mouseover, it says:
// type FetchUsersReturnType2 = User[]
// which is what we want, our Array of Users

// const allUsers: FetchUsersReturnType2 = await fetchUsers();
