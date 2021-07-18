function setup() {
    startGame(20)
}

function draw() {
    background(200)
    board.drawCells()
    switch (gameManager.state) {
        case gameManager.states.RUNNING:
            board.updateCells()
            break
        case gameManager.states.PAUSED:
            if (mouseIsPressed) {
                pressingMouse()
            }
    }
}

function pressingMouse() {
    let index_x = floor(mouseX / board.size)
    let index_y = floor(mouseY / board.size)
    if (isInside(index_x, index_y)) {
        board.cells[index_y][index_x].live()
        redraw()
    }
}

function keyPressed() {
    if (key.toUpperCase() == 'P') {
        frameRate(144)
        gameManager.changeState(gameManager.states.PAUSED)
    } else if (key.toUpperCase() == 'R') {
        frameRate(10)
        gameManager.changeState(gameManager.states.RUNNING)
    } else if (key.toUpperCase() == 'Q') {
        frameRate(144)
        startGame(20)
    } else if (key.toUpperCase() == 'N') {
        gameManager.changeState(gameManager.states.RUNNING)
        frameRate(0)
        redraw()
    }

}

function startGame(cellSize) {
    let dimensions = boardDimensions(cellSize)
    let canvas = createCanvas(dimensions.x * cellSize, dimensions.y * cellSize)
    let x = (windowWidth - width) / 2
    canvas.position(x, canvas.y)
    board = new Board(dimensions.x, dimensions.y, cellSize)
    gameManager = new GameManager()

}

function boardDimensions(cellSize) {
    let marginPercentage = 0.75
    let columns = windowWidth * marginPercentage / cellSize
    let rows = windowHeight * marginPercentage / cellSize

    return createVector(floor(columns - 1), floor(rows - 1))
}

function isInside(x, y) {
    return 0 <= x && x < board.columns && 0 <= y && y < board.rows
}