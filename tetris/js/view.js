class View {
	static colors = {
		'1': '#353535',
		'2': '#353535',
		'3': '#353535',
		'4': '#353535',
		'5': '#353535',
		'6': '#353535',
		'7': '#353535',
	};
	constructor(width, height, rows, columns) {
		this.width = width;
		this.height = height;
		this.nextMath = 0.6;

		this.canvas = document.querySelector('#main-canvas');
		this.canvas.width = this.width;
		this.canvas.height = this.height;
		this.context = this.canvas.getContext('2d');

		this.nextCanvas = document.querySelector('#next-canvas');
		this.nextCanvas.width = 110;
		this.nextCanvas.height = 100;
		this.nextfieldWidth = this.nextCanvas.width*3/columns;
		this.nextfielHeight = this.nextCanvas.height*8/rows;
		this.nextContext = this.nextCanvas.getContext('2d');

		this.playfieldBorderWidth = 0;
		this.playfieldX = this.playfieldBorderWidth;
		this.playfieldY = this.playfieldBorderWidth;
		this.playfieldWidth = this.width;
		this.playfielHeight = this.height;
		this.playfieldInnerWidth = this.playfieldWidth - this.playfieldBorderWidth*2;
		this.playfielInnerHeight = this.playfielHeight - this.playfieldBorderWidth*2;

		this.blockWidth = this.playfieldInnerWidth / columns;
		this.blockHeight = this.playfielInnerHeight / rows;

		//this.element.appendChild(this.canvas);
	}

	renderMainScreen(state) {
		this.clearScreen();
		this.renderFieldBackgropund(state);
		this.renderNextFieldBackgropund();
		if (isPlaying) {
			this.renderPlayField(state);
			this.renderNextField(state);
		}
	}

	clearScreen() {
		this.context.clearRect(0,0,this.width,this.height);
		this.nextContext.clearRect(0,0,this.width,this.height);
	}

	renderFieldGameOver(x,y) {
		this.renderBlock(
			this.playfieldX+(x*this.blockWidth),
			this.playfieldY+(y*this.blockHeight),
			this.blockWidth,
			this.blockHeight,
			'#333'
		)
	}

	renderFieldBackgropund({ playfield }) {
		for (let y=0; y<playfield.length; y++) {
			for (let x=0; x<playfield[y].length; x++) {
				this.renderBlock(
					this.playfieldX+(x*this.blockWidth),
					this.playfieldY+(y*this.blockHeight),
					this.blockWidth,
					this.blockHeight,
					'#0001'
				)
			}
		}
	}

	renderPlayField({ playfield }) {
		for (let y=0; y<playfield.length; y++) {
			const line = playfield[y];
			for (let x=0; x<line.length; x++) {
				const block = line[x];
				if (block) {
					this.renderBlock(
						this.playfieldX+(x*this.blockWidth),
						this.playfieldY+(y*this.blockHeight),
						this.blockWidth,
						this.blockHeight,
						View.colors[block]
					)
				}
			}
		}
	}

	renderNextFieldBackgropund() {
		for (let y=0; y<5; y++) {
			for (let x=0; x<4; x++) {
				this.renderNextBlock(
					x*this.nextfieldWidth*this.nextMath+2,
					y*this.nextfielHeight*this.nextMath+2,
					this.nextfieldWidth*this.nextMath+2,
					this.nextfielHeight*this.nextMath+2,
					'#0001'
				)
			}
		}
	}

	renderNextField({ nextPiece }) {
		for (let y = 0; y < nextPiece.blocks.length; y++) {
			for (let x = 0; x < nextPiece.blocks[y].length; x++) {
				const block = nextPiece.blocks[y][x];
				if (block) {
					this.renderNextBlock(
						x*this.nextfieldWidth*this.nextMath+2,
						y*this.nextfielHeight*this.nextMath+2,
						this.nextfieldWidth*this.nextMath+2,
						this.nextfielHeight*this.nextMath+2,
						View.colors[block]
					);
				}
			}
		}
	}

	renderBlock(x,y,w,h,color) {
		this.context.strokeStyle = color;
		this.context.fillStyle = color;
		this.context.lineWidth = 3;
		this.context.strokeRect(x+3,y+3,w-6,h-6);
		this.context.fillRect(x+8,y+8,w-16,h-16);
	}

	renderNextBlock(x,y,w,h,color) {
		this.nextContext.strokeStyle = color;
		this.nextContext.fillStyle = color;
		this.nextContext.lineWidth = 2;
		this.nextContext.strokeRect(x+3,y+3,w-6,h-6);
		this.nextContext.fillRect(x+6,y+6,w-12,h-12);
	}
}