let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let draggedTask = null;
function addTask() {
    const title = document.getElementById("taskTitle").value.trim();
    const desc = document.getElementById("taskDesc").value.trim();
    const priority = document.getElementById("priority").value;
    if (title === "" || desc === "") {
        alert("Please fill all fields.");
        return;
    }

    tasks.push({
        id: Date.now(),
        title,
        desc,
        priority,
        status: "todo"
    });

    saveTasks();
    clearInputs();
}

function clearInputs() {
    document.getElementById("taskTitle").value = "";
    document.getElementById("taskDesc").value = "";
    document.getElementById("priority").value = "High";
}

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
    displayTasks();
}

function displayTasks() {
    document.getElementById("todoList").innerHTML = "";
    document.getElementById("progressList").innerHTML = "";
    document.getElementById("doneList").innerHTML = "";
    tasks.forEach(task => {
        const card = document.createElement("div");
        card.className = "card";
        card.draggable = true;
        card.id = task.id;
        card.ondragstart = drag;

        card.innerHTML = `
            <h3>${task.title}</h3>
            <p>${task.desc}</p>
            <span class="priority ${task.priority.toLowerCase()}">
                ${task.priority}
            </span>
            <div class="actions">
                <button class="edit" onclick="editTask(${task.id})">
                    Edit
                </button>
                <button class="delete" onclick="deleteTask(${task.id})">
                    Delete
                </button>
            </div>
        `;

        if (task.status === "todo") {
            document.getElementById("todoList").appendChild(card);
        } else if (task.status === "progress") {
            document.getElementById("progressList").appendChild(card);
        } else {
            document.getElementById("doneList").appendChild(card);
        }
    });
}
function deleteTask(id) {
    tasks = tasks.filter(task => task.id !== id);
    saveTasks();
}
function editTask(id) {
    const task = tasks.find(task => task.id === id);
    document.getElementById("taskTitle").value = task.title;
    document.getElementById("taskDesc").value = task.desc;
    document.getElementById("priority").value = task.priority;
    deleteTask(id);
}
function drag(event) {
    draggedTask = event.target.id;
}

function allowDrop(event) {
    event.preventDefault();
}
function drop(event) {
    event.preventDefault();
    let column = event.currentTarget.id;
    let task = tasks.find(t => t.id == draggedTask);

    if (task) {
        task.status = column;
        saveTasks();
    }
}
displayTasks();