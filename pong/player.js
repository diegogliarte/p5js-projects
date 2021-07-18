class Player {
    constructor(gameManager) {
        this.gameManager = gameManager
        this.score = 0
        this.width = 20
        this.height = 100
        this.x = this.width * 2
        this.color = "#346751"
        this.betterExperience = 0.8
        this.movementHeight = this.height / 2 * this.betterExperience
        this.y = height / 2
    }

    checkScored(ball) {
        if (ball.position.x > width + ball.radius) {
            this.gameManager.playerScored = true
            this.scored()
        }
    }

    scored() {
        this.score++
        this.gameManager.updateTime()
        this.gameManager.changeState(this.gameManager.states.GOAL)
    }

    drawScore(x) {
        noStroke()
        fill(this.color)
        text(this.score, x, 100)
    }

    drawRacket() {
        this.y = this.generateY()
        fill(this.color)
        noStroke()
        rectMode(CENTER)
        rect(this.x, this.y, this.width, this.height * this.betterExperience)
    }

    generateY() {
        return constrain(mouseY, this.movementHeight, height - this.movementHeight)
    }
}