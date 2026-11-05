/*
IC20 - COSC 2328 - Professor McCurry
Implemented by: Madison Spitzer

Reflection Answers:
1. express.json() lets the server read JSON data.
   Without it, req.body would be undefined.

2. 200 means the request worked.
   201 means the request worked and created something new.

3. The missions are only stored in memory.
   A database or file would be needed to keep them after a restart.

4. Yes. Both tabs use the same server and mission list,
   so they would see the same missions.

*/

const list = document.getElementById("mission-list");
const form = document.getElementById("mission-form");

async function loadMissions() {
    const res = await fetch("/ic20/missions");
    const data = await res.json();

    list.innerHTML = "";

    data.forEach(m => {
        const li = document.createElement("li");

        li.innerHTML =
            `<p class="name">${m.name}</p>
             <p class="dest">${m.destination}</p>`;

        list.appendChild(li);
    });
}

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = document.getElementById("mission-name").value.trim();
    const destination = document.getElementById("mission-dest").value.trim();

    await fetch("/ic20/missions", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ name, destination })
    });

    form.reset();
    loadMissions();
});

loadMissions();