class Projectile {
    constructor(x, y, speed, color) {
        this.x = x
        this.y = y
        this.speed = speed
        this.size = 7
        this.color = color
    }

    draw() {
        noStroke()
        fill(this.color)
        circle(this.x, this.y, this.size)
    }

    update() {
        this.y += this.speed
    }

    collisionedWithPlayer(player) {
        return player.x < this.x && this.x < player.x + player.width && player.y < this.y && this.y < player.y + player.height
    }

    collisionedWithInvader(invasion) {
        return this.outOfBounds() || this.collisionInvader(invasion)
    }

    collisionInvader(invasion) {
        let i = 0
        for (let invader of invasion.invaders) {
            if (this.isInsideInvader(invasion, invader)) {
                invasion.invaders.splice(i, 1)
                invasion.invaderDied()
                return true
            }
            i++
        }
        return false
    }

    outOfBounds() {
        return this.y > height || 0 > this.y
    }

    isInsideInvader(invasion, invader) {
        return invader.position.x < this.x && this.x < invader.position.x + invasion.invaderWidth &&
            invader.position.y + invasion.y < this.y && this.y < invader.position.y + invasion.y + invasion.invaderHeight
    }

}