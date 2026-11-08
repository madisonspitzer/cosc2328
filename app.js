// IC1 - COSC 2328 - Professor McCurry
// Implemented by: Madison Spitzer

require("dotenv").config();

const express = require("express");
const path = require("path");
const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use(express.static(path.join(__dirname, "public")));

app.get("/ic19/status", (req, res) => {
    res.send(
        `Mission Zone: ${process.env.MISSION_ZONE} | Alert Level: ${process.env.ALERT_LEVEL}`
    );
});

app.get("/ic19/config", (req, res) => {
    res.json({
        zone: process.env.MISSION_ZONE,
        alert: process.env.ALERT_LEVEL,
        port: PORT,
        serverTime: new Date().toISOString()
    });
});

app.use("/ic20", require("./routes/ic20-routes"));

app.use("/hw9", require("./routes/hw9-routes"));

app.listen(PORT, "0.0.0.0", () => {
    console.log(`Running on http://localhost:${PORT}`);
});