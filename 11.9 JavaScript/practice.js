/* JavaScript Info */

var name = prompt("What is your name?");
var firstChar = name.slice(0,1);
var upperCaseFirstChar = firstChar.toUpperCase();
var restOfName = name.slice(1,name.length);
restOfName = restOfName.toLowerCase();
var capitalName = upperCaseFirstChar + restOfName;
alert("Hello, " + capitalName);


/**************************/

var output= [];
var count = 1;

function fizzBuzz() {
    output.push(count);
    count++;
    console.log(output);

    if (count % 3 === 0 && count % 5 === 0) {
        console.log("FizzBuzz");
        output.push("FizzBuzz");
    }
    else if (count % 3 === 0) {
        console.log("Fizz");
        output.push("Fizz");
    }
    else if (count % 5 === 0) {
        console.log("Buzz");
        output.push("Buzz");
    }
    else {
        console.log(count);
        output.push(count);
    }
}

/**************************/

/* javaScript objects + Constructor functions 
When we have a lot of the same objects, we can use a constructor function to create objects. It's lika a factory that creates objects. 
For example this is a constructor function for a Bellboy object: (name of the function must be captillized) */
function BellBoy (name, age, hasWorkPermit, languages) {    //new objects we create will have these properties
    //here we match the input to property name
    this.name = name;       //for example (this object).name is equal to the name that was given as input when we construct this object
    this.age = age;
    this.hasWorkPermit = hasWorkPermit;
    this.languages = languages;
}

/*Intialise object*/
var BellBoy1 = new BellBoy("Timmy", 19, true, ["French", "English"]); //this is a new object created from the constructor function

/**************************/

//JQuery
document.querySelector("h1") //this is the same as the JQuery below
$("h1") //this is the same as the querySelector above