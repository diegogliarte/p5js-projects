class Pipe {
    constructor() {
        this.width = 40
        this.margin = 50
        this.speed = 4
        this.holeSize = random(100, 150)
        this.x = width + this.width
        this.holeY = random(this.margin, height - this.margin - this.holeSize)
    }

    draw() {
        noStroke()
        fill("#F05454")
        rect(this.x, 0, this.width, this.holeY)
        rect(this.x, this.holeY + this.holeSize, this.width, height)
    }

    update() {
        this.x -= this.speed
    }
}