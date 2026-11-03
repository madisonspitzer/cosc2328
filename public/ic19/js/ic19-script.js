// IC19 - COSC 2328 - Professor McCurry
// Implemented by: Madison Spitzer


async function loadConfig() {

    const response = await fetch("/ic19/config");
    const data = await response.json();

    const display = document.getElementById("config-display");

    display.innerHTML = "";

    Object.entries(data).forEach(function (item) {

        const key = item[0];
        const value = item[1];

        const dt = document.createElement("dt");
        const dd = document.createElement("dd");

        dt.textContent = key;
        dd.textContent = value;

        display.appendChild(dt);
        display.appendChild(dd);
    });
}


loadConfig();
