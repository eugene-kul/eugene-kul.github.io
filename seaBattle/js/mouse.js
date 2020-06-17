function getMouse(element) {
	const mouse = {
		x: 0,
		y: 0,
		click: false,
	}

	element.addEventListener('mousemove', function (event) {
		const rect = element.getBoundingClientRect();
		mouse.x = event.clientX - rect.left;
		mouse.y = event.clientY - rect.top;
	});

	element.addEventListener('click', function(event) {
		mouse.click = true;
	});

	return mouse;
}