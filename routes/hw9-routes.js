// HW9 - COSC 2328 - Professor McCurry
// Implemented by: Madison Spitzer

const express = require("express");
const router = express.Router();

let cases = [];
let nextId = 1;


// Get credentials
router.get("/credentials", (req, res) => {
    res.json({
        license: process.env.PI_LICENSE,
        station: process.env.STATION_NAME,
        alert: process.env.ALERT_LEVEL
    });
});


// Get all cases
router.get("/cases", (req, res) => {
    res.json(cases);
});


// Add a case
router.post("/cases", (req, res) => {
    const suspect = req.body.suspect;
    const location = req.body.location;
    const notes = req.body.notes;

    if (!suspect || !location) {
        return res.status(400).json({
            error: "suspect and location required"
        });
    }

    const newCase = {
        id: nextId,
        suspect: suspect,
        location: location,
        notes: notes,
        timestamp: new Date().toISOString()
    };

    nextId++;

    cases.push(newCase);

    res.status(201).json(newCase);
});

module.exports = router;