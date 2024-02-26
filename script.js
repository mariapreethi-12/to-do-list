document.addEventListener('DOMContentLoaded', function () {

    loadTasks();

    
    document.getElementById('taskInput').addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            addTask();
        }
    });
});

function addTask() {
    const taskInput = document.getElementById('taskInput');
    const taskList = document.getElementById('taskList');

    if (taskInput.value.trim() !== '') {
        // Create a new task item
        const taskItem = document.createElement('li');
        taskItem.innerHTML = `
            <span>${taskInput.value}</span>
            <button onclick="toggleCompleted(this)">Done</button>
            <button onclick="editTask(this)">Edit</button>
            <button onclick="deleteTask(this)">Delete</button>
        `;

        // Append the task item to the task list
        taskList.appendChild(taskItem);

        // Save tasks to local storage
        saveTasks();

        // Clear the input field
        taskInput.value = '';
    }
}

function toggleCompleted(button) {
    const taskItem = button.parentNode;
    taskItem.classList.toggle('completed');

    // Save tasks to local storage
    saveTasks();
}

function editTask(button) {
    const taskItem = button.parentNode;
    const span = taskItem.querySelector('span');
    const newTaskText = prompt('Edit task:', span.textContent);

    if (newTaskText !== null) {
        span.textContent = newTaskText;

        
        saveTasks();
    }
}

function deleteTask(button) {
    const taskItem = button.parentNode;
    taskItem.remove();

    
    saveTasks();
}

function saveTasks() {
    const taskList = document.getElementById('taskList');
    localStorage.setItem('tasks', taskList.innerHTML);
}

function loadTasks() {
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = localStorage.getItem('tasks') || '';
}
