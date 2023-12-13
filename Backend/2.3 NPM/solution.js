//var generateName = require("sillyname");
import generateName from "sillyName";

var sillyName = generateName(); //method from this module

console.log(`My name is ${sillyName}.`);


import superheroes from "superheroes";

const name = superheroes.random();
console.log(`I am ${name}!`);

/*
to start-
npm init- we initalize a configuration file for npm

in the package.json file, we add type: module to the package.json - right after the name, and above the scripts

then we install the package we want to use, in this case, sillyname. and run node solution.js
*/