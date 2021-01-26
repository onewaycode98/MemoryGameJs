var cards = document.querySelectorAll(".memory-card");
var restartIcon = document.querySelector(".fa-undo");
var firstStar = document.getElementById("star-rating").childNodes[1];
var secondStar = document.getElementById("star-rating").childNodes[3];
var thirdStar = document.getElementById("star-rating").childNodes[5];

var moves = 0;
var hasFlippedCard = false;
var lockBoard = false;
var firstCard;
var secondCard;
var timer;
var clicks = 0;



function flipCard() {
    clicks++;
   clicks === 1 ? timeCounter() : '';
    if (lockBoard) return;
    if (this === firstCard)
     return;

    this.classList.add("flip")

    if (!hasFlippedCard) {
        hasFlippedCard = true;
        firstCard = this;
        return;
    }
    secondCard = this;
    checkAnswer();
    moves++;
    document.querySelector("#moves").innerHTML = moves;
    starRating();
    checkMatches();
}

function lockCard() {
    lockBoard = true;
    setTimeout(() => {
        firstCard.removeEventListener('click', flipCard);
        secondCard.removeEventListener('click', flipCard);
        resetBoard();
    }, 600);
}

function unflipCard() {
    lockBoard = true;
    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');
        resetBoard();
    }, 1500);
}

function checkAnswer() {
    var matched = firstCard.dataset.framework === secondCard.dataset.framework;
    if (matched) {
        goodChoice();
        lockCard();
    } else {
        wrongChoice();
        unflipCard();
    };
    
}

function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

//Set random position
function shuffle() {
    cards.forEach(card => {
        let randomPos = Math.floor(Math.random() * 16);
        card.style.order = randomPos;
    });
};

//Change color for green -> good choice
function goodChoice() {
    setTimeout(() => {
        firstCard.childNodes[1].classList.add("success");
        secondCard.childNodes[1].classList.add("success");
    }, 500);
}

//Change color for red -> wrong choice
function wrongChoice() {
    setTimeout(() => {
        firstCard.childNodes[1].classList.add("wrong");
        secondCard.childNodes[1].classList.add("wrong");
    }, 500);

    setTimeout(() => {
        firstCard.childNodes[1].classList.remove("wrong");
        secondCard.childNodes[1].classList.remove("wrong");
    }, 1500);
}

function init() {

    cards.forEach(card => {
        card.addEventListener("click", flipCard);
    });

    document.getElementById("timer").innerHTML = "00:00"; 
    moves = 0;
    document.querySelector("#moves").innerHTML = moves;

    firstStar.classList.add('yellow');
    thirdStar.classList.add('yellow');
    secondStar.classList.add('yellow');

    shuffle();
}

//Restart game
restartIcon.addEventListener("click", function () {
    cards.forEach(card => {
        card.classList.remove("flip");
        card.childNodes[1].classList.remove("success")
    });

    clicks = 0;
    clearInterval(timer);
    setTimeout(() => {
        init();
    }, 500);

});

//Star rating
function starRating() {
    if (moves >= 25) {
        firstStar.classList.remove('yellow');
        thirdStar.classList.remove('yellow');
        secondStar.classList.remove('yellow');
    } else if (moves >= 18 && moves <= 24) {
        thirdStar.classList.remove('yellow');
        secondStar.classList.remove('yellow');
    } else if (moves >= 12 && moves <= 16) {
        thirdStar.classList.remove('yellow');

    }
}

//Date
function timeCounter() {
var startTime= new Date();

timer = setInterval(() => {
    var now = new Date();
    let elapsed = now - startTime;

    let minutes = Math.floor((elapsed % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((elapsed % (1000 * 60)) / 1000);

    if(seconds < 10) {
        seconds = "0" + seconds;
    }
    if(minutes < 10) {
        minutes = "0" + minutes;
    }
    
    document.getElementById("timer").innerHTML = minutes + ":" + seconds; 
}, 1000);
}


function checkMatches() {
    if(cards.length === document.querySelectorAll(".memory-card.flip").length){
        clearInterval(timer);
    }
}

init();