const CELL_SIZE = 30;
const FIELD_SIZE = 30;
let s = 0;

const	canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');

canvas.width = 1055;
canvas.height = 450;


const mouse = getMouse(canvas);
const game = new Game

// setInterval(() => console.log(player.getCoordinats(mouse)));

function clearCanvas() {
	canvas.width |= 0;
}

function drawGrid() {
	context.strokeStyle = '#2B5E97';
	context.lineWidth = 0.5;
	for (let i=0; i<canvas.width/CELL_SIZE; i++) {
		context.beginPath();
		context.moveTo(i * CELL_SIZE+2, 0);
		context.lineTo(i * CELL_SIZE+2, canvas.height);
		context.stroke();
	}
	for (let i=0; i<canvas.height/CELL_SIZE; i++) {
		context.beginPath();
		context.moveTo(0, i * CELL_SIZE-2);
		context.lineTo(canvas.width, i * CELL_SIZE-2);
		context.stroke();
	}

	context.strokeStyle = '#C2948D';
	context.lineWidth = 3;

	context.beginPath();
	context.moveTo(0, 82);
	context.lineTo(canvas.width, 82);
	context.stroke();
}

function timer() {
	s++;
	let msec = Math.floor(s/60);

	sec = Math.floor(msec % 60);
	min = Math.floor(msec % 3600/60);
	hrs = Math.floor(Math.floor(msec % 360000/60)/60);

	if (hrs<10) {
		refreshText("hrs",'0'+hrs);
	} else {refreshText("hrs",hrs);}

	if (min<10) {
		refreshText("min",'0'+min);
	} else {refreshText("min",min);}

	if (sec<10) {
		refreshText("sec",'0'+sec);
	} else {refreshText("sec",sec);}
}

function getRandomFrom(array) {
	const index = Math.floor(Math.random() * array.length);
	return array[index];
}

function refreshText(id,text) {
	document.getElementById(id).textContent = text;
}

function addClsActive(id) {
	document.getElementById(id).classList.add('active');
}
function rmvClsActive(id) {
	document.getElementById(id).classList.remove('active');
}
function tglClsActive(id) {
	document.getElementById(id).classList.remove('active');
}

function gameConsoleLog(name,point,event) {
	document.getElementById("steps").insertAdjacentHTML("afterbegin",
		`<p id="steps-item"><span>#`+game.n+` </span><span class="who"> `+name+` </span><span>: </span><span class="where">`+game.alphabet[point.x]+`-`+(point.y+1)+`</span><span> </span><span class="what">`+event+`</span></p>`
	);
	game.n++;
}

function clrConsole() {
	refreshText("steps","");
	game.n = 1;
}
