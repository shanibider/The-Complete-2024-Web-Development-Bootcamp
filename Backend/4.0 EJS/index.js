import express from "express";

const app = express();
const port = 3000;

app.get("/", (req, res) => {
const today = new Date();
  //Test code: new Date("June 24, 2023 11:13:00");
const day = today.getDay();

let type = "a weekday";
let adv = "it's time to work hard";

if (day === 5 || day === 6) {
    {
        type = "the weekend";
        adv = "it's time to have some fun";
    }
}

// this object is passed to the index.ejs file
res.render("index.ejs", {dayType: type, advice: adv,});
});


app.listen(port, () => {
console.log(`Server running on port ${port}.`);
}); 


