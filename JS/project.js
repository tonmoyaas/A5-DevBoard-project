
// Dynamicaly color change
let button = document.getElementById("changeColor");

button.addEventListener("click", function () {

    let colors = ["#6C7FFA", "#9BA8F8", "#FF5178", "#FF9259", "#49B296", "#3752FD"];

    let randomColor = colors[Math.floor(Math.random() * colors.length)];

    document.body.style.backgroundColor = randomColor;
});

// Store the initial notification count
const INITIAL_NOTIFICATION_COUNT = 23;
let currentNotificationCount = INITIAL_NOTIFICATION_COUNT;

// Format date function
function formatDate(date) {
    const options = { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' };
    return date.toLocaleDateString('en-US', options);
}

// Format time function
function formatTime(date) {
    const options = { hour: 'numeric', minute: 'numeric', hour12: true };
    return date.toLocaleTimeString('en-US', options);
}

// Update current date
function updateCurrentDate() {
    const now = new Date();
    document.getElementById('current-date').textContent = formatDate(now);
}

// Show custom alert
function showAlert(message) {
    alert(message);
}

// Increment notification count
function incrementNotificationCount() {
    currentNotificationCount++;
    const notificationBadge = document.getElementById('notification-count');
    notificationBadge.textContent = currentNotificationCount;
}
// Reset notification count
function resetNotificationCount() {
    currentNotificationCount = INITIAL_NOTIFICATION_COUNT;
    document.getElementById('notification-count').textContent = INITIAL_NOTIFICATION_COUNT;
}

// Add activity to log
function addActivityToLog(company, taskTitle, action) {
    const now = new Date();
    const today = formatDate(now);
    const time = formatTime(now);

    // Create new activity item
    const activityItem = document.createElement('div');
    activityItem.className = 'p-3 bg-gray-50 rounded-md activity-item';

    activityItem.innerHTML = `
               
                <p class="text-sm">You have completed the task ${taskTitle} at ${time} . </p>
            <p class="text-xs text-gray-500"></p> `
        ;

    // Get activity log container
    const activityLog = document.getElementById('activity-log');

    // Remove "No recent activity" message if it exists
    const emptyState = activityLog.querySelector('div:first-child');
    if (emptyState && emptyState.textContent.includes('No recent activity')) {
        activityLog.removeChild(emptyState);
    }

    // Add new activity at the top
    activityLog.insertBefore(activityItem, activityLog.firstChild);

    // Increment notification count
    incrementNotificationCount();
}

// Initialize
document.addEventListener('DOMContentLoaded', function () {
    updateCurrentDate();

    // Add event listeners to all complete buttons
    const completeButtons = document.querySelectorAll('.complete-btn');
    completeButtons.forEach(button => {
        button.addEventListener('click', function () {
            // Prevent multiple clicks
            if (this.disabled) return;

            const card = this.closest('.card');
            const company = card.getAttribute('data-company');
            const taskTitle = card.querySelector('.task-title').textContent;

            // Add to activity log
            addActivityToLog(company, taskTitle, 'marked as completed');

            // Visual feedback - change to disabled style
            this.textContent = 'Completed';
            this.classList.remove('bg-indigo-600');
            this.classList.add('bg-gray-400');

            // Explicitly disable the button
            this.disabled = true;
            this.setAttribute('aria-disabled', 'true');

            // Decrease task count
            const taskCount = document.getElementById('task-count');
            const currentCount = parseInt(taskCount.textContent);
            if (currentCount > 0) {
                taskCount.textContent = currentCount - 1;
            }

            // Show alert message
            showAlert("Board Updated Successfully");
        });
    });
    //complated Congratulations alert
    let complateTask = document.querySelector(".complate-task");

    complateTask.addEventListener("click", function () {
        alert("Congratulations! You've Complated the all task!");
    });

    // Clear history button
    document.getElementById('clearHistory').addEventListener('click', function () {
        const activityLog = document.getElementById('activity-log');

        // Fade out all activities
        const activities = activityLog.querySelectorAll('.activity-item');
        activities.forEach(item => {
            item.style.opacity = '0';
            item.style.height = '0';
            item.style.margin = '0';
            item.style.padding = '0';
            item.style.overflow = 'hidden';
            item.style.transition = 'all 0.3s ease';
        });

        // Clear and add empty state after animation
        setTimeout(() => {
            activityLog.innerHTML = '';

            const emptyState = document.createElement('div');
            emptyState.className = 'p-3 bg-gray-50 rounded-md activity-item';
            emptyState.innerHTML = `
                        <p class="text-xs text-gray-500">No recent activity</p>
                        <p class="text-sm">Complete a task to see activity here</p>
                    `;

            activityLog.appendChild(emptyState);

            // Reset notification count to initial value
            resetNotificationCount();
        }, 300);
    });
});


