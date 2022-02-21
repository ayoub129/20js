const wordEl = document.getElementById("word");
const wrongLettersEl = document.getElementById("wrong-letters");
const playAgainbtn = document.getElementById("play-again");
const popup = document.getElementById("popup-container");
const notification = document.getElementById("notification-container");
const finalMsg = document.getElementById("final-message");

const figureParts = document.querySelectorAll(".figure-part");

const words = ["tiktok", "folowus", "programing"];

let selectedWord = words[Math.floor(Math.random() * words.length)];

const correctLetters = [];
const wrongLetters = [];

// show the hidden word
function displayWord() {
  wordEl.innerHTML = `${selectedWord
    .split("")
    .map(
      (letter) =>
        `<span class='letter'> ${
          correctLetters.includes(letter) ? letter : ""
        } </span>`
    )
    .join("")}
    `;

  const innerword = wordEl.innerText.replace(/\n/g, "");

  if (innerword === selectedWord) {
    finalMsg.innerText = "Congratulation! You Won!";
    popup.style.display = "flex";
  }
}

// update the wrong letters

function updateWrongLettersEl() {
  // show wrong letters
  wrongLettersEl.innerHTML = `
    ${wrongLetters.length > 0 ? "<p>Wrong</p>" : ""}
    ${wrongLetters.map((letter) => `<span>${letter}</span>`)}`;

  // display parts
  figureParts.forEach((part, index) => {
    const errors = wrongLetters.length;

    if (index < errors) {
      part.style.display = "block";
    } else {
      part.style.display = "none";
    }
  });

  //   check if lost
  if (wrongLetters.length === figureParts.length) {
    finalMsg.innerText = "Unfortuntely you lost. ";
    popup.style.display = "flex";
  }
}

// show notification
function showNotification() {
  notification.classList.add("show");

  setTimeout(() => {
    notification.classList.remove("show");
  }, 3000);
}

//  keydown letter press

window.addEventListener("keydown", (e) => {
  if (e.keyCode >= 65 && e.keyCode <= 90) {
    const letter = e.key.toLowerCase();

    if (selectedWord.includes(letter)) {
      if (!correctLetters.includes(letter)) {
        correctLetters.push(letter);
        displayWord();
      } else {
        showNotification();
      }
    } else {
      if (!wrongLetters.includes(letter)) {
        wrongLetters.push(letter);

        updateWrongLettersEl();
      } else {
        showNotification();
      }
    }
  }
});

// play Again btn
playAgainbtn.addEventListener("click", () => {
  // empty arrays
  correctLetters.splice(0);
  wrongLetters.splice(0);

  selectedWord = words[Math.floor(Math.random() * words.length)];

  displayWord();

  updateWrongLettersEl();

  popup.style.display = "none";
});

displayWord();
