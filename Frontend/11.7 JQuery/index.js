// all can be found in jquery examples/effects

// target h1 style
$("h1").css("color", "red"); 


// USEFUL METHODS (inspect in the browser console)
$("h1").hasClass("big-title"); //return true or false

//change text
$("h1").text("Bye");

//change html
$("button").html("<em>Hey</em>");

//change/ set attribute
$("a").attr("href", "https://www.youtube.com");

$("h1").attr("class"); //return class



//add event listener, and call that callback function
$("h1").click(function(){
    $("h1").css("color", "purple");
});

//add event listener to all buttons
$("button").click(function(){
    $("h1").css("color", "purple");
});

//add event listener to keyboard
$(document).keypress(function(event){
    $("h1").text(event.key);
});

//add event listener to mouse
$("h1").on("mouseover", function(){
    $("h1").css("color", "purple");
});




//add element
$("h1").before("<button>before</button>");
$("h1").after("<button>after</button>");

$("h1").append("<button>append</button>");
$("h1").prepend("<button>prepend</button>");


//add class
$("h1").addClass("big-title");

//remove class
$("h1").removeClass("big-title");

//toggle class
$("h1").toggleClass("big-title");

//change style
$("h1").css("color", "purple");

//change style with object
$("h1").css({
    color: "purple",
    fontSize: "50px"
});




//animation
$("button").click(function(){
    $("h1").hide();
});

$("button").click(function(){
    $("h1").show();
});


$("button").on("click", function(){
    $("h1").animate({opacity: 0.5});
});

//chaining few methods
$("button").on("click", function(){
    $("h1").slideUp().slideDown().animate({opacity: 0.5});
});





$("button").click(function(){
    $("h1").toggle();
});

$("button").click(function(){
    $("h1").fadeOut();
});

$("button").click(function(){
    $("h1").fadeIn();
});





//get text
$("h1").text();

//get html
$("h1").html();

//get attribute
$("a").attr("href");

//get class
$("h1").attr("class");

//get value
$("input").val();

//get event listener
$("h1").click(function(){
    $("h1").css("color", "purple");
});

//get event listener
$("h1").on("mouseover", function(){
    $("h1").css("color", "purple");
});

//get parent
$("h1").parent();

//get children
$("h1").children();

//get specific children
$("h1").children("h1");

//get siblings
$("h1").siblings();

//get specific siblings
$("h1").siblings("h1");

//get next sibling
$("h1").next();

//get previous sibling
$("h1").prev();

//get next sibling
$("h1").nextAll();

//get previous sibling
$("h1").prevAll();

//get next sibling
$("h1").nextUntil();

//get previous sibling
$("h1").prevUntil();

//get first child
$("h1").first();

//get last child
$("h1").last();




