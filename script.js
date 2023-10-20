let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function renderTasks() {
  const taskList = document.getElementById("taskList");
  taskList.innerHTML = "";

  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
            <span class="${task.completed ? "completed" : ""}">${
      task.text
    }</span>
            <span>
                <button class="complete-btn" data-index="${index}">Complete</button>
                <button class="delete-btn" data-index="${index}">Delete</button>
            </span>
        `;
    taskList.appendChild(li);
  });

  const completeButtons = document.querySelectorAll(".complete-btn");
  completeButtons.forEach((button) => {
    button.addEventListener("click", completeTask);
  });

  const deleteButtons = document.querySelectorAll(".delete-btn");
  deleteButtons.forEach((button) => {
    button.addEventListener("click", deleteTask);
  });
}

function addTask() {
  const taskInput = document.getElementById("task");
  const taskText = taskInput.value.trim();
  if (taskText !== "") {
    tasks.push({ text: taskText, completed: false });
    taskInput.value = "";
    saveTasks();
    renderTasks();
  }
}

function completeTask(event) {
  const index = event.target.getAttribute("data-index");
  tasks[index].completed = !tasks[index].completed;
  saveTasks();
  renderTasks();
}

function deleteTask(event) {
  const index = event.target.getAttribute("data-index");
  tasks.splice(index, 1);
  saveTasks();
  renderTasks();
}

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

document.getElementById("addTask").addEventListener("click", addTask);

renderTasks();
