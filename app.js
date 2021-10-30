'use strict'

//global
const myContainer = document.querySelector('section');
const myButton = document.querySelector('section + div');
const results = document.querySelector('ul');

let image1 = document.querySelector('section img:first-child');
let image2 = document.querySelector('section img:nth-child(2)');
let image3 = document.querySelector('section img:nth-child(3)');

let allBus = [];
let clicks = 0;
const clicksAllowed = 25;

//constructor

function Bus(name, fileExtension = 'jpg') {
    this.name = name;
    this.src = `images/${name}.${fileExtension}`;
    this.vote = 0;
    this.views = 0;
    allBus.push(this);

}

//construction
new Bus('bag');
new Bus('banana');
new Bus('bathroom');
new Bus('boots');
new Bus('breakfast');
new Bus('bubblegum');
new Bus('chair');
new Bus('cthulhu');
new Bus('dog-duck');
new Bus('dragon');
new Bus('pen');
new Bus('pet-sweep');
new Bus('scissors');
new Bus('shark');
new Bus('sweep', 'png');
new Bus('tauntaun');
new Bus('unicorn');
new Bus('water-can');
new Bus('wine-glass');

//functions
function selectRandomBus() {
    return Math.floor(Math.random() * allBus.length);
}

function renderBus() {
    let bus1 = selectRandomBus();
    let bus2 = selectRandomBus();
    let bus3 = selectRandomBus();
    while (bus1 === bus2 || bus1 === bus3 || bus2 === bus3) {
        bus2 = selectRandomBus();
        bus3 = selectRandomBus();
    }
    image1.src = allBus[bus1].src;
    image1.alt = allBus[bus1].name;
    allBus[bus1].views++;
    image2.src = allBus[bus2].src;
    image2.alt = allBus[bus2].name;
    allBus[bus2].views++;
    image3.src = allBus[bus3].src;
    image3.alt = allBus[bus3].name;
    allBus[bus3].views++;
}

function handleBusClick(event) {
    if (event.target === myContainer) {
      alert('Please click on an image');
    }
    clicks++;
    let clickedBus = event.target.alt;
    for (let i = 0; i < allBus.length; i++) {
      if (clickedBus === allBus[i].name) {
        allBus[i].vote++;
        break;
      }
    }

    renderBus();

    if (clicks === clicksAllowed) {
      myContainer.removeEventListener('click', handleBusClick);
      myButton.addEventListener('click', handleButtonClick);
      myButton.className = 'clicks-allowed';
    }
  }
  
  function handleButtonClick() {
    for (let i = 0; i < allBus.length; i++) {
      let li = document.createElement('li')
      li.textContent = `${allBus[i].name} had ${allBus[i].views} view and was clicked ${allBus[i].vote} times.`;
      results.appendChild(li);
    };
  }
  
  renderBus();
  
  myContainer.addEventListener('click', handleBusClick);
