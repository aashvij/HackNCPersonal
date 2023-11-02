// board variables used to draw on canvas
let board;
let boardWidth = 360;
let boardHeight = 640;
let context; 

// pig variables 
let pigWidth = 40;
let pigHeight = 30;
let pigY = boardHeight/2;
let pigX = boardWidth/8;

// pig object
let pig = { x : pigX, y : pigY, height : pigHeight, width : pigWidth };

// onload function
window.onload = function(){
    board = document.getElementById("board");
    board.width = boardWidth;
    board.height = boardHeight;
    context = board.getContext("2d"); // 2d, 2dimensional context
}

// pig design

