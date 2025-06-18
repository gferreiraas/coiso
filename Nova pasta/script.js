// script.js
let students = [];
let grades = {};

function addStudent() {
    const nameInput = document.getElementById("student-name");
    const name = nameInput.value.trim();

    if (name === "") {
        alert("Por favor, insira o nome do aluno.");
        return;
    }

    // Adiciona o aluno à lista
    students.push({ name: name, present: null });

    // Limpa o campo de entrada
    nameInput.value = "";

    // Atualiza a lista de alunos no HTML
    updateStudentList();
    updateGradeSelect();
}

function updateStudentList() {
    const studentList = document.getElementById("student-list");
    studentList.innerHTML = ""; // Limpa a lista antes de adicionar novamente
    students.forEach((student, index) => {
        const li = document.createElement("li");
        li.textContent = student.name;

        // Criação dos botões de presença e falta
        const presentButton = document.createElement("button");
        presentButton.textContent = "P";
        presentButton.className = "attendance-btn presence";
        presentButton.onclick = () => markAttendance(index, true, presentButton, absentButton);

        const absentButton = document.createElement("button");
        absentButton.textContent = "F";
        absentButton.className = "attendance-btn absence";
        absentButton.onclick = () => markAttendance(index, false, presentButton, absentButton);

        // Adiciona os botões de presença e falta ao item da lista
        li.appendChild(presentButton);
        li.appendChild(absentButton);
        
        studentList.appendChild(li);
    });
}

function updateGradeSelect() {
    const select = document.getElementById("grade-select");
    select.innerHTML = "";

    students.forEach((student, index) => {
        const option = document.createElement("option");
        option.value = index;
        option.textContent = student.name;
        select.appendChild(option);
    });
}

function markAttendance(index, isPresent, presentButton, absentButton) {
    const student = students[index];
    student.present = isPresent ? "Presente" : "Falta";

    // Alterando a cor do botão de presença ou falta
    if (isPresent) {
        presentButton.classList.add("selected");
        absentButton.classList.remove("selected");
    } else {
        absentButton.classList.add("selected");
        presentButton.classList.remove("selected");
    }

    alert(`${student.name} foi marcado como ${isPresent ? "Presente" : "Falta"}.`);
}

function assignGrade() {
    const select = document.getElementById("grade-select");
    const studentIndex = select.value;
    const gradeInput = document.getElementById("grade-input");
    const grade = parseFloat(gradeInput.value.trim());

    if (studentIndex !== "" && !isNaN(grade) && grade >= 0 && grade <= 10) {
        const studentName = students[studentIndex].name;
        grades[studentName] = grade;
        alert(`Nota de ${studentName} foi atribuída: ${grade}`);
        gradeInput.value = "";
        updateGradesList();
    } else {
        alert("Por favor, insira uma nota válida entre 0 e 10.");
    }
}

function updateGradesList() {
    const gradesList = document.getElementById("grades-list");
    gradesList.innerHTML = "";

    Object.keys(grades).forEach(studentName => {
        const li = document.createElement("li");
        li.textContent = `${studentName}: ${grades[studentName]}`;
        gradesList.appendChild(li);
    });
}
