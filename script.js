// Get the elements from the document
var mango = document.getElementById("mango");
var score = document.getElementById("score");
var reset = document.getElementById("reset");
var save = document.getElementById("save");
var message = document.getElementById("message");
var mangoShape = document.getElementById("mango-shape");

// Initialize the score variable
var scoreValue = 0;

// Load the saved score from local storage if it exists
var savedScore = localStorage.getItem("savedScore");
if (savedScore) {
  scoreValue = parseInt(savedScore);
  score.textContent = scoreValue;
}

// Define a variable to track whether the mouse button is currently being pressed
var mousePressed = false;

// Define a function to move the mango to a random position
function moveMango() {
  // Get the window width and height
  var windowWidth = window.innerWidth;
  var windowHeight = window.innerHeight;

  // Get the mango width and height
  var mangoWidth = mango.width;
  var mangoHeight = mango.height;

  // Calculate the maximum possible x and y coordinates for the mango
  var maxX = windowWidth - mangoWidth;
  var maxY = windowHeight - mangoHeight;

  // Generate random x and y coordinates within the range
  var x = Math.floor(Math.random() * maxX);
  var y = Math.floor(Math.random() * maxY);

  // Set the mango position to the new coordinates
  mango.style.left = x + "px";
  mango.style.top = y + "px";
}

// Define a function to increase the score and update the display
function increaseScore() {
  // Increment the score value by one
  scoreValue++;

  // Update the score text content with the new value
  score.textContent = scoreValue;
}

// Define a function to reset the score and update the display
function resetScore() {
  // Set the score value to zero
  scoreValue = 0;

  // Update the score text content with the new value
  score.textContent = scoreValue;

  // Remove the saved score from local storage
  localStorage.removeItem("savedScore");
}

// Define a function to save the score to local storage
function saveScore() {
  // Save the score value as a string in local storage
  localStorage.setItem("savedScore", scoreValue.toString());

  // Show a message that says "The score has been saved"
  message.textContent = "The score has been saved";
  message.style.opacity = "1"; // Make it visible

  // Set a timeout function to hide the message after five seconds
  setTimeout(function() {
    message.style.opacity = "0"; // Make it invisible
  },5000);
}

// Define a function to change the mango shape
function changeMangoShape() {
  // Get the selected value from the mango shape selector
  var selectedValue = mangoShape.value;

// If the selected value is "custom", show the file upload input field
  if (selectedValue === "custom") {
    document.getElementById("upload-mango").style.display = "block";
    mango.src = ""; // Clear the mango image
  } else {
    document.getElementById("upload-mango").style.display = "none";
    mango.src = selectedValue; // Set the mango image to the selected value
  }
}

// Define a function to handle the custom mango upload
function handleMangoUpload(input) {
  // Check if a file was selected
  if (input.files && input.files[0]) {
    // Create a new FileReader object
    var reader = new FileReader();

    // Define a function to run when the file is loaded
    reader.onload = function(e) {
      // Set the mango image source to the loaded file
      mango.src = e.target.result;
    }

    // Read the selected file as a data URL
    reader.readAsDataURL(input.files[0]);
  }
}

// Call the changeMangoShape function when the mango shape selector value changes
mangoShape.addEventListener("change", changeMangoShape);

// Call the moveMango function when the mango is clicked
mango.addEventListener("mousedown", function() {
  mousePressed = true;
});

// Call the increaseScore function when the mouse button is released over the mango
mango.addEventListener("mouseup", function() {
  if (mousePressed) {
    increaseScore();
    moveMango();
  }
  mousePressed = false;
});

// Call the resetScore function when the reset button is clicked
reset.addEventListener("click", resetScore);

// Call the saveScore function when the save button is clicked
save.addEventListener("click", saveScore);

// Call the changeMangoShape function on page load to set the initial mango shape
changeMangoShape();
