const playBoard = document.querySelector(".play-board");
const scoreElement = document.querySelector(".score");
const highScoreElement = document.querySelector(".high-score");


let foodX, foodY;
let snakeX = 10, snakeY = 15; 
let snakeBody = [];
let velocityX = 0, velocityY = 0;
let gameOver = false;
let setIntervalId;
let score = 0;

let highScore = localStorage.getItem("high-score") || 0;
highScoreElement.innerHTML = `High Score: ${highScore}`;

const changeFoodPosition = () => {
    foodX  = Math.floor(Math.random() * 30) +1;
    foodY  = Math.floor(Math.random() * 30) +1;
}

const handleGameOver= () => {
    clearInterval(setIntervalId);
    alert("game over. Press Ok to replay ... ")
    location.reload();
}
const changeDirection = (e) => {
    switch (e.key) {
        case "ArrowUp":
            if (velocityY != 1) {
                velocityX = 0;
                velocityY = -1;
            }
            break;
        case "ArrowDown":
            if (velocityY != -1) {
                velocityX = 0;
                velocityY = 1;
            }
            break;
        case "ArrowRight":
            if (velocityX != -1) {
                velocityX = 1;
                velocityY = 0;
            }
            break;
        case "ArrowLeft":
            if (velocityX != 1) {
                velocityX = -1;
                velocityY = 0;
            }
            break;
        default:
            break;
    }
    initGame();
}

const initGame = () => { 
    if (gameOver) {
        return handleGameOver();
    }
    let htmlMarkup = ` <div class="food" style="grid-area: ${foodY} / ${foodX}"></div>`;


    if (snakeX === foodX && snakeY === foodY) {
        changeFoodPosition();
        snakeBody.push([foodX, foodY]);
        score++;

        highScore = score > highScore ? score: highScore;
        localStorage.setItem("high-score", highScore);

        scoreElement.innerHTML = `Score ${score}`;
        highScoreElement.innerHTML = `High Score: ${highScore}`;
    }

    for (let i = snakeBody.length -1 ; i > 0; i--) {
            snakeBody[i] = snakeBody[i-1];        
    }

    snakeBody[0] = [snakeX, snakeY];


    snakeY += velocityY;
    snakeX += velocityX;
    if( snakeX <= 0){
        snakeX = 30;
    }
    if( snakeX > 30){
        snakeX = 1;
    }
    if( snakeY <= 0){
        snakeY = 30;
    }
    if( snakeY > 30){
        snakeY = 1;
    }

    if (snakeX <= 0 || snakeX > 30 || snakeY <= 0 || snakeY > 30) {
        console.log("game over");
        // gameOver = true;
        
    }
    // htmlMarkup += ` <div class="head" style="grid-area: ${snakeY} / ${snakeX}"></div>`;

    for (let i = 0; i < snakeBody.length; i++) {
        htmlMarkup += ` <div class="head" style="grid-area: ${snakeBody[i][1]} / ${snakeBody[i][0]}"></div>`;
        if (i != 0 && snakeBody[0][1] === snakeBody[i][1] && snakeBody[0][0] === snakeBody[i][0]) {
            gameOver = true;            
        }
    }


    playBoard.innerHTML = htmlMarkup;
}
changeFoodPosition();
setIntervalId = setInterval(initGame, 125);
document.addEventListener("keydown", changeDirection);
