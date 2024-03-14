let intervalId = null;
let seconds = 0;
let timerRunning = false;

const display = document.getElementById('timeDisplay');
const datePicker = document.getElementById('datePicker');
const today = new Date().toISOString().split('T')[0];

datePicker.value = today;
datePicker.setAttribute('max', today);

datePicker.addEventListener('keydown', (e) => {
    e.preventDefault();
});

function formatTime(time) {
    const hours = Math.floor(time / 3600).toString().padStart(2, '0');
    const minutes = Math.floor((time % 3600) / 60).toString().padStart(2, '0');
    const seconds = Math.floor(time % 60).toString().padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
}

function startTimer() {
    if (!timerRunning) {
        timerRunning = true;
        intervalId = setInterval(() => {
            seconds++;
            display.value = formatTime(seconds);
        }, 1000);
    }
}

function stopTimer() {
    if (timerRunning) {
        clearInterval(intervalId);
        timerRunning = false;
    }
}

function resetTimer() {
    stopTimer();
    seconds = 0;
    display.value = formatTime(seconds);
}

document.getElementById('startBtn').addEventListener('click', startTimer);
document.getElementById('stopBtn').addEventListener('click', stopTimer);
document.getElementById('resetBtn').addEventListener('click', resetTimer);