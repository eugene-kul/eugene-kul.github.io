export default class Controller {
	constructor(game,view) {
		this.game = game;
		this.view = view;
		this.isPlaying = false;
		this.intervalId = null;

		document.addEventListener('keydown', this.handleKeyDown.bind(this));
		document.addEventListener('keyup', this.handleKeyUp.bind(this));
		this.view.renderStartScreen();
	}

	update() {
		this.game.movePieceDown();
		this.updateView();
	}

	updateView() {
		const state = this.game.getState();
		if (state.isGameOver) {
			this.isPlaying = false;
			this.view.renderEndScreen(state);
		}
		else if (!this.isPlaying) {
			this.view.renderPauseScreen();
		} else {
			this.view.renderMainScreen(state);
		}
		
	}

	play() {
		this.isPlaying = true;
		this.startTime();
		this.updateView();
	}

	pause() {
		this.isPlaying = false;
		this.stopTimer();
		this.updateView();
	}

	resetGame() {
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

	handleKeyDown() {
		const state = this.game.getState();
		switch (event.keyCode) {
			case 13: //enter
				if (state.isGameOver) {
					this.resetGame();
				} else if (this.isPlaying) {
					this.pause();
				} else {
					this.play();
				}
				break;
			case 37: //left
				if (this.isPlaying) {
					this.game.movePieceLeft();
					this.updateView();
				}
				break;
			case 38: //up
				if (this.isPlaying) {
					this.game.rotatePiece();
					this.updateView();
				}
				break;
			case 39: //right
				if (this.isPlaying) {
					this.game.movePieceRight();
					this.updateView();
				}
				break;
			case 40: //down
				if (this.isPlaying) {
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
				if (this.isPlaying) {
					this.startTime();
				}
				break;
		}
	}
}