const calendarGrid = document.getElementById('calendar-grid');
const array = Array.from({length: 24}, (_, i) => i + 1);
const modal = document.querySelector('.modal');
const closeButton = document.querySelector(".close-button");
const simulateDate  = document.getElementById('simulate-date').valueAsNumber;
console.log(simulateDate)

shuffle(array);
createWindows(array);
createStorage();

closeButton.addEventListener("click", openWindow);

function shuffle(array) {
    let currentIndex = array.length,  randomIndex;
    // While there remain elements to shuffle.
    while (currentIndex != 0) {
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
}

function createWindows(array){ 
    array.forEach((window) => {
        let windowEl = document.createElement("div"); 
        windowEl.setAttribute("id", `window-${window}`);
        let windowElHTML = 
        `
        <label>
        <input id = 'window_${window}' type='checkbox'>
            <div id='${window}' class='window front'>${window}</div>
        </input>
        </label>
        `;
        windowEl.innerHTML = windowElHTML; 
        calendarGrid.appendChild(windowEl); 
    })
}

const windows = document.querySelectorAll('.front');

windows.forEach(window => window.addEventListener('click', (e) => {
    if (simulateDate >= window.id ){
        window.classList.remove('front');
        window.classList.add('opened');
        window.innerHTML ='';
        modal.classList.toggle("show-modal");
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
}

