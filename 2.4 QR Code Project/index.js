/* 
1. Use the inquirer npm package to get user input.
2. Use the qr-image npm package to turn the user entered URL into a QR code image.
3. Create a txt file to save the user input using the native fs node module.

"npm i inquirer qr-image"
in package.json: "type": "module", above dependencies
npm init -y
*/

import inquirer from "inquirer";
import qr from "qr-image";  //qr is the object we use below
import fs from "fs";

// the question (propmpt) is an array of objects, the answer is key value pairs
inquirer
  .prompt([
    {
    message: "Type in your URL: ",
    name: "URL",
    },
  ])
  .then((answers) => {
    const url = answers.URL;
    var qr_svg = qr.image(url);
    qr_svg.pipe(fs.createWriteStream("qr_img.png"));
     
    // copy example code from fs.writeFile documentation.
    // we add fs. before writeFile because we imported fs above
    fs.writeFile('URL.txt', url, (err) => {
        if (err) throw err;
        console.log('The file has been saved!');
      }); 


    //console.log(answers);
  })
  .catch((error) => {
    if (error.isTtyError) {
      // Prompt couldn't be rendered in the current environment
    } else {
      // Something else went wrong
    }
  });



/*
qr.image Example-
var qr_svg = qr.image('I love QR!', { type: 'svg' });
qr_svg.pipe(require('fs').createWriteStream('i_love_qr.svg'));
* instead of require('fs') we can use fs module (import fs from "fs";)

qr.image Methods-
qr.image(text, [ec_level | options]) — Readable stream with image data;
 
options — image options object:
    type — image type. png(default), svg, pdf and eps.
*/