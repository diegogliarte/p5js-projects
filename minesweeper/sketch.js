function preload() {
    flag = loadImage("flag.png")
    bomb = loadImage("bomb.png")
}

function setup() {
    difficulties = {
        EASY: [8, 8, 8],
        MEDIUM: [13, 15, 20],
        HARD: [16, 30, 80]
    }
    mouseX = -1
    mouseY = -1
    startGame(difficulties.EASY)
    listeners()
    textSize(32)
    textAlign(CENTER)
    textFont("Encode Sans SC")
}

function draw() {
    background("#DDDDDD")
    board.drawBoard()
    board.drawNotVisible()
    board.drawFlags()
    switch (gameManager.state) {
        case gameManager.states.PLAYING:
            index_x = floor(mouseX / (width / gameManager.columns))
            index_y = floor(mouseY / (height / gameManager.rows))
            if (isInside(index_x, index_y) && !board.visibles[index_y][index_x]) {
                fill("#222831")
                stroke("#222831")
                rect(index_x * gameManager.cellSize, index_y * gameManager.cellSize, gameManager.cellSize)
            }
            // If we draw the flags at the end of draw(), the flags override the text. If we do it at the beginning,
            // the upper lines override the text. By drawing the flags twice, we solve this problem
            board.drawFlags()
            break

        case gameManager.states.WON:
        case gameManager.states.LOST:
            if (millis() - gameManager.time < 1000) {
                break
            }

            textAlign(CENTER)
            textSize(64)
            if (gameManager.state == gameManager.states.WON) {
                fill("#222831")
                text("You win", width / 2, height / 2)
            } else {
                fill("#222831")
                text("You lose", width / 2, height / 2)
            }

            if (millis() - gameManager.time > 3000) {
                startGame(gameManager.difficulty)
            }
            break
    }
}

function mouseClicked() {
    if (!isInside(index_x, index_y) || gameManager.state != gameManager.states.PLAYING) {
        return
    }
    if (mouseButton == LEFT) {
        board.visibles[index_y][index_x] = true
        board.flags[index_y][index_x] = false
        if (board.board[index_y][index_x] == 0) { // Reveal all zeros
            zeros = []
            board.revealZeros(index_x, index_y, zeros)
        } else if (board.board[index_y][index_x] == "B") {
            gameManager.changeState(gameManager.states.LOST)
            gameManager.updateTime()
            return
        }
        if (board.countNotVisibles() == gameManager.mines) {
            gameManager.changeState(gameManager.states.WON)
            gameManager.updateTime()
        }
    }
}

function mousePressed() {
    if (!isInside(index_x, index_y) || gameManager.state != gameManager.states.PLAYING) {
        return
    }

    if (mouseButton == RIGHT && !board.visibles[index_y][index_x]) {
        board.flags[index_y][index_x] = !board.flags[index_y][index_x]
    }
}

function startGame(difficulty) {
    gameManager = new GameManager(difficulty, difficulties)
    board = new Board(gameManager)
    let canvas = createCanvas(gameManager.columns * gameManager.cellSize, gameManager.rows * gameManager.cellSize)
    let x = (windowWidth - width) / 2;
    canvas.position(x, canvas.y)
}

function listeners() {
    document.addEventListener('contextmenu', event => event.preventDefault());
    let easy = document.getElementById("easy")
    let medium = document.getElementById("medium")
    let hard = document.getElementById("hard")
    easy.addEventListener("click", e => {
        if (gameManager.state == gameManager.states.PLAYING) {
            startGame(difficulties.EASY)
        }
    })
    medium.addEventListener("click", e => {
        if (gameManager.state == gameManager.states.PLAYING) {
            startGame(difficulties.MEDIUM)
        }
    })
    hard.addEventListener("click", e => {
        if (gameManager.state == gameManager.states.PLAYING) {
            startGame(difficulties.HARD)
        }
    })
}

function isInside(x, y) {
    return 0 <= x && x < gameManager.columns && 0 <= y && y < gameManager.rows
}

function sleep(ms) {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(true);
        }, 1);
    });
}
