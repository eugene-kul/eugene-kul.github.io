class Game {
	constructor() {
		this.alphabet = ['А','Б','В','Г','Д','Е','Ж','З','И','К'],
		this.isChackedPoint = false,
		this.isPlayerOrder = true,
		this.hitStatus = 'мимо',
		this.isTimeout = true,
		this.isHit = false,
		this.stage = '',
		this.n = 1,

		this.player = new Topology({
			name: 'Player',
			offsetX: 32,
			offsetY: 88,
		});

		this.camp = new Topology({
			name: 'Camp',
			offsetX: 692,
			offsetY: 88,
			hideShip: true,
			level: 3,
		});
		
		this.camp.randoming();
		this.player.randoming();

		requestAnimationFrame(x => this.tick(x))
	}

	tick(timestamp) {
		requestAnimationFrame(x => this.tick(x))
		clearCanvas();
		drawGrid();
		this.player.draw(context);
		this.camp.draw(context);
		if (this.stage === 'play') {
			gameTimer();
			addClsActive('order');
			addClsActive('steps');
			this.tickPlay(timestamp);
			rmvClsActive('btn-block');
			rmvClsActive('level-block');
			refreshText('game_status','Игра началась!');
			refreshText('level','Уровень сложности: '+this.camp.level);
			if (this.camp.isGameOver()) {
				refreshText('winner','Победил '+this.player.name+', поздравляем!');
				this.player.win++;
				refreshText('winPlayer',this.player.win);
			}
			else if (this.player.isGameOver()) {
				refreshText('winner','Победил '+this.camp.name+', попробуй еще раз.');
				this.camp.win++;
				refreshText('winCamp',this.camp.win);
			}
			if (this.stage === 'gameOver') {
				game.camp.hideShip = false;
				refreshText('level','Ты можешь сменить уровень сложности:');
				refreshText('game_status','Game Over!');
				addClsActive('level-block');
				addClsActive('gameOver');
				rmvClsActive('order');
				rmvClsActive('steps');
			}
		}
		game.isTimeout = true;
		mouse.pleft = mouse.left;
	}

	tickPlay(timestamp) {
		if (this.isPlayerOrder) {
			refreshText('order','твой ход');
			if (!this.camp.isPointUnder(mouse)) {
				return}
			const point = this.camp.getCoordinats(mouse);
			if (mouse.left && !mouse.pleft) {
				this.camp.addChecks(point);
				if (this.isCheckedPoint) {
					this.camp.update();
					gameConsoleLog(this.player.name,point,this.hitStatus);
					this.hitStatus = 'мимо';
					if (!this.camp.isShipUnderpoint(point)) {
						this.isPlayerOrder = false;
					}
				}
			}
		} else {
			if (this.camp.level === 1) {
				refreshText('order','Ход кампьютера');
				//setTimeout( function() {game.isTimeout = false;},500);
				//if (this.isTimeout) {return};
				let point = getRandomFrom(this.player.getUnknownFields());
				this.player.addChecks(point);
				this.player.update();
				gameConsoleLog(this.camp.name,point,this.hitStatus);
				this.hitStatus = 'мимо';
				if (!this.player.isShipUnderpoint(point)) {
					this.isPlayerOrder = true;
				}
			}
			if (this.camp.level !== 1) {
				refreshText('order','Ход кампьютера');
				//setTimeout( function() {game.isTimeout = false;},500);
				//if (this.isTimeout) {return};
				let point = 0;
				if (this.player.getCheckenFields().length === 0) {
					this.isHit = false;
				}
				if (this.isHit) {
					point = getRandomFrom(this.player.getCheckenFields());
				} else {
				point = getRandomFrom(this.player.getUnknownFields());
				}
				this.player.addChecks(point);
				this.player.update();
				gameConsoleLog(this.camp.name,point,this.hitStatus);
				this.hitStatus = 'мимо';
				if (!this.player.isShipUnderpoint(point)) {
					this.isPlayerOrder = true;
				}
				if (this.player.isShipUnderpoint(point)) {
					this.isHit = true;
				}
			}
		}
	}
}
