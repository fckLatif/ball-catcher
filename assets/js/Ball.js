export class Ball {
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

export default Ball