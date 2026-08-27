// IC1 - COSC 2328 - Professor McCurry
// Implemented by: Madison Spitzer

const express = require("express");
const path = require("path");
const app = express();
const PORT = 3000;

app.use(express.static(path.join(__dirname, "public")));

app.listen(PORT, "0.0.0.0", () =>
    console.log(`Running on http://localhost:${PORT}`)
);