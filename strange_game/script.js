const _game = new Game;
_game.init();

for (let cell of _game.cells) {
	cell.addEventListener('click', function(){
		let point = {
			x: Number(cell.parentNode.dataset.id),
			y: Number(cell.dataset.id),
		};
		if(_game.checkCell(point)) {
			_game.removeCell(point);
			_game.setCell(point.x+1,point.y);
			_game.setCell(point.x,point.y+1);
		}
	});
}