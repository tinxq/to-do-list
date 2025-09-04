const addTaskBtn = document.getElementById("addTaskBtn");
const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");
const hoursSelect = document.getElementById("hours");
const minutesSelect = document.getElementById("minutes");
const secondsSelect = document.getElementById("seconds");

for(let i=0;i<24;i++) hoursSelect.innerHTML += `<option value="${i}">${i}h</option>`;
for(let i=0;i<60;i++){
  minutesSelect.innerHTML += `<option value="${i}">${i}m</option>`;
  secondsSelect.innerHTML += `<option value="${i}">${i}s</option>`;
}

addTaskBtn.addEventListener("click", addTask);

function addTask() {
  const taskText = taskInput.value.trim();
  if(!taskText) return;

  const li = document.createElement("li");
  li.innerHTML = `
    <span>${taskText}</span>
    <span class="timerDisplay">00:00</span>
    <button class="startBtn">Start</button>
    <button class="deleteBtn">Delete</button>
  `;
  taskList.appendChild(li);
  taskInput.value = "";

  const timerDisplay = li.querySelector(".timerDisplay");
  const startBtn = li.querySelector(".startBtn");
  const deleteBtn = li.querySelector(".deleteBtn");

  let countdown;

  startBtn.addEventListener("click", () => {
    let totalSeconds = parseInt(hoursSelect.value)*3600 
                     + parseInt(minutesSelect.value)*60 
                     + parseInt(secondsSelect.value);
    if(totalSeconds <= 0) totalSeconds = 30; 

    clearInterval(countdown);
    countdown = setInterval(() => {
      if(totalSeconds <=0){
        clearInterval(countdown);
        alert(`Time's up for: ${taskText}`);
        timerDisplay.textContent = "00:00";
      } else {
        timerDisplay.textContent = formatTime(totalSeconds);
        totalSeconds--;
      }
    },1000);
  });

  deleteBtn.addEventListener("click", ()=>{
    clearInterval(countdown);
    li.remove();
  });
}


function formatTime(totalSeconds){
  const h = Math.floor(totalSeconds/3600);
  const m = Math.floor((totalSeconds%3600)/60);
  const s = totalSeconds % 60;
  if(h>0) return `${String(h).padStart(2,'0')}:${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`;
  return `${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`;
}

const { app, BrowserWindow } = require('electron');

function createWindow () {
  const win = new BrowserWindow({
    width: 400,
    height: 600,
    backgroundColor: '#ffc0cb', 
    webPreferences: {
      nodeIntegration: true
    }
  });

  win.loadFile('index.html');
}

app.whenReady().then(createWindow);