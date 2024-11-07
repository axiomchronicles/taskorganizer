document.addEventListener("DOMContentLoaded", () => {
    const taskForm = document.getElementById("task-form");
    const taskInput = document.getElementById("task-input");
    const deadlineInput = document.getElementById("deadline-input");
    const priorityInput = document.getElementById("priority-input");
    const taskList = document.getElementById("task-list");
    const taskCount = document.getElementById("task-count");
    const progressBar = document.querySelector(".progress");
    const progressText = document.getElementById("progress-text");
    const quote = document.getElementById("quote");

    const motivationalQuotes = [
        "Keep going, you're doing great!",
        "Stay focused and never give up!",
        "Your hard work will pay off!",
        "Believe in yourself!",
        "Small progress is still progress!"
    ];

    let tasks = [];

    function updateTaskCount() {
        taskCount.innerText = `(${tasks.length} tasks)`;
    }

    function updateProgress() {
        const completedTasks = tasks.filter(task => task.completed).length;
        const progressPercentage = tasks.length ? (completedTasks / tasks.length) * 100 : 0;
        progressBar.style.width = `${progressPercentage}%`;
        progressText.innerText = `${Math.round(progressPercentage)}% Complete`;
    }

    function addTask(taskText, deadline, priority) {
        const task = {
            id: Date.now(),
            text: taskText,
            deadline: deadline,
            priority: priority,
            completed: false
        };
        tasks.push(task);
        renderTasks();
        updateProgress();
        updateTaskCount();
    }

    function renderTasks(filter = 'all') {
        taskList.innerHTML = "";
        tasks
            .filter(task => filter === 'all' || task.priority === filter)
            .forEach(task => {
                const li = document.createElement("li");
                li.className = `priority-${task.priority} ${task.completed ? 'completed' : ''}`;
                li.innerHTML = `
                    ${task.text} - <small>Due: ${task.deadline}</small> 
                    <div>
                        <button onclick="toggleComplete(${task.id})">✔️</button>
                        <button onclick="deleteTask(${task.id})">❌</button>
                    </div>
                `;
                taskList.appendChild(li);
            });
    }

    window.toggleComplete = function(id) {
        tasks = tasks.map(task => task.id === id ? { ...task, completed: !task.completed } : task);
        renderTasks();
        updateProgress();
    };

    window.deleteTask = function(id) {
        tasks = tasks.filter(task => task.id !== id);
        renderTasks();
        updateProgress();
        updateTaskCount();
    };

    window.filterTasks = function(priority) {
        renderTasks(priority);
    };

    taskForm.addEventListener("submit", e => {
        e.preventDefault();
        addTask(taskInput.value, deadlineInput.value, priorityInput.value);
        taskInput.value = "";
        deadlineInput.value = "";
    });

    // Display random motivational quote on load
    quote.innerText = motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)];
});
