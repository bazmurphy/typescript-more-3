"use strict";
// Classes
class Coder {
    // you need to name the property in the constructor AND as a member in the class
    // otherwise it complains: Property 'name' has no initializer and is not definitely assigned in the constructor.ts(2564)
    constructor(name, music, age, lang) {
        this.name = name;
        this.music = music;
        this.age = age;
        this.lang = lang;
    }
}
// To keep it mor DRY: we can add VISBILITY MODIFIERS/MEMBERS / DATA MODIFIERS / ACCESS MODIFIERS
class Coder2 {
    constructor(
    // public means it can be accessed anywhere
    // readonly means it once it is set it cannot be changed
    name, music, 
    // private means it can only be accessed in the class, is not accessible through class instances
    age, 
    // protected means it can be accessed within the class AND subclasses
    // (we have also added a default value)
    lang = "TypeScript") {
        this.name = name;
        this.music = music;
        this.age = age;
        this.lang = lang;
        this.name = name;
        this.music = music;
        this.age = age;
        this.lang = lang;
    }
    // this method is inside of the class, so we can access "age"
    getAge() {
        return `Hello, I am ${this.age} years old!`;
    }
}
class Coder3 {
}
const Baz = new Coder2("Baz", "Chill", 99);
console.log(Baz.getAge());
// BUT NOTE: BOTH OF THESE STILL WORK IN VANILLA JS
// AND IT WILL COMPILE REGARDLESS (unless noEmitOnError: true)
// Property 'age' is private and only accessible within class 'Coder2'.ts(2341)
// console.log(Baz.age);
// Property 'lang' is protected and only accessible within class 'Coder2' and its subclasses.ts(2445)
// console.log(Baz.lang);
class WebDeveloper extends Coder2 {
    // in the constructor we can create new members, and choose which we inherit from the parent class
    // note we did not bring in the lang member, but lang has a default value
    // and note we did not ADD MODIFIERS (public, private, protected, readonly etc) on the inherited members
    constructor(computer, name, music, age) {
        // we then need to call super on the inherited members
        super(name, music, age);
        this.computer = computer;
        // and then bind the subclass members to the parameter passed to the constructor
        this.computer = computer;
    }
    getLang() {
        // here we can access lang - which is a protected member inherited from the parent Class
        return `I write ${this.lang}`;
    }
}
const Bob = new WebDeveloper("ThinkPad", "Bob", "Dance", 100);
console.log(Bob.getLang());
// note the KEYWORD implements
class Guitarist {
    constructor(name, instrument) {
        (this.name = name), (this.instrument = instrument);
    }
    play(action) {
        return `${this.name} ${action} the ${this.instrument}`;
    }
}
const Page = new Guitarist("Jimmy", "guitar");
console.log(Page.play("strums")); // Jimmy strums the guitar
//////////////////////////////
class Peeps {
    // and getCount can be called directly on the Class itself
    static getCount() {
        // note we do not use the "this" keyword, we refer to the Class itself
        return Peeps.count;
    }
    constructor(name) {
        this.name = name;
        this.name = name;
        // ++ before is to increment count before instantiation (so the first id is 1 not 0)
        this.id = ++Peeps.count;
    }
}
// the static keyword
// means count does NOT apply to any INSTANTIATION of the Class
// it applies to the Class directly itself
Peeps.count = 0;
const John = new Peeps("John");
const Steve = new Peeps("Steve");
const Amy = new Peeps("Amy");
// this shows the id is incrementing
console.log(John.id); // 1
console.log(Steve.id); // 2
console.log(Amy.id); // 3
// this tells us how many times the Class has been Instantiated to create Objects
console.log(Peeps.count); // 3
// So the "static" keyword applies DIRECTLY to the Class and not to any specific Object instantiated with the Class
//////////////////////////////
// Getters and Setters
// (you will see this in React with useState etc)
class Bands {
    constructor() {
        this.dataState = [];
    }
    // get is a keyword
    // (getter) Bands.data: string[]
    get data() {
        return this.dataState;
    }
    // set is a keyword
    // (setter) Bands.data: string[]
    set data(value) {
        if (Array.isArray(value) &&
            value.every((element) => typeof element === "string")) {
            // (!) NOTE: we CANNOT return a value from setters
            this.dataState = value;
            return;
        }
        else {
            throw new Error("Parameter is not an Array of Strings");
        }
    }
}
const myBands = new Bands();
myBands.data = ["daft punk", "disclosure"];
console.log(myBands.data); // Array(2) [ "daft punk", "disclosure" ]
myBands.data = [...myBands.data, "jorja smith"];
console.log(myBands.data); // Array(3) [ "daft punk", "disclosure", "jorja smith" ]
// Type 'string' is not assignable to type 'string[]'.ts(2322)
// myBands.data = "Example1";
// this is OK (we overwrite the current data)
myBands.data = ["Example2"];
console.log(myBands.data); // Array [ "Example2" ]
// Type 'number' is not assignable to type 'string'.ts(2322)
// myBands.data = ["Example3", 500];
