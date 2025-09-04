const addTaskBtn = document.getElementById("addTaskBtn");
const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");

function createTimeSelects() {

  const hoursSelect = document.createElement("select");
  hoursSelect.innerHTML = '<option value="0">0h</option>';
  for (let i = 1; i < 24; i++) {
    hoursSelect.innerHTML += `<option value="${i}">${i}h</option>`;
  }


  const minutesSelect = document.createElement("select");
  minutesSelect.innerHTML = '<option value="0">0m</option>';
  for (let i = 1; i < 60; i++) {
    minutesSelect.innerHTML += `<option value="${i}">${i}m</option>`;
  }


  const secondsSelect = document.createElement("select");
  secondsSelect.innerHTML = '<option value="0">0s</option>';
  for (let i = 1; i < 60; i++) {
    secondsSelect.innerHTML += `<option value="${i}">${i}s</option>`;
  }

  return { hoursSelect, minutesSelect, secondsSelect };
}

function addTask() {
  const taskText = taskInput.value.trim();
  if (!taskText) return;

  const li = document.createElement("li");
  const { hoursSelect, minutesSelect, secondsSelect } = createTimeSelects();

  li.innerHTML = `
    <span>${taskText}</span>
    <span class="timerDisplay">00:00</span>
    <button class="startBtn">Start</button>
    <button class="deleteBtn">Delete</button>
  `;

  li.insertBefore(secondsSelect, li.querySelector(".timerDisplay"));
  li.insertBefore(minutesSelect, li.querySelector(".timerDisplay"));
  li.insertBefore(hoursSelect, li.querySelector(".timerDisplay"));
  taskList.appendChild(li);
  taskInput.value = "";

  const timerDisplay = li.querySelector(".timerDisplay");
  const startBtn = li.querySelector(".startBtn");
  const deleteBtn = li.querySelector(".deleteBtn");

  let countdown;

  startBtn.addEventListener("click", () => {
    let totalSeconds =
      parseInt(hoursSelect.value) * 3600 +
      parseInt(minutesSelect.value) * 60 +
      parseInt(secondsSelect.value);
    if (totalSeconds <= 0) totalSeconds = 30;

    clearInterval(countdown);
    countdown = setInterval(() => {
      if (totalSeconds <= 0) {
        clearInterval(countdown);
        alert(`Time's up for: ${taskText}`);
        timerDisplay.textContent = "00:00";
      } else {
        timerDisplay.textContent = formatTime(totalSeconds);
        totalSeconds--;
      }
    }, 1000);
  });

  deleteBtn.addEventListener("click", () => {
    clearInterval(countdown);
    li.remove();
  });
}

function formatTime(totalSeconds) {
  const h = Math.floor(totalSeconds / 3600);
  const m = Math.floor((totalSeconds % 3600) / 60);
  const s = totalSeconds % 60;
  if (h > 0) return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

addTaskBtn.addEventListener("click", addTask);