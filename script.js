// Screens
const startScreen = document.getElementById('start-screen');
const gameScreen = document.getElementById('game-screen');
const gameoverScreen = document.getElementById('gameover-screen');
const logo = document.querySelector('.logo');
const resetBtn =document.querySelector('#resetBtn')

// Timer
let element = document.getElementById('timer');
const timerDiv = document.getElementById('js_timer')
const timer = document.getElementById('timer')
let timeSecond = 60;

const cards = document.querySelectorAll('.memory-card');
const button = document.getElementById('redbutton');

// music
let mySound = new Audio('./music/dwtd.mp3')
mySound.volume = 0.2;
let gameOverSound = new Audio('./music/game-over.mp3')


// Functions variables
let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;


function startGame(){
if (gameScreen.style.display === 'none'){
startTimer();
mySound.play();

gameScreen.style.display = 'flex'
startScreen.style.display = 'none'
button.style.visibility = 'hidden'
timerDiv.style.display ='flex'
gameoverScreen.style.display = 'none'
logo.style.visibility = 'hidden'
resetBtn.style.display = 'flex'
}
console.log('The game has start');
}


// Timer

// displayTime(timeSecond);
function startTimer(){
const countDown = setInterval(() => {
timeSecond--;
displayTime(timeSecond);
if(timeSecond === 0){
gameOver()
console.log('gameover');
}
if (timeSecond <= 0 || timeSecond < 1){
clearInterval(countDown)
}
}, 1000);
}




function displayTime(value){
const sec = parseInt(value, 10); // convert value to number if it's string
let hours   = Math.floor(sec / 3600); // get hours
let minutes = Math.floor((sec - (hours * 3600)) / 60); // get minutes
let seconds = sec - (hours * 3600) - (minutes * 60); //  get seconds
// add 0 if value < 10; Example: 2 => 02
if (hours   < 10) {hours   = "0"+hours;}
if (minutes < 10) {minutes = "0"+minutes;}
if (seconds < 10) {seconds = "0"+seconds;}
timer.innerHTML = minutes+':'+seconds; // Return is HH : MM : SS

}


function gameOver(){
gameoverScreen.style.display = 'flex';
gameScreen.style.display = 'none';
timerDiv.style.display ='none';
document.body.style.backgroundColor = "#6E6288";
mySound.pause();
gameOverSound.play();
timeSecond === 180;
}

//Memory Game

function flipCard(){
if(lockBoard)return;
if(this === firstCard) return;
this.classList.add('flip');
if(!hasFlippedCard){
//first click
hasFlippedCard = true;
firstCard = this;
return
}
//second click
secondCard = this;
checkForMatch();
}


function checkForMatch(){
if(firstCard.dataset.cardimg === secondCard.dataset.cardimg){
disableCards()
}else{
unflipCards() 
}
}


function disableCards(){
firstCard.removeEventListener('click', flipCard);
secondCard.removeEventListener('click', flipCard);

resetBoard();
}


function unflipCards(){
lockBoard = true;  

setTimeout(() => {
firstCard.classList.remove('flip');
secondCard.classList.remove('flip');

resetBoard(); 
}, 1500);
}

function resetBoard (){
[hasFlippedCard,lockBoard] = [false, false];
[firstCard, secondCard] = [null, null];
}

(function suffle(){   
cards.forEach(card => {
let randomPos = Math.floor(Math.random()*12);
card.style.order = randomPos;
console.log('The cards are shuffled');
});    
})()


resetBtn.addEventListener("click",() => {
    location.reload();
})

cards.forEach(card => card.addEventListener("click", flipCard));

