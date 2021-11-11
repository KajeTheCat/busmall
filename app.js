'use strict'

//global
const myContainer = document.querySelector('section');
const myButton = document.querySelector('section + div');
const results = document.querySelector('ul');

let image1 = document.querySelector('section img:first-child');
let image2 = document.querySelector('section img:nth-child(2)');
let image3 = document.querySelector('section img:nth-child(3)');

let chartContainer = document.querySelector('div');

let allBus = [];
let clicks = 0;
const clicksAllowed = 25;
let productArray = [];

//constructor

function Bus(name, fileExtension = 'jpg') {
  this.name = name;
  this.src = `images/${name}.${fileExtension}`;
  this.vote = 0;
  this.views = 0;
  this.total = JSON.parse(localStorage.getItem(this.name)) || {
    views: [],
    vote: []
  };
  allBus.push(this);
}

console.log(allBus)

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
  while (productArray.length < 16) {
    let ranNum = selectRandomBus();
    if(!productArray.includes(ranNum)) {
      productArray.push(ranNum);
    }
  }

  let bus1 = productArray.shift();
  let bus2 = productArray.shift();
  let bus3 = productArray.shift();

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

//Product storage

Bus.prototype.storeToLocalStorage = function() {

  this.total.views.push(this.views);
  this.total.vote.push(this.vote);
  localStorage.setItem(this.name, JSON.stringify(this.total));
}

//events

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
    chartContainer.className = 'myChartAfter';
    for (let i = 0; i < allBus.length; i++) {
      allBus[i].storeToLocalStorage();
    }   
    renderChart();
  }
}

function renderChart() {
  let productNames = [];
  let productVotes = [];
  let productViews = [];
  // console.log(allBus[0].total)
  for (let i = 0; i < allBus.length; i++) {
    productNames.push(allBus[i].name);
    let eViews = 0;
    let eVotes = 0;
    for (let z = 0; z < allBus[i].total.views.length; z++) {
      eViews += allBus[i].total.views[z];
      eVotes += allBus[i].total.vote[z];
    }
    productViews.push(eViews);
    productVotes.push(eVotes);
  }

  const data = {
    labels: productNames,
    datasets: [{
      label: 'Likes',
      data: productVotes,
      backgroundColor: ['rgba(176, 18, 160, 0.2)'],
      borderColor: ['black'],
      borderWidth: 1
    },
    {
      label: 'Views',
      data: productViews,
      backgroundColor: ['rgba(49, 199, 74, 0.2)'],
      borderColor: ['black'],
      borderWidth: 1
    }]
  };
  const config = {
    type: 'bar',
    data: data,
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    },
  };
  let canvasChart = document.getElementById('myChart');
  const myChart = new Chart(canvasChart,config);
}

renderBus();
  
myContainer.addEventListener('click', handleBusClick);
