export class Player {
    constructor(x, y, model, umbrellaModel) {
        this.x = x;
        this.y = y;
        this.modelSrc = model
        this.umbrellaBoolean = umbrellaModel
    }

    draw() {
        model.src = this.modelSrc;
        umbrellaModel.src = this.umbrellaBoolean;
        ctx.drawImage(model, this.x + 3, this.y - 46)
        if (firstPlayer.umbrella == true)
            ctx.drawImage(umbrellaModel, this.x - 6, this.y - 60)
    }
}

export default Player