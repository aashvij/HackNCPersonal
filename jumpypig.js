// board variables used to draw on canvas
let board;
let boardWidth = 360;
let boardHeight = 640;
let context;

// pig variables 
let pigWidth = 70;
let pigHeight = 70;
let pigY = boardHeight/2;
let pigX = boardWidth/8;

// pig object
let pig = { x : pigX, y : pigY, width : pigWidth, height : pigHeight };

// hay stack variables
let hayArray = [];
let hayX = boardWidth;
let hayY = boardHeight/2;
let hayWidth = 100;
let hayHeight = 360;
let haystackImg;

//windmill variables
let windmillArray = [];
let wmX = boardWidth;
let wmY = 0;
let wmWidth = 100;
let wmHeight = 360;
let windmillImg;

//mechanics
let velocityX = -2;
let velocityY = 0;
let gravity = 0.3; // rate of change of velocity over time

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

    //load haystack image 
    haystackImg = new Image();
    haystackImg.src = "./haystack.png";

    requestAnimationFrame(redraw);
    setInterval(makeHay, 1500); //1500 miliseconds = 1.5 seconds
    document.addEventListener("keydown",  jumpPig); 
}

function redraw(){
    requestAnimationFrame(redraw);

    //redrawing background
    context.clearRect(0, 0, board.width, board.height);

    //redrawing pig
    velocityY += gravity;
    pig.y += velocityY;
    context.drawImage(pigImage, pig.x, pig.y, pig.width, pig.height);

    //redrawing haystacks
    for (let i = 0; i < hayArray.length; i++){
        let hay = hayArray[i];
        hay.x += velocityX;
        context.drawImage(haystackImg, hay.x, hay.y, hay.width, hay.height);
    }
} 

function makeHay(){
    let haystack = { img: haystackImg, x : hayX, y: hayY, width: hayWidth, height: hayHeight, passed: false }
    hayArray.push(haystack);
}

function jumpPig(key){
    if (key.code == "Space" || key.code == "ArrowUp" || key.code == "KeyJ"){
        velocityY = -6;
    }
}
