class Invasion {
    constructor(rows, columns, gameManager, player) {
        this.rows = rows
        this.columns = columns
        this.gameManager = gameManager
        this.player = player
        this.invaderWidth = 44
        this.invaderHeight = 32
        this.x = 10
        this.y = 10
        this.speed = 0.35
        this.speedIncrement = 0.01
        this.direction = 1
        this.margin = 5
        this.invaders = this.createInvaders()
        this.totalInvaders = this.invaders.length
        this.deadInvaders = 0
        this.color = "#F05454"
        this.setTimeToShoot()
        this.projectile = null
    }

    shoot() {
        if (this.projectile) {
            this.projectile.draw();
            this.projectile.update();
            if (this.projectile.outOfBounds()) {
                this.projectile = null
            } else if (this.projectile.collisionedWithPlayer(this.player)) {
                this.player.alive = false
            }

        } else if (millis() > this.timeToShoot) {
            this.setTimeToShoot()
            let shooter = random(this.invaders)
            this.projectile = new Projectile(
                shooter.position.x,
                shooter.position.y + this.invaderHeight + this.y,
                +5,
                this.color
            )
        }
    }

    setTimeToShoot() {
        this.timeToShoot = millis() + random(1500, 5000)
    }

    createInvaders() {
        let invaders = []
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.columns; j++) {
                invaders.push(new Invader(this.x + (this.invaderWidth + this.margin) * j, 35 * i, this))
            }
        }
        return invaders
    }

    invadersDraw() {
        for (let invader of this.invaders) {
            invader.draw()
        }
    }

    invadersUpdate() {
        for (let invader of this.invaders) {
            invader.update()
        }
    }

    invadersBounce() {
        for (let invader of this.invaders) {
            if (invader.bounce()) {
                this.direction *= -1
                this.y += this.invaderHeight / 2
                return
            }
        }
    }

    checkLoseWinConditions() {
        if (this.deadInvaders == this.totalInvaders) {
            this.gameManager.updateTime()
            this.gameManager.changeState(this.gameManager.states.WON)
        } else if (this.gameManager.state != this.gameManager.states.LOST && (this.invaderTooLow() || !this.player.alive)) {
            this.gameManager.updateTime()
            this.gameManager.changeState(this.gameManager.states.LOST)
        }
    }

    invaderTooLow() {
        // Since we know that the last invader of the list will be also the southest invader, we only need to check for
        // this last one
        let y = this.invaders[this.invaders.length - 1].position.y + this.y
        return y >= height - 100
    }


    invaderDied() {
        this.deadInvaders++
        this.speed += this.speedIncrement * this.deadInvaders / 2
    }

}