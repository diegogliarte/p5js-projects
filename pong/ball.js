class Ball {
    constructor() {
        this.position = createVector(width / 2, height / 2)
        this.direction = createVector(1, 0)
        this.speed = 5
        this.radius = 15
    }

    reset(player = false) {
        this.position = createVector(width / 2, height / 2)
        this.direction = createVector(random(-1, 1), random(-1, 1))
        if (this.direction.x < 0.3 || this.direction.y < 0.3 || this.direction.x > 0.7 || this.direction.y > 0.7) {
            this.reset()
        }
        this.direction.x = player ? abs(this.direction.x) * -1 : abs(this.direction.x)
    }

    update() {
        let velocity = this.direction.normalize().mult(this.speed)
        this.position.add(velocity)
    }

    bounceWall() {
        if (this.position.y - this.radius <= 0 || this.position.y + this.radius > height) {
            this.direction.y *= -1

        }
    }

    bounceRacket(racket) {
        let ballX
        let left = racket.x - racket.width / 2
        let right = racket.x + racket.width / 2

        if (this.direction.x > 0) {
            ballX = this.position.x + this.radius
        } else {
            ballX = this.position.x - this.radius
        }
        let top = racket.y - racket.height / 2
        let down = racket.y + racket.height / 2
        if (this.position.y < top || down < this.position.y || ballX < left || right < ballX) {
            return
        }
        this.direction.x *= -1
        let distance = (this.position.y - racket.y) / racket.height * 2
        this.direction.y = distance * 5 // More pronounced angle by multiplying number
    }

    draw() {
        fill("#222831")
        circle(this.position.x, this.position.y, this.radius * 2)
    }


}