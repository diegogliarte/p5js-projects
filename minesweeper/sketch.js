function setup() {
    document.addEventListener('contextmenu', event => event.preventDefault());
    mines = 5
    rows = 8
    columns = 8
    size = 40
    states = {
        PLAYING: 0,
        WON: 1,
        LOST: 2,
        WAITING: 3,
    }
    colors = {
        1: "blue",
        2: "forestgreen",
        3: "red",
        4: "darkblue",
        5: "brown",
        6: "lightblue",
        7: "black",
        8: "grey",
        "B": "black",
    }
    canvas = createCanvas(columns * size, rows * size)
    x = (windowWidth - width) / 2;
    y = (windowHeight - height) / 2;
    canvas.position(x, y)
    startGame()
}

function draw() {
    background(220)
    drawBoard()
    drawNotVisible()
    switch (state) {
        case states.PLAYING:
            index_x = floor(mouseX / (width / columns))
            index_y = floor(mouseY / (height / rows))
            if (isInside(index_x, index_y) && !visibles[index_y][index_x]) {
                fill("white")
                stroke("black")
                rect(index_x * size, index_y * size, size)
            }
            break
        case states.WON:
            textAlign(CENTER)
            textSize(32)
            stroke("green")
            fill("green")
            text("You win", width / 2, height / 2)
            if (millis() - time > 2000) {
                startGame()
            }
            break

        case states.LOST:
            textAlign(CENTER)
            textSize(32)
            stroke("red")
            fill("red")
            text("You lose", width / 2, height / 2)
            if (millis() - time > 2000) {
                startGame()
            }
            break
    }

    drawFlags()

}

function mousePressed() {
    if (!isInside(index_x, index_y)) {
        return
    }

    if (mouseButton == LEFT) {
        visibles[index_y][index_x] = true
        flags[index_y][index_x] = false
        if (board[index_y][index_x] == 0) { // Reveal all zeros
            zeros = []
            revealZeros(index_x, index_y, zeros)

        } else if (board[index_y][index_x] == "B") {
            state = states.LOST
            time = millis()
        } else if (countNotVisibles() == mines) {
            state = states.WON
            time = millis()
        }
    } else if (mouseButton == RIGHT && !visibles[index_y][index_x]) {
        flags[index_y][index_x] = !flags[index_y][index_x]
    }

}

function countNotVisibles() {
    counter = 0
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < columns; j++) {
            if (!visibles[i][j]) {
                counter++
            }
        }
    }
    return counter
}

function revealBoard() {
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < columns; j++) {
            if (!visibles[i][j]) {
                visibles[i][j] = true
                flags[i][j] = false
            }
        }
    }
}

function revealZeros(x, y, zeros) {
    for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
            let new_x = x + j
            let new_y = y + i
            if (isInside(new_x, new_y) && !visibles[new_y][new_x] ) {
                visibles[new_y][new_x] = true
                flags[new_y][new_x] = false
                if (board[new_y][new_x] == '0') {
                    revealZeros(new_x, new_y, zeros)
                }
            }
        }
    }
}


function startGame() {
    state = states.PLAYING
    board = createBoard()
    visibles = createBoardFalse()
    flags = createBoardFalse()
}

function createBoardFalse() {
    let board = []
    for (let i = 0; i < rows; i++) {
        let empty = []
        for (let j = 0; j < columns; j++) {
            empty.push(false)
        }
        board.push(empty)
    }
    return board
}


function createBoard() {
    let board = []
    for (let i = 0; i < rows; i++) {
        let empty = []
        for (let j = 0; j < columns; j++) {
            empty.push(0)
        }
        board.push(empty)
    }

    minesToPlace = mines
    let i = 100
    while (minesToPlace > 0 && i > 0) {
        x = floor(random(columns))
        y = floor(random(rows))
        if (board[y][x] != 'B') {
            board[y][x] = 'B'
            minesToPlace--
        }
        i++
    }

    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < columns; j++) {
            if (board[i][j] != 'B') {
                board[i][j] = countNeighbors(board, j, i)
            }
        }
    }
    return board
}

function countNeighbors(board, x, y) {
    counter = 0
    for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
            if (isInside(x + j, y + i) && board[y + i][x + j] == 'B') {
                counter++
            }
        }
    }
    return counter
}

function isInside(x, y) {
    return 0 <= x && x < columns && 0 <= y && y < rows
}

function drawBoard() {
    textAlign(CENTER)
    textSize(20)
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < columns; j++) {
            fill("white")
            stroke("black")
            rect(j * size, i * size, size)
            symbol = board[i][j]
            if (symbol != 0) {
                textFont("Orbitron")
                fill(colors[symbol])
                stroke("rgba(0, 0, 0, 0)")
                text(symbol, j * size + size / 2, i * size + size / 2 + 6)
            }
        }
    }
}

function drawNotVisible() {
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < columns; j++) {
            if (!visibles[i][j]) {
                fill("grey")
                stroke("black")
                rect(j * size, i * size, size)
            }
        }
    }
}

function drawFlags() {
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < columns; j++) {
            if (flags[i][j]) {
                fill("red")
                stroke("black")
                rect(j * size, i * size, size)
            }
        }
    }
}

function sleep(ms) {
    return new Promise(resolve => {setTimeout(() => { resolve(true); }, 1); });
}
