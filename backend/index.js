// server/index.js

const { assembleCaptcha } = require('./functions/assembleCaptcha');
const bodyParser = require("body-parser");
const express = require("express");
const cors = require("cors");


const app = express()

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());


// Express routes
app.post('/api', (req, res) => {
    console.log("received request", req.body);
    return assembleCaptcha(req, res);
});



const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});

module.exports = app;