
function cycl_with_Timeout(mseconds, max_count, cycled_function, args, check) {
	var i = 0;
	function recurs_cycl() {
		cycled_function(args, check);
		setTimeout(function() {
			i++;
			if (i < max_count && check) { recurs_cycl(); }
		}, mseconds);
	}
	recurs_cycl();
}

setTimeout(function() {
	var game_snag = document.querySelector('.game_snag');
console.log(game_snag);
var game_character = document.querySelector('.game_character');
console.log(game_character);
console.log(game_snag.getBoundingClientRect());
try {
	function bang_check(args, check) {
		var game_snag = args[0];
		var game_character = args[1];
		// console.log(game_snag.offsetTop + ":" + game_snag.offsetLeft + "; " + game_character.offsetTop + ":" + game_character.offsetLeft);

		var a_x1 = Math.round(game_character.getBoundingClientRect().left);
		var	a_y1 = Math.round(game_character.getBoundingClientRect().top);
		var	a_x2 = Math.round(game_character.getBoundingClientRect().right);
		var	a_y2 = Math.round(game_character.getBoundingClientRect().bottom);

		var	b_x1 = Math.round(game_snag.getBoundingClientRect().left);
		var	b_y1 = Math.round(game_snag.getBoundingClientRect().top);
		var	b_x2 = Math.round(game_snag.getBoundingClientRect().right);
		var	b_y2 = Math.round(game_snag.getBoundingClientRect().bottom);

		var comp0 = a_x1 < b_x2;
		var comp1 = a_x2 > b_x1;
		var comp2 = a_y1 < b_y2;
		var comp3 = a_y2 > b_y1;
		var intersect = comp0 && comp1 && comp2 && comp3;
		if (intersect) {
			// console.log(a_x1);
			// console.log(a_x2);
			// console.log(a_y1);
			// console.log(a_y2);
			// console.log(b_x1);
			// console.log(b_x2);
			// console.log(b_y1);
			// console.log(b_y2);
			console.log("bang");
			check = false;
			return 0;
		}
		// console.log(Math.round(game_snag.getBoundingClientRect().top + game_snag.getBoundingClientRect().height) + ":" + Math.round(game_snag.getBoundingClientRect().left + game_snag.getBoundingClientRect().width) + ";\n" + Math.round(game_character.getBoundingClientRect().top) + ":" + Math.round(game_character.getBoundingClientRect().right + game_character.getBoundingClientRect().width));
	}
	var check = true;
	cycl_with_Timeout(50, 100, bang_check, [game_snag, game_character], check);
} catch (error) { console.log(error); }
    game_snag.classList.add("animation_forward_left");
}, 1000);