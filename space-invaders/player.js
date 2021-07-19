class Player {
    constructor(x, width, speed, gameManager) {
        this.gameManager = gameManager
        this.x = x
        this.width = width
        this.height = width * 0.2
        this.y = height - this.height
        this.speed = speed
        this.canShoot = true
        this.projectile = null
        this.color = "#346751"
        this.alive = true
    }

    draw() {
        noStroke()
        fill(this.color)
        rect(this.x, this.y, this.width, this.height)
        rect(this.x + this.width / 2.5, this.y - this.height + 1, this.height, this.height)
    }

    input(forceLeft=false, forceRight=false) {
        if (keyIsDown(LEFT_ARROW) || forceLeft) {
            this.move(-1)
        } else if (keyIsDown(RIGHT_ARROW) || forceRight) {
            this.move(1)
        }
    }

    shoot() {
        this.projectile = new Projectile(this.x + this.width / 2, this.y - this.height, -5, this.color)
    }

    projectileDraw() {
        this.projectile.draw()
    }

    projectileUpdate() {
        this.projectile.update()
    }

    projectileCollisioned(invasion) {
        if (this.projectile.collisionedWithInvader(invasion)) {
            this.canShoot = true
            this.projectile = null
            this.gameManager.changeState(this.gameManager.states.MOVING)
        }
    }


    move(direction) {
        let x = this.x + this.speed * direction
        this.x = constrain(x, 0, width - this.width)
    }
}