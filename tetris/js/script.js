let screenW = 320;
let screenH = 640;
let column = 10;
let row = 20;
let isPlaying = false;
let endInterval = null;
let hiScore = 0;
let isSound = true;
let playStartMusic = true;

let levelInfo = document.querySelector('#tetris-level .value');
let scoreInfo = document.querySelector('#tetris-score .value');
let hiScoreInfo = document.querySelector('#tetris-hi-score .value');
let linesInfo = document.querySelector('#tetris-lines .value');
let tetrisField = document.querySelector('#tetris');
let startPage = document.querySelector('#startPage');
let soundBtn = document.querySelector('#sfx-btn');
let startPageHTML = startPage.firstElementChild.innerHTML;

soundBtn.addEventListener('click', function() {
	controller.playSound('sound-create');
	this.classList.toggle('active');
	if (this.classList.contains('active')) {
		isSound = true;
	} else {
		isSound = false;
		controller.stopSound();
	}
})