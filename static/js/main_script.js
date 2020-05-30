console.log(localStorage);

function getRandomIntInclusive(min, max) { // fun from https://developer.mozilla.org
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/* ------ Snag n Bang generation ------ */
var bangs = localStorage.getItem("bangs");
var snags = localStorage.getItem("snags");
bangs = JSON.parse(bangs);
snags = JSON.parse(snags);
console.log(bangs);
console.log(snags);
var game_bang_container = document.querySelector('.game_bang_container');
var game_snag_container = document.querySelector('.game_snag_container');
function insert_new_bang() {
	var new_bang = document.createElement("div");
	new_bang.classList = "game_bang visually-hidden";
	var new_bang_img = document.createElement("img");
	new_bang_img.setAttribute("src", "../../media/" + bangs[getRandomIntInclusive(0, bangs.length - 1)].fields.preview);
	new_bang_img.setAttribute("alt", bangs[getRandomIntInclusive(0, bangs.length - 1)].fields.name);
	new_bang.appendChild(new_bang_img);
	game_bang_container.appendChild(new_bang);
}
function insert_new_snag() {
	// console.log("inserting...");
	var new_snag = document.createElement("div");
	new_snag.classList = "game_snag visually-hidden";
	var new_snag_img = document.createElement("img");
	new_snag_img.setAttribute("src", "../../media/" + snags[getRandomIntInclusive(0, snags.length - 1)].fields.preview);
	new_snag_img.setAttribute("alt", snags[getRandomIntInclusive(0, snags.length - 1)].fields.name);
	new_snag.appendChild(new_snag_img);
	game_snag_container.appendChild(new_snag);
}
function recurs_inserting() {
	if (game_snag_container.children.length < 20) {
		insert_new_snag(); // вставить препятствие по рандомному индексу
	}
	if (game_bang_container.children.length < 10) {
		insert_new_bang(); // вставить бэнг по рандомному индексу
	}
	setTimeout(recurs_inserting, 700);
}
setTimeout(recurs_inserting);
/* ------ /Snag n Bang generation ------ */


/* ------ User progress control ------ */
var is_authenticated = localStorage.getItem("is_authenticated");
var lvl = localStorage.getItem("lvl");
var curr_xp = localStorage.getItem("curr_xp");
console.log("lvl = " + lvl);
console.log("curr_xp = " + curr_xp);

var game_progress__lvl = document.querySelector(".game_progress__lvl");
game_progress__lvl.innerHTML = String(lvl);

var game_progress__xp = document.querySelector(".game_progress__xp");
game_progress__xp.style.setProperty('--curr_xp', String(curr_xp));
var base_xp = lvl * 100;
game_progress__xp.style.setProperty('--base_xp', String(base_xp));
var xp_p = game_progress__xp.querySelector(".game_progress__xp_title");
xp_p.innerHTML = String(curr_xp) + "/" + String(base_xp);

var game_progress__hp = document.querySelector(".game_progress__hp");
var curr_hp = lvl * 1000;
game_progress__hp.style.setProperty('--curr_hp', String(curr_hp));
var base_hp = curr_hp;
game_progress__hp.style.setProperty('--base_hp', String(base_hp));
var hp_p = game_progress__hp.querySelector(".game_progress__hp_title");
hp_p.innerHTML = String(curr_hp) + "/" + String(base_hp);

var you_died = document.querySelector(".you_died");

function reduce_hp_n_xp() {
    var difference = getRandomIntInclusive(200, 200 * lvl + 10);
    curr_hp -= difference;
    if (curr_hp <= 0) {
        curr_xp -= base_hp;
        stopGame();
        you_died.classList.add("active");
        function died_event (event) {
        	you_died.removeEventListener("click", died_event);
        	you_died.classList.remove("active");
		}
        you_died.addEventListener("click", died_event);
        base_hp = lvl * 1000;
        curr_hp = base_hp;
        game_progress__hp.style.setProperty('--base_hp', String(base_hp));
    } else {
        curr_xp -= Math.round(difference / 28);
    }
    game_progress__hp.style.setProperty('--curr_hp', String(curr_hp));
    hp_p.innerHTML = String(curr_hp) + "/" + String(base_hp);
    if (curr_xp < 0) {
    	var mean = curr_xp;
        lvl--;
        console.log(curr_xp);
        base_xp = lvl * 100;
        curr_xp = base_xp + mean;
		console.log(curr_xp);
		game_progress__xp.style.setProperty('--base_xp', String(base_xp));
        game_progress__lvl.innerHTML = String(lvl);
    }
    game_progress__xp.style.setProperty('--curr_xp', String(curr_xp));
    xp_p.innerHTML = String(curr_xp) + "/" + String(base_xp);
}
function increase_xp() {
	console.log(curr_xp);
	curr_xp++;
	console.log(curr_xp);
	if (curr_xp >= base_xp) {
		lvl++;
		base_xp = lvl * 100;
        curr_xp = 0;
        game_progress__xp.style.setProperty('--base_xp', String(base_xp));
        game_progress__lvl.innerHTML = String(lvl);
        base_hp = lvl * 1000;
        curr_hp = base_hp;
        game_progress__hp.style.setProperty('--base_hp', String(base_hp));
        game_progress__hp.style.setProperty('--curr_hp', String(curr_hp));
	}
	game_progress__xp.style.setProperty('--curr_xp', String(curr_xp));
    xp_p.innerHTML = String(curr_xp) + "/" + String(base_xp);
}
/* ------ /User progress control ------ */


/* ------ Snag n Bang control ------ */
var game_h1 = document.querySelector('.game_h1');
var game_character = document.querySelector('.game_character');
game_character.style.left = "calc(50% - " + Math.round(game_character.getBoundingClientRect().width / 2) + "px)";
game_character.style.top = "calc(70% - " + Math.round(game_character.getBoundingClientRect().height / 2) + "px)";

var game_play = document.querySelector('.game_play');
var playing_game = false;

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
		setTimeout(reduce_hp_n_xp());
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


// TODO сделать анимацию полета вне игры
// TODO сделать анимацию пролета через тоннель гиперпространства при начале игры. мб объединить это
function prepareGame() {
	// console.log("prepareGame");
	playing_game = true;
	game_play.removeEventListener("click", play_event);
	game_play.addEventListener("click", stopGame);
	game_play.classList.add("game_play--playing");
	game_h1.classList.add("playing");
}
function stopGame(event) {
	// console.log(event.target);
	playing_game = false;
	// console.log("playing_game=" + playing_game);
	game_play.removeEventListener("click", stopGame);
	game_play.addEventListener("click", play_event);
	game_play.classList.remove("game_play--playing");
	game_h1.classList.remove("playing");
}
function play_event(event) {
	// console.log(event.target);
	prepareGame();
	function recurs_playing() {
        try {
			increase_xp();
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
			}, 2950);
		} catch (error3) {console.log(error3);}
		// console.log("playing_game=" + playing_game);
        if (playing_game) {
			setTimeout(recurs_playing, 700);
			// TODO сложность в таймауте
		}
    }
    setTimeout(recurs_playing);
}
game_play.addEventListener("click", play_event);

/* ------ /Snag n Bang control ------ */



/* ------ Character moves ------ */

// TODO sensibility регулировку на экране
var sensibility = 30;
var wallhack_sides = Math.round(game_character.getBoundingClientRect().width * 0.5);
// console.log(wallhack_sides);
var wallhack_top_n_bot = Math.round(game_character.getBoundingClientRect().height * 0.5);
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
            if (game_character.getBoundingClientRect().top > 0) {
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

/* ------ /Character moves ------ */