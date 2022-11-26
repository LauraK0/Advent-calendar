const calendarGrid = document.getElementById('calendar-grid');
const array = Array.from({length: 24}, (_, i) => i + 1)

shuffle(array);
createDoors(array);
createStorage();

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
  
  console.log(array);

function createDoors(array){ 
    array.forEach((number) => {
        let adventDoor = document.createElement("div"); 
        adventDoor.setAttribute("id", `door-${number}`);
        let adventDoorHTML = 
        `
        <label>
        <input id = 'door_${number}' type='checkbox'>
            <div class='door'>
                <div class='front'>${number}</div>
                <div class='opened'></div>
            </div>
        </input>
        </label>
        `;
        adventDoor.innerHTML = adventDoorHTML; 
        calendarGrid.appendChild(adventDoor); 
    })
}

const doors = document.querySelectorAll('.door');

doors.forEach(door => door.addEventListener('click', openDoor));

function openDoor(){
    console.log('door');
}

function createStorage() {
}

