function preload() {
    queen = loadImage("queen.png")
}

function setup() {
    let canvas = createCanvas(500, 500)
    let x = (windowWidth - width) / 2
    let y = (windowHeight - height) / 2
    canvas.position(x, y)
    textSize(64)
    textAlign(CENTER)
    textFont("Encode Sans SC")
    text("", 0, 0)
    startGame()
}

function draw() {
    background("#DDDDDD")
    board.drawBoard()
    board.drawSelected()
    drawCursor()
    if (gameManager.state == gameManager.states.WON) {
        fill("#222831")
        let message = gameManager.winner == 'G' ? "Green Wins" : "Red Wins"
        text(message, width / 2, height / 2)
        if (millis() - gameManager.time > 2000) {
            startGame()
        }
    }
}

function startGame() {
    gameManager = new GameManager()
    board = new Board(gameManager)
}

function mousePressed() {
    if (gameManager.state == gameManager.states.WON) {
        return
    }
    let indexX = floor(mouseX / width * board.columns)
    let indexY = floor(mouseY / height * board.rows)
    let mousePos = createVector(indexX, indexY)
    if (vectorIncludes(board.validMoves, mousePos)) {
        board.move(mousePos)
    } else if (board.selected != mousePos && isInside(mousePos) && !board.isEmpty(mousePos)) {
        if (gameManager.turn() == 'G' && board.isGreen(mousePos) || gameManager.turn() == 'R' && board.isRed(mousePos)) {
            board.select(mousePos)
        }
    } else {
        board.deselect()
    }
}

function isInside(vector) {
    return 0 <= vector.x && vector.x < board.columns && 0 <= vector.y && vector.y < board.rows
}

function vectorIncludes(vectors, includes) {
    for (let vector of vectors) {
        if (vector.x == includes.x && vector.y == includes.y) {
            return true
        }
    }
    return false
}

function drawCursor() {
    noCursor()
    stroke("#222831")
    if (gameManager.turn() == 'G' || gameManager.winner == 'G') {
        fill("#346751")
    } else {
        fill("#F05454")
    }
    circle(mouseX, mouseY, 10)
}