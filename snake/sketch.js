function setup() {
    let canvas = createCanvas(500, 500)
    let x = (windowWidth - width) / 2
    let y = (windowHeight - height) / 2
    canvas.position(x, y)
    textFont("Encode Sans SC")
    textSize(32)
    textAlign(CENTER)
    text("", 0, 0) // I don't know why but the first text displayed doesn't have the font, so we first display this one
    // Since I Pause the game when the image is show, I need to do this
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

function swiped() {
    print("swiped")
}

function touchStarted() {
    mouseStarted = createVector(mouseX, mouseY)
}

function touchEnded() {
    mouseEnded = createVector(mouseX, mouseY)
    let swipe = mouseEnded.sub(mouseStarted)
    if (abs(swipe.x) > abs(swipe.y)) { // Horizontal swipe
        gameManager.pendingKeyCode = swipe.x > 0 ? 39 : 37
    } else { // Vertical swipe
        gameManager.pendingKeyCode = swipe.y > 0 ? 40 : 38
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
