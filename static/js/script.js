
function cycl_with_Timeout(mseconds, max_count, cycled_function, args, check) {
	var i = 0;
	function recurs_cycl() {
		i++;
		if ((i < max_count) && (bang_check(args, check))) {
			setTimeout(function () {
				recurs_cycl();
			}, mseconds);
		}
	}
	recurs_cycl();
}

function getRandomIntInclusive(min, max) { // fun from https://developer.mozilla.org
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function bang_check(args, check) {
	var game_snag = args[0];
	var game_character = args[1];
	var game_bang = args[2];
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
	var nulls = !Boolean(b_x1) && !Boolean(b_x2) && !Boolean(b_y1) && !Boolean(b_y2); // exclude bag
	if (intersect && !nulls) {
		// console.log(a_x1);
		// console.log(a_x2);
		// console.log(a_y1);
		// console.log(a_y2);
		// console.log(b_x1);
		// console.log(b_x2);
		// console.log(b_y1);
		// console.log(b_y2);
		// console.log(game_snag);
		// console.log("bang");
		game_bang.style.left = a_x1 + "px";
		game_bang.style.top = a_y1 + "px";
		game_bang.classList.remove("visually-hidden");
		game_bang.classList.add("game_bang_activate");
		check = false;
		setTimeout(function () {
			try {
				game_bang.parentNode.removeChild(game_bang);
			} catch(error) {console.log(error);}
		}, 1980);
	}
	return check;
}

var game_h1 = document.querySelector(".game_h1");
var game_character = document.querySelector('.game_character');
game_character.style.left = "calc(50% - " + Math.round(game_character.getBoundingClientRect().width / 2) + "px)";
game_character.style.top = "calc(70% - " + Math.round(game_character.getBoundingClientRect().height / 2) + "px)";
var game_play = document.querySelector('.game_play');
var playing_game = false;

// TODO сделать анимацию полета вне игры
// TODO сделать анимацию пролета через тоннель гиперпространства при начале игры. мб объединить это
function prepareGame() {
	// console.log("prepareGame");
	playing_game = true;
	game_play.removeEventListener("click", play_event);
	game_play.addEventListener("click", stopGame);
	setTimeout(function () { // async
		game_play.innerHTML = "<span class=\"visually-hidden\">Остановить игру</span><img src=\"../static/img/game_play--playing.png\">";
	});
	game_h1.classList.add("game_h1_off");
}
function stopGame(event) {
	// console.log(event.target);
	playing_game = false;
	// console.log("playing_game=" + playing_game);
	game_play.removeEventListener("click", stopGame);
	game_play.addEventListener("click", play_event);
	game_h1.classList.remove("game_h1_off");
	setTimeout(function () { // async
		game_play.innerHTML = "<span class=\"visually-hidden\">Начать игру</span><img src=\"../static/img/game_play.png\">";
	});
}
function play_event(event) {
	// console.log(event.target);
	prepareGame();
	function recurs_playing() {
        try {
			var game_snag = document.querySelector('.game_snag:not(.processing)');
			var game_bang = document.querySelector('.game_bang:not(.processing)');
			// console.log(game_snag.getBoundingClientRect());
			game_bang.classList.add("processing");
			game_snag.classList.remove("visually-hidden");
			game_snag.classList.add("processing");
			game_snag.style.top = "calc(30% - " + (game_snag.getBoundingClientRect().height / 2) + "px)";
			game_snag.style.left = "calc(50% - " + (game_snag.getBoundingClientRect().width / 2) + "px)";
			try {
				var check = true;
				cycl_with_Timeout(50, 100, bang_check, [game_snag, game_character, game_bang], check);
			} catch (error2) {
				console.log(error2);
			}
			// 45 v - рамки экрана. чем больше от 45, тем быстрее скорость предмета. п.с. траетория тоже меняется. ПОЭТОМУ сложность наращивать именно здесь.
			// TODO сложность
			// возможно, придется подтягивать вероятность попадания по кораблю
			game_snag.style.setProperty('--snag-anim-translate-x', (getRandomIntInclusive(-45, 45) + "vw"));
			// game_snag.style.setProperty('--snag-anim-translate-x', (0 + "vw"));
			game_snag.style.setProperty('--snag-anim-translate-y', (getRandomIntInclusive(-45, 45) + "vh"));
			game_snag.classList.add("game_snag_animation");
			setTimeout(function () {
				try {
					game_snag.parentNode.removeChild(game_snag);
					game_bang.classList.remove("processing");
				} catch(error1) {console.log(error1);}
			}, 1950);
		} catch (error3) {console.log(error3);}
		// console.log("playing_game=" + playing_game);
        if (playing_game) {
			setTimeout(recurs_playing, 500);
			// TODO сложность в таймауте
		}
    }
    setTimeout(recurs_playing);
}
game_play.addEventListener("click", play_event);

// TODO sensibility регулировку на экране
var sensibility = 30;
var wallhack_sides = Math.round(game_character.getBoundingClientRect().width * 0.5);
// console.log(wallhack_sides);
var wallhack_top_n_bot = Math.round(game_character.getBoundingClientRect().height * 0.5);
game = document.querySelector(".game");
document.onkeydown = function(event) {
    switch (event.key) {
		case 'ArrowLeft':
            // console.log('ArrowLeft');
            if (game_character.getBoundingClientRect().left > 0 - wallhack_sides){
				game_character.style.left = (game_character.getBoundingClientRect().left - sensibility) + "px";
			}
            break;
        case 'ArrowRight':
            // console.log('ArrowRight');
            if (game_character.getBoundingClientRect().right < document.documentElement.clientWidth + wallhack_sides) {
				game_character.style.left = (game_character.getBoundingClientRect().left + sensibility) + "px";
				// console.log(game_character.getBoundingClientRect().left);
			}
            break;
        case 'ArrowUp':
            // console.log('ArrowUp');
            if (game_character.getBoundingClientRect().top > 0 - wallhack_top_n_bot) {
				game_character.style.top = (game_character.getBoundingClientRect().top - sensibility) + "px";
			}
            break;
        case 'ArrowDown':
            // console.log('ArrowDown');
            if (game_character.getBoundingClientRect().bottom < document.documentElement.clientHeight + wallhack_top_n_bot) {
				game_character.style.top = (game_character.getBoundingClientRect().top + sensibility) + "px";
			}
            break;
    }
};