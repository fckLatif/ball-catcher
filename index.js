let cond = 0;
let score = 0;
let y = 0;
let array = [];
let dy1 = 2.8;

let c = document.getElementById("canvas");
let ctx = c.getContext("2d");
c.height = window.innerHeight * 0.87;
c.width = window.innerWidth * 0.85;

let player = {
    x: 10,
    y: 10,
    umbrella: false
};

window.addEventListener("keydown", function (e) {
    switch (e.key) {
        case "ArrowLeft":
            player.x -= 25;
            break;
        case "ArrowRight":
            player.x += 25;
            break;
        case "ArrowUp":
            player.umbrella = true;
            break;
        case "ArrowDown":
            player.umbrella = false;
            break;
    }
});

let selectColor = ["green", "green", "green", "red"];

class Ball {
    constructor(x, y, r, color, dy) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.color = color;
        this.dy = dy;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.lineWidth = "1";
        ctx.stroke();
    }

    update() {
        this.draw();
        this.y += this.dy;
    }
}

class Player {
    constructor(x, y, model, umbrellaModel) {
        this.x = x;
        this.y = y;
        this.modelSrc = model
        this.umbrellaBoolean = umbrellaModel
    }

    draw() {
        var model = new Image;
        var umbrellaModel = new Image;
        model.src = this.modelSrc;
        umbrellaModel.src = this.umbrellaBoolean;
        ctx.drawImage(model, this.x + 3, this.y - 46)
        if (player.umbrella == true)
            ctx.drawImage(umbrellaModel, this.x - 6, this.y - 60)
    }
}

let player1 = new Player(c.width / 2 - 30, c.height - 50, "player1.png", "umbrella1.png");
console.log(c.width / 2 - 30);

for (let scoreCount = 0; scoreCount < 1000; scoreCount++) {
    y -= 300;
    var x = Math.random() * (c.width - 10) + 10;
    var r = Math.random() * 5 + 10;
    var randColor = selectColor[Math.floor(Math.random() * (selectColor.length))];
    var dy = dy1;
    array.push(new Ball(x, y, r, randColor, dy));
    if (score % 10 == 0 && score != 0) {
        dy1 += 0.1;
    }
}

animate();

function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, innerWidth, innerHeight);
    ctx.font = "19px Arial";
    ctx.fillStyle = "black";
    ctx.fillText("SCORE:", 10, 22);
    ctx.font = "19px Arial";
    ctx.fillText(score, 90, 22);
    ctx.font = "60px Arial";
    ctx.strokeStyle = 'lightgrey';
    ctx.strokeText('Catch The Ball', c.width / 2 - c.width / 4, 290);
    player1.draw();
    player1.x = player.x;
    player1.x1 = player.x;
    player1.x2 = player.x + 60;
    player1.x3 = player.x + 60;

    for (let ballData = 0; ballData < array.length; ballData++) {
        array[ballData].update();
    }
    for (var ballData = 0; ballData < array.length; ballData++) {
        cond = (player1.y - 40) - (array[ballData].y + array[ballData].r) <= 0 && (array[ballData].x - array[ballData].r + 2) >= (player1.x) &&
            (array[ballData].x + array[ballData].r - 2) <= (player1.x3)
        if (cond) {
            array[ballData].y = -10000000;
            array[ballData].r = 0;
            player1.color = array[ballData].color;
            if (player1.color == "red" && player.umbrella == false)
                score -= 2
            if (player1.color == "green" && player.umbrella == true)
                score -= 2
            score++;
        }
        if (score < 0 || array[ballData].y >= c.height) {
            array[ballData].y = -10000000;
            array[ballData].r = 0;
            if (array[ballData].color != "red")
                gameOver();
        }
    }
}

function gameOver() {
    document.getElementById('endBox').style.display = 'block';
    document.getElementById('gamePage').style.opacity = '0.2';
    document.getElementById('score').innerHTML = score;
}