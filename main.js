var canvas;
var canvasContext;
var ballX = 50;
var ballSpeedX = 10;
var ballY = 50;
var ballSpeedY = 4;

var player1Score = 0;
var player2Score = 0;
const WINNING_SCORE = 3;

var showingWinScreen = false;

var paddle1Y = 250;
var paddle2Y = 250;
const PADDLE_HEIGHT = 100;
const PADDLE_THICKNESS = 10;


function claculateMousePos(evt) {
    var rect = canvas.getBoundingClientRect();
    var root = document.documentElement;
    var mouseX = evt.clientX - rect.left - root.scrollLeft;
    var mouseY = evt.clientY - rect.top - root.scrollTop;
    return {
        x: mouseX,
        y: mouseY
    };
}

function handleMouseClick() {
    if (showingWinScreen) {
        player1Score = 0;
        player2Score = 0;
        showingWinScreen = false;
    }
}

window.onload = function() {
    canvas = document.getElementById('gameCanvas');
    canvasContext = canvas.getContext('2d');


    var framesPerSecond = 30;
    setInterval(function() {
        moveEverything();
        drawEverything();
    }, 1000 / framesPerSecond);

    canvas.addEventListener('click', handleMouseClick);


    canvas.addEventListener('mousemove',
        function(evt) {
            var mousePos = claculateMousePos(evt);
            paddle1Y = mousePos.y - (PADDLE_HEIGHT / 2);
        });
}

function ballReset() {

    if (player1Score >= WINNING_SCORE || player2Score >= WINNING_SCORE) {
        showingWinScreen = true;
    }

    ballSpeedX = -ballSpeedX;
    ballX = canvas.width / 2;
    ballY = canvas.height / 2;
}
/*
function callBoth() {
    moveEverything();
    drawEverything();
}
*/

//function for computer movement
function computerMovement() {

    var paddle2YCenter = paddle2Y + (PADDLE_HEIGHT / 2);
    if (paddle2YCenter < ballY - 35) {
        paddle2Y += 6;
    } else if (paddle2YCenter > ballY + 35) {
        paddle2Y -= 6;
    }
}



//if the ball touches the walls it bounces off
function moveEverything() {



    computerMovement();

    ballX += ballSpeedX;
    ballY += ballSpeedY;
    if (ballX < 0) {
        if (ballY > paddle1Y && ballY < paddle1Y + PADDLE_HEIGHT) {
            ballSpeedX = -ballSpeedX;


            var deltaY = ballY - (paddle1Y + PADDLE_HEIGHT / 2);
            ballSpeedY = deltaY * 0.35;
        } else {
            player2Score++; //must be b4 ballReset()
            ballReset();

        }
    }
    if (ballX > canvas.width) {
        if (ballY > paddle2Y && ballY < paddle2Y + PADDLE_HEIGHT) {
            ballSpeedX = -ballSpeedX;

            var deltaY = ballY - (paddle2Y + PADDLE_HEIGHT / 2);
            ballSpeedY = deltaY * 0.35;
        } else {
            player1Score++; //must be b4 ballReset()
            ballReset();

        }
    }
    //y axis
    ballY = ballY + ballSpeedY;
    if (ballY < 0) {
        ballSpeedY = -ballSpeedY;
    }
    if (ballY >= canvas.height) {
        ballSpeedY = -ballSpeedY;
    }
}


function drawNet() {
    for (var i = 0; i < canvas.height; i += 40) {
        colorRect(canvas.width / 2 - 1, i, 2, 20, 'white');
    }
}



//movement and time
function drawEverything() {
    //draws the main box/container
    colorRect(0, 0, canvas.width, canvas.height, 'black');

    if (showingWinScreen) {
        canvasContext.fillStyle = 'white';
        if (player1Score >= WINNING_SCORE) {
            canvasContext.fillText('left player won!', 350, 200);
        } else if (player2Score >= WINNING_SCORE) {
            canvasContext.fillText('right player won!', 350, 200)
        }

        canvasContext.fillText('Click to continue', 350, 500);
        return;
    }

    drawNet();

    //draws the player1 pallet
    colorRect(0, paddle1Y, PADDLE_THICKNESS, PADDLE_HEIGHT, 'white');

    //draws the player2(computer) pallet
    colorRect(canvas.width - PADDLE_THICKNESS, paddle2Y, 10, PADDLE_HEIGHT, 'white');

    //center the object
    //colorRect(ballX, canvas.height / 2, 20, 20, 'red');
    /*canvasContext.fillStyle = 'white';
    canvasContext.fillRect(700, 500, 10, 100);*/


    // creating a ball
    colorCircle(ballX, ballY, 10, 'white');



    //Writting text on the canvas
    canvasContext.fillText(player1Score, 100, 100);
    canvasContext.fillText(player2Score, canvas.width - 100, 100);



}

function colorCircle(centerX, centerY, raduis, drawColor) {
    // creating a ball
    canvasContext.fillStyle = drawColor;
    canvasContext.beginPath();
    canvasContext.arc(centerX, centerY, raduis, 0, Math.PI * 2, true);
    canvasContext.fill();
}




//creating a func to keep the box properties whc we call in drawEverthing
function colorRect(leftX, topY, width, height, drawColor) {
    canvasContext.fillStyle = drawColor;
    canvasContext.fillRect(leftX, topY, width, height);
}