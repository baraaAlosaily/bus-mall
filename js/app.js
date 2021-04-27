"use strict";

let allProducts = [];
let nameOfProduct = [];
let numOfClickArray = [];
let numOfShowArray = [];
let clicksColor = [];
let showColor = [];
// eslint-disable-next-line no-unused-vars
let numOfRound = 25;
function Product(name, filepath) {
  this.name = name;
  this.filepath = filepath;
  this.noShow = 0;
  this.noClicks = 0;
  this.instantView = " ";
  this.showColor = "red";
  this.clicksColor = "blue";
  allProducts.push(this);
  nameOfProduct.push(this.name);
  clicksColor.push(this.clicksColor);
  showColor.push(this.showColor);
}
let clickToNum = 0;
let firstImage;
let seconfImage;
let thirdImage;
allProducts.lastShown = [];

let sectionSrc = document.getElementById("imgSec");
let imgOne = document.getElementById("imgOne");
let imgTwo = document.getElementById("imgTwo");
let imgThree = document.getElementById("imgThree");
let viewR = document.getElementById("viewResult");

new Product("bag", "./assets/bag.jpg");
new Product("banana", "./assets/banana.jpg");
new Product("bathroom", "./assets/bathroom.jpg");
new Product("boots", "./assets/boots.jpg");
new Product("breakfast", "./assets/breakfast.jpg");
new Product("bubblegum", "./assets/bubblegum.jpg");
new Product("chair", "./assets/chair.jpg");
new Product("cthulhu", "./assets/cthulhu.jpg");
new Product("dog-duck", "./assets/dog-duck.jpg");
new Product("dragon", "./assets/dragon.jpg");
new Product("pen", "./assets/pen.jpg");
new Product("pet-sweep", "./assets/pet-sweep.jpg");
new Product("scissors", "./assets/scissors.jpg");
new Product("shark", "./assets/shark.jpg");
new Product("sweep", "./assets/sweep.png");
new Product("tauntaun", "./assets/tauntaun.jpg");
new Product("unicorn", "./assets/unicorn.jpg");
new Product("usb", "./assets/usb.gif");
new Product("water-can", "./assets/water-can.jpg");
new Product("wine-glass", "./assets/wine-glass.jpg");

function generateRandomNum() {
  return Math.floor(Math.random() * allProducts.length);
}

function getImageProduct() {
  firstImage = generateRandomNum();
  seconfImage = generateRandomNum();
  thirdImage = generateRandomNum();

  while (
    firstImage === seconfImage ||
    seconfImage === thirdImage ||
    firstImage === thirdImage ||
    allProducts.lastShown.includes(firstImage) ||
    allProducts.lastShown.includes(seconfImage) ||
    allProducts.lastShown.includes(thirdImage)
  ) {
    firstImage = generateRandomNum();
    seconfImage = generateRandomNum();
    thirdImage = generateRandomNum();
  }

  let filePathOne = allProducts[firstImage].filepath;
  let filePathTwo = allProducts[seconfImage].filepath;
  let filePathThree = allProducts[thirdImage].filepath;

  imgOne.setAttribute("src", filePathOne);
  imgTwo.setAttribute("src", filePathTwo);
  imgThree.setAttribute("src", filePathThree);

  allProducts[firstImage].noShow += 1;
  allProducts[seconfImage].noShow += 1;
  allProducts[thirdImage].noShow += 1;

  allProducts.lastShown[0] = firstImage;
  allProducts.lastShown[1] = seconfImage;
  allProducts.lastShown[2] = thirdImage;
}

sectionSrc.addEventListener("click", clickHandler);
viewR.addEventListener("click", getResults);

function getResults() {
  let ulList = document.getElementById("finalResult");
  for (let index = 0; index < allProducts.length; index++) {
    let lilist = document.createElement("li");
    lilist.textContent =
      allProducts[index].name +
      "  have  " +
      allProducts[index].noClicks +
      "  votes, and, was seen  " +
      allProducts[index].noShow +
      "  times ";
    ulList.appendChild(lilist);
    viewR.removeEventListener("click", getResults);
  }
}

function clickHandler() {
  if (clickToNum < 25) {
    let createEliment = event.target;
    let createElementId = createEliment.id;
    clickToNum += 1;

    if (createElementId === "imgOne") {
      allProducts[firstImage].noClicks += 1;
    }
    if (createElementId === "imgTwo") {
      allProducts[seconfImage].noClicks += 1;
    }
    if (createElementId === "imgThree") {
      allProducts[thirdImage].noClicks += 1;
    }
    getImageProduct();
  } else {
    clickArray();
    showArray();
    generateChart();
    parseLocalStorage();
    storeOurProducts();
    sectionSrc.removeEventListener("click", clickHandler);
  }
}

getImageProduct();

function generateChart() {
  let ctx = document.getElementById("myChart").getContext("2d");
  // eslint-disable-next-line no-undef
  new Chart(ctx, {
    type: "bar",
    data: {
      labels: nameOfProduct,
      datasets: [
        {
          label: "Num of Clicks",
          data: numOfClickArray,
          backgroundColor: clicksColor,
          borderColor: showColor,
          borderWidht: 1,
        },
        {
          label: "Num of Show",
          data: numOfShowArray,
          backgroundColor: showColor,
          borderColor: clicksColor,
          borderWidht: 1,
        },
      ],
    },
    Option: {
      scale: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
            },
          },
        ],
      },
    },
  });
}

function clickArray() {
  for (let index = 0; index < allProducts.length; index++) {
    numOfClickArray.push(allProducts[index].noClicks);
  }
}
function showArray() {
  for (let index = 0; index < allProducts.length; index++) {
    numOfShowArray.push(allProducts[index].noShow);
  }
}

function storeOurProducts() {
  // in order to save our array of objects into the localstorage we will need to formate our json object in json string
  let jsonStringProducts = JSON.stringify(allProducts);
  // creare a new property in our localstorage
  localStorage.setItem("products", jsonStringProducts);
}

function parseLocalStorage() {
  let previousProductsArr = JSON.parse(localStorage.getItem("products"));
  console.log(previousProductsArr);
  // this funtcion will update the newly created objects with the old literation values
  updateArr(previousProductsArr);
}

function updateArr(previousProductsArr) {
  for (let index = 0; index < allProducts.length; index++) {
    allProducts[index].noClicks = previousProductsArr[index].noClicks;
    allProducts[index].noShow = previousProductsArr[index].noShow;
  }
}
