function setup() {
    let canvas = createCanvas(500, 500)
    let x = (windowWidth - width) / 2
    let y = (windowHeight - height) / 2
    canvas.position(x, y)
    textSize(32)
    textAlign(CENTER)
    textFont("Encode Sans SC")
    text("", 0, 0) // I don't know why but the first text displayed doesn't have the font, so we first display this one
    startGame()
}

function draw() {
    if (!gameManager.nextFrame()) { // Controls framerate
        return
    }
    gameManager.updateDirection()
    background("#DDDDDD");
    switch (gameManager.state) {
        case gameManager.states.PLAYING:
            if (!gameManager.checkLost(snake)) {
                snake.update(gameManager.direction)
            }
            snake.draw()
            snake.checkEaten(apple)
            apple.draw()
            gameManager.updateTime()
            break
        case gameManager.states.LOST:
            apple.draw()
            snake.draw()
            fill("#222831")
            stroke("#222831")
            text("You ate " + (snake.body.length - gameManager.initialSize) + " apples", width / 2, height / 2);
            gameManager.updateTime(1500)
            gameManager.changeState(gameManager.states.WAITING)
            break
        case gameManager.states.WAITING:
            startGame()
    }
}

function keyPressed() {
    if (gameManager.state == gameManager.states.WAITING || !Object.keys(gameManager.directions).includes(String(keyCode))) {
        return
    }
    let point = addPoints(gameManager.direction, gameManager.directions[keyCode])
    if (!(point[0] == 0 && point[1] == 0)) {
        gameManager.pendingKeyCode = keyCode
    }
}


function startGame() {
    gameManager = new GameManager()
    snake = new Snake([0, floor(gameManager.cells / 2) * gameManager.size], gameManager.size, gameManager.initialSize)
    apple = new Apple(gameManager.cells, gameManager.size, snake)
}

function addPoints(a, b) {
    return [a[0] + b[0], a[1] + b[1]]
}

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

class Snake {
    color = "#346751"

    constructor(head, size, initialSize) {
        this.head = head
        this.size = size
        this.body = []
        for (let i = 0; i < initialSize; i++) {
            this.body.push([])
        }
    }

    update(direction) {
        this.body.unshift(this.head)
        this.body.pop()
        this.head = addPoints(direction, this.head)
    }

    draw() {
        fill(this.color)
        stroke(this.color)
        rect(this.head[0], this.head[1], this.size, this.size)
        for (let i = 0; i < this.body.length; i++) {
            if (this.body[i].length > 0) {
                rect(this.body[i][0], this.body[i][1], this.size, this.size)
            }
        }
    }

    checkEaten(apple) {
        if (floor(this.head[0]) == floor(apple.x) && floor(this.head[1]) == floor(apple.y)) {
            this.body.push([])
            apple.update()
        }
    }

    isOutside(direction) {
        let head = addPoints(direction, this.head)
        return Math.trunc(head[0]) < 0 || floor(head[0]) > floor(width - this.size) ||
            Math.trunc(head[1]) < 0 || floor(head[1]) > floor(height - this.size)
    }

    isInsideSnake(direction) {
        let head = addPoints(direction, this.head)
        for (let i = 0; i < this.body.length; i++) {
            if (this.body[i].length > 0 && head[0] == this.body[i][0] && head[1] == this.body[i][1]) {
                return true
            }
        }
        return false
    }
}

class Apple {
    color = "#F05454"

    constructor(cells, size, snake) {
        this.cells = cells
        this.size = size
        this.snake = snake
        this.update()
    }

    update() {
        this.x = floor(random(this.cells)) * this.size
        this.y = floor(random(this.cells)) * this.size
        for (let i = 0; i < this.snake.body.length; i++) {
            if (this.snake.body[i][0] == this.x && this.snake.body[i][1] == this.y) {
                this.update()
            }
        }
    }

    draw() {
        fill(this.color)
        stroke(this.color)
        rect(this.x, this.y, this.size, this.size)
    }
}