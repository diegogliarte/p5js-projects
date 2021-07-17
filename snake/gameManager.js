class GameManager {

    constructor() {
        this.states = {
            PLAYING: 0,
            LOST: 1,
            WAITING: 2,
        }
        this.state = this.states.PLAYING
        this.cells = 25 // Only works with certain numbers. If "size" ends up being a float, there are problems
        this.size = width / this.cells
        this.gameSpeed = 12 // FPS. The more, the faster
        this.initialSize = 3
        this.pendingKeyCode = 39
        this.directions = {
            37: [-this.size, 0], // Left
            38: [0, -this.size], // Up
            39: [this.size, 0], // Right
            40: [0, this.size], // Down
        }
        this.direction = this.directions[this.pendingKeyCode]
        this.time = millis()
    }

    changeState(state) {
        this.state = state
    }

    updateDirection() {
        this.direction = this.directions[this.pendingKeyCode]
    }

    checkLost(snake) {
        if (snake.isOutside(this.direction) || snake.isInsideSnake(this.direction)) {
            this.changeState(this.states.LOST)
            return true
        }
        return false
    }

    updateTime(ms = 0) {
        this.time = millis() + ms
    }

    nextFrame() {
        return millis() - this.time >= 1000 / this.gameSpeed
    }
}