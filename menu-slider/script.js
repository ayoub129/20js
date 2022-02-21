const toggle = document.getElementById("toggle");
const closed = document.getElementById("close");
const opening = document.getElementById("open");
const modal = document.getElementById("modal");

//  Toggle nav
toggle.addEventListener("click", () => {
  document.body.classList.toggle("show-nav");
});

// show modal
opening.addEventListener("click", () => {
  modal.classList.add("show-modal");
});

// hide  modal
closed.addEventListener("click", () => {
  modal.classList.remove("show-modal");
});

// hide  modal on outside click
window.addEventListener("click", (e) => {
  e.target == modal ? modal.classList.remove("show-modal") : false;
});
