// Variables for the DOM elements
const word = document.getElementById("word");
const text = document.getElementById("text");
const scoreEl = document.getElementById("score");
const timeEl = document.getElementById("time");
const endgameEl = document.getElementById("end-game-container");
const settings = document.getElementById("settings");
const settingsForm = document.getElementById("settings-form");
const settingsBtn = document.getElementById("settings-btn");
const difficultySelect = document.getElementById("difficulty");
// Array
const words = [
  "dependent",
  "dog",
  "superficial",
  "admit",
  "juice",
  "javascript",
  "developer",
  "airplane",
  "great",
  "fun",
  "manipulate",
  "cat",
  "transition",
  "school",
  "computer",
  "programming",
  "drag",
  "loving",
  "north",
];
//Initializing word
let randomWord;
//Initializing score
let score = 0;
//Initializing time
let time = 10;
// Initializing difficulty
let difficulty = localStorage.getItem('difficulty') !== null ? localStorage.getItem('difficulty') : 'medium';

// Initialize time based on difficulty
const difficultyTimeMap = {
    easy: 15,
    medium: 10,
    hard: 5
};

time = difficultyTimeMap[difficulty];
difficultySelect.value = difficulty; // Set initial select value

// Global variable for the timer interval
let timeInterval = setInterval(updateTime, 1000);

// --- PART 1: Word, Score, and Input Logic ---

// Function to get a random word from the array
function getRandomWord() {
  return words[Math.floor(Math.random() * words.length)];
}

// Create a addWordToDOM function that will update the "word" element
function addWordToDOM() {
  randomWord = getRandomWord();
  word.innerHTML = randomWord;
}

// Create a updateScore function that will increment score by +1
function updateScore() {
  score++;
  scoreEl.innerHTML = score;
}

// Event listener for the "text" element
text.addEventListener('input', e => {
  const insertedText = e.target.value;

  if (insertedText === randomWord) {
    // Call updateScore
    updateScore();

    // give the user a new word by calling addWordToDOM
    addWordToDOM();

    // increment time by 5 seconds (or more/less based on difficulty)
    let timeBonus = 5;
    if (difficulty === 'easy') {
        timeBonus = 5;
    } else if (difficulty === 'medium') {
        timeBonus = 3;
    } else { // hard
        timeBonus = 2;
    }
    
    time += timeBonus;
    updateTime(); // Immediately update display

    // reset the input to empty string
    e.target.value = '';
  }
});

// --- PART 2: Timer and Game Over Logic ---

// Create a updateTime function using the setInterval() method
function updateTime() {
  // Decrement -1 from the timer
  time--;
  timeEl.innerHTML = `${time}s`;

  // Stop the timer when it reaches zero.
  if (time === 0) {
    clearInterval(timeInterval);
    // Create a gameOver function that will display the end-game-container
    gameOver();
  }
}

// Create a gameOver function that will display the end-game-container
function gameOver() {
  endgameEl.innerHTML = `
    <h1>Time ran out!</h1>
    <p>Your final score is: ${score}</p>
    <button onClick="location.reload()">Play Again</button>
  `;

  // Display the end-game-container (using JS to change style)
  endgameEl.style.display = 'flex';
}

// Start game by adding the first word
addWordToDOM();

// --- PART 3, OPTIONAL/EXTRA: Settings Logic ---

// Add an event listener to the settings button that will hide/show the settings
settingsBtn.addEventListener('click', () => {
  settings.classList.toggle('hide');
  text.focus(); // Keep focus on input for better UX
});

// Add an event listener for the settings form so that you can change the difficulty
settingsForm.addEventListener('change', e => {
    difficulty = e.target.value;
    localStorage.setItem('difficulty', difficulty);
    
    // Set time depending on difficulty
    time = difficultyTimeMap[difficulty];
    timeEl.innerHTML = `${time}s`;
    
    // Restart game logic for an immediate change effect
    score = 0;
    scoreEl.innerHTML = score;
    addWordToDOM();
    text.value = '';

    // Reset and restart the timer with the new time
    clearInterval(timeInterval);
    timeInterval = setInterval(updateTime, 1000);
});