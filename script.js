document.getElementById("studentForm").addEventListener("submit", function(e) {
    e.preventDefault();

    let name = document.getElementById("name").value;
    let regno = document.getElementById("regno").value;
    let course = document.getElementById("course").value;

    let student = { name, regno, course };

    let students = JSON.parse(localStorage.getItem("students")) || [];
    students.push(student);

    localStorage.setItem("students", JSON.stringify(students));

    document.getElementById("studentForm").reset();

    displayStudents();
});

function displayStudents() {
    let students = JSON.parse(localStorage.getItem("students")) || [];
    let output = "";

    students.forEach((s, index) => {
        output += `
        <tr>
            <td>${s.name}</td>
            <td>${s.regno}</td>
            <td>${s.course}</td>
            <td>
                <button onclick="editStudent(${index})">Edit</button>
                <button onclick="deleteStudent(${index})">Delete</button>
            </td>
        </tr>
        `;
    });

    document.getElementById("studentList").innerHTML = output;
}

function deleteStudent(index) {
    let students = JSON.parse(localStorage.getItem("students")) || [];
    students.splice(index, 1);

    localStorage.setItem("students", JSON.stringify(students));
    displayStudents();
}

function editStudent(index) {
    let students = JSON.parse(localStorage.getItem("students")) || [];

    document.getElementById("name").value = students[index].name;
    document.getElementById("regno").value = students[index].regno;
    document.getElementById("course").value = students[index].course;

    students.splice(index, 1);

    localStorage.setItem("students", JSON.stringify(students));
    displayStudents();
}

function searchStudent() {
    let keyword = document.getElementById("search").value.toLowerCase();
    let students = JSON.parse(localStorage.getItem("students")) || [];

    let filtered = students.filter(s =>
        s.name.toLowerCase().includes(keyword) ||
        s.regno.toLowerCase().includes(keyword) ||
        s.course.toLowerCase().includes(keyword)
    );

    let output = "";

    filtered.forEach((s, index) => {
        output += `
        <tr>
            <td>${s.name}</td>
            <td>${s.regno}</td>
            <td>${s.course}</td>
            <td>
                <button onclick="editStudent(${index})">Edit</button>
                <button onclick="deleteStudent(${index})">Delete</button>
            </td>
        </tr>
        `;
    });

    document.getElementById("studentList").innerHTML = output;
}

displayStudents();
