class Board {
    constructor() {
        this.rows = 6
        this.columns = 7
        this.connectionsNeeded = 4
        this.margins = 15
        this.size = 60
        this.width = (width - this.margins) / this.columns
        this.height = (height - 100) / this.rows
        this.board = this.create()
    }

    create() {
        let board = []
        for (let i = 0; i < this.rows; i++) {
            let empty = []
            for (let j = 0; j < this.columns; j++) {
                empty.push("")
            }
            board.push(empty)
        }
        return board
    }

    draw() {
        stroke("#222831")
        noFill()
        strokeWeight(2)
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.columns; j++) {
                let x, y
                if (this.isGreen(j, i)) {
                    fill("#346751")
                } else if (this.isRed(j, i)) {
                    fill("#F05454")
                } else {
                    noFill()
                }
                [x, y] = this.calculateCoordinates(j, i)
                circle(x, y, this.size)
            }
        }
    }

    drawAt(x, y) {
        [x, y] = this.calculateCoordinates(j, i)
        circle(x, y, this.size)
    }

    canPlace(x) {
        return this.isEmpty(x, 0)
    }

    place(symbol, x) {
        for (let y = this.rows - 1; y >= 0; y--) {
            if (this.isEmpty(x, y)) {
                this.board[y][x] = symbol
                return y
            }
        }
    }

    calculateCoordinates(x, y) {
        x = (width - this.margins * 2 - this.size) / (this.columns - 1) * x + this.margins + this.size / 2
        y = (height - this.size * 1.5) / this.rows * y + this.size * 1.5 + this.margins * 2

        return [x, y]
    }

    isEmpty(x, y) {
        return this.board[y][x] == ""
    }


    isRed(x, y) {
        return this.board[y][x] == "R"
    }


    isGreen(x, y) {
        return this.board[y][x] == "G"
    }

    checkWin(x, y) {
        return this.checkHorizontal(y) || this.checkVertical(x) || this.checkDiagonals(x, y)
    }

    checkHorizontal(y) {
        let consecutive = 0
        for (let i = 1; i < this.columns; i++) {
            if (!this.isEmpty(i, y) && this.board[y][i] == this.board[y][i - 1]) {
                consecutive++
                if (consecutive >= this.connectionsNeeded - 1) {
                    return true
                }
            } else {
                consecutive = 0
            }
        }
        return false
    }

    checkVertical(x) {
        let consecutive = 0
        for (let i = 1; i < this.rows; i++) {
            if (!this.isEmpty(x, i) && this.board[i][x] == this.board[i - 1][x]) {
                consecutive++
                if (consecutive >= this.connectionsNeeded - 1) {
                    return true
                }
            } else {
                consecutive = 0
            }
        }
        return false
    }

    checkDiagonals(x, y) {
        return this.checkDiagonalPositive(x, y) || this.checkDiagonalNegative(x, y)
    }

    checkDiagonalPositive(x, y) {
        while (x > 0 && y < this.rows - 1) {
            x--
            y++
        }
        let consecutive = 0
        x++
        y--
        while (x < this.columns && y > 0) {
            if (!this.isEmpty(x, y) && this.board[y][x] == this.board[y + 1][x - 1]) {
                consecutive++
                if (consecutive >= this.connectionsNeeded - 1) {
                    return true
                }
            } else {
                consecutive = 0
            }
            x++
            y--
        }
        return false
    }

    checkDiagonalNegative(x, y) {
        while (x > 0 && y > 0) {
            x--
            y--
        }
        let consecutive = 0
        x++
        y++
        while (x < this.columns && y < this.rows) {
            if (!this.isEmpty(x, y) && this.board[y][x] == this.board[y - 1][x - 1]) {
                consecutive++
                if (consecutive >= this.connectionsNeeded - 1) {
                    return true
                }
            } else {
                consecutive = 0
            }
            x++
            y++
        }
        return false
    }

    checkDraw() {
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.columns; j++) {
                if (this.isEmpty(j, i)) {
                    return false
                }
            }
        }
        return true
    }

}