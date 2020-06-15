class Topology {
	constructor(param) {
		this.name = param.name;
		this.level = param.level;
		this.win = param.win || 0;
		this.offsetX = param.offsetX;
		this.offsetY = param.offsetY;
		this.hideShip = param.hideShip || false;

		this.ships = [];
		this.checks = [];
		this.isChecks = [];
		this.injuries = [];
		this.deadShips = [];
		//для разработчика
		this.isChecksF = [];
		this.isChecksF2 = [];
		//==============
	}

	//добавление обьектов в массив
	addShips(...ships) {
		for(const ship of ships) {
			if (!this.ships.includes(ship)) {
				this.ships.push(ship);
			}
		}
		return this
	}

	//добавление обьектов в массив
	addDeadShips(...ships) {
		for(const ship of ships) {
			if (!this.deadShips.includes(ship)) {
				this.deadShips.push(ship);
			}
		}
		return this
	}

	//добавление обьектов в массив
	addChecks(...checks) {
		if (game.isPlayerOrder) {
			const coordinate = this.getCoordinats(mouse);
			for (const unk of this.getUnknownFields()) {
				if (unk.x === coordinate.x && unk.y === coordinate.y) {
					game.isCheckedPoint = true;
					for(const check of checks) {
						if (!this.checks.includes(check)) {
							this.checks.push(check);
						}
					}
				}
			}
		}
		else {
			game.isCheckedPoint = false;
			for(const check of checks) {
				if (!this.checks.includes(check)) {
					if (check.x<=9 && check.y<=9 && check.x>=0 && check.y>=0) {
						this.checks.push(check);
					}
				}
			}
		}
		return this;
	}

	//добавление обьектов в массив
	addIsChecks(...isChecks) {
		if (game.isPlayerOrder) {
			const coordinate = this.getCoordinats(mouse);
			for (const unk of this.getUnknownFields()) {
				if (unk.x === coordinate.x && unk.y === coordinate.y) {
					game.isCheckedPoint = true;
					for(const isCheck of isChecks) {
						if (!this.isChecks.includes(isCheck)) {
							if (isCheck.x<=9 && isCheck.y<=9 && isCheck.x>=0 && isCheck.y>=0) {
								if (unk.x === isCheck.x && unk.y === isCheck.y) {
									this.isChecks.push(isCheck);
								}
							}
						}
					}
				}
			}
		}
		else {
			game.isCheckedPoint = false;
			for(const isCheck of isChecks) {
				if (!this.isChecks.includes(isCheck)) {
					for (let unk of this.getUnknownFields()) {
						if (isCheck.x<=9 && isCheck.y<=9 && isCheck.x>=0 && isCheck.y>=0) {
							if (unk.x === isCheck.x && unk.y === isCheck.y) {
								this.isChecks.push(isCheck);
							}
						}
					}
				}
			}
		}
		return this;
	}

	//для разработчика дублирование точек для отрисовки
	addIsChecksF(...isChecksF) {
		if (game.isPlayerOrder) {
			const coordinate = this.getCoordinats(mouse);
			for (const unk of this.getUnknownFields()) {
				if (unk.x === coordinate.x && unk.y === coordinate.y) {
					game.isCheckedPoint = true;
					for(const isCheckF of isChecksF) {
						if (!this.isChecksF.includes(isCheckF)) {
							if (isCheckF.x<=9 && isCheckF.y<=9 && isCheckF.x>=0 && isCheckF.y>=0) {
								if (unk.x === isCheckF.x && unk.y === isCheckF.y) {
									this.isChecksF.push(isCheckF);
								}
							}
						}
					}
				}
			}
		}
		else {
			game.isCheckedPoint = false;
			for(const isCheckF of isChecksF) {
				if (!this.isChecksF.includes(isCheckF)) {
					for (let unk of this.getUnknownFields()) {
						if (isCheckF.x<=9 && isCheckF.y<=9 && isCheckF.x>=0 && isCheckF.y>=0) {
							if (unk.x === isCheckF.x && unk.y === isCheckF.y) {
								this.isChecksF.push(isCheckF);
							}
						}
					}
				}
			}
		}
		return this;
	}
	addIsChecksF2(...isChecksF2) {
		if (game.isPlayerOrder) {
			const coordinate = this.getCoordinats(mouse);
			for (const unk of this.getUnknownFields()) {
				if (unk.x === coordinate.x && unk.y === coordinate.y) {
					game.isCheckedPoint = true;
					for(const isCheckF2 of isChecksF2) {
						if (!this.isChecksF2.includes(isCheckF)) {
							if (isCheckF2.x<=9 && isCheckF2.y<=9 && isCheckF2.x>=0 && isCheckF2.y>=0) {
								if (unk.x === isCheckF2.x && unk.y === isCheckF2.y) {
									this.isChecksF2.push(isCheckF);
								}
							}
						}
					}
				}
			}
		}
		else {
			game.isCheckedPoint = false;
			for(const isCheckF2 of isChecksF2) {
				if (!this.isChecksF2.includes(isCheckF2)) {
					for (let unk of this.getUnknownFields()) {
						if (isCheckF2.x<=9 && isCheck2F.y<=9 && isCheckF2.x>=0 && isCheckF2.y>=0) {
							if (unk.x === isCheckF2.x && unk.y === isCheck2F.y) {
								this.isChecksF2.push(isCheckF);
							}
						}
					}
				}
			}
		}
		return this;
	}
	//=============

	draw(context) {
		this.drawFields(context);
		if (!this.hideShip) {
			for (const ship of this.ships) {
			this.drawShips(context, ship);
			}
		}
		for (const check of this.checks) {
			this.drawChecks(context, check);
		}
		// для разработчика
		for (const isCheckF of this.isChecksF) {
			this.drawIsChecksF(context, isCheckF);
		}
		for (const isCheckF2 of this.isChecksF2) {
			this.drawIsChecksF2(context, isCheckF2);
		}
		//======
		for (const injury of this.injuries) {
			this.drawInjuries(context, injury);
		}
		for (const ship of this.deadShips) {
			this.drawDeadShips(context, ship);
		}
		return this;
	}

	//отрисовка попадания в корабль
	drawInjuries(context, injury) {
		context.strokeStyle = 'rgba(250,0,50,0.5)'
		context.lineWidth = 4;
		context.beginPath();
		context.moveTo(
			this.offsetX + injury.x * FIELD_SIZE+FIELD_SIZE+2,
			this.offsetY + injury.y * FIELD_SIZE+FIELD_SIZE+2,
		);
		context.lineTo(
			this.offsetX + injury.x * FIELD_SIZE+FIELD_SIZE*2-2,
			this.offsetY + injury.y * FIELD_SIZE+FIELD_SIZE*2-2,
		);
		context.moveTo(
			this.offsetX + injury.x * FIELD_SIZE+FIELD_SIZE+2,
			this.offsetY + injury.y * FIELD_SIZE+FIELD_SIZE*2-2,
		);
		context.lineTo(
			this.offsetX + injury.x * FIELD_SIZE+FIELD_SIZE*2-2,
			this.offsetY + injury.y * FIELD_SIZE+FIELD_SIZE+2,
		);
		context.stroke();
		return this;
	}

	//отрисовка сетки
	drawFields(context) {
		context.strokeStyle = '#2B5E97';
		context.lineWidth = 3;
		for (let i=1; i<12; i++) {
			context.beginPath();
			context.moveTo(
				this.offsetX + i * FIELD_SIZE,
				this.offsetY,
			);
			context.lineTo(
				this.offsetX + i * FIELD_SIZE,
				this.offsetY + 11 * FIELD_SIZE,
			);
			context.stroke();
		}
		for (let i=1; i<12; i++) {
			context.beginPath();
			context.moveTo(
				this.offsetX,
				this.offsetY + i * FIELD_SIZE,
			);
			context.lineTo(
				this.offsetX + 11 * FIELD_SIZE,
				this.offsetY + i * FIELD_SIZE,
			);
			context.stroke();
			context.fill();
		}

		context.fillStyle = '#2B5E97'
		context.textAlign = 'center';
		context.font = 'bold 18px Pangolin';
		const alphabet = 'АБВГДЕЖЗИК';
		//const alphabet = '0123456789';
		for (let i=0; i<10; i++) {
			const letter = alphabet[i];
			context.fillText(
				letter,
				this.offsetX + i * FIELD_SIZE + FIELD_SIZE*1.5,
				this.offsetY + FIELD_SIZE*.65,
			);
		}
		for (let i=1; i<11; i++) {
			context.fillText(
				i,
				//i-,
				this.offsetX + FIELD_SIZE*.45,
				this.offsetY+ i * FIELD_SIZE + FIELD_SIZE*0.7,
			);
		}
		return this;
	}

	//отрисова кораблей
	drawShips(context, ship) {
		context.fillStyle = 'rgba(68, 95, 126,0.8)'
		context.beginPath();
		context.rect(
			this.offsetX + ship.x * FIELD_SIZE+FIELD_SIZE,
			this.offsetY + ship.y * FIELD_SIZE+FIELD_SIZE,
			(ship.direct === 0 ? ship.size : 1) * FIELD_SIZE,
			(ship.direct === 1 ? ship.size : 1) * FIELD_SIZE,
		);
		context.fill();
		return this;
	}

	//отрисовка проверенных точек
	drawChecks(context, check) {
		context.fillStyle = 'rgba(51, 102, 153,0.8)'
		context.beginPath();
		context.arc(
			this.offsetX + check.x * FIELD_SIZE+FIELD_SIZE *1.5,
			this.offsetY + check.y * FIELD_SIZE+FIELD_SIZE *1.5,
			4,
			0,
			Math.PI * 2
		);
		context.fill();
		return this;
	}

	//для разработчика отрисовка возможных ходов
	drawIsChecksF(context, isCheck) {
		context.fillStyle = 'rgba(251, 2, 3,0.3)'
		context.beginPath();
		context.arc(
			this.offsetX + isCheck.x * FIELD_SIZE+FIELD_SIZE *1.5,
			this.offsetY + isCheck.y * FIELD_SIZE+FIELD_SIZE *1.5,
			8,
			0,
			Math.PI * 2
		);
		context.fill();
		return this;
	}
	//для разработчика отрисовка клеток для следующего хода кампьютера
	drawIsChecksF2(context, isCheck) {
		context.fillStyle = 'rgba(1, 252, 3,0.3)'
		context.beginPath();
		context.arc(
			this.offsetX + isCheck.x * FIELD_SIZE+FIELD_SIZE *1.5,
			this.offsetY + isCheck.y * FIELD_SIZE+FIELD_SIZE *1.5,
			8,
			0,
			Math.PI * 2
		);
		context.fill();
		return this;
	}
	//===========

	//отрисовка убитых кораблей
	drawDeadShips(context, ship) {
		context.fillStyle = 'rgba(255, 0, 0, 0.3)'
		context.beginPath();
		context.rect(
			this.offsetX + ship.x * FIELD_SIZE+FIELD_SIZE,
			this.offsetY + ship.y * FIELD_SIZE+FIELD_SIZE,
			(ship.direct === 0 ? ship.size : 1) * FIELD_SIZE,
			(ship.direct === 1 ? ship.size : 1) * FIELD_SIZE,
		);
		context.fill();
		return this;
	}

	//проверяет, находится ли point над игровым полем
	isPointUnder(point) {
		if (
			point.x < this.offsetX + 4 + FIELD_SIZE ||
			point.x > this.offsetX + 4 + 11 * FIELD_SIZE ||
			point.y < this.offsetY + 4 + FIELD_SIZE ||
			point.y > this.offsetY + 4 + 11 * FIELD_SIZE
		) {
			return false;
		}
			return true;
	}

	//получает,координаты point относительно игрового поля
	getCoordinats(point) {
		if(!this.isPointUnder(point)) {
			return false}
		const x = parseInt((point.x - this.offsetX - 5 - FIELD_SIZE)/FIELD_SIZE);
		const y = parseInt((point.y - this.offsetY - 6 - FIELD_SIZE)/FIELD_SIZE);
		return {
			x: Math.max(0, Math.min(9, x)),
			y: Math.max(0, Math.min(9, y)),
		}
	}

	//проверка возможности поставить корабль внутри игрового поля
	canStay(ship) {
		if (ship.direct === 0 && ship.x + ship.size > 10) {
			return false}
		if (ship.direct === 1 && ship.y + ship.size > 10) {
			return false}
		const map = [
			[true, true, true, true, true, true, true, true, true, true],
			[true, true, true, true, true, true, true, true, true, true],
			[true, true, true, true, true, true, true, true, true, true],
			[true, true, true, true, true, true, true, true, true, true],
			[true, true, true, true, true, true, true, true, true, true],
			[true, true, true, true, true, true, true, true, true, true],
			[true, true, true, true, true, true, true, true, true, true],
			[true, true, true, true, true, true, true, true, true, true],
			[true, true, true, true, true, true, true, true, true, true],
			[true, true, true, true, true, true, true, true, true, true]
		]
		for (const ship of this.ships) {
			if (ship.direct === 0) {
				for (let x=ship.x - 1; x<ship.x + ship.size + 1; x++) {
					for (let y=ship.y - 1; y<ship.y + 2; y++) {
						if (map[y] && map[y][x]) {
							map[y][x] = false;
						}
					}
				}
			}
			else {
				for (let x=ship.x - 1; x<ship.x + 2; x++) {
					for (let y=ship.y - 1; y<ship.y + ship.size + 1; y++) {
						if (map[y] && map[y][x]) {
							map[y][x] = false;
						}
					}
				}
			}
		}
		if (ship.direct === 0) {
			for (let i=0; i<ship.size; i++) {
				if (!map[ship.y][ship.x+i]) {
					return false;
				}
			}
		}
		else {
			for (let i=0; i<ship.size; i++) {
				if (!map[ship.y+i][ship.x]) {
					return false;
				}
			}
		}
		return true;
	}

	//рандмная расстановка кораблей
	randoming() {
		this.ships = [];
		for (let size=4; size>0; size--) {
			for (let n=0; n<5-size;n++) {
				let isStay = false;
				while (!isStay) {
					const ship = {
						x: Math.floor(Math.random()*10),
						y: Math.floor(Math.random()*10),
						direct: Math.random() > Math.random() ? 0 : 1,
						live: size,
						size,
					}
					if (this.canStay(ship)) {
						this.addShips(ship);
						isStay = true;
					}
				}
			}
		}
		return true;
	}

	//получает,карту кораблей на поле
	getShipsMap() {
		const map = [
			[false, false, false, false, false, false, false, false, false, false],
			[false, false, false, false, false, false, false, false, false, false],
			[false, false, false, false, false, false, false, false, false, false],
			[false, false, false, false, false, false, false, false, false, false],
			[false, false, false, false, false, false, false, false, false, false],
			[false, false, false, false, false, false, false, false, false, false],
			[false, false, false, false, false, false, false, false, false, false],
			[false, false, false, false, false, false, false, false, false, false],
			[false, false, false, false, false, false, false, false, false, false],
			[false, false, false, false, false, false, false, false, false, false]
		]
		for (const ship of this.ships) {
			if (ship.direct === 0) {
				for (let x=ship.x; x<ship.x + ship.size; x++) {
					if (map[ship.y] && !map[ship.y][x]) {
						map[ship.y][x] = true;
					}
				}
			}
			else {
				for (let y=ship.y; y<ship.y + ship.size; y++) {
					if (map[y] && !map[y][ship.x]) {
						map[y][ship.x] = true;
					}
				}
			}
		}
		return map;
	}

	//обработка попадания в корабль
	update() {
		const map = this.getShipsMap();
		for (const check of this.checks) {
			if (map[check.y][check.x]) {
				this.injuries.push(check);
				const index = this.checks.indexOf(check);
				this.checks.splice(index, 1);
				game.isCheckedPoint = false;
				this.getShipInPoint(check.x,check.y);
				this.getCheckenFields();
			}
		}
	}

	//проверяет, находится ли корабль под точкой point
	isShipUnderpoint(point) {
		const map = this.getShipsMap();
		return map[point.y][point.x];
	}

	//получает точки вокруг подбитого коробля, чтобы камп следующим ходом стрелял вокруг ранненного
	getCheckenFields() {
		const roundChecked = [];
		this.isChecksF2 = roundChecked;
		let x,y;
		let n = 0;
		for (let iy=0; iy<10; iy++) {
			for (let ix=0; ix<10; ix++) {
				for (const injury of this.injuries) {
					if (this.name == game.camp.name) {break}
					if (injury.x === ix && injury.y === iy) {
						for (let unk of this.getUnknownFields()) {
							for (let k=0; k<5; k++) {
								for(let l=-1; l<2; l++) {
									if (l===0){continue};
									x = ix+l;
									y = iy;
									if (x <= 9 && x >= 0 && y <= 9 && y >= 0) {
										if (unk.x === x && unk.y === y) {roundChecked.push({x,y});}
									}
									x = ix;
									y = iy+l;
									if (x <= 9 && x >= 0 && y <= 9 && y >= 0) {
										if (unk.x === x && unk.y === y) {roundChecked.push({x,y});}
									}
								}
								n++;
								break;
							}
						}
					}
				}
			}
			if (n == 4 && n != 0) {n = 0;break;}
		}
		return roundChecked;
	}

	// функция убирает лишние точки из getCheckenFields после второго попадания в корабль
	removeCheckenField(ship) {
		let x,y;
		if (ship.direct === 0) {
			for (let k=0; k<ship.size; k++) {
				x = ship.x + k;
				y = ship.y+1;
				this.addIsChecks({x,y});
				x = ship.x + k;
				y = ship.y-1;
				this.addIsChecks({x,y});
			}
		}
		if (ship.direct === 1) {
			for (let k=0; k<ship.size; k++) {
				x = ship.x + 1;
				y = ship.y + k;
				this.addIsChecks({x,y});
				x = ship.x - 1;
				y = ship.y + k;
				this.addIsChecks({x,y});
			}
		}
	}

	//получает неизвестные точки на игровом поле
	getUnknownFields() {
		const unknownFields = [];
		this.isChecksF = unknownFields;

		for (let y=0; y<10; y++) {
			for (let x=0; x<10; x++) {
				let isChecked = false;
				for (const check of this.checks) {
					if (check.x === x && check.y === y) {
						isChecked = true;
						break;
					}
				}
				for (const isCheck of this.isChecks) {
					if (isCheck.x === x && isCheck.y === y) {
						isChecked = true;
						break;
					}
				}
				if (!isChecked) {
					for (const injury of this.injuries) {
						if (injury.x === x && injury.y === y) {
							isChecked = true;
							break;
						}
					}
				}
				if (!isChecked) {
					unknownFields.push({x,y})
				}
			}
		}
		return unknownFields;
	}

	//проверка победителя
	isGameOver() {
		const map = this.getShipsMap();
		for (const injury of this.injuries) {
			map[injury.y][injury.x] = false;
		}
		for (let status of map.flat()) {
			if (status) {
				return false;
			}
		}
		game.stage = 'gameOver';
		return true;
	}

	//получает точки вокруг убитого корабля
	getCheckAroundDeadShip(ship,x,y) {
		if (this.name == game.camp.name) {return}
		if (ship.direct === 0) {
			for (let x=ship.x - 1; x<ship.x + ship.size + 1; x++) {
				for (let y=ship.y - 1; y<ship.y + 2; y++) {
					if (x === ship.x && y === ship.y) {continue}
					if (x <= 9 && x >= 0 && y <= 9 && y >= 0) {
						this.addIsChecks({x,y});
					}
				}
			}
		}
		if (ship.direct === 1) {
			for (let x=ship.x - 1; x<ship.x + 2; x++) {
				for (let y=ship.y - 1; y<ship.y + ship.size + 1; y++) {
					if (x === ship.x && y === ship.y) {continue}
					if (x <= 9 && x >= 0 && y <= 9 && y >= 0) {
						this.addIsChecks({x,y});
					}
				}
			}
		}
	}

	//попадание в корабль
	getShipHit(ship,x,y) {
		ship.live = ship.live - 1;
		if (game.camp.level === 3) {
			if (ship.live === ship.size - 2 && ship.size > 2) {
				this.removeCheckenField(ship);
			}
		}
		game.hitStatus = 'попал';
		if (ship.live===0) {
			this.addDeadShips(ship);
			this.getCheckAroundDeadShip(ship,x,y);
			game.hitStatus = 'убил';
		}
	}

	//получает корабль под точкой попадания (jx;jy)
	getShipInPoint (jx, jy) {
		for (const ship of this.ships) {
			let dx = ship.direct === 0;
			let dy = ship.direct === 1;
			let x = ship.x;
			let y = ship.y;
			for (let i=0; i<ship.size; i++) {
				if (ship.x === jx && ship.y === jy) {
					this.getShipHit(ship,x,y);
					return ship;
				}
				if (ship.x === jx - i && ship.y === jy) {
					if (ship.direct === 0) {
						this.getShipHit(ship,x,y);
						return ship;
					}
				}
				if (ship.x === jx && ship.y === jy - i) {
					if (ship.direct === 1) {
						this.getShipHit(ship,x,y);
						return ship;
					}
				}
			}
		}
		return null;
	}
}