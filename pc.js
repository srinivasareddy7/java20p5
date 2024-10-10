const canvas = document.getElementById("pong");
const ctx = canvas.getContext("2d");

const paddleWidth = 10;
const paddleHeight = 100;
const ballSize = 10;

let player1 = {
    x: 0,
    y: canvas.height / 2 - paddleHeight / 2,
    width: paddleWidth,
    height: paddleHeight,
    color: "#fff",
    score: 0
};

let player2 = {
    x: canvas.width - paddleWidth,
    y: canvas.height / 2 - paddleHeight / 2,
    width: paddleWidth,
    height: paddleHeight,
    color: "#fff",
    score: 0
};

let ball = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    size: ballSize,
    speedX: 4,
    speedY: 4,
    color: "#fff"
};

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw paddles
    ctx.fillStyle = player1.color;
    ctx.fillRect(player1.x, player1.y, player1.width, player1.height);
    
    ctx.fillStyle = player2.color;
    ctx.fillRect(player2.x, player2.y, player2.width, player2.height);
    
    // Draw ball
    ctx.fillStyle = ball.color;
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.size, 0, Math.PI * 2, false);
    ctx.fill();
}

function update() {
    ball.x += ball.speedX;
    ball.y += ball.speedY;

    // Ball collision with top and bottom
    if (ball.y + ball.size >= canvas.height || ball.y - ball.size <= 0) {
        ball.speedY = -ball.speedY;
    }

    // Ball collision with paddles
    if (ball.x - ball.size <= player1.x + player1.width && ball.y > player1.y && ball.y < player1.y + player1.height) {
        ball.speedX = -ball.speedX;
    }
    if (ball.x + ball.size >= player2.x && ball.y > player2.y && ball.y < player2.y + player2.height) {
        ball.speedX = -ball.speedX;
    }

    // Reset ball if it goes out of bounds
    if (ball.x < 0) {
        player2.score++;
        resetBall();
    }
    if (ball.x > canvas.width) {
        player1.score++;
        resetBall();
    }
}

function resetBall() {
    ball.x = canvas.width / 2;
    ball.y = canvas.height / 2;
    ball.speedX = 4 * (Math.random() < 0.5 ? 1 : -1);
    ball.speedY = 4 * (Math.random() < 0.5 ? 1 : -1);
}

function movePaddle(event) {
    const key = event.key;
    if (key === "w" && player1.y > 0) {
        player1.y -= 20;
    }
    if (key === "s" && player1.y < canvas.height - paddleHeight) {
        player1.y += 20;
    }
    if (key === "ArrowUp" && player2.y > 0) {
        player2.y -= 20;
    }
    if (key === "ArrowDown" && player2.y < canvas.height - paddleHeight) {
        player2.y += 20;
    }
}

function gameLoop() {
    draw();
    update();
    requestAnimationFrame(gameLoop);
}

document.addEventListener("keydown", movePaddle);
gameLoop();
