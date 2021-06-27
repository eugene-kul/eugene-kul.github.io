class Game {
	constructor() {
		this.body = document.querySelector('#game');
	}
	
	init() {
		for (let i=0;i<100;i++) {
			this.body.insertAdjacentHTML('beforeend',`<div class="game__row" id="game-row-${i}" data-id="${i}"></div>`);
			let this_row = document.querySelector(`#game-row-${i}`);
			for (let j=0;j<100;j++) {
				let field = '';
				let active = '';
				if (j==0 && i==0 || j==0 && i==1 || j==1 && i==0 || j==1 && i==1 ){field = 'select';}
				if (j==0 && i==0 || j==0 && i==1 || j==1 && i==0 ){active = 'active';}
				this_row.insertAdjacentHTML('beforeend',`<div class="game__cell ${field} ${active}" id="game-cell-${j}" data-id="${j}"></div>`);
			}
		}
		this.cells = document.querySelectorAll('.game__cell');
	}

	setCell(x,y) {
		let row = document.querySelector(`#game-row-${x}`);
		let cell = row.querySelector(`#game-cell-${y}`);
		cell.classList.add('active');
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