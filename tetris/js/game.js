class Game {
	static points = {
		'1': 40,
		'2': 100,
		'3': 300,
		'4': 900
	}

	constructor() {
		this.resetGame();
	}

	get level() {
		return Math.floor(this.lines * 0.1);
	}

	getState() {
		const playfield = this.createPlayField();
		const { y: pieceY, x: pieceX, blocks } = this.activePiece;
		for (let y=0; y<this.playfield.length; y++) {
			playfield[y] = [];
			for (let x=0; x<this.playfield[y].length; x++) {
				playfield[y][x] = this.playfield[y][x];
			}
		}
		for (let y = 0; y < blocks.length; y++) {
			for (let x = 0; x < blocks[y].length; x++) {
				if (blocks[y][x]) {
					playfield[pieceY + y][pieceX + x] = blocks[y][x];
				}
			}
		}
		return {
			score: this.score,
			level: this.level,
			lines: this.lines,
			nextPiece: this.nextPiece,
			playfield,
			isGameOver: this.topOut
		}
	}

	resetGame() {
		speed = 1000;
		this.score = 0;
		this.lines = 0;
		this.topOut = false;
		this.playfield = this.createPlayField();
		this.activePiece = this.createPiece();
		this.nextPiece = this.createPiece();
	}

	createPlayField() {
		const playfield = [];
		for (let y=0; y<row; y++) {
			playfield[y] = [];
			for (let x=0; x<column; x++) {
				playfield[y][x] = 0;
			}
		}
		return playfield;
	}

	createPiece() {
		let o = 1;
		const index = Math.floor(Math.random() * pieceIndex);
		const type = '123456789'[index];
		const piece = {};
		switch (type) {
			case '1':
				piece.blocks = [
					[0,0,0,0],
					[o,o,o,o],
					[0,0,0,0],
					[0,0,0,0]
				];
				break;
			case '2':
				piece.blocks = [
					[0,0,0],
					[o,o,o],
					[0,0,o],
					[0,0,0]
				];
				break;
			case '3':
				piece.blocks = [
					[0,0,0],
					[o,o,o],
					[o,0,0],
					[0,0,0]
				];
				break;
			case '4':
				piece.blocks = [
					[0,0,0,0],
					[0,o,o,0],
					[0,o,o,0],
					[0,0,0,0]
				];
				break;
			case '5':
				piece.blocks = [
					[0,0,0],
					[0,o,o],
					[o,o,0],
					[0,0,0]
				];
				break;
			case '6':
				piece.blocks = [
					[0,0,0],
					[o,o,o],
					[0,o,0],
					[0,0,0]
				];
				break;
			case '7':
				piece.blocks = [
					[0,0,0],
					[o,o,0],
					[0,o,o],
					[0,0,0]
				];
				break;
			case '8':
				piece.blocks = [
					[0,0,0],
					[o,o,0],
					[0,o,0],
					[0,o,o],
					[0,0,0]
				];
				break;
			case '9':
				piece.blocks = [
					[0,0,0],
					[0,o,0],
					[0,o,0],
					[o,o,o],
					[0,0,0]
				];
				break;
			default:
				throw new Error('неизвестный тип фигуры');
		}
		piece.x = Math.round((column - piece.blocks[0].length)/2);
		piece.y = -1;
		return piece;
	}

	movePieceLeft() {
		this.activePiece.x -= 1;
		controller.playSound('sound-move');
		if (this.hasCollision()) {
			this.activePiece.x += 1;
			
		}
	}

	movePieceRight() {
		this.activePiece.x += 1;
		controller.playSound('sound-move');
		if (this.hasCollision()) {
			this.activePiece.x -= 1;
			
		}
	}

	movePieceDown() {
		if (this.topOut) return;
		this.activePiece.y += 1;
		if (this.hasCollision()) {
			controller.playSound('sound-create');
			this.activePiece.y -= 1;
			this.lockPiece();
			const clearedLines = this.clearLines();
			this.updateScore(clearedLines);
			this.updatePieces();
		} else {controller.playSound('sound-move');}
		if (this.hasCollision()) {
			this.topOut = true;
		}
	}

	rotatePiece() {
		this.rotateBlocks();
		controller.playSound('sound-rotate');
		if(this.hasCollision()) {
			this.rotateBlocks(false);
		}
	}

	rotateBlocks(clockwise = true) {
		const blocks = this.activePiece.blocks;
		const length = blocks.length;
		const x = Math.floor(length/2);
		const y = length - 1;
		for (let i=0; i<x; i++) {
			for (let j=i+crazyGame; j<y-i; j++) {
				const temp = blocks[i][j];
				if(clockwise) {
					blocks[i][j] = blocks[y-j][i];
					blocks[y-j][i] = blocks[y-i][y-j];
					blocks[y-i][y-j] = blocks[j][y-i];
					blocks[j][y-i] = temp;
				} else {
					blocks[i][j] = blocks[j][y-i];
					blocks[j][y-i] = blocks[y-i][y-j];
					blocks[y-i][y-j] = blocks[y-j][i];
					blocks[y-j][i] = temp;
				}
			}
		}
	}

	hasCollision() {
		const { y: pieceY, x: pieceX, blocks } = this.activePiece;
		for (let y=0; y<blocks.length; y++) {
			for (let x=0; x<blocks[y].length; x++) {
				if (
					blocks[y][x] &&
					((this.playfield[pieceY + y] === undefined || this.playfield[pieceY + y][pieceX + x] === undefined) ||
					this.playfield[pieceY + y][pieceX + x])
				) {
					return true;
				}
			}
		}
		return false;
	}

	lockPiece() {
		const { y: pieceY, x: pieceX, blocks } = this.activePiece;
		for (let y=0; y<blocks.length; y++) {
			for (let x=0; x<blocks[y].length; x++) {
				if (blocks[y][x]) {
					this.playfield[pieceY + y][pieceX + x] = blocks[y][x];
				}
			}
		}
	}

	clearLines() {
		let lines = [];
		for (let y=row-1; y>=0; y--) {
			let numberOfBlocks = 0;
			for (let x=0; x<column; x++) {
				if (this.playfield[y][x]) {
					numberOfBlocks += 1;
				}
			}
			if (numberOfBlocks === 0) {
				break;
			} else if (numberOfBlocks < column) {
				continue;
			} else if (numberOfBlocks === column) {
				lines.unshift(y);
			}
		}
		for (let index of lines) {
			this.playfield.splice(index,1);
			this.playfield.unshift(new Array(column).fill(0));
		}
		return lines.length;
	}

	updateScore(clearedLines) {
		if (clearedLines > 0) {
			this.score += Game.points[clearedLines] * (this.level + 1);
			this.lines += clearedLines;
			controller.playSound('sound-line');
		}
	}

	updatePieces() {
		this.activePiece = this.nextPiece;
		this.nextPiece = this.createPiece();
	}
}