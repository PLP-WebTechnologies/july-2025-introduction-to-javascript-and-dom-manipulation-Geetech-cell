// Part 1: Variables and Conditionals
let tasks = []; // Array to store tasks
let taskCount = 0; // Track number of tasks

// Function to update task counter
function updateTaskCount() {
    const taskCountElement = document.getElementById('taskCount');
    taskCount = tasks.length;
    taskCountElement.textContent = `Total tasks: ${taskCount}`;
    
    // Conditional: Display message based on task count
    if (taskCount === 0) {
        taskCountElement.style.color = 'red';
    } else if (taskCount <= 3) {
        taskCountElement.style.color = 'blue';
    } else {
        taskCountElement.style.color = 'green';
    }
}

// Part 2: Custom Functions
// Function to format task text
function formatTaskText(text) {
    if (!text.trim()) {
        return null; // Return null for empty input
    }
    return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
}

// Function to create a task object
function createTaskObject(text) {
    return {
        id: Date.now(),
        text: formatTaskText(text),
        completed: false
    };
}

// Part 3: Loops
// Function to render tasks using a forEach loop
function renderTasks() {
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = ''; // Clear existing list
    
    // Loop through tasks array
    tasks.forEach(task => {
        const li = document.createElement('li');
        li.innerHTML = `
            <span class="${task.completed ? 'completed' : ''}">${task.text}</span>
            <button onclick="toggleTask(${task.id})">${task.completed ? 'Undo' : 'Complete'}</button>
        `;
        taskList.appendChild(li);
    });
    
    // Update task count after rendering
    updateTaskCount();
}

// Function to simulate countdown for task addition (using while loop)
function addTaskWithDelay(text) {
    let delay = 3; // Simulate 3-second countdown
    while (delay > 0) {
        console.log(`Adding task in ${delay} seconds...`);
        delay--;
    }
    const task = createTaskObject(text);
    if (task.text) {
        tasks.push(task);
        renderTasks();
    } else {
        alert('Please enter a valid task!');
    }
}

// Part 4: DOM Manipulation
// Add new task
function addTask() {
    const input = document.getElementById('taskInput');
    addTaskWithDelay(input.value);
    input.value = ''; // Clear input field
}

// Toggle task completion
function toggleTask(id) {
    tasks = tasks.map(task => {
        if (task.id === id) {
            return { ...task, completed: !task.completed };
        }
        return task;
    });
    renderTasks();
}

// Clear completed tasks
function clearCompleted() {
    tasks = tasks.filter(task => !task.completed);
    renderTasks();
}

// Toggle all tasks
function toggleAll() {
    const allCompleted = tasks.every(task => task.completed);
    tasks = tasks.map(task => ({ ...task, completed: !allCompleted }));
    renderTasks();
}

// Initialize the app
document.addEventListener('DOMContentLoaded', () => {
    renderTasks();
});