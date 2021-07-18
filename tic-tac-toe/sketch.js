function setup() {
    let canvas = createCanvas(500, 500)
    let x = (windowWidth - width) / 2;
    canvas.position(x, canvas.y)
    mouseX = -1
    mouseY = -1
    textSize(32)
    textAlign(CENTER)
    textFont("Encode Sans SC")
    angleMode(DEGREES)
    ai = new AI(true)
    startGame()
}

function draw() {
    background("#DDDDDD")
    board.drawBoard()
    index_x = floor(mouseX / (width / this.board.columns))
    index_y = floor(mouseY / (height / this.board.rows))
    switch (gameManager.state) {
        case gameManager.states.GREEN:
            if (isInside(index_x, index_y)) {
                board.showCross(index_x, index_y)
            }
            break

        case gameManager.states.RED:
            if (ai.activated) {
                let movement = ai.findBestMove()
                gameManager.move(movement[0], movement[1])
            } else if (isInside(index_x, index_y)) {
                board.showCircle(index_x, index_y)
            }

            break

        case gameManager.states.WON:
        case gameManager.states.DRAW:
            gameManager.message = gameManager.state == gameManager.states.WON ? gameManager.winner + " wins!" : "It's a draw!"
            drawText(gameManager.message)
            gameManager.updateTime()
            gameManager.changeState(gameManager.states.WAITING)
            break
        case gameManager.states.WAITING:
            drawText(gameManager.message)
            if (millis() - gameManager.time > 1500) {
                startGame()
            }
    }
}

function mouseClicked() {
    if (gameManager.state != gameManager.states.WAITING && isInside(index_x, index_y) && !board.board[index_y][index_x]) {
        gameManager.move(index_x, index_y)
    }
}

function startGame() {
    board = new Board(3)
    gameManager = new GameManager(board)
    ai.setBoard(board)
}

function drawText(message) {
    if (gameManager.winner == gameManager.states.GREEN) {
        fill("#346751")
        stroke("#346751")
    } else if (gameManager.winner == gameManager.states.RED) {
        fill("#F05454")
        stroke("#F05454")
    } else {
        fill("black")
        stroke("black")
    }
    text(message, width / 2, height / 2 - 75)
}

function isInside(x, y) {
    return 0 <= y && y < board.rows && 0 <= x && x < board.columns
}
