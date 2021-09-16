import {
    v
} from './variables.js'

window.c = document.getElementById("canvas")
window.ctx = c.getContext("2d")
window.model = new Image
window.umbrellaModel = new Image
window.firstPlayer = {
    x: v.firstPlayerX,
    y: v.playerY,
    umbrella: v.firstPlayerUmbrellaState
}
window.secondPlayer = {
    x: v.secondPlayerX,
    y: v.playerY,
    umbrella: v.secondPlayerUmbrellaState
}

import Ball from './Ball.js'
import Player from './Player.js'

c.height = window.innerHeight * 0.87;
c.width = window.innerWidth * 0.85;

function collisionCheck(player) {
    if (player.x <= 0)
        player.x = 0
    if (player.x >= c.width - 82)
        player.x = c.width - 62
}

function moveLeft(player) {
    player.x -= v.moveSpeed;
}

function moveRight(player) {
    player.x += v.moveSpeed;
}

function useUmbrella(player, state) {
    player.umbrella = state
}

window.addEventListener("keydown", function (e) {
    switch (e.key) {
        case "ArrowLeft":
            moveLeft(firstPlayer)
            collisionCheck(firstPlayer)
            break;
        case "ArrowRight":
            moveRight(firstPlayer)
            collisionCheck(firstPlayer)
            break;
        case "ArrowUp":
            useUmbrella(firstPlayer, true)
            break;
        case "ArrowDown":
            useUmbrella(firstPlayer, false)
            break;
    }
});

let selectColor = ["green", "green", "green", "red"];

let player1 = new Player(c.width / 2 - 30, c.height - 50, "player1.png", "umbrella1.png");
let player2 = new Player(c.width / 2 - 30, c.height - 50, "player1.png", "umbrella1.png");


for (let scoreCount = 0; scoreCount < 1000; scoreCount++) {
    v.y -= 300;
    var x = Math.random() * (c.width - 10) + 10;
    var r = Math.random() * 5 + 10;
    var randColor = selectColor[Math.floor(Math.random() * (selectColor.length))];
    var dy = v.dy1;
    v.array.push(new Ball(x, v.y, r, randColor, dy));
    if (scoreCount % 100 == 0 && scoreCount != 0) {
        v.dy1 += 0.1;
    }
}

animate();

function usePlayer(user, player) {
    user.draw();
    user.x = player.x;
    user.x1 = player.x;
    user.x2 = player.x + 60;
    user.x3 = player.x + 60;
}

function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, innerWidth, innerHeight);
    ctx.font = "19px Arial";
    ctx.fillStyle = "black";
    ctx.fillText("SCORE:", 10, 22);
    ctx.font = "19px Arial";
    ctx.fillText(v.score, 90, 22);
    ctx.font = "60px Arial";
    ctx.strokeStyle = 'lightgrey';
    ctx.strokeText('Catch The Ball', c.width / 2 - c.width / 4, 290);
    usePlayer(player1, firstPlayer)
    usePlayer(player2, secondPlayer)

    for (let ballData = 0; ballData < v.array.length; ballData++) {
        v.array[ballData].update();
    }
    for (var ballData = 0; ballData < v.array.length; ballData++) {
        v.cond = (player1.y - 40) - (v.array[ballData].y + v.array[ballData].r) <= 0 &&
            (v.array[ballData].x - v.array[ballData].r + 2) >= (player1.x) &&
            (v.array[ballData].x + v.array[ballData].r - 2) <= (player1.x3) ||
            (player2.y - 40) - (v.array[ballData].y + v.array[ballData].r) <= 0 &&
            (v.array[ballData].x - v.array[ballData].r + 2) >= (player2.x) &&
            (v.array[ballData].x + v.array[ballData].r - 2) <= (player2.x3)
        if (v.cond) {
            v.array[ballData].y = -10000000;
            v.array[ballData].r = 0;
            player1.color = v.array[ballData].color;
            if (player1.color == "red" && firstPlayer.umbrella == false || player2.color == "red" && secondPlayer.umbrella)
                v.score -= 2
            if (player1.color == "green" && firstPlayer.umbrella == true || player2.color == "green" && secondPlayer.umbrella)
                v.score -= 2
            v.score++;
        }
        if (v.score < 0 || v.array[ballData].y >= c.height) {
            v.array[ballData].y = -10000000;
            v.array[ballData].r = 0;
            gameOver();
        }
    }
}

function gameOver() {
    document.getElementById('endBox').style.display = 'block';
    document.getElementById('gamePage').style.opacity = '0.2';
    document.getElementById('score').innerHTML = v.score;
    c.clearRect
}