document.getElementById('hide-ships').addEventListener('click', function(event) {
	tglClsActive('hide-ships');
	game.camp.hideShip = !game.camp.hideShip;
});

document.getElementById('btn_random').addEventListener('click', function(event) {
	game.player.randoming();
	game.player.isPlayerReady = true;
});

document.getElementById('btn_play').addEventListener('click', function(event) {
	game.stage = 'play';
});

document.getElementById('level1').addEventListener('click', function(event) {
	game.camp.level = 1;
	addClsActive('level1');
	rmvClsActive('level2');
	rmvClsActive('level3');
});
document.getElementById('level2').addEventListener('click', function(event) {
	game.camp.level = 2;
	addClsActive('level2');
	rmvClsActive('level1');
	rmvClsActive('level3');
});
document.getElementById('level3').addEventListener('click', function(event) {
	game.camp.level = 3;
	addClsActive('level3');
	rmvClsActive('level2');
	rmvClsActive('level1');
});

document.getElementById('btn-skip').addEventListener('click', function(event) {
	rmvClsActive('input-block');
});

document.getElementById('btn-ok').addEventListener('click', function(event) {
	let playerName = document.getElementById("namePlayer").value;
	if (playerName !== "") {
		game.player.name = playerName;
	}
	let campName = document.getElementById("nameCamp").value;
	if (campName !== "") {
		game.camp.name = campName;
	}
	rmvClsActive('input-block');
	refreshText("mainNamePlayer",game.player.name);
	refreshText("mainNameCamp",game.camp.name);
});

document.getElementById('btn-replay').addEventListener('click', function(event) {
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