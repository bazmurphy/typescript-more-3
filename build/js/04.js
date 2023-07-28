"use strict";
// Type Assertions (Type Casting)
// you can convert to a more specific or less specific type than you start out with
// using the AS keyword
let a1 = "hello";
// we assigned a type that was LESS specific
let b1 = a1;
// we asssigned a type that was MORE specific
let c1 = a1;
// we provide it a Type Alias and then assign it a value
let d1 = "world";
// we do't have to use a Type Alias
let e1 = "world";
// you CANNOT use the angled brackets < > in TSX files in React
// we can use Assertions for Narrowing
const addOrConcat = (a, b, c) => {
    if (c === "add") {
        return a + b;
    }
    // use type coercion to make it all a string
    return "" + a + b;
};
// Type 'string | number' is not assignable to type 'string'.
// Type 'number' is not assignable to type 'string'.ts(2322)
// let myValue: string = addOrConcat(2, 2, "concat");
// so we tell TypeScript using the AS keyword that we know it will be a string
let myValue = addOrConcat(2, 2, "concat");
// (!) TypeScript sees no problem here, but a STRING is returned,
// this is the risk of Type Assertions that you are telling it you know better
// but here there is a problem (because "concat" returns a string not a number)
// (!) MISTAKES CAN BE MADE WITH ASSERTIONS when you don't set them up correctly
let myValue2 = addOrConcat(3, 3, "concat");
// Conversion of type 'number' to type 'string' may be a mistake because neither type sufficiently overlaps with the other. If this was intentional, convert the expression to 'unknown' first.ts(2352)
// 20 as string;
// UNKNOWN TYPE
// unknown is like any, but you can't use unknown anywhere
// it is referred to as Force Casting or Double Casting
// we use 2 Type Assertions
// (when you know you want to cast something specifically, you know you are going to overrule TypeScript)
10;
// the DOM
// const img: HTMLImageElement | null
const img = document.querySelector("img");
// const myId: Element | null
const myId = document.querySelector("myId");
// const myImg: HTMLElement | null
const myImg = document.getElementById("#myImg");
// 'img' is possibly 'null'.ts(18047)
// img.src = "http://www.test.com/img.png";
// so we can use the AS keyword to Assert the Type
const img2 = document.querySelector("img");
// 'myImg' is possibly 'null'.ts(18047)
// Property 'src' does not exist on type 'HTMLElement'.ts(2339)
// it doesn't know if the element exists and it doesn't know the src property exists
// myImg.src = "http://www.test.com/img.png";
// NON NULL ASSERTION
// we add a ! at the end, to specify that it will not be null
const img3 = document.querySelector("img");
// BUT WE DO NOT NEED TO USE THE NON NULL ASSERTION "!" IN COMBINATION WITH THE "AS"
// because we are explicitly describing what it will be
// Angle Bracket Notation: (doing the same thing)
const img4 = document.querySelector("img");
const img5 = document.querySelector("img");
// Original JS Code:
// const year = document.getElementById("year");
// const thisYear = new Date().getFullYear();
// year.setAttribute("datetime", thisYear);
// year.textContent = thisYear;
// 1st Variation:
// let year: HTMLElement | null;
// year = document.getElementById("year");
// let thisYear: string;
// thisYear = new Date().getFullYear().toString();
// if (year) {
//   year.setAttribute("datetime", thisYear);
//   year.textContent = thisYear;
// }
// 2nd Variation:
const year = document.getElementById("year");
const thisYear = new Date().getFullYear().toString();
year.setAttribute("datetime", thisYear);
year.textContent = thisYear;
