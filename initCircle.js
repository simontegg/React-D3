module.exports = function(props) {

	init = function(el) {
		el.transition().duration(1000)
		.attr("r", function(d) { return d.r; })
		.attr("cx", function(d) { return d.cx; })
		.attr("cy", function(d) { return d.cy; })
	};

	return function(el) {
		circle = el
			.data([props]);

		circle	
			.call(init);
	};
}