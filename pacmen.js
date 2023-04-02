var pos = 0;
const pacArray = [
    ['./images/PacMan1.png', './images/PacMan2.png'],
    ['./images/PacMan3.png', './images/PacMan4.png'],
];
var direction = 0;
const pacMen = [];
let gameStatus = "stopped";

function setToRandom(scale) {
    return {
        x: Math.random() * scale,
        y: Math.random() * scale,
    };
}

function makePac() {
    let velocity = setToRandom(10);
    let position = setToRandom(600);
    let game = document.getElementById('game');
    let newimg = document.createElement('img');
    newimg.style.position = 'absolute';
    let rowIndex = Math.floor(Math.random() * pacArray.length);
    let colIndex = Math.floor(Math.random() * pacArray[rowIndex].length);
    newimg.src = pacArray[rowIndex][colIndex];
    newimg.width = 100;
    newimg.style.left = position.x + "px";
    newimg.style.top = position.y + "px";
    game.appendChild(newimg);
    return {
        position,
        velocity,
        newimg,
        rowIndex,
    };
}

function update() {
    if (gameStatus === "running") {
        pacMen.forEach((item) => {
            checkCollisions(item);
            item.position.x += item.velocity.x;
            item.position.y += item.velocity.y;

            item.newimg.style.left = item.position.x + "px";
            item.newimg.style.top = item.position.y + "px";
        });
    }
    setTimeout(update, 20);
}

function checkCollisions(item) {
    if (
        item.position.x + item.velocity.x + item.newimg.width > window.innerWidth ||
        item.position.x + item.velocity.x < 0
    )
        item.velocity.x = -item.velocity.x;
    if (
        item.position.y + item.velocity.y + item.newimg.height > window.innerHeight ||
        item.position.y + item.velocity.y < 0
    )
        item.velocity.y = -item.velocity.y;
}

function makeOne() {
    pacMen.push(makePac());
}

function toggleGame() {
    const startGameButton = document.getElementById("startGame");
    if (gameStatus === "stopped") {
        gameStatus = "running";
        startGameButton.innerHTML = "Stop Game";
    } else {
        gameStatus = "stopped";
        startGameButton.innerHTML = "Start Game";
    }
}

document.getElementById("addPacMan").addEventListener("click", makeOne);
document.getElementById("startGame").addEventListener("click", toggleGame);

update();
