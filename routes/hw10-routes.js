// HW10 - COSC 2328 - Professor McCurry
// Implemented by: Madison Spitzer

// Express router
const express = require("express");
const router = express.Router();

// Database connection
const db = require("../db");


// Build page
function buildPage(monsters, message, error, battle) {
    const cards = monsters.map((monster) => `
        <div class="monster-card">
            <h3>${monster.name}</h3>
            <p>${monster.species}</p>
            <p>Attack: ${monster.attack}</p>
            <p>Defense: ${monster.defense}</p>
            <p>HP: ${monster.hp}</p>
            <p>ID: ${monster.id}</p>
        </div>
    `).join("");

    // Full HTML document
    return `
        <!DOCTYPE html>
        <html lang="en">

        <head>
            <meta charset="UTF-8">
            <title>Monster Arena</title>

            <!-- CSS path -->
            <link rel="stylesheet" href="/hw10/css/hw10.css">
        </head>

        <body>

            <h1>Monster Arena</h1>

            <!-- Success and error banners -->
            ${message ? `<p class="banner-success">${message}</p>` : ""}
            ${error ? `<p class="banner-error">${error}</p>` : ""}

            <!-- Monster roster -->
            <h2>Monster Roster</h2>

            <div class="monster-roster">
                ${cards}
            </div>


            <!-- Recruit form -->
            <h2>Recruit Monster</h2>

            <form action="/hw10/recruit" method="POST">
                <input name="name" placeholder="Name" required>
                <input name="species" placeholder="Species" required>
                <input name="attack" type="number" placeholder="Attack" required>
                <input name="defense" type="number" placeholder="Defense" required>
                <input name="hp" type="number" placeholder="HP" required>

                <button type="submit">Recruit</button>
            </form>


            <!-- Retire form -->
            <h2>Retire Monster</h2>

            <form action="/hw10/retire" method="POST">
                <input name="id" type="number" placeholder="Monster ID" required>

                <button type="submit">Retire</button>
            </form>


            <!-- Battle form -->
            <h2>Battle</h2>

            <form action="/hw10/battle" method="POST">
                <button type="submit">Battle!</button>
            </form>


            <!-- Battle results -->
            ${battle ? `
                <div class="battle-results">
                    <h2>Battle Results</h2>

                    <p>${battle.a.name}: ${battle.scoreA}</p>
                    <p>${battle.b.name}: ${battle.scoreB}</p>

                    <h3>${battle.winner}</h3>
                </div>
            ` : ""}

        </body>
        </html>
    `;
}


// GET route
router.get("/", (req, res) => {
    const message = req.query.message || null;
    const error = req.query.error || null;

    db.all("SELECT * FROM monsters ORDER BY id", [], (err, rows) => {
        if (err) {
            return res.status(500).send("Database error");
        }

        res.send(buildPage(rows, message, error, null));
    });
});


// Recruit route
router.post("/recruit", (req, res) => {
    const { name, species, attack, defense, hp } = req.body;

    db.run(
        "INSERT INTO monsters (name, species, attack, defense, hp) VALUES (?, ?, ?, ?, ?)",
        [name, species, attack, defense, hp],
        (err) => {
            if (err) {
                return res.redirect(
                    "/hw10?error=" + encodeURIComponent("Could not recruit monster.")
                );
            }

            res.redirect(
                "/hw10?message=" + encodeURIComponent("Monster recruited!")
            );
        }
    );
});


// Retire route
router.post("/retire", (req, res) => {
    const { id } = req.body;

    db.run(
        "DELETE FROM monsters WHERE id = ?",
        [id],
        function (err) {
            if (err) {
                return res.redirect(
                    "/hw10?error=" + encodeURIComponent("Could not retire monster.")
                );
            }

            // Check if no monster was deleted
            if (this.changes === 0) {
                return res.redirect(
                    "/hw10?error=" + encodeURIComponent("Monster not found.")
                );
            }

            res.redirect(
                "/hw10?message=" + encodeURIComponent("Monster retired!")
            );
        }
    );
});


// Battle route
router.post("/battle", (req, res) => {
    db.all("SELECT * FROM monsters", [], (err, rows) => {
        if (err) {
            return res.redirect(
                "/hw10?error=" + encodeURIComponent("Database error.")
            );
        }

        if (rows.length < 2) {
            return res.redirect(
                "/hw10?error=" + encodeURIComponent("Not enough monsters to battle!")
            );
        }

        let first = Math.floor(Math.random() * rows.length);
        let second = Math.floor(Math.random() * rows.length);

        // Two different random fighters
        while (second === first) {
            second = Math.floor(Math.random() * rows.length);
        }

        const a = rows[first];
        const b = rows[second];

        // Score calculation
        const scoreA = a.attack + a.defense + a.hp;
        const scoreB = b.attack + b.defense + b.hp;

        // Draw case
        let winner = "Draw!";

        if (scoreA > scoreB) {
            winner = a.name + " wins!";
        }

        if (scoreB > scoreA) {
            winner = b.name + " wins!";
        }

        const battle = {
            a,
            b,
            scoreA,
            scoreB,
            winner
        };

        // Send battle page
        res.send(buildPage(rows, null, null, battle));
    });
});


// Export router
module.exports = router;