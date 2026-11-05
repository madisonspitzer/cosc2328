/*
IC20 - COSC 2328 - Professor McCurry
Implemented by: Madison Spitzer

Reflection Answers:

1. express.json() lets the server read JSON data.
   Without it, req.body would not work.

2. 200 means the request worked.
   201 means the request worked and created something new.

3. The missions are only saved in memory.
   A database or file would be needed to keep them after a restart.

4. Yes. Both tabs use the same server and mission list,
   so they can see the same missions.
*/

async function loadMissions() {
    const response = await fetch("/ic20/missions");
    const missions = await response.json();

    const list = document.getElementById("mission-list");
    list.innerHTML = "";

    missions.forEach((mission) => {
        const li = document.createElement("li");

        li.innerHTML =
            "<strong>" + mission.name + "</strong><br>" +
            mission.destination;

        list.appendChild(li);
    });
}

const form = document.getElementById("mission-form");

form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const nameInput = document.getElementById("mission-name");
    const destInput = document.getElementById("mission-dest");

    await fetch("/ic20/missions", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            name: nameInput.value,
            destination: destInput.value
        })
    });

    nameInput.value = "";
    destInput.value = "";

    loadMissions();
});

loadMissions();