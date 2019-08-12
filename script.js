const timeCounter = document.getElementById('time-counter');
const attemptsCounter = document.getElementById('attempts-counter');
const cards = document.querySelectorAll('.card');

let hasFlippedCard = false;
let firstCard, secondCard;
let attempts = 0;
let lockBoard = false;
let startTimer = false;
let matches = 0;

function flipCard() {
	if (!startTimer) timer();
	if (lockBoard) return;
	if (this === firstCard) return;
	this.classList.add('flip');
	if (!hasFlippedCard) {
		firstCard = this;
		hasFlippedCard = true;
	} else {
		secondCard = this;
		attempt();
		if (!matchCards(firstCard, secondCard)) {
			unflipCards(firstCard, secondCard);
		} else {
			disableCards();
		}
	}
}

function matchCards(first, second) {
	if (first.dataset.card === second.dataset.card) {
		matches++;
		return true;
	} else {
		return false;
	}
}

function disableCards() {
	firstCard.removeEventListener('click', flipCard);
	secondCard.removeEventListener('click', flipCard);
	resetBoard();
}

function unflipCards(first, second) {
	lockBoard = true;
	setTimeout(() => {
		first.classList.remove('flip');
		second.classList.remove('flip');
		resetBoard();
	}, 1200);
}

function attempt() {
	attempts++;
	attemptsCounter.innerHTML = attempts;
}

function timer() {
	startTimer = true;
	let seconds = 0;
	let minutes = 0;
	let tCounter = setInterval(() => {
		if (matches == 6) clearInterval(tCounter);
		if (seconds < 60) {
			seconds++;
		} else {
			minutes++;
			seconds = 0;
		}
		timeCounter.innerHTML =
			(minutes < 10 ? '0' + minutes : minutes) + ':' + (seconds < 10 ? '0' + seconds : seconds);
	}, 1000);
}

function resetBoard() {
	[ hasFlippedCard, lockBoard ] = [ false, false ];
	[ firstCard, secondCard ] = [ null, null ];
}

(function shuffle() {
	cards.forEach((card) => {
		let randomPos = Math.floor(Math.random() * 12);
		card.style.order = randomPos;
	});
})();

cards.forEach((card) => card.addEventListener('click', flipCard));
