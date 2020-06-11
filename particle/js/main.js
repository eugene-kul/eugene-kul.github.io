//@prepros-append js/script.js


(() => {

	const config = {
		dotMinRad 	: 0,
		dotMaxRad 	: 1,
		sphereRad 	: 500,
		bigDotRad 	: 10,
		massFactor 	: 0.02,
		defColor 	: `rgba(255,255,255,1)`,
		smooth 		: 0.95,
		mouseSize 	: 20,
		gravity 		: 0,
		dotPush 		: 0,
		dotPushMain 		: 0,
		dotSpeed 	: 1,
	}

	function peremenn() {
		let btnCheckbox 	= document.getElementById('checkbox');
		btnCheckbox.checked ? isFill = true : isFill = false;
		let useMassFactor = document.getElementById('massFactor').value/1000;
		let useDotMinRad 	= Number(document.getElementById('dotMinRad').value);
		let useDotMaxRad 	= Number(document.getElementById('dotMaxRad').value);
		let useSphereRad 	= document.getElementById('sphereRad').value;
		let useBigDotRad 	= document.getElementById('bigDotRad').value;
		let useMouseSize 	= document.getElementById('mouseSize').value;
		let useDefColor 	= document.getElementById('defColor').value;
		let useGrafity 	= document.getElementById('gravity').value/1000;
		let useBgColor 	= document.getElementById('bgColor').value;
		let useSmooth 		= document.getElementById('smooth').value/100;
		let useDotPush 	= document.getElementById('dotPush').value/100;
		let useDotPushMain 	= document.getElementById('dotPushMain').value/100;
		let useDotSpeed 	= document.getElementById('dotSpeed').value/100;

		document.getElementById('canvas').style.background = useBgColor;

		config.dotMinRad 	= useDotMinRad;
		config.dotMaxRad 	= useDotMaxRad;
		config.sphereRad 	= useSphereRad;
		config.bigDotRad 	= useBigDotRad;
		config.massFactor = useMassFactor;
		config.smooth 		= useSmooth;
		config.mouseSize 	= useMouseSize;
		config.gravity 	= useGrafity;
		config.defColor 	= useDefColor
		config.dotPush 	= useDotPush;
		config.dotPushMain 	= useDotPushMain;
		config.dotSpeed 	= useDotSpeed;
	}

	const TWO_PI = 2 * Math.PI;
	const canvas = document.querySelector(`canvas`);
	const ctx = canvas.getContext(`2d`);
	let w, h, mouse, dots;
	let isMenu = false;
	let isFill = true;

	class Dot {
		constructor(r) {
			this.pos = {x: mouse.x, y: mouse.y};
			this.vel = {x: 0, y: 0};
			this.rad = r || random(config.dotMinRad, config.dotMaxRad);
			this.mass = this.rad * config.massFactor;
		}

		draw(x,y) {
			this.pos.x = x || this.pos.x + this.vel.x;
			this.pos.y = y || this.pos.y + this.vel.y;
			createCircle(this.pos.x, this.pos.y, this.rad, isFill, config.defColor);
		}
	}

	function updateDots() {
		for (let i=1; i<dots.length; i++) {
			let acc = {x: 0, y: 0}
			for (let j=0; j<dots.length; j++) {
				
				let [a, b] = [dots[i], dots[j]];
				let delta = {x:b.pos.x - a.pos.x, y:b.pos.y - a.pos.y}
				let dist = Math.sqrt(delta.x * delta.x + delta.y * delta.y) || 1;
				let force = (dist - config.sphereRad) / dist * b.mass * config.dotPush;

				if (j == 0) {
					dist < config.mouseSize ? force = (dist - config.mouseSize) * b.mass * config.dotPushMain: force = a.mass*config.gravity;
				}

				acc.x += delta.x * force;
				acc.y += delta.y * force;
			}
			dots[i].vel.x = dots[i].vel.x * config.smooth + acc.x * dots[i].mass * config.dotSpeed;
			dots[i].vel.y = dots[i].vel.y * config.smooth + acc.y * dots[i].mass * config.dotSpeed;
		}
		dots.map(e => e == dots[0] ? e.draw(mouse.x, mouse.y) : e.draw());
	}

	function createCircle(x, y, rad, fill, color) {
		ctx.fillStyle = ctx.strokeStyle = color;
		ctx.beginPath();
		ctx.arc(x,y, rad, 0, TWO_PI);
		ctx.closePath();
		fill ? ctx.fill() : ctx.stroke();
	}

	function init() {
		canvasSize();
		peremenn();
		mouse = {x: w/2, y: h/2, down:false};
		dots = [];
		dots.push(new Dot(config.bigDotRad))*4;
	}

	function canvasSize() {
		w = canvas.width = innerWidth;
		h = canvas.height = innerHeight;
	}

	function loop() {
		ctx.clearRect(0,0,w,h);
		if(mouse.down) {dots.push(new Dot());}
		updateDots();
		window.requestAnimationFrame(loop);
	}
	init();
	loop();

	function clickID(id, f) {
		document.getElementById(id).addEventListener(`click`, f);
	}

	function toggleClass(id, cl) {
		document.getElementById(id).classList.toggle(cl);
	}

	function removeClass(id, cl) {
		document.getElementById(id).classList.remove(cl);
	}

	function setPos({layerX, layerY}) {
		[mouse.x, mouse.y] = [layerX, layerY];
	}

	function random(min, max) {
		return Math.random() * (max - min) + min;
	}

	function isActive() {
		toggleClass('btn2','active');
	}
	
	function isDown() {
		if (isMenu) {return};
		mouse.down = !mouse.down;
	}

	function initMenu() {
		let btn = document.getElementById('btn');
		toggleClass('btn','active');
		btn.classList.contains('active') ? btn.textContent = 'CLOSE' : btn.textContent = 'MENU';
		btn.classList.contains('active') ? isMenu = true : isMenu = false;
		toggleClass('list','active');
	}

	function initInfo() {
		let info = document.getElementById('info');
		toggleClass('overflow','active');
		toggleClass('btn-info','active');
		toggleClass('info','active');
		info.classList.contains('active') ? isMenu = true : isMenu = false;
	}

	function resetForm() {
		document.forms.my.reset();
	}

	canvas.addEventListener(`mousemove`, setPos);
	window.addEventListener(`mousedown`, isDown);
	window.addEventListener(`resize`, canvasSize);
	window.addEventListener(`mouseup`, isDown);
	
	clickID(`go`,init);
	clickID(`go`,initMenu);
	clickID(`go2`,peremenn);
	clickID(`btn`,initMenu);
	clickID(`cls`,initMenu);
	clickID(`btn2`,isDown);
	clickID(`btn2`,isActive);
	clickID(`btn-info`,initInfo);
	clickID(`overflow`,initInfo);
	clickID(`btn-close`,initInfo);
	clickID(`btn-close2`,initInfo);
	clickID(`reset`,resetForm);

})();




