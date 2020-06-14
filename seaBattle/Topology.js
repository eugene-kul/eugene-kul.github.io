class Topology {
	constructor(param) {
		this.name = param.name;
		this.win = param.win || 0;
		this.offsetX = param.offsetX;
		this.offsetY = param.offsetY;
		this.level = param.level;
		this.hideShip = param.hideShip || false;

		this.ships = [];
		this.deadShips = [];
		this.checks = [];
		this.isChecks = [];
		this.injuries = [];
	}

	addShips(...ships) {
		for(const ship of ships) {
			if (!this.ships.includes(ship)) {
				this.ships.push(ship);
			}
		}
		return this
	}

	addDeadShips(...ships) {
		for(const ship of ships) {
			if (!this.deadShips.includes(ship)) {
				this.deadShips.push(ship);
			}
		}
		return this
	}

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
		for (const injury of this.injuries) {
			this.drawInjuries(context, injury);
		}
		for (const ship of this.deadShips) {
			this.drawDeadShips(context, ship);
		}
		return this;
	}

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
		context.font = 'bold 16px Pangolin';
		const alphabet = "АБВГДЕЖЗИК";
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
				this.offsetX + FIELD_SIZE*.45,
				this.offsetY+ i * FIELD_SIZE + FIELD_SIZE*0.7,
			);
		}
		return this;
	}

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

	update() {
		const map = this.getShipsMap();
		const coordinate = this.getCoordinats(mouse);
		for (const check of this.checks) {
			if (map[check.y][check.x]) {
				this.injuries.push(check);
				const index = this.checks.indexOf(check);
				this.checks.splice(index, 1);
				game.isCheckedPoint = false;
				this.getShipIn(check.x,check.y);
				for (const unk of this.getCheckenFields()) {
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
		}
	}

	isShipUnderpoint(point) {
		const map = this.getShipsMap();
		return map[point.y][point.x];
	}

	getCheckenFields() {
		const roundChecked = [];
		let x,y;
		for (let iy=0; iy<10; iy++) {
			for (let ix=0; ix<10; ix++) {
				for (let unk of this.getUnknownFields()) {
					for (const injury of this.injuries) {
						if (injury.x === ix && injury.y === iy) {
							let varX = ix;
							let varX2 = ix + 1;
							let varX3 = ix - 1;
							let varY = iy;
							let varY2 = iy + 1;
							let varY3 = iy - 1;
							if (varY3 <= 9 && varY3 >= 0) {
								x = varX; y = varY3;
								if (unk.x === x && unk.y === y) {roundChecked.push({x,y});}
							}
							if (varX2 <= 9 && varX2 >= 0) {
								x = varX2; y = varY;
								if (unk.x === x && unk.y === y) {roundChecked.push({x,y});}
							}
							if (varY2 <= 9 && varY2 >= 0) {
								x = varX; y = varY2;
								if (unk.x === x && unk.y === y) {roundChecked.push({x,y});}
							}
							if (varX3 <= 9 && varX3 >= 0) {
								x = varX3; y = varY;
								if (unk.x === x && unk.y === y) {roundChecked.push({x,y});}
							}
						}
					}
				}
			}
		}
		return roundChecked;
	}

	getUnknownFields() {
		const unknownFields = [];
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
		return true;
	}

	getCheckAroundDeadShip(ship,x,y) {
		if (game.camp.level !== 3) {return}
		if(ship.direct === 0) {
			x = ship.x - 1;
			y = ship.y;
			this.addIsChecks({x,y});
			x = ship.x + ship.size;
			y = ship.y;
			this.addIsChecks({x,y});
			x = ship.x - 1;
			y = ship.y + 1;
			this.addIsChecks({x,y});
			x = ship.x - 1;
			y = ship.y - 1;
			this.addIsChecks({x,y});
			x = ship.x + ship.size;
			y = ship.y + 1;
			this.addIsChecks({x,y});
			x = ship.x + ship.size;
			y = ship.y - 1;
			this.addIsChecks({x,y});
			for (let k=0; k<ship.size; k++) {
				x = ship.x + k;
				y = ship.y+1;
				this.addIsChecks({x,y});
				x = ship.x + k;
				y = ship.y-1;
				this.addIsChecks({x,y});
			}
		}
		if(ship.direct === 1) {
			x = ship.x;
			y = ship.y - 1;
			this.addIsChecks({x,y});
			x = ship.x;
			y = ship.y+ ship.size;
			this.addIsChecks({x,y});
			x = ship.x + 1;
			y = ship.y - 1;
			this.addIsChecks({x,y});
			x = ship.x - 1;
			y = ship.y - 1;
			this.addIsChecks({x,y});
			x = ship.x + 1;
			y = ship.y + ship.size;
			this.addIsChecks({x,y});
			x = ship.x - 1;
			y = ship.y + ship.size;
			this.addIsChecks({x,y});
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

	getShipIn (jx, jy) {
		for (const ship of this.ships) {
			let dx = ship.direct === 0;
			let dy = ship.direct === 1;
			let x = ship.x;
			let y = ship.y;
			for (let i=0; i<ship.size; i++) {
				if (ship.x === jx && ship.y === jy) {
					ship.live = ship.live - 1;
					game.hitStatus = 'попал';
					if (ship.live===0) {
						this.addDeadShips(ship);
						this.getCheckAroundDeadShip(ship,x,y);
						game.hitStatus = 'убил';
					}
					return ship;
				}
				if (ship.x === jx - i && ship.y === jy) {
					if (ship.direct === 0) {
						ship.live = ship.live - 1;
						game.hitStatus = 'попал';
						if (ship.live===0) {
							this.addDeadShips(ship);
							this.getCheckAroundDeadShip(ship,x,y);
							game.hitStatus = 'убил';
						}
						return ship;
					}
				}
				if (ship.x === jx && ship.y === jy - i) {
					if (ship.direct === 1) {
						ship.live = ship.live - 1;
						game.hitStatus = 'попал';
						if (ship.live===0) {
							this.addDeadShips(ship);
							this.getCheckAroundDeadShip(ship,x,y);
							game.hitStatus = 'убил';
						}
						return ship;
					}
				}
			}
		}
		return null;
	}
}