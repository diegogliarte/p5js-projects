class AI extends Player {
    constructor(gameManager, ball) {
        super(gameManager)
        this.ball = ball
        this.x = width - this.width * 2
        this.y = height / 2
        this.color = "#F05454"
        this.speed = 2.5
    }

    checkScored(ball) {
        if (ball.position.x < -ball.radius) {
            this.gameManager.playerScored = false
            this.scored()
        }
    }

    generateY() {
        let movement = this.y
        // let speed = constrain(this.speed * ((this.x - ball.position.x) / width), 5, this.speed)
        let speed = this.speed
        if (this.y - speed > this.ball.position.y) {
            movement -= speed

        } else if (this.y + speed < this.ball.position.y) {
            movement += speed
        }
        let constraint = constrain(movement, this.movementHeight, height - this.movementHeight)
        return constraint
    }


}