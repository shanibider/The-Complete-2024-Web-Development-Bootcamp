var randomNumber1  = Math.floor(Math.random() * 6) + 1;
// using DOM and setAttribute() 
var randomDiceImage = "dice" + randomNumber1 + ".png"; // dice1.png - dice6.png

var randomImageSource = "images/" + randomDiceImage; // images/dice1.png - images/dice6.png
// select the first image
var image1 = document.querySelectorAll("img")[0];
// setAttribute(source, goal)
image1.setAttribute("src", randomImageSource);


var randomNumber2  = Math.floor(Math.random() * 6) + 1;
var randomImageSource2 = "images/dice" + randomNumber2 + ".png"; 
document.querySelectorAll("img")[1].setAttribute("src", randomImageSource2);


// using querySelector() and the innerHTML property to change the text in the h1.
 if (randomNumber1 > randomNumber2){
   document.querySelector("h1").innerHTML = "🚩 Player 1 Wins!";
 }
 else
 if (randomNumber1<randomNumber2){
   document.querySelector("h1").innerHTML = "Player 2 Wins! 🚩";
 }
 else 
 if (randomNumber1==randomNumber2){
   document.querySelector("h1").innerHTML = "Draw!";
 }

