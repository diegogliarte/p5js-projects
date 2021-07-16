function setup() {
    canvas = createCanvas(500, 500)
    x = (windowWidth - width) / 2;
    y = (windowHeight - height) / 2;
    canvas.position(x, y)
    states = {
        RED: "Red",
        BLUE: "Blue",
        WON: 2,
        DRAW: 3,
        WAITING: 4,
    }
    ai = new AI(true)
    angleMode(DEGREES)
    reset()
}

function draw() {
    background(200)
    drawBoard()
    index_x = floor(mouseX / (width / 3))
    index_y = floor(mouseY / (height / 3))
    switch (state) {
        case states.RED:
            if (isInside(index_x, index_y)) {
                showCross(index_x, index_y)
            }
            break

        case states.BLUE:
            if (ai.activated) {
                movement = ai.findBestMove()
                move(movement[0], movement[1])
            } else if (isInside(index_x, index_y)) {
                showCircle(index_x, index_y)
            }

            break

        case states.WON:
        case states.DRAW:
            message = state == states.WON ? winner + " wins!" : "It's a draw!"
            drawText(message)
            time = millis()
            state = states.WAITING
            break
        case states.WAITING:
            drawText(message)
            if (millis() - time > 1500) {
                reset()
            }
    }
}

function mousePressed() {
    if (state != states.WAITING && isInside(index_x, index_y) && !board[index_y][index_x]) {
        move(index_x, index_y)
    }
}

function move(x, y) {
    symbol = state == states.RED ? "X" : "O"
    board[y][x] = symbol
    moves++
    if (hasWon(x, y)) {
        winner = state
        state = states.WON
    } else if (moves == board.length * board[0].length) { // Max moves
        state = states.DRAW
    } else {
        nextTurn()
    }
}

function reset() {
    winner = null
    moves = 0
    board = []
    for (let i = 0; i < 3; i++) {
        board.push([null, null, null])
    }
    state = random([states.RED, states.BLUE])

}

function drawText(message) {
    if (winner == states.RED) {
        fill("red")
        stroke("red")
    } else if (winner == states.BLUE) {
        fill("blue")
        stroke("blue")
    } else {
        fill("black")
        stroke("black")
    }

    textSize(32)
    textAlign(CENTER)

    text(message, width / 2, height / 2 - 75)
}

function drawBoard() {
    stroke("black")
    for (let i = 1; i < 3; i++) {
        line(0, height / 3 * i, width, height / 3 * i)
    }

    for (let i = 1; i < 3; i++) {
        line(width / 3 * i, 0, height / 3 * i, height)
    }
    for (let y = 0; y < board.length; y++) {
        for (let x = 0; x < board[y].length; x++) {
            push()
            switch (board[y][x]) {
                case "X":
                    stroke("rgba(255, 0, 0, 1)")
                    fill("rgba(255, 0, 0, 1)")
                    drawCross(x, y)
                    break
                case "O":
                    strokeWeight(10)
                    stroke("rgba(0, 0, 255, 1)")
                    fill('rgba(0, 0, 0, 0)')
                    drawCircle(x, y)
                    break
            }
            pop()
        }
    }
}

function isInside(x, y) {
    return 0 <= y && y < board.length && 0 <= x && x < board[y].length
}

function showCross(index_x, index_y) {
    if (!board[index_y][index_x]) {
        push()
        stroke('rgba(255, 0, 0, 0.25)')
        fill('rgba(255, 0, 0, 0.25)')
        drawCross(index_x, index_y)
        pop()
    }
}

function showCircle(index_x, index_y) {
    if (!board[index_y][index_x]) {
        push()
        strokeWeight(10)
        stroke('rgba(0, 0, 255, 0.25)')
        fill('rgba(0, 0, 0, 0)')
        drawCircle(index_x, index_y)
        pop()
    }
}

function drawCross(index_x, index_y) {
    length = 100
    weight = 10

    x = index_x * width / 3 + sqrt(length ** 2 / 4)
    y = index_y * height / 3 + sqrt(length ** 2 / 4)
    translate(x, y)
    rotate(45)
    rect(0, 0, length, weight)
    rotate(90)
    rect(-(length / 2 - weight / 2), -(length / 2 + weight / 2), length, weight)
}

function drawCircle(index_x, index_y) {
    diameter = 100
    x = index_x * width / 3 + width / 6
    y = index_y * height / 3 + width / 6
    circle(x, y, diameter)
}

function nextTurn() {
    state = state == states.RED ? states.BLUE : states.RED
}

function hasWon(x, y) {
    return checkHorizontal(y) || checkVertical(x) || checkDiagonal()
}

function checkHorizontal(y) {
    for (let i = 1; i < board[y].length; i++) {
        if (board[y][i] == null || board[y][i] != board[y][i - 1]) {
            return false
        }
    }
    return true
}

function checkVertical(x) {
    for (let i = 1; i < board.length; i++) {
        if (board[i][x] == null || board[i][x] != board[i - 1][x]) {
            return false
        }
    }
    return true
}

function checkDiagonal() {
    diagonal_a = true
    diagonal_b = true
    for (let i = 1; i < board.length; i++) {
        if (board[i][i] == null || board[i][i] != board[i - 1][i - 1]) {
            diagonal_a = false
        }
    }
    for (let i = 1; i < board.length; i++) {
        if (board[i][board.length - i - 1] == null || board[i][board.length - i - 1] != board[i - 1][board.length - i]) {
            diagonal_b = false
        }
    }
    return diagonal_a || diagonal_b
}

class AI {
    constructor(activated) {
        this.activated = activated
        this.player = "O"
        this.opponent = "X"

        this.checkbox = document.getElementById("AI")
        this.checkbox.addEventListener("change", e => this.activated = this.checkbox.checked)
    }

    evaluate() {
        for (let i = 0; i < board.length; i++) {
            if (checkHorizontal(i)) {
                return board[i][0] == this.player ? 10 : -10
            }
            if (checkVertical(i)) {
                return board[0][i] == this.player ? 10 : -10
            }
        }
        if (checkDiagonal()) {
            return board[1][1] == this.player ? 10 : -10
        }
        return 0
    }

    minimax(depth, isMax) {
        let score = this.evaluate()

        if (score == 10 || score == -10) {
            return score
        }

        if (!this.hasMovesLeft()) {
            return 0
        }
        let best
        if (isMax) { // Maximizer
            best = -1000
            for (let i = 0; i < board.length; i++) {
                for (let j = 0; j < board[0].length; j++) {
                    if (board[i][j] == null) {
                        board[i][j] = this.player
                        best = max(best, this.minimax(depth + 1, !isMax))
                        board[i][j] = null
                    }
                }
            }
        } else { // Minimizer
            best = 1000
            for (let i = 0; i < board.length; i++) {
                for (let j = 0; j < board[0].length; j++) {
                    if (board[i][j] == null) {
                        board[i][j] = this.opponent
                        best = min(best, this.minimax(depth + 1, !isMax))
                        board[i][j] = null
                    }
                }
            }
        }
        return best
    }

    hasMovesLeft() {
        for (let i = 0; i < board.length; i++) {
            for (let j = 0; j < board[0].length; j++) {
                if (board[i][j] == null) {
                    return true
                }
            }
        }
        return false
    }

    findBestMove() {
        let bestVal = -1000
        let bestMove = [-1, -1]
        for (let i = 0; i < board.length; i++) {
            for (let j = 0; j < board[0].length; j++) {
                if (board[i][j] == null) {
                    board[i][j] = this.player
                    let moveVal = this.minimax(0, false)
                    board[i][j] = null
                    if (moveVal > bestVal) {
                        bestMove = [j, i]
                        bestVal = moveVal
                    }
                }
            }
        }
        return bestMove
    }
}