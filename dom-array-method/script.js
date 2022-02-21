const main = document.getElementById("main");
const addUserBtn = document.getElementById("add-user");
const doubleBtn = document.getElementById("double");
const showMillionairesBtn = document.getElementById("show-millionaires");
const sortBtn = document.getElementById("sort");
const calculateWealthBtn = document.getElementById("calculate-wealth");

let data = [];

getRandomUser();

// fetch random user and add money
async function getRandomUser() {
  const res = await fetch("https://randomuser.me/api");
  const data = await res.json();
  const user = data.results[0];

  const newUser = {
    name: `${user.name.first} ${user.name.last}`,
    money: Math.floor(Math.random() * 1000000),
  };

  addData(newUser);
}

// double money
function double() {
  data = data.map((user) => {
    return { ...user, money: user.money * 2 };
  });

  updateDom();
}

// sortUsers
function sortUsers() {
  data.sort((a, b) => b.money - a.money);
  updateDom();
}

// showMillionaires
function showMillionaires() {
  data = data.filter((user) => {
    return user.money > 1000000;
  });

  updateDom();
}

// calculateWealth
function calculateWealth() {
  const wealth = data.reduce((acc, user) => (acc += user.money), 0);

  const wealthEl = document.createElement("div");
  wealthEl.innerHTML = `<h3>Total Wealth: <strong>${formatMoney(
    wealth
  )} </strong> `;

  main.appendChild(wealthEl);
}

//  add new obj to data arr
function addData(obj) {
  data.push(obj);
  updateDom();
}

// update the Dom
function updateDom(provideData = data) {
  // clear main div
  main.innerHTML = " <h2><strong>Person</strong> Wealth</h2>";

  provideData.forEach((person) => {
    const element = document.createElement("div");
    element.classList.add("person");
    element.innerHTML = `<strong>${person.name} </strong> ${formatMoney(
      person.money
    )}`;

    main.appendChild(element);
  });
}

// formate number as money
function formatMoney(number) {
  return "$" + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,");
}

// Event Listeners
addUserBtn.addEventListener("click", getRandomUser);
doubleBtn.addEventListener("click", double);
sortBtn.addEventListener("click", sortUsers);
showMillionairesBtn.addEventListener("click", showMillionaires);
calculateWealthBtn.addEventListener("click", calculateWealth);
