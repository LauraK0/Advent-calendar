const calendarGrid = document.getElementById('calendar-grid');
const modal = document.querySelector('.modal');
const closeButton = document.querySelector(".close-button");
const simulateDateEl = document.getElementById('simulate-date');
const images = {0: "Image1", 1: "image2", 2: "image3" , 3: "image4", 4: "image5", 5: "image6", 6: "image7", 7: "image8", 8: "image9", 9: "image10", 10: "image11", 11: "image12", 11: "image12", 12: "image13", 13: "image14", 14: "image15", 15: "image16", 16: "image17", 17: "image18", 18: "image19", 19: "image20", 20: "image21", 21: "image22", 22: "image23", 23: "image24"};

const windowArray = JSON.parse(localStorage.getItem('storedArray')) || [];
let simulateDate = JSON.parse(localStorage.getItem('currentDate')) || 0;

if (windowArray.length === 0) {
    for (let i=0;  i<24; i++){
        windowArray.push({ day: i+1, image: images[i], opened:false});
    }
    let currentIndex = windowArray.length,  randomIndex;
    while (currentIndex != 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [windowArray[currentIndex], windowArray[randomIndex]] = [
        windowArray[randomIndex], windowArray[currentIndex]];
      }
}

createWindows(windowArray);

/*event listeners*/
document.addEventListener("DOMContentLoaded", getStoredArray);
simulateDateEl.addEventListener("change", updateDate);
closeButton.addEventListener("click", openWindow);

function createWindows(windowArray){ 
    windowArray.forEach((window) => {
        let windowEl = document.createElement("div"); 
        windowEl.setAttribute("id", `window-${window.day}`);
        windowEl.classList.add('window');
        windowEl.classList.add('front');
        windowEl.innerHTML = `${window.day}`;
        calendarGrid.appendChild(windowEl); 
    })
    setStorage(windowArray);
}

function updateDate() {
    simulateDate = Number(simulateDateEl.value);
    addDateLocalStorage(simulateDate);
    return simulateDate;
  }

const windows = document.querySelectorAll('.front');

windows.forEach(window => window.addEventListener('click', (e) => {
    let windowDay = window.textContent;
    console.log(windowDay);
    let windowNum = Number(windowDay);
    simulateDate = Number(simulateDateEl.value);
    if (simulateDate >= windowNum){
        window.classList.remove('front');
        window.classList.add('opened');
        window.innerHTML ='';
        modal.classList.toggle("show-modal");
        let found = windowArray.find(element => element.day === windowNum);
        found.opened = true;
        localStorage.setItem('storedArray', JSON.stringify(windowArray));
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
    let windowArray = getStoredArray();
    if (windowArray.length == 0) {
        let windowArray = [];
        localStorage.setItem('storedArray', JSON.stringify(windowArray));
    }
}

function getStoredArray() {
    if (simulateDate === 0) {
        updateDate();
    }
    else {
        simulateDateEl.value = simulateDate;
    }
    let windowArray = [];
    if (localStorage.getItem('storedArray') !== null) {
        windowArray = JSON.parse(localStorage.getItem('storedArray'))
    }
    windowArray.forEach((window) =>  {
        if (window.opened === true) {
            let updateEl = document.getElementById(`window-${window.day}`)
            updateEl.classList.remove('front');
            updateEl.classList.add('opened');
            updateEl.innerHTML ='';
        }
    });
    return windowArray;
}

function setStorage(windowArray) {
    localStorage.setItem('storedArray', JSON.stringify(windowArray));
}

function addDateLocalStorage(dateAsNumber) {
    localStorage.setItem('currentDate', JSON.stringify(dateAsNumber));
}

