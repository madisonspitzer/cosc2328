// HW10 - COSC 2328 - Professor McCurry
// Implemented by: Madison Spitzer

const express = require('express');
const router = express.Router();
const db = require('../db');

// Build the whole HTML page
function buildPage(monsters, message, error, battle) {
    const monsterCards = monsters.map(monster => `
        <div class="monster-card">
            <h3>${monster.name}</h3>
            <p>Species: ${monster.species}</p>
            <p>Attack: ${monster.attack}</p>
            <p>Defense: ${monster.defense}</p>
            <p>HP: ${monster.hp}</p>
            <p>ID: ${monster.id}</p>
        </div>
    `).join('');

    return `
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Monster Arena</title>
    <link rel="stylesheet" href="/hw10/css/hw10.css">
</head>

<body>

    <h1>Monster Arena</h1>

    ${message ? `<p class="banner-success">${message}</p>` : ''}
    ${error ? `<p class="banner-error">${error}</p>` : ''}

    <h2>Monster Roster</h2>

    <div class="monster-roster">
        ${monsterCards}
    </div>

    <h2>Recruit a Monster</h2>

    <form action="/hw10/recruit" method="POST">
        <label>Name:</label>
        <input type="text" name="name" required>

        <label>Species:</label>
        <input type="text" name="species" required>

        <label>Attack:</label>
        <input type="number" name="attack" required>

        <label>Defense:</label>
        <input type="number" name="defense" required>

        <label>HP:</label>
        <input type="number" name="hp" required>

        <button type="submit">Recruit</button>
    </form>

    <h2>Retire a Monster</h2>

    <form action="/hw10/retire" method="POST">
        <label>Monster ID:</label>
        <input type="number" name="id" required>

        <button type="submit">Retire</button>
    </form>

    <h2>Battle</h2>

    <form action="/hw10/battle" method="POST">
        <button type="submit">Battle!</button>
    </form>

    ${battle ? `
        <div class="battle-results">
            <h2>Battle Results</h2>

            <h3>${battle.a.name} vs ${battle.b.name}</h3>

            <p>
                ${battle.a.name} (${battle.a.species}) -
                Attack: ${battle.a.attack},
                Defense: ${battle.a.defense},
                HP: ${battle.a.hp}
            </p>

            <p>Score: ${battle.scoreA}</p>

            <p>
                ${battle.b.name} (${battle.b.species}) -
                Attack: ${battle.b.attack},
                Defense: ${battle.b.defense},
                HP: ${battle.b.hp}
            </p>

            <p>Score: ${battle.scoreB}</p>

            <h3>${battle.winner}</h3>
        </div>
    ` : ''}

</body>
</html>
    `;
}

// GET Monster Arena page
router.get('/', (req, res) => {
    const message = req.query.message || null;
    const error = req.query.error || null;

    db.all('SELECT * FROM monsters ORDER BY id', [], (err, rows) => {
        if (err) {
            return res.status(500).send('<p>Database error: ' + err.message + '</p>');
        }

        const html = buildPage(rows, message, error, null);
        res.send(html);
    });
});

// Recruit monster
router.post('/recruit', (req, res) => {
    const { name, species, attack, defense, hp } = req.body;

    db.run(
        'INSERT INTO monsters (name, species, attack, defense, hp) VALUES (?, ?, ?, ?, ?)',
        [name, species, attack, defense, hp],
        function (err) {
            if (err) {
                return res.redirect(
                    '/hw10?error=' + encodeURIComponent(err.message)
                );
            }

            res.redirect(
                '/hw10?message=' + encodeURIComponent('Monster recruited!')
            );
        }
    );
});

// Retire monster
router.post('/retire', (req, res) => {
    const { id } = req.body;

    db.run(
        'DELETE FROM monsters WHERE id = ?',
        [id],
        function (err) {
            if (err) {
                return res.redirect(
                    '/hw10?error=' + encodeURIComponent(err.message)
                );
            }

            if (this.changes === 0) {
                return res.redirect(
                    '/hw10?error=' + encodeURIComponent('Monster not found.')
                );
            }

            res.redirect(
                '/hw10?message=' + encodeURIComponent('Monster retired!')
            );
        }
    );
});

// Battle
router.post('/battle', (req, res) => {
    db.all('SELECT * FROM monsters', [], (err, rows) => {
        if (err) {
            return res.redirect(
                '/hw10?error=' + encodeURIComponent(err.message)
            );
        }

        if (rows.length < 2) {
            return res.redirect(
                '/hw10?error=' + encodeURIComponent('Not enough monsters to battle!')
            );
        }

        let i = Math.floor(Math.random() * rows.length);
        let j;

        do {
            j = Math.floor(Math.random() * rows.length);
        } while (j === i);

        const a = rows[i];
        const b = rows[j];

        const scoreA = a.attack + a.defense + a.hp;
        const scoreB = b.attack + b.defense + b.hp;

        let winner = 'Draw!';

        if (scoreA > scoreB) {
            winner = a.name + ' wins!';
        } else if (scoreB > scoreA) {
            winner = b.name + ' wins!';
        }

        const battle = {
            a,
            b,
            scoreA,
            scoreB,
            winner
        };

        const html = buildPage(rows, null, null, battle);
        res.send(html);
    });
});

module.exports = router;