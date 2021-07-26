function setup() {
    let canvas = createCanvas(600, 500)
    let x = (windowWidth - width) / 2
    let y = (windowHeight - height) / 2
    canvas.position(x, y)
    colors = {
        'G': "#346751",
        'R': "#F05454",
    }
    textSize(32)
    textAlign(CENTER)
    textFont("Encode Sans SC")
    mouseX = -1
    mouseY = -1
    startGame()
}

function draw() {
    background("#DDDDDD")
    board.draw()
    switch (gameManager.state) {
        case gameManager.states.GREEN:
        case gameManager.states.RED:
            showHover()
            break
        case gameManager.states.WON:
            fill("#222831")
            let message = gameManager.winner == 'G' ? "Green Wins" : "Red Wins"
            text(message, width / 2, height / 2)
            if (millis() > gameManager.time) {
                startGame()
            }
            break
        case gameManager.states.DRAW:
            fill("#222831")
            text("It's a Draw", width / 2, height / 2)
            if (millis() > gameManager.time) {
                startGame()
            }
            break
    }
}

function mousePressed() {
    let indexX = floor(mouseX / (width / board.columns))
    let indexY = floor(mouseY / (height / board.rows))
    if (gameManager.state != gameManager.states.WON && isInside(indexX, indexY) && board.canPlace(indexX)) {
        let y = board.place(gameManager.turn(), indexX)
        if (board.checkWin(indexX, y)) {
            gameManager.winner = gameManager.turn()
            gameManager.changeState(gameManager.states.WON)
            gameManager.updateTime(2000)
        } else if (board.checkDraw()) {
            print("draw")
            gameManager.changeState(gameManager.states.DRAW)
            gameManager.updateTime(2000)
        } else {
            gameManager.nextTurn()
        }
    }
}

function startGame() {
    gameManager = new GameManager()
    board = new Board()
}

function showHover() {
    let indexX = floor(mouseX / (width / board.columns))
    let indexY = floor(mouseY / (height / board.rows))
    if (isInside(indexX, indexY)) {
        let x, y
        [x, y] = board.calculateCoordinates(indexX, indexY)
        let c = color(colors[gameManager.turn()])
        c.setAlpha(100)
        fill(c)
        noStroke()
        circle(x, board.margins + board.size / 2, board.size)
    }
}

function isInside(x, y) {
    return 0 <= y && y < board.rows && 0 <= x && x < board.columns
}
