document.getElementById('hide-ships').addEventListener('click', function(event) {
	tglClsActive('hide-ships');
	game.camp.hideShip = !game.camp.hideShip;
	playSound('sound-click');
});

document.getElementById('btn_random').addEventListener('click', function(event) {
	game.player.randoming();
	game.player.isPlayerReady = true;
	playSound('sound-click');
});

document.getElementById('btn_play').addEventListener('click', function(event) {
	game.stage = 'play';
	playSound('sound-click');
});


let levels = document.querySelectorAll('[id^="levelButton"]');
[].forEach.call(levels, function(elem){
	elem.addEventListener('click',function(){
		if (elem.id.replace(/[^\d]/g, '') == "" || this.classList.contains('active')) {return}
		game.camp.level = Number(elem.id.replace(/[^\d]/g, ''));
		for (let item of levels) {
			item.classList.remove('active');
		}
		tglClsActive(elem.id);
		playSound('sound-click');
	})
})

document.getElementById('btn-skip').addEventListener('click', function(event) {
	rmvClsActive('input-block');
	playSound('sound-click');
});

document.getElementById('vol-plus').addEventListener('click', function(event) {

	//if (document.getElementById('volume').value >= 1) {document.getElementById('volume').value = 1}
	if (vol===100) {return;}
	vol = vol + 10;
	playSound('sound-click');
	document.getElementById('volume').value = vol;
});
document.getElementById('vol-minus').addEventListener('click', function(event) {
	//if (document.getElementById('volume').value <= 0) {document.getElementById('volume').value = 0}
	if (vol===0) {return;}
	vol = vol - 10;
	playSound('sound-click');
	document.getElementById('volume').value = vol;
});

document.getElementById('btn-ok').addEventListener('click', function(event) {
	let playerName = document.getElementById('namePlayer').value;
	if (playerName !== '') {
		game.player.name = playerName;
	}
	let campName = document.getElementById('nameCamp').value;
	if (campName !== '') {
		game.camp.name = campName;
	}
	rmvClsActive('input-block');
	refreshText('mainNamePlayer',game.player.name);
	refreshText('mainNameCamp',game.camp.name);
	playSound('sound-click');
});

document.getElementById('btn-replay').addEventListener('click', function(event) {
	playSound('sound-click');
	game.camp.hideShip = true;
	game.player = new Topology({
		name: game.player.name,
		offsetX: 32,
		offsetY: 88,
		isPlayerReady: false,
		win: game.player.win,
	});

	game.camp = new Topology({
		name: game.camp.name,
		offsetX: 692,
		offsetY: 88,
		hideShip: game.camp.hideShip,
		level: game.camp.level,
		win: game.camp.win,
	});
	game.stage = 'play';
	rmvClsActive('gameOver');
	addClsActive('btn-block');
	game.camp.randoming();
	game.player.randoming();
	s = 0;
	clrConsole();
});