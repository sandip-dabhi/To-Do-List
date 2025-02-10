document.addEventListener("DOMContentLoaded", function () {
    const taskInput = document.getElementById("taskInput");
    const addTaskBtn = document.getElementById("addTask");
    const taskList = document.getElementById("taskList");
    const errorMessage = document.getElementById("error-message");

    // Load tasks from localStorage on page load
    function loadTasks() {
        const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
        savedTasks.forEach(task => addTaskToDOM(task));
    }

    // Save tasks to localStorage
    function saveTasks() {
        const tasks = Array.from(document.querySelectorAll("#taskList li span"))
                           .map(span => span.textContent);
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    // Function to add task
    function addTask() {
        const taskText = taskInput.value.trim();

        if (taskText === "") {
            errorMessage.textContent = "Please enter a task!";
            errorMessage.style.display = "block";
            return;
        } else {
            errorMessage.style.display = "none";
        }

        addTaskToDOM(taskText);
        saveTasks(); // Save to localStorage
        taskInput.value = "";
    }

    // Function to add task to the DOM
    function addTaskToDOM(taskText) {
        const li = document.createElement("li");

        const taskContent = document.createElement("div");
        taskContent.classList.add("task-content");

        const span = document.createElement("span");
        span.textContent = taskText;

        const editBtn = document.createElement("button");
        editBtn.textContent = "✏️";
        editBtn.classList.add("edit-btn");

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "🗑️";
        deleteBtn.classList.add("delete-btn");

        // Edit task
        editBtn.addEventListener("click", function () {
            const newTaskText = prompt("Edit your task:", span.textContent);
            if (newTaskText !== null && newTaskText.trim() !== "") {
                span.textContent = newTaskText.trim();
                saveTasks(); // Update localStorage after editing
            }
        });

        // Delete task
        deleteBtn.addEventListener("click", function () {
            li.remove();
            saveTasks(); // Update localStorage after deleting
        });

        taskContent.appendChild(span);

        const buttonContainer = document.createElement("div");
        buttonContainer.classList.add("task-buttons");
        buttonContainer.appendChild(editBtn);
        buttonContainer.appendChild(deleteBtn);

        li.appendChild(taskContent);
        li.appendChild(buttonContainer);
        taskList.appendChild(li);
    }

    // Load tasks on page load
    loadTasks();

    // Event Listeners
    addTaskBtn.addEventListener("click", addTask);
    taskInput.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            addTask();
        }
    });
});
