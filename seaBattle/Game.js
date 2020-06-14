class Game {
	constructor() {
		this.stage = 'preparation',
		this.hitStatus = 'мимо',
		this.isPlayerOrder = true,
		this.isChackedPoint = false,
		this.isHit = false,
		this.alphabet = ['А','Б','В','Г','Д','Е','Ж','З','И','К'],
		this.n = 1,

		this.player = new Topology({
			name: 'Player',
			offsetX: 32,
			offsetY: 88,
			isPlayerReady: false,
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

		if (this.stage === 'preparation') {
			this.tickPreparation(timestamp);
		}
		else if (this.stage === 'play') {
			refreshText("level","Уровень сложности: "+this.camp.level);
			refreshText("game_status","Игра началась!");
			addClsActive('order');
			addClsActive('steps');
			timer();
			this.tickPlay(timestamp);
			rmvClsActive('btn-block');
			rmvClsActive('level-block');
			if (this.camp.isGameOver()) {
				this.stage = 'gameOver';
				refreshText("winner",'Победил '+this.player.name+', поздравляем!')
				refreshText("game_status","Game Over!");
				this.player.win++;
				refreshText("winPlayer",this.player.win);
			}
			else if (this.player.isGameOver()) {
				this.stage = 'gameOver';
				refreshText("winner",'Победил '+this.camp.name+', попробуй еще раз.')
				refreshText("game_status","Game Over!");
				this.camp.win++;
				refreshText("winCamp",this.camp.win);
			}
			if (this.stage === 'gameOver') {
				game.camp.hideShip = false;
				refreshText("level","Ты можешь сменить уровень сложности:");
				addClsActive('level-block');
				rmvClsActive('order');
				addClsActive('gameOver');
				rmvClsActive('steps');
			}
		}
		mouse.pleft = mouse.left;
	}

	tickPreparation(timestamp) {
		if (!this.player.isPointUnder(mouse)) {
			return}
		const shipSizes = [4,3,3,2,2,2,1,1,1,1];
		const shipSize = shipSizes[this.player.ships.length];
		const coordinate = this.player.getCoordinats(mouse);
		const ship = {
			x: coordinate.x,
			y: coordinate.y,
			direct: mouse.s ? 1 : 0,
			size: shipSize
		}
		if (!this.player.canStay(ship)) {
			return}
		this.player.drawShips(context, ship);
		if (mouse.left && !mouse.pleft) {
			this.player.addShips(ship);
			if (this.player.ships.length === 10) {
				this.player.isPlayerReady = true;
			}
		}
	}

	tickPlay(timestamp) {
		if (this.isPlayerOrder) {
			refreshText("order","твой ход");
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
				let point = getRandomFrom(this.player.getUnknownFields());
				refreshText("order","Ход кампьютера");
				this.player.addChecks(point);
				this.player.update();
				gameConsoleLog(this.camp.name,point,this.hitStatus);
				this.hitStatus = 'мимо';
				if (!this.player.isShipUnderpoint(point)) {
					this.isPlayerOrder = true;
				}
			}
			if (this.camp.level === 2 || this.camp.level === 3) {
				let point = 0;
				if (this.player.getCheckenFields().length == 0) {
					this.isHit = false;
				}
				if (this.isHit) {
					point = getRandomFrom(this.player.getCheckenFields());
					
				} else {
				point = getRandomFrom(this.player.getUnknownFields());
				}
				refreshText("order","Ход кампьютера");
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