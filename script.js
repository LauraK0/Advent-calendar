const calendarGrid = document.getElementById('calendar-grid');
const modal = document.querySelector('.modal');
const closeButton = document.querySelector(".close-button");
const resetButton = document.getElementById('reset-button');
const simulateDateEl = document.getElementById('simulate-date');
const imgModal = document.getElementById('modal-content');
const images = {
    0: './images/window-images/24-more-sleeps.jpeg', 
    1: 'https://www.youtube.com/embed/ULaNvmjZWxg',
    2: 'https://www.youtube.com/embed/WYYJ7yaL9WU',
    3: './images/window-images/singing.png',
    4: 'https://www.youtube.com/embed/qDL2HBPy9uQ', //
    5: './images/window-images/christmas-dog-1.jpeg', 
    6: 'https://www.youtube.com/embed/VjL031bE9FA',
    7: 'https://www.youtube.com/embed/LZOKbPNgS5s', // 
    8: './images/window-images/christmas-cats.jpeg', 
    9:  'https://www.youtube.com/embed/3CWJNqyub3o',
    10: './images/window-images/christmas-wreath.jpeg', 
    11: 'https://www.youtube.com/embed/1qbxTqN6gSE',
    12: './images/window-images/christmas-dogs.jpeg', 
    13: 'https://www.youtube.com/embed/cGSneujgGT8',
    14: './images/window-images/christmas-pets.jpeg', 
    15: 'https://www.youtube.com/embed/np2ZapISRzM',
    16: './images/window-images/nativity-scene.png', 
    17: 'https://www.youtube.com/embed/_8v183sLNFQ',
    18: './images/window-images/robin-reindeer.jpeg', 
    19: './images/window-images/gingerbread-museum.jpeg',
    20: 'https://www.youtube.com/embed/IJPc7esgvsA', 
    21: './images/window-images/Christmas-tree.jpeg', //
    22: 'https://www.youtube.com/embed/BpfHSqLXePI', 
    23: 'https://www.youtube.com/embed/NzcUQuImIBY',
};

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
storeWindows();

const windows = document.querySelectorAll('.front');

/*event listeners*/
document.addEventListener("DOMContentLoaded", getStoredArray);
simulateDateEl.addEventListener("change", updateDate);
closeButton.addEventListener("click", closeModal);
resetButton.addEventListener("click", reset);

windows.forEach(window => window.addEventListener('click', (e) => {
    let windowDay = window.textContent;
    let windowNum = Number(windowDay);
    simulateDate = Number(simulateDateEl.value);
    if (simulateDate >= windowNum){
        window.classList.remove('front');
        window.classList.add('opened');
        window.innerHTML ='';
        let found = windowArray.find(element => element.day === windowNum);
        let test = found.image.includes('youtube');
        if (test === true) {
                let outputSectionHTML = 
                `
                <iframe title="myFrame" id="modal-content" width="630" height="472" src='${found.image}'></iframe>
                `;
                imgModal.innerHTML = outputSectionHTML;
            }
        else {
            let outputSectionHTML = 
            `
            <img id="modal-content" alt="image" src='${found.image}'></img>
            `;
            imgModal.innerHTML = outputSectionHTML;

        }
        modal.classList.toggle("show-modal");
        found.opened = true;
    }
    else {
        e.preventDefault();
        alert('it is not yet time.');
    }
}));

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

function storeWindows() {
    localStorage.setItem('storedArray', JSON.stringify(windowArray));
}

function updateDate() {
    simulateDate = Number(simulateDateEl.value);
    addDateLocalStorage(simulateDate);
    return simulateDate;
  }

function closeModal(){
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

function reset() {
    console.log(windowArray);
    windowArray.forEach((window) =>  {
        if (window.opened === true) {
            let updateEl = document.getElementById(`window-${window.day}`)
            updateEl.classList.remove('opened');
            updateEl.classList.add('front');
            updateEl.innerHTML =+`${window.day}`;
        }
    });
    localStorage.removeItem('storedArray', JSON.stringify(windowArray));
    localStorage.removeItem('currentDate', JSON.stringify(simulateDate));
}
