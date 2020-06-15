function getMouse(element) {
	const mouse = {
		x: 0,
		y: 0,
		left: false,
		pleft: false,
	}

	element.addEventListener('mousemove', function (event) {
		const rect = element.getBoundingClientRect();
		mouse.x = event.clientX - rect.left;
		mouse.y = event.clientY - rect.top;
	});

	element.addEventListener('mousedown', function(event) {
		if (event.buttons === 1) {
			mouse.left = true;
		}
	});

	element.addEventListener('mouseup', function(event) {
		if (event.buttons !== 1) {
			mouse.left = false;
		}
	});

	return mouse;
}