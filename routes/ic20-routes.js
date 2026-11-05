// IC20 - COSC 2328 - Professor McCurry
// Implemented by: Madison Spitzer

const express = require("express");
const router = express.Router();

let missions = [
    { id: 1, name: "Alpha Probe", destination: "Mars" },
    { id: 2, name: "Deep Survey", destination: "Europa" }
];

let nextId = 3;


// GET all missions
router.get("/missions", (req, res) => {
    res.json(missions);
});


// POST a new mission
router.post("/missions", (req, res) => {
    const name = req.body.name;
    const destination = req.body.destination;

    if (!name || !destination) {
        return res.status(400).json({
            error: "name and destination required"
        });
    }

    const newMission = {
        id: nextId,
        name: name,
        destination: destination
    };

    nextId++;
    missions.push(newMission);

    res.status(201).json(newMission);
});

module.exports = router;