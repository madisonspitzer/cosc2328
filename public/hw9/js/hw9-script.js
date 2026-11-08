/*
HW9 - COSC 2328 - Professor McCurry
Implemented by: Madison Spitzer

Reflection Answers:

1. require("dotenv").config() loads the .env values into process.env.
   The routes file can use them because app.js loads dotenv first.

2. HW9 does not use a form. The button uses a click event,
   so there is no page reload and no preventDefault() is needed.

3. The cases disappear when the server restarts because they are stored
   in memory. A database would be needed to save them.

4. The browser receives the 400 status in the fetch response.
   response.ok is false for errors and true for successful requests.
*/

async function loadCredentials() {
    const response = await fetch("/hw9/credentials");
    const data = await response.json();

    const credentials = document.getElementById("credentials");

    credentials.innerHTML = "";

    Object.entries(data).forEach(([key, value]) => {
        const dt = document.createElement("dt");
        const dd = document.createElement("dd");

        dt.textContent = key;
        dd.textContent = value;

        credentials.appendChild(dt);
        credentials.appendChild(dd);
    });
}


async function loadCases() {
    const response = await fetch("/hw9/cases");
    const cases = await response.json();

    const list = document.getElementById("case-list");

    list.innerHTML = "";

    if (cases.length === 0) {
        const li = document.createElement("li");

        li.className = "empty-msg";
        li.textContent = "No cases filed yet.";

        list.appendChild(li);

        return;
    }

    cases.forEach((item) => {
        const li = document.createElement("li");

        li.innerHTML = `
            <p class="case-id">Case #${item.id}</p>
            <p class="case-suspect">${item.suspect}</p>
            <p class="case-location">${item.location}</p>
            <p class="case-notes">${item.notes || ""}</p>
            <p class="case-ts">${item.timestamp}</p>
        `;

        list.appendChild(li);
    });
}


document.getElementById("log-btn").addEventListener("click", async () => {
    const suspectInput = document.getElementById("suspect");
    const locationInput = document.getElementById("location");
    const notesInput = document.getElementById("notes");
    const status = document.getElementById("log-status");

    const response = await fetch("/hw9/cases", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            suspect: suspectInput.value.trim(),
            location: locationInput.value.trim(),
            notes: notesInput.value.trim()
        })
    });

    if (!response.ok) {
        const data = await response.json();
        status.textContent = data.error;
        return;
    }

    suspectInput.value = "";
    locationInput.value = "";
    notesInput.value = "";
    status.textContent = "";

    loadCases();
});


loadCredentials();
loadCases();