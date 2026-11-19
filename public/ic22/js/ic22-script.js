// IC22 - COSC 2328 - Professor McCurry
// Implemented by: Madison Spitzer

/*
Reflection:

1. What is the difference between db.all() and db.get()? When would you use each?
db.all() gets all matching rows and gives them back as an array.
db.get() only gets one matching row.
I would use db.all() for a list of students and db.get() for one student.

2. A classmate writes 'SELECT * FROM students WHERE id = ' + id in a route handler. What is wrong with this, and what would happen if someone sent the value 1; DROP TABLE students as the ID?
This is unsafe because the user input is being added directly into the SQL code.
Someone could use SQL injection and possibly delete the students table.
Using a ? placeholder is safer because it keeps the user input separate from the SQL code.

3. Visiting /ic22/students/2 and /ic22/students/7 both work from a single route definition — router.get('/students/:id', ...). How does Express handle that?
Express treats :id as a path parameter.
It takes the number from the URL and stores it in req.params.id.
This lets the same route work for different student IDs.
*/

async function loadStudents() {
    const response = await fetch("/ic22/students");
    const students = await response.json();

    const list = document.getElementById("student-list");
    list.innerHTML = "";

    students.forEach((student) => {
        const li = document.createElement("li");

        li.innerHTML =
            `${student.first_name} ${student.last_name} - ${student.classification}, ${student.major}`;

        list.appendChild(li);
    });
}

// Look up one student by ID
document.getElementById("lookup-btn").addEventListener("click", async () => {
    const id = document.getElementById("student-id").value;
    const result = document.getElementById("student-result");

    const response = await fetch(`/ic22/students/${id}`);
    const student = await response.json();

    if (student.message) {
        result.textContent = student.message;
    } else {
        result.textContent =
            `${student.first_name} ${student.last_name} - ${student.classification}, ${student.major}`;
    }
});

loadStudents();