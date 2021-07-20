function setup() {
    let canvas = createCanvas(500, 500)
    let x = (windowWidth - width) / 2
    let y = (windowHeight - height) / 2
    canvas.position(x, y)
    startGame()
    textFont("Encode Sans SC")
    textSize(32)
    textAlign(CENTER)
}

function draw() {
    background("#DDDDDD")
    drawPipes()
    bird.draw()
    bird.update()
    drawScore()
    switch (gameManager.state) {
        case gameManager.states.PLAYING:
            updatePipes()
            createPipes()
            deletePipes()
            bird.checkScore(pipes[0])
            if (bird.hasDied(pipes[0])) {
                gameManager.updateTime(1600)
                gameManager.changeState(gameManager.states.LOST)
            }
            break
        case gameManager.states.LOST:
            fill("#222831")
            text("Game Over", width / 2, height / 2)
            if (millis() >= gameManager.time) {
                startGame()
            }

    }
}

function startGame() {
    gameManager = new GameManager()
    gameManager.updateTime(2000)
    bird = new Bird()
    pipes = []
}

function keyPressed() {
    if (key == " " && gameManager.state == gameManager.states.PLAYING) {
        bird.flap()
    }
}

function mousePressed() {
    if (!gameManager.flapped && gameManager.state == gameManager.states.PLAYING) {
        bird.flap()
    }
    gameManager.flapped = false
}

// Bit of a hack. In touchscreen it's being detected touchStarted, touchReleased, mousePressed, mouseReleased in this
// order. With the flapped flag we make sure that it flaps only once

function touchStarted() {
    if (!gameManager.flapped && gameManager.state == gameManager.states.PLAYING) {
        bird.flap()
        gameManager.flapped = true
    }
}



function createPipe() {
    pipes.push(new Pipe())
}

function drawPipes() {
    for (let pipe of pipes) {
        pipe.draw()
    }
}

function createPipes() {
    if (millis() >= gameManager.time) {
        gameManager.updateTime(1500)
        pipes.push(new Pipe())
    }
}

function updatePipes() {
    for (let pipe of pipes) {
        pipe.update()
    }
}

function deletePipes() {
    if (pipes.length > 0 && pipes[0].x <= -100) {
        pipes.shift()
    }
}

function drawScore() {
    text(str(bird.score), width / 2, height / 3)
}