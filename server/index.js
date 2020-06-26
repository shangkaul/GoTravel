const express = require("express");
const bodyParser = require("body-parser");
var cors = require('cors');
const app = express();
app.use(cors());
const fs = require("fs");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const routes = require("./routes/routes.js")(app, fs);

const server = app.listen(process.env.PORT || 4040, () => {
    console.log("listening on port %s...", server.address().port);
});