const express = require("express");
const bodyParser = require("body-parser");

const app = express();

const fs = require("fs");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const server = app.listen(4040, () => {
    console.log("listening on port %s...", server.address().port);
});