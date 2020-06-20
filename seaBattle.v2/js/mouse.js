function getMouse(element) {
	const mouse = {
		x: 0,
		y: 0,
		click: false,
		scroll: false,
	}

	element.addEventListener('mousemove', function (event) {
		const rect = element.getBoundingClientRect();
		mouse.x = event.clientX - rect.left;
		mouse.y = event.clientY - rect.top;
	});

	element.addEventListener('click', function(event) {
		mouse.click = true;
	});
	element.addEventListener('wheel', function(event) {
		mouse.scroll = !mouse.scroll;
	});

	return mouse;
}