// Classes
class Coder {
  // you need to name the property in the constructor AND as a member in the class
  // otherwise it complains: Property 'name' has no initializer and is not definitely assigned in the constructor.ts(2564)
  constructor(name: string, music: string, age: number, lang: string) {
    this.name = name;
    this.music = music;
    this.age = age;
    this.lang = lang;
  }

  // properties and methods are called MEMBERS
  name: string;
  music: string;
  age: number;
  lang: string;
}

// To keep it mor DRY: we can add VISBILITY MODIFIERS/MEMBERS / DATA MODIFIERS / ACCESS MODIFIERS
class Coder2 {
  constructor(
    // public means it can be accessed anywhere
    // readonly means it once it is set it cannot be changed
    public readonly name: string,
    public music: string,
    // private means it can only be accessed in the class, is not accessible through class instances
    private age: number,
    // protected means it can be accessed within the class AND subclasses
    // (we have also added a default value)
    protected lang: string = "TypeScript"
  ) {
    this.name = name;
    this.music = music;
    this.age = age;
    this.lang = lang;
  }

  // this method is inside of the class, so we can access "age"
  public getAge() {
    return `Hello, I am ${this.age} years old!`;
  }
}

class Coder3 {
  // if you wanted to add a MEMBER that you didn't want to immediately instantiate
  // secondLang: string;
  // Property 'secondLang' has no initializer and is not definitely assigned in the constructor.ts(2564)
  // you can add this if neccessary, but you are telling TypeScript what to do at that point...
  secondLang!: string;
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
  constructor(
    public computer: string,
    name: string,
    music: string,
    age: number
  ) {
    // we then need to call super on the inherited members
    super(name, music, age);
    // and then bind the subclass members to the parameter passed to the constructor
    this.computer = computer;
  }

  public getLang() {
    // here we can access lang - which is a protected member inherited from the parent Class
    return `I write ${this.lang}`;
  }
}

const Bob = new WebDeveloper("ThinkPad", "Bob", "Dance", 100);
console.log(Bob.getLang());
// Property 'age' is private and only accessible within class 'Coder2'.ts(2341)
// console.log(Bob.age);
// Property 'lang' is protected and only accessible within class 'Coder2' and its subclasses.ts(2445)
// because we are not WITHIN the class, this is an Instance
// console.log(Bob.lang);

//////////////////////////////

// Implementing an Interface to a Class

interface Musician {
  name: string;
  instrument: string;
  play(action: string): string;
}

// note the KEYWORD implements
class Guitarist implements Musician {
  name: string;
  instrument: string;

  constructor(name: string, instrument: string) {
    (this.name = name), (this.instrument = instrument);
  }

  play(action: string) {
    return `${this.name} ${action} the ${this.instrument}`;
  }
}

const Page = new Guitarist("Jimmy", "guitar");
console.log(Page.play("strums")); // Jimmy strums the guitar

//////////////////////////////

class Peeps {
  // the static keyword
  // means count does NOT apply to any INSTANTIATION of the Class
  // it applies to the Class directly itself
  static count: number = 0;

  // and getCount can be called directly on the Class itself
  static getCount(): number {
    // note we do not use the "this" keyword, we refer to the Class itself
    return Peeps.count;
  }

  public id: number;

  constructor(public name: string) {
    this.name = name;
    // ++ before is to increment count before instantiation (so the first id is 1 not 0)
    this.id = ++Peeps.count;
  }
}

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
  private dataState: string[];

  constructor() {
    this.dataState = [];
  }

  // get is a keyword
  // (getter) Bands.data: string[]
  public get data(): string[] {
    return this.dataState;
  }

  // set is a keyword
  // (setter) Bands.data: string[]
  public set data(value: string[]) {
    if (
      Array.isArray(value) &&
      value.every((element) => typeof element === "string")
    ) {
      // (!) NOTE: we CANNOT return a value from setters
      this.dataState = value;
      return;
    } else {
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
