const canvas = document.getElementById('gameCanvas');
const context = canvas.getContext('2d');

const playerWidth = 15;
const playerHeight = 100;
const ballSize = 15;

let player1Y = canvas.height / 2 - playerHeight / 2;
let player2Y = canvas.height / 2 - playerHeight / 2;
let ballX = canvas.width / 2;
let ballY = canvas.height / 2;
let ballSpeedX = 4;
let ballSpeedY = 4;

const playerSpeed = 5;
let upArrowPressed = false;
let downArrowPressed = false;
let wKeyPressed = false;
let sKeyPressed = false;

document.addEventListener('keydown', function(event) {
    switch(event.keyCode) {
        case 38: // up arrow
            upArrowPressed = true;
            break;
        case 40: // down arrow
            downArrowPressed = true;
            break;
        case 87: // w key
            wKeyPressed = true;
            break;
        case 83: // s key
            sKeyPressed = true;
            break;
    }
});

document.addEventListener('keyup', function(event) {
    switch(event.keyCode) {
        case 38: // up arrow
            upArrowPressed = false;
            break;
        case 40: // down arrow
            downArrowPressed = false;
            break;
        case 87: // w key
            wKeyPressed = false;
            break;
        case 83: // s key
            sKeyPressed = false;
            break;
    }
});

function drawRect(x, y, width, height, color) {
    context.fillStyle = color;
    context.fillRect(x, y, width, height);
}

function drawBall(x, y, size, color) {
    context.fillStyle = color;
    context.beginPath();
    context.arc(x, y, size, 0, Math.PI * 2, false);
    context.closePath();
    context.fill();
}

function update() {
    if (wKeyPressed && player1Y > 0) {
        player1Y -= playerSpeed;
    }
    if (sKeyPressed && player1Y < canvas.height - playerHeight) {
        player1Y += playerSpeed;
    }
    if (upArrowPressed && player2Y > 0) {
        player2Y -= playerSpeed;
    }
    if (downArrowPressed && player2Y < canvas.height - playerHeight) {
        player2Y += playerSpeed;
    }

    ballX += ballSpeedX;
    ballY += ballSpeedY;

    if (ballY <= 0 || ballY >= canvas.height - ballSize) {
        ballSpeedY = -ballSpeedY;
    }

    if ((ballX <= playerWidth && ballY >= player1Y && ballY <= player1Y + playerHeight) ||
        (ballX >= canvas.width - playerWidth - ballSize && ballY >= player2Y && ballY <= player2Y + playerHeight)) {
        ballSpeedX = -ballSpeedX;
    }

    if (ballX <= 0 || ballX >= canvas.width) {
        ballX = canvas.width / 2;
        ballY = canvas.height / 2;
        ballSpeedX = -ballSpeedX;
        ballSpeedY = 4;
    }
}

function render() {
    context.clearRect(0, 0, canvas.width, canvas.height);

    drawRect(0, player1Y, playerWidth, playerHeight, 'white');
    drawRect(canvas.width - playerWidth, player2Y, playerWidth, playerHeight, 'white');
    drawBall(ballX, ballY, ballSize, 'white');
}

function gameLoop() {
    update();
    render();
    requestAnimationFrame(gameLoop);
}

gameLoop();