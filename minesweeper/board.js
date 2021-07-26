class Board {
    constructor(gameManager) {
        this.gameManager = gameManager
        this.board = this.createBoard()
        this.visibles = this.createBoardFalse()
        this.flags = this.createBoardFalse()
    }

    createBoard() {
        let board = []

        // Create empty board
        for (let i = 0; i < this.gameManager.rows; i++) {
            let empty = []
            for (let j = 0; j < this.gameManager.columns; j++) {
                empty.push(0)
            }
            board.push(empty)
        }

        // Fill with bombs
        let minesToPlace = this.gameManager.mines
        while (minesToPlace > 0) {
            let x = floor(random(this.gameManager.columns))
            let y = floor(random(this.gameManager.rows))
            if (board[y][x] != 'B') {
                board[y][x] = 'B'
                minesToPlace--
            }
        }

        // Fill with numbers
        for (let i = 0; i < this.gameManager.rows; i++) {
            for (let j = 0; j < this.gameManager.columns; j++) {
                if (board[i][j] != 'B') {
                    board[i][j] = this.countNeighbors(board, j, i)
                }
            }
        }
        return board
    }

    countNeighbors(board, x, y) {
        let counter = 0
        for (let i = -1; i <= 1; i++) {
            for (let j = -1; j <= 1; j++) {
                if (isInside(x + j, y + i) && board[y + i][x + j] == 'B') {
                    counter++
                }
            }
        }
        return counter
    }

    createBoardFalse() {
        let board = []
        for (let i = 0; i < this.gameManager.rows; i++) {
            let empty = []
            for (let j = 0; j < this.gameManager.columns; j++) {
                empty.push(false)
            }
            board.push(empty)
        }
        return board
    }

    drawBoard() {
        textAlign(CENTER)
        textSize(20)
        for (let i = 0; i < this.gameManager.rows; i++) {
            for (let j = 0; j < this.gameManager.columns; j++) {
                fill("#DDDDDD")
                stroke("#222831")
                rect(j * this.gameManager.cellSize, i * this.gameManager.cellSize, this.gameManager.cellSize)
                let symbol = this.board[i][j]
                if (symbol == 'B') {
                    image(bomb, j * gameManager.cellSize, i * gameManager.cellSize, gameManager.cellSize, gameManager.cellSize)
                } else if (symbol != 0) {
                    textStyle(BOLD);
                    fill(this.gameManager.colors[symbol])
                    stroke("rgba(0, 0, 0, 0)")
                    text(symbol, j * this.gameManager.cellSize + this.gameManager.cellSize / 2, i * this.gameManager.cellSize + this.gameManager.cellSize / 2 + 6)
                }
            }
        }
    }

    drawNotVisible() {
        for (let i = 0; i < this.gameManager.rows; i++) {
            for (let j = 0; j < this.gameManager.columns; j++) {
                if (!this.visibles[i][j]) {
                    switch (gameManager.difficulty) {
                        case difficulties.EASY:
                            fill("#346751")
                            break
                        case difficulties.MEDIUM:
                            fill("#925E53")
                            break
                        case difficulties.HARD:
                            fill("#F05454")
                            break
                    }
                    stroke("#222831")
                    rect(j * this.gameManager.cellSize, i * this.gameManager.cellSize, this.gameManager.cellSize)
                }
            }
        }
    }

    drawFlags() {
        for (let i = 0; i < this.gameManager.rows; i++) {
            for (let j = 0; j < this.gameManager.columns; j++) {
                if (this.flags[i][j]) {
                    image(flag, j * gameManager.cellSize, i * gameManager.cellSize, gameManager.cellSize, gameManager.cellSize)
                }
            }
        }
    }

    countNotVisibles() {
        let counter = 0
        for (let i = 0; i < this.gameManager.rows; i++) {
            for (let j = 0; j < this.gameManager.columns; j++) {
                if (!this.visibles[i][j]) {
                    counter++
                }
            }
        }
        return counter
    }

    revealBoard() {
        for (let i = 0; i < this.gameManager.rows; i++) {
            for (let j = 0; j < this.gameManager.columns; j++) {
                if (!this.visibles[i][j]) {
                    this.visibles[i][j] = true
                    this.flags[i][j] = false
                }
            }
        }
    }

    revealZeros(x, y, zeros) {
        for (let i = -1; i <= 1; i++) {
            for (let j = -1; j <= 1; j++) {
                let new_x = x + j
                let new_y = y + i
                if (isInside(new_x, new_y) && !this.visibles[new_y][new_x]) {
                    this.visibles[new_y][new_x] = true
                    this.flags[new_y][new_x] = false
                    if (this.board[new_y][new_x] == '0') {
                        this.revealZeros(new_x, new_y, zeros)
                    }
                }
            }
        }
    }
}