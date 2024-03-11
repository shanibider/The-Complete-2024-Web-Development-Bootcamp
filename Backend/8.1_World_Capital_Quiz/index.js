import express from "express";
import bodyParser from "body-parser";

// here we use local data only

const app = express();
const port = 3000;

let quiz = [
  { country: "France", capital: "Paris" },
  { country: "United Kingdom", capital: "London" },
  { country: "United States of America", capital: "New York" },
];

let totalCorrect = 0;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));   // get hold of data from the form
app.use(express.static("public"));      // my static files,images,css 

let currentQuestion = {};

// GET home page
app.get("/", async (req, res) => {
  totalCorrect = 0;
  await nextQuestion();
  console.log(currentQuestion);
  res.render("index.ejs", { question: currentQuestion });
});

// POST a new post
// here we catch the post request from the form
app.post("/submit", (req, res) => {
  let answer = req.body.answer.trim();    // get rid of spaces
  let isCorrect = false;
  if (currentQuestion.capital.toLowerCase() === answer.toLowerCase()) {   // turning both answers to lowercase
    totalCorrect++;   // if it's true we add 1 to the total score
    console.log (totalCorrect);
    isCorrect = true;
  }

  nextQuestion();
  // passing over the new question and update the score in the frontend
  res.render("index.ejs", {
    question: currentQuestion,
    wasCorrect: isCorrect,
    totalScore: totalCorrect,
  });
});

async function nextQuestion() {
  const randomCountry = quiz[Math.floor(Math.random() * quiz.length)];

  currentQuestion = randomCountry;
}

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
