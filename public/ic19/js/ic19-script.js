/*
IC19 - COSC 2328 - Professor McCurry
Implemented by: Madison Spitzer

Reflection Answers:

1. require('dotenv').config() reads the .env file and puts the values into process.env.
   It needs to be near the top so the values are loaded before the server tries to use them.

2. res.send() sends simple text or HTML.
   res.json() sends data in JSON format.
   I would use res.send() for a short message and res.json() for data that JavaScript needs to read.

3. .env should never be uploaded to GitHub because it can contain private information
   like passwords, API keys, or other secret settings.

4. If MISSION_ZONE is undefined on the droplet, I could create a .env file directly
   on the droplet. I could also pass the environment variables when I start Docker.
*/

const dl = document.getElementById("config-display");

async function loadConfig() {
    const response = await fetch("/ic19/config");
    const data = await response.json();

    dl.innerHTML = "";

    Object.entries(data).forEach(function (item) {
        const key = item[0];
        const value = item[1];

        const dt = document.createElement("dt");
        const dd = document.createElement("dd");

        dt.textContent = key;
        dd.textContent = value;

        dl.appendChild(dt);
        dl.appendChild(dd);
    });
}

loadConfig();