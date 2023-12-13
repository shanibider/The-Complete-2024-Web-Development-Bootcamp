/* Create an Express server:
1. Create directory
2. Create index.js file 
3. Initialize npm (npm init -y)
4. Install express package (npm i express)
5. Write Server application in index.js
6. Run server (node index.js)
enter localhost:3000 in browser to see the server running
*/

import express from "express";
const app = express();
const port = 3000;

app.listen(port, () => {
  console.log(`Server running on port ${port}.`);
});


/*
What is localhost?
- Localhost is a hostname that means this computer. It when you dont have a server on the internet, and instead we want to host our server locally.
Making our computer the server of our website backend.

*/