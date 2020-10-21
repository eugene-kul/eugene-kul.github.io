class Controller {
	constructor(game,view) {
		this.game = game;
		this.view = view;
		this.intervalId = null;

		document.addEventListener('keydown', this.handleKeyDown.bind(this));
		document.addEventListener('keyup', this.handleKeyUp.bind(this));
		this.view.renderMainScreen(this.game.getState());
	}

	playSound(id) {
		if (!isSound) {return}
		let vol = 60;
		let sound = document.querySelector('[id^='+id+']');
		sound.volume=vol/100;
		sound.pause();
		sound.currentTime = 0;
		sound.play();
	}

	stopSound() {
		let sounds = document.querySelectorAll('[id^=sound]');
		for (let item of sounds) {item.volume = 0;}
	}

	update() {
		this.game.movePieceDown();
		this.updateView();
	}

	updateView() {
		const state = this.game.getState();
		if (state.isGameOver) {
			isPlaying = false;
			this.gameOver();
		}
		else if (!isPlaying) {
			
		} else {
			this.view.renderMainScreen(state);
		}
		this.updatePanel(state.level,state.score,state.lines);
	}

	updatePanel(level,score,lines) {
		if (score>hiScore) {hiScore = score}
		levelInfo.textContent = level;
		scoreInfo.textContent = score;
		linesInfo.textContent = lines;
		hiScoreInfo.textContent = hiScore;
	}

	play() {
		if (playStartMusic) {
			this.playSound('sound-startMusic');
			playStartMusic = false;
		}
		isPlaying = true;
		this.startTime();
		this.updateView();
	}

	pause() {
		isPlaying = false;
		this.stopTimer();
		this.updateView();
	}

	gameOver() {
		this.stopSound();
		this.playSound('sound-gameOver');
		const state = this.game.getState();
		startPage.firstElementChild.innerHTML = `GAME OVER!<br> SCORE:${state.score} <p>PRESS ENTER TO RESTART</p>`;
		startPage.classList.remove('hide');
		let x = 0;
		let y = 0;
		endInterval = setInterval(()=> {
			this.view.renderFieldGameOver(x,y);
			x++;
			if (x>9) {x=0;y++}
			if (y<0) {clearInterval(endInterval);endInterval=null}
		},10);
	}

	resetGame() {
		clearInterval(endInterval);
		endInterval=null;
		this.stopSound();
		this.game.resetGame();
		this.play();
	}

	startTime() {
		const speed = 1000 - this.game.getState().level*100;
		if (!this.intervalId) {
			this.intervalId = setInterval(() => {
				this.update();
			},speed > 0 ? speed : 100);
		}
	}

	stopTimer() {
		if (this.intervalId) {
			clearInterval(this.intervalId);
			this.intervalId = null;
		}
	}

	handleKeyDown(event) {
		const state = this.game.getState();
		switch (event.keyCode) {
			case 13: //enter
			this.playSound('sound-create');
				if (state.isGameOver) {
					startPage.classList.add('hide');
					startPage.firstElementChild.innerHTML = startPageHTML;
					this.resetGame();
				} else if (isPlaying) {
					startPage.classList.add('pause');
					startPage.classList.remove('start');
					startPage.classList.remove('hide');
					this.pause();
				} else {
					startPage.classList.add('hide');
					this.play();
				}
				break;
			case 27: //esc
				this.playSound('sound-create');
				if (state.isGameOver) {
					this.resetGame();
				} else if (isPlaying) {
					startPage.classList.add('pause');
					startPage.classList.remove('start');
					startPage.classList.remove('hide');
					this.pause();
				} else {
					startPage.classList.add('hide');
					this.play();
				}
				break;
			case 37: //left
				if (isPlaying) {
					this.game.movePieceLeft();
					this.updateView();
				}
				break;
			case 38: //up
				if (isPlaying) {
					this.game.rotatePiece();
					this.updateView();
				}
				break;
			case 39: //right
				if (isPlaying) {
					this.game.movePieceRight();
					this.updateView();
				}
				break;
			case 40: //down
				if (isPlaying) {
					this.stopTimer();
					this.game.movePieceDown();
					this.updateView();
				}
				break;
		}
	}

	handleKeyUp() {
		switch (event.keyCode) {
			case 40: //down
				if (isPlaying) {
					this.startTime();
				}
				break;
		}
	}
}