class Bird {
    constructor() {
        this.x = width / 4
        this.y = height / 3
        this.size = 30
        this.betterExperience = 0.9
        this.radius = this.size / 2 * this.betterExperience
        this.velocity = 0
        this.gravity = -0.25
        this.jump = 5
        this.score = 0
        this.lastPipe = null
    }

    flap() {
        this.velocity = this.jump
    }

    draw() {
        noStroke()
        fill("#346751")
        circle(this.x, this.y, 30)
    }

    update() {
        this.velocity = this.velocity + this.gravity
        this.y = constrain(this.y - this.velocity, -1, height + 1)
    }

    hasDied(pipe) {
        if (this.outOfLimits()) {
            this.velocity = 0
            return true
        }
        if (this.collisioned(pipe)) {
            return true
        }
        return false
    }

    outOfLimits() {
        return this.y < 0 || this.y > height
    }

    collisioned(pipe) {
        if (!pipe) {
            return false
        }
        let sameX = pipe.x <= this.x + this.radius && this.x - this.radius <= pipe.x + pipe.width
        let sameY = this.y - this.radius < pipe.holeY || this.y + this.radius > pipe.holeY + pipe.holeSize
        return sameX && sameY
    }

    checkScore(pipe) {
        if (pipe && pipe != this.lastPipe && this.x > pipe.x + pipe.width) {
            this.score++
            this.lastPipe = pipe
        }
    }

}