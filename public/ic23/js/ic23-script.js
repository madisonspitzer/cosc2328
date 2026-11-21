// IC23 - COSC 2328 - Professor McCurry
// Implemented by: Madison Spitzer

/*
1. fetch() GET uses zero options — the defaults work. What three options does fetch() POST require and why does each one matter?
POST needs method: "POST" to tell fetch it is sending data, headers with
Content-Type: application/json to tell the server the body is JSON, and
body: JSON.stringify(...) to send the student data as JSON.

2. Why does the db.run callback use function (err) instead of (err) =>? What would this.lastID be if you used an arrow function?
function(err) has its own this, which SQLite uses to give us this.lastID.
An arrow function does not have its own this, so this.lastID would be undefined.

3. What is the re-fetch pattern and why does it keep the UI in sync with the server instead of just appending a new <li> directly?
The re-fetch pattern calls loadStudents() again after adding a student.
It gets the updated list from the server and database, so the page shows
what is actually stored instead of just adding a new <li> by itself.

4. Open the Network tab and look at the GET and POST requests side by side. What is different about the POST in the Headers and Payload tabs that the GET doesn't have?
The POST has Content-Type: application/json and a request payload with
the student data. The GET does not send a JSON payload or body.
*/



const list = document.getElementById('student-list');

async function loadStudents() {
    try {
        const res = await fetch('/ic23/students');
        const data = await res.json();

        list.innerHTML = '';

        data.forEach(s => {
            const li = document.createElement('li');
            const name = document.createElement('p');
            const meta = document.createElement('p');

            name.className = 'name';
            meta.className = 'meta';

            name.textContent = `${s.first_name} ${s.last_name}`;
            meta.textContent = `${s.classification || '—'} — ${s.major || '—'}`;

            li.appendChild(name);
            li.appendChild(meta);
            list.appendChild(li);
        });
    } catch (err) {
        list.innerHTML = `<li>Error loading students: ${err.message}</li>`;
    }
}

document.getElementById('add-btn').addEventListener('click', async () => {
    const first_name = document.getElementById('first-name').value.trim();
    const last_name = document.getElementById('last-name').value.trim();
    const classification = document.getElementById('classification').value;
    const major = document.getElementById('major').value.trim();
    const result = document.getElementById('add-result');

    if (!first_name || !last_name) {
        result.className = 'error';
        result.textContent = 'First name and last name are required.';
        return;
    }

    try {
        const res = await fetch('/ic23/students', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                first_name,
                last_name,
                classification,
                major
            })
        });

        const data = await res.json();

        if (res.ok) {
            result.className = '';

            result.textContent =
                `Added: ${data.first_name} ${data.last_name} (ID ${data.id})`;

            document.getElementById('first-name').value = '';
            document.getElementById('last-name').value = '';
            document.getElementById('classification').value = '';
            document.getElementById('major').value = '';

            await loadStudents();
        } else {
            result.className = 'error';
            result.textContent = data.error || 'Something went wrong.';
        }

    } catch (err) {
        result.className = 'error';
        result.textContent = `Network error: ${err.message}`;
    }
});

loadStudents();
