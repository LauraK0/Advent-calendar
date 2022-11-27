const calendarGrid = document.getElementById('calendar-grid');
const modal = document.querySelector('.modal');
const closeButton = document.querySelector(".close-button");
const simulateDateEl = document.getElementById('simulate-date');

let array = JSON.parse(localStorage.getItem('storedArray')) || [];
let simulateDate = JSON.parse(localStorage.getItem('currentDate')) || 0;

if (array.length === 0) {
    array = Array.from({length: 24}, (_, i) => i + 1);
    console.log(array)
    let currentIndex = array.length,  randomIndex;
    while (currentIndex != 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
}

createWindows(array);

/*event listeners*/
document.addEventListener("DOMContentLoaded", getStoredArray);
simulateDateEl.addEventListener("change", updateDate);
closeButton.addEventListener("click", openWindow);

function createWindows(array){ 
    array.forEach((window) => {
        let windowEl = document.createElement("div"); 
        windowEl.setAttribute("id", `window-${window}`);
        windowEl.classList.add('window');
        windowEl.classList.add('front');
        windowEl.innerHTML = `${window}`;
        calendarGrid.appendChild(windowEl); 
    })
    setStorage(array);
}

function updateDate() {
    simulateDate = Number(simulateDateEl.value);
    addDateLocalStorage(simulateDate);
    return simulateDate;
  }

const windows = document.querySelectorAll('.front');

windows.forEach(window => window.addEventListener('click', (e) => {
    let windowID = window.textContent;
    let windowNum = Number(windowID);
    simulateDate = Number(simulateDateEl.value);
    if (simulateDate >= windowNum){
        window.classList.remove('front');
        window.classList.add('opened');
        window.innerHTML ='';
        modal.classList.toggle("show-modal");
        removeFromLocalStorage(windowNum);
    }
    else {
        e.preventDefault();
        alert('it is not yet time.');
    }
}));

function openWindow(){
    modal.classList.toggle("show-modal");
}

function createStorage() {
    let array = getStoredArray();
    if (array.length == 0) {
        let array = [];
        localStorage.setItem('storedArray', JSON.stringify(array));
    }
}

function getStoredArray() {
    if (simulateDate === 0) {
        updateDate();
    }
    else {
        simulateDateEl.value = simulateDate;
    }
    let array = [];
    if (localStorage.getItem('storedArray') !== null) {
        array = JSON.parse(localStorage.getItem('storedArray'))
    }
    return array;
}

function setStorage(array) {
    localStorage.setItem('storedArray', JSON.stringify(array));
    updateStorage();
}

function addDateLocalStorage(dateAsNumber) {
    localStorage.setItem('currentDate', JSON.stringify(dateAsNumber));
}

function updateStorage() {
    let array = getStoredArray();
}

function removeFromLocalStorage(windowNum) {
    console.log(windowNum);
    array.splice(array.indexOf(windowNum), 1);
    localStorage.setItem('storedArray', JSON.stringify(array));
}