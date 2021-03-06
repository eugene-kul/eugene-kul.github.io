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

let reset_btns = document.querySelector('.js-reset');
reset_btns.addEventListener('click', function(){
	for (let cell of _game.active_cells) {
		let point = {
			x: Number(cell.parentNode.dataset.id),
			y: Number(cell.dataset.id),
		};
		_game.removeCell(point);
	}
	_game.start_v1();
});

let var_btns = document.querySelector('.js-var-game');
var_btns.addEventListener('click', function(){
	let list = var_btns.nextElementSibling;
	list.classList.toggle('active');
	let items = list.querySelectorAll('li');
	for(let item of items) {
		item.addEventListener('click', function(){
			console.log(this);
			list.classList.remove('active');
		});
	}
});

let modal_btns = document.querySelectorAll('.js-open-modal');
let modal_body = document.querySelector('.js-modal-body');
let modal_overflow = document.querySelector('.js-modal-overflow');
for (let btn of modal_btns) {
	btn.addEventListener('click', function(e){
		e.preventDefault();
		let modalId = this.dataset.open_modal;
		let modalElem = document.querySelector('.js-modal[data-modal="' + modalId + '"]');

		let modal_close = modalElem.querySelectorAll('[data-modal="close"]');
		for (let item of modal_close) {
			item.addEventListener('click', function(e){
				e.preventDefault();
				modal_body.classList.remove('active');
				modalElem.classList.remove('active');
				modal_overflow.classList.remove('active');
				document.body.classList.remove('lock');
			})
		}
		
		modal_overflow.addEventListener('click', function(){
			modal_body.classList.remove('active');
			modalElem.classList.remove('active');
			modal_overflow.classList.remove('active');
			document.body.classList.remove('lock');
		})
		
		modal_body.classList.add('active');
		modalElem.classList.add('active');
		modal_overflow.classList.add('active');
		document.body.classList.add('lock');
	})
}