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
let wmWidth = 120;
let wmHeight = 290;
let windmillImg;

//mechanics
let velocityX = -2;
let velocityY = 0;
let gravity = 0.3; // rate of change of velocity over time

let gameOver = false; 

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

    //load windmill image
    windmillImg = new Image();
    windmillImg.src = "./windmill.png";

    requestAnimationFrame(redraw);
    setInterval(makeHay, 1500); //1500 miliseconds = 1.5 seconds
    document.addEventListener("keydown",  jumpPig); 
}

function redraw(){
    requestAnimationFrame(redraw);
    if (gameOver){
        //dimScreen();
        document.addEventListener("keydown", reload);
        return;
    }

    //redrawing background
    context.clearRect(0, 0, board.width, board.height);

    //redrawing pig
    velocityY += gravity;
    pig.y = Math.max(pig.y + velocityY, 0);
    context.drawImage(pigImage, pig.x, pig.y, pig.width, pig.height);

    if (pig.y > board.height){
        //dimScreen();
        document.addEventListener("keydown", reload);
        gameOver = true;
    }

    //redrawing haystacks
    for (let i = 0; i < hayArray.length; i++){
        let hay = hayArray[i];
        let windmill = windmillArray[i];
        hay.x += velocityX;
        windmill.x += velocityX;
        context.drawImage(haystackImg, hay.x, hay.y, hay.width, hay.height);
        context.drawImage(windmillImg, windmill.x, windmill.y, windmill.width, windmill.height);

        if (collide(pig, hay) || collide(pig, windmill)){
            //dimScreen();
            gameOver = true;
        }
    }
} 

function makeHay(){
    if (gameOver){
        document.addEventListener("keydown", reload);
        return; 
    }
    let random = hayY + Math.random()*(hayHeight/5);
    let opening = boardHeight/6;

    let haystack = { img: haystackImg, x : hayX, y: random, width: hayWidth, height: hayHeight}
    hayArray.push(haystack); 

    let windmill = { img: windmillImg, x : wmX, y: random-wmHeight-opening, width: wmWidth, height: wmHeight}
    windmillArray.push(windmill);
}

function jumpPig(key){
    if (key.code == "Space" || key.code == "ArrowUp" || key.code == "KeyX"){
        velocityY = -6;
    }
}

function collide(a, b){
    // check for collision between pig and hay or windmill
    return a.x < b.x + b.width -50 
    && a.x + a.width - 50 > b.x 
    && a.y < b.y + b.height - 50
    && a.y + a.height - 50 > b.y; 
}



function reload(key){
    if (key.code == "Space"){
        document.location.reload();
    }
}
