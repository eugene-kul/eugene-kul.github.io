class Game {
	constructor() {
		this.body = document.querySelector('#game');
	}

	
	init() {
		for (let i=0;i<100;i++) {
			this.body.insertAdjacentHTML('beforeend',`<div class="game__row" id="game-row-${i}" data-id="${i}"></div>`);
			let this_row = document.querySelector(`#game-row-${i}`);
			for (let j=0;j<100;j++) {
				this_row.insertAdjacentHTML('beforeend',`<div class="game__cell" id="game-cell-${j}" data-id="${j}"></div>`);
			}
		}
		this.cells = document.querySelectorAll('.game__cell');
		this.active_cells = document.querySelectorAll('.game__cell.active');

		this.setFields_v1();
		this.start_v1();
	}

	setFields_v1() {
		this.setFields(0,0);
		this.setFields(0,1);
		this.setFields(1,0);
		this.setFields(1,1);
	}
	setFields_v2() {
		this.setFields(0,0);
		this.setFields(0,1);
		this.setFields(1,0);
		this.setFields(1,1);
		this.setFields(0,2);
		this.setFields(2,0);
	}

	start_v1() {
		this.setCell(0,0);
		this.setCell(0,1);
		this.setCell(1,0);
	}

	start_v2() {
		this.setCell(0,0);
		this.setCell(1,1);
	}

	start_v3() {
		this.setCell(0,0);
		this.setCell(0,1);
	}
	start_v4() {
		this.setCell(0,0);
		this.setCell(0,1);
		this.setCell(1,0);
		this.setCell(1,1);
	}

	setFields(x,y) {
		let row = document.querySelector(`#game-row-${x}`);
		let cell = row.querySelector(`#game-cell-${y}`);
		cell.classList.add('select');
	}

	setCell(x,y) {
		let row = document.querySelector(`#game-row-${x}`);
		let cell = row.querySelector(`#game-cell-${y}`);
		cell.classList.add('active');
		this.active_cells = document.querySelectorAll('.game__cell.active');
	}

	removeCell(point) {
		let row = document.querySelector(`#game-row-${point.x}`);
		let cell = row.querySelector(`#game-cell-${point.y}`);
		cell.classList.remove('active');
	}
	checkCell(point) {
		let row = document.querySelector(`#game-row-${point.x}`);
		let next_row = document.querySelector(`#game-row-${point.x+1}`);
		if (!next_row) {return false;}
		let cell = row.querySelector(`#game-cell-${point.y}`);
		let right_cell = row.querySelector(`#game-cell-${point.y+1}`);
		if (!right_cell) {return false;}
		let down_cell = next_row.querySelector(`#game-cell-${point.y}`);
		if (cell.classList.contains('active') && !right_cell.classList.contains('active') && !down_cell.classList.contains('active')) {
			return true;
		}
	}
}