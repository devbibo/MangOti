// Get the necessary elements from the HTML code
const mango = document.getElementById("mango");
const score = document.getElementById("score");
const resetBtn = document.getElementById("reset");
const saveBtn = document.getElementById("save");
const mangoShape = document.getElementById("mango-shape");

// Define the initial score and mango position
let currentScore = localStorage.getItem("mangotiScore") || 0;
let mangoX = 0;
let mangoY = 0;
let mangoSrc = localStorage.getItem("mangotiMangoSrc") || "";

// Set the mango image source based on the selected mango shape or the saved source
if (mangoSrc) {
  mango.src = mangoSrc;
} else {
  mango.src = mangoShape.value;
}

// Set the score based on the saved score
score.textContent = currentScore;

// Set the mango position based on the saved position or randomly place it
if (localStorage.getItem("mangotiMangoX") && localStorage.getItem("mangotiMangoY")) {
  mangoX = parseInt(localStorage.getItem("mangotiMangoX"));
  mangoY = parseInt(localStorage.getItem("mangotiMangoY"));
  mango.style.left = mangoX + "px";
  mango.style.top = mangoY + "px";
} else {
  placeMango();
}

// Set the mango image source based on the selected mango shape
mangoShape.addEventListener("change", function() {
  if (mangoShape.value === "custom") {
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = "image/*";
    fileInput.addEventListener("change", function() {
      const file = fileInput.files[0];
      const reader = new FileReader();
      reader.addEventListener("load", function() {
        mango.src = reader.result;
        localStorage.setItem("mangotiMangoSrc", reader.result);
      });
      reader.readAsDataURL(file);
    });
    fileInput.click();
  } else {
    mango.src = mangoShape.value;
    localStorage.setItem("mangotiMangoSrc", mangoShape.value);
  }
});

// Define a function to randomly place the mango on the screen
function placeMango() {
  mangoX = Math.floor(Math.random() * (window.innerWidth - mango.width));
  mangoY = Math.floor(Math.random() * (window.innerHeight - mango.height));
  mango.style.left = mangoX + "px";
  mango.style.top = mangoY + "px";
  localStorage.setItem("mangotiMangoX", mangoX);
  localStorage.setItem("mangotiMangoY", mangoY);
}

// Define a function to handle clicking on the mango
function mangoClicked() {
  currentScore++;
  score.textContent = currentScore;
  placeMango();
}

// Add an event listener for clicking on the mango
mango.addEventListener("click", mangoClicked);

// Add an event listener for clicking the reset button
resetBtn.addEventListener("click", function() {
  currentScore = 0;
  score.textContent = currentScore;
  localStorage.setItem("mangotiScore", currentScore);
});

// Add an event listener for clicking the save button
saveBtn.addEventListener("click", function() {
  localStorage.setItem("mangotiScore", currentScore);
  localStorage.setItem("mangotiMangoSrc", mango.src);
  localStorage.setItem("mangotiMangoX", mangoX);
  localStorage.setItem("mangotiMangoY", mangoY);
  alert("Score and mango data saved!");
});

// Call the placeMango function to place the initial mango
placeMango();
