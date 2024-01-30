var canvasY

function setup() {
    listeners()
    startGame(20)
}

function draw() {
    background("#DDDDDD")
    switch (gameManager.state) {
        case gameManager.states.RUNNING:
            if(!board.updateCells()) {
                stopSimulation()
            }
            break
        case gameManager.states.PAUSED:
            if (mouseIsPressed) {
                pressingMouse()
            }
    }
    board.drawCells()

}

function pressingMouse() {
    let index_x = floor(mouseX / board.size)
    let index_y = floor(mouseY / board.size)
    if (isInside(index_x, index_y)) {
        board.cells[index_y][index_x].live()
        redraw()
    }
}

function listeners() {
    let play = document.getElementById("play")
    let nextFrame = document.getElementById("next-frame")
    let clearBoard = document.getElementById("clear-board")

    play.addEventListener("click", e => {
        loop()
        if (gameManager.state == gameManager.states.RUNNING) {
            stopSimulation(play)

        } else {
            play.innerText = "Click to stop"
            play.style.color = "#F05454"
            frameRate(int(sliderSpeed.value))
            gameManager.changeState(gameManager.states.RUNNING)
        }
    })

    nextFrame.addEventListener("click", e => {
        gameManager.changeState(gameManager.states.RUNNING)
        redraw()
        stopSimulation(play)

    })

    clearBoard.addEventListener("click", e => {
        stopSimulation(play)
        startGame(board.size)
    })

    let sliderSpeed = document.getElementById("speed")

    sliderSpeed.addEventListener("input", e => {
        if (gameManager.state == gameManager.states.RUNNING) {
            frameRate(int(sliderSpeed.value))
        }
    })

}

function stopSimulation() {
    let play = document.getElementById("play") // We define it here because we need to call it from draw()
    play.innerText = "Click to simulate"
    play.style.color = "#346751"
    frameRate(1000)
    gameManager.changeState(gameManager.states.PAUSED)
}

function playToInitial(play) {

}

function startGame(cellSize) {
    let marginPercentage = 0.75
    let dimensions = boardDimensions(cellSize, marginPercentage)
    let canvas = createCanvas(dimensions.x * cellSize, dimensions.y * cellSize)
    let x = (windowWidth - width) / 2
    canvasY = canvasY ? canvasY : canvas.position().y * marginPercentage
    canvas.position(x, canvasY)
    board = new Board(dimensions.x, dimensions.y, cellSize)
    gameManager = new GameManager()
}

function boardDimensions(cellSize, marginPercentage) {
    let columns = windowWidth * marginPercentage / cellSize
    let rows = windowHeight * marginPercentage / cellSize

    return createVector(floor(columns - 1), floor(rows - 1))
}

function isInside(x, y) {
    return 0 <= x && x < board.columns && 0 <= y && y < board.rows
}