// x plays first

// FUTURE IMPLEMENTATION 
// 	- CHECK TO SEE WHO NEEDS TO PLAY IN THE NEXT GAME
// 	- KEEP SCORES
// 	- ANIMATIONS
var moves = [];
var grid = [
	["", "", ""],
	["", "", ""],
	["", "", ""]
];

var boxes = document.getElementsByClassName("area"); // 
var turn_x = true; // x is first to play, change to false if o has to play first

document.getElementById("undo").addEventListener("click", undo)

for (var i = 0; i < boxes.length; i++) { // Traversing through all DOM boxes 
	boxes[i].addEventListener("click", function (element) { // Adds event listener to each box
		buildgrid(element.target);
		// element.target.classList
		if (element.target.tagName == "IMG") { alert("Cannot play here, space already filled"); } // space is filled
		else if (element.target.innerHTML === "") { // space is not filled
			var player_move = document.createElement("img");
			if (turn_x) { // Places an X
				player_move.setAttribute("src", "x.svg");
				element.target.appendChild(player_move);
				turn_x = false;
			} else { // Places an O
				player_move.setAttribute("src", "o.svg");
				element.target.appendChild(player_move);
				turn_x = true;
			}
		}
		var winner_x = checkwin("x");
		var winner_o = checkwin("o");
		var filled = boardfilled();
		if (winner_x) { 
			alert("Player X has won!! :D\n Refreshing...");
			location.reload(); 
		}
		else if (winner_o) { 
			alert("Player O has won!! :D\n Refreshing..."); 
			location.reload(); 
		}
		else if (!winner_x && !winner_o && filled) { 
			alert("Draw!! :( \n Refreshing..."); 
			location.reload(); 
		}
	});
}

function buildgrid (clicked) { // Building a 2D array to mimic the board
	var row;
	var col; 
	switch (clicked.classList[1]) {
		case "row_0": row = 0; break;
		case "row_1": row = 1; break;
		default: row = 2;
	}

	switch (clicked.classList[2]) {
		case "col_0": col = 0; break;
		case "col_1": col = 1; break;
		default: col = 2;
	}

	if (turn_x) { grid[row][col] = "x"; }
	else { grid[row][col] = "o"; }

	moves.push({ // adds to an array of moves
		row: row,
		col: col
	});
}

function undo() { // Erases last play
	var last_played = moves.pop();
	console.log(last_played);
	var last_element = document.getElementsByClassName("row_" + last_played.row + " col_" + last_played.col)[0];
	grid[last_played.row][last_played.col] = "";
	console.log(grid[last_played.row][last_played.col]);
	// console.log(last_element);
	last_element.removeChild(last_element.childNodes[0]);
}

function checkwin (player) {
	var win = false;
	var row; var col;
	for (row = 0; row < 3; row++) { // Checks 3 in a row
		for (col = 0; col < 3; col++) {
			if (grid[row][col] == player) { win = true; }
			else { break; }
			if (col == 2 && win == true) { return win; }
		}
	}

	for (col = 0; col < 3; col++) { // Checks 3 in a colomn
		for (row = 0; row < 3; row++) {
			if (grid[row][col] == player) { win = true; }
			else { break; }
			if (row == 2 && win == true) { return win; }
		}
	}

	for (row = 0; row < 3; row++) { // Checks leading diagonal
		if (grid[row][row] == player) { win = true; }
		else { break; }
		if (row == 2 && win == true) { return win; }
	}

	if (grid[0][2] == player && grid[1][1] == player && grid[2][0] == player) { return true; } // Checks other diagonal
}

function boardfilled () { // Checks to see if the board is filled (draw condition)
	var filled = false;
	var row; var col;
	var length = 0;
	for (row = 0; row < 3; row++) {
		for (col = 0; col < 3; col++) {
			if (grid[row][col] == 'x' || grid[row][col] == 'o')
				length++;
		}
	}

	if (length == 9) { return true; }
	else { return false; }
}
/*
	WINNING CONDITIONS
	
	r1c1, r1c2, r1c3
	r2c1, r2c2, r2c3
	r3c1, r3c2, r3c3

	r1c1, r2c1, r3c1
	r1c2, r2c2, r3c2
	r1c3, r2c3, r3c3

	r1c1, r2c2, r3c3
	r1c3, r2c2, r3c1

*/