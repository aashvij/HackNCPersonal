// board variables used to draw on canvas
let board;
let boardWidth = 360;
let boardHeight = 640;
let context;

// pig variables 
let pigWidth = 90;
let pigHeight = 90;
let pigY = boardHeight/2;
let pigX = boardWidth/8;

// pig object
let pig = { x : pigX, y : pigY, width : pigWidth, height : pigHeight };

// onload function
window.onload = function(){
    board = document.getElementById("board");
    board.width = boardWidth;
    board.height = boardHeight;
    context = board.getContext('2d'); // 2d, 2dimensional context

    // pig icon
    pigImage = new Image();
    pigImage.src = "./pig.png";
    pigImage.onload = function(){
        context.drawImage(pigImage, pig.x, pig.y, pig.width, pig.height);
    }

    requestAnimationFrame(redraw);
}

function redraw(){
    context.clearRect(0, 0, board.width, board.height);
    context.drawImage(pigImage, pig.x, pig.y, pig.width, pig.height);
}
