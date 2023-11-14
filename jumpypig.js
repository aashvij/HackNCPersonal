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

// hay stack variable
let hayArray = [];
let hayHeight = 64;
let hayWidth = 20;
let haystackImg;
let velocityX = -2;


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

    haystackImg = new Image();
    haystackImg.src = "./haystack.png";

    requestAnimationFrame(redraw);
    setInterval(makeHay, 1500);
}

function redraw(){
    context.clearRect(0, 0, board.width, board.height);
    context.drawImage(pigImage, pig.x, pig.y, pig.width, pig.height);
    for (let i = 0; i < hayArray.length; i++){
        let hay = hayArray[i];
        hay.x += velocityX;
        context.drawImage(haystackImg, hay.x, hay.y, hay.width, hay.height);
    }
} 

function makeHay(){
    let haystack = { img: haystackImg, x : hayX, y: hayY, width: hayW, height: hayH, passed: false }

    hayArray.push(haystack);
}
