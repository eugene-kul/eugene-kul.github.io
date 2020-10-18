export default class View {
	static colors = {
		'1': '#62b14a',
		'2': '#4691f5',
		'3': '#9e9e9e',
		'4': '#e54339',
		'5': '#f18605',
		'6': '#bf80ff',
		'7': '#fcee28',
	};
	constructor(element, width, height, rows, columns) {
		this.element = element;
		this.width = width;
		this.height = height;

		this.canvas = document.createElement('canvas');
		this.canvas.width = this.width;
		this.canvas.height = this.height;
		this.context = this.canvas.getContext('2d');

		this.playfieldBorderWidth = 4;
		this.playfieldX = this.playfieldBorderWidth;
		this.playfieldY = this.playfieldBorderWidth;
		this.playfieldWidth = this.width * 2 / 3;
		this.playfielHeight = this.height;
		this.playfieldInnerWidth = this.playfieldWidth - this.playfieldBorderWidth*2;
		this.playfielInnerHeight = this.playfielHeight - this.playfieldBorderWidth*2;


		this.blockWidth = this.playfieldInnerWidth / columns;
		this.blockHeight = this.playfielInnerHeight / rows;

		this.panelX = this.playfieldWidth + 10;
		this.panelY = 0;
		this.panelWidth = this.width / 3;
		this.panelHeight = this.height;

		this.element.appendChild(this.canvas);
	}

	renderMainScreen(state) {
		this.clearScreen();
		this.renderPlayField(state);
		this.renderPanel(state);
	}

	renderStartScreen() {
		this.context.fillStyle = 'rgba(0,0,0,0.5)';
		this.context.fillRect(0,0,this.width,this.height);
		
		this.context.fillStyle = '#fff';
		this.context.font = '18px "Press Start 2P"';
		this.context.textAlign = 'center';
		this.context.textBaseline = 'middle';
		this.context.fillText('Press ENTER', this.width/2,this.height/2);
		this.context.fillText('to Start Game', this.width/2,this.height/2+30);
	}

	renderPauseScreen() {
		this.context.fillStyle = 'rgba(0,0,0,0.75)';
		this.context.fillRect(0,0,this.width,this.height);

		this.context.fillStyle = '#fff';
		this.context.font = '18px "Press Start 2P"';
		this.context.textAlign = 'center';
		this.context.textBaseline = 'middle';
		this.context.fillText('Press ENTER', this.width/2,this.height/2);
		this.context.fillText('to Resume Game', this.width/2,this.height/2+30);
	}

	renderEndScreen({ score }) {
		//this.clearScreen();

		this.context.fillStyle = 'rgba(0,0,0,0.75)';
		this.context.fillRect(0,0,this.width,this.height);

		this.context.fillStyle = '#fff';
		this.context.font = '16px "Press Start 2P"';
		this.context.textAlign = 'center';
		this.context.textBaseline = 'middle';
		this.context.fillText('GAME OVER', this.width/2,this.height/2 - 30);
		this.context.fillText(`score: ${score}`, this.width/2,this.height/2);
		this.context.fillText(`Press ENTER to restart game`, this.width/2,this.height/2 + 30);
	}

	clearScreen() {
		this.context.clearRect(0,0,this.width,this.height);
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
		this.context.strokeStyle = '#ccc';
		this.context.lineWidth = this.playfieldBorderWidth;
		this.context.strokeRect(0,0,this.playfieldWidth,this.playfielHeight);
	}

	renderPanel({ level, score, lines, nextPiece }) {
		this.context.textAlign = 'start';
		this.context.textBaseline = 'top';
		this.context.fillStyle = '#fff';
		this.context.font = '13px "Press Start 2P"';

		this.context.fillText(`Level: ${level}`, this.panelX, this.panelY + 10);
		this.context.fillText(`Score: ${score}`, this.panelX, this.panelY + 30);
		this.context.fillText(`Lines: ${lines}`, this.panelX, this.panelY + 50);
		this.context.fillText(`Next:`, this.panelX, this.panelY + 70);

		for (let y = 0; y < nextPiece.blocks.length; y++) {
			for (let x = 0; x < nextPiece.blocks[y].length; x++) {
				const block = nextPiece.blocks[y][x];
				if (block) {
					this.renderBlock(
						this.panelX+(x*this.blockWidth/2),
						this.panelY+(y*this.blockHeight/2)+75,
						this.blockWidth/2,
						this.blockHeight/2,
						View.colors[block]
					);
				}
			}
		}
	}

	renderBlock(x,y,w,h,color) {
		this.context.fillStyle = color;
		this.context.strokeStyle = '#333';
		this.context.lineWidth = 2;
		this.context.fillRect(x,y,w,h);
		this.context.strokeRect(x,y,w,h);
	}
}