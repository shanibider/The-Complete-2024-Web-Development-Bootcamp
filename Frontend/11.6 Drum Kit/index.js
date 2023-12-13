// get all the elements which have class "drum" (from html file)
var numberOfDrumButtons = document.querySelectorAll(".drum").length;

for (var i = 0; i < numberOfDrumButtons; i++) {

/* detecting keyboard press (html DOM event listener)
 loop through all the buttons and add event listener to each of them
for example: document.querySelector(".w") returns the element in the document with class "w" wich is: <button class="w drum">w</button>
 */
document.querySelectorAll(".drum")[i].addEventListener("click", function() {

//'this' is the identity of the button that triggered the event listener
var buttonInnerHTML = this.innerHTML;  

makeSound(buttonInnerHTML);   //function for playing sound to the button that triggered the event listener
buttonAnimation(buttonInnerHTML); //function for animation to the button that triggered the event listener
});


// detecting keyboard press (html DOM event listener)
// add event listener to the whole document
document.addEventListener("keydown", function(event) {
  makeSound(event.key); //function for playing sound to the button that triggered the event listener
  buttonAnimation(event.key); //function for animation to the button that triggered the event listener  

});
}

/*'this' is the identity of the button that triggered the event listener
    this.style.color = "white";
*/

function makeSound(key){
  switch (key) {
      case "w":
          var audio = new Audio("sounds/tom-1.mp3");
          audio.play();
          break;

      case "a":
          var tom2 = new Audio("sounds/tom-2.mp3");
          tom2.play();
          break;
    
        case "s":
          var tom3 = new Audio('sounds/tom-3.mp3');
          tom3.play();
          break;
    
        case "d":
          var tom4 = new Audio('sounds/tom-4.mp3');
          tom4.play();
          break;
    
        case "j":
          var snare = new Audio('sounds/snare.mp3');
          snare.play();
          break;
    
        case "k":
          var crash = new Audio('sounds/crash.mp3');
          crash.play();
          break;
    
        case "l":
          var kick = new Audio('sounds/kick-bass.mp3');
          kick.play();
          break;
    
    
        default: console.log(key);
  }
}

// detecting keyboard press
function buttonAnimation(currentKey) {
  // Select the HTML element with the class corresponding to the currentKey
  // . is added to target it in the CSS file
  var activeButton = document.querySelector("." + currentKey);
  // for example: currentKey="w" so activeButton=document.querySelector(".w") which select the first element with the class "w" on the page: <button class="w drum">w</button>

  // .pressed is added to target it in the CSS file
  // for example: activeButton=document.querySelector(".w") so activeButton.classList.add("pressed") adds the "pressed" class to the element with class "w" on the page: <button class="w drum pressed">w</button>
  activeButton.classList.add("pressed");

  // make it look animated- remove the "pressed" class after 100 milliseconds
  setTimeout(function() {
    activeButton.classList.remove("pressed");
  }, 100);
}

    




