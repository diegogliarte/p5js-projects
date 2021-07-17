class Board {
    constructor(dimensions, gameManager) {
        this.rows = dimensions
        this.columns = dimensions
        this.gameManager = gameManager
        this.board = this.createBoard()
        this.size = width / this.columns
    }

    createBoard() {
        let board = []
        for (let i = 0; i < this.rows; i++) {
            let empty = []
            for (let j = 0; j < this.columns; j++) {
                empty.push(null)
            }
            board.push(empty)
        }
        return board
    }

    drawBoard() {
        stroke("#222831")
        for (let i = 1; i < this.rows; i++) {
            line(0, height / this.rows * i, width, height / this.rows * i)
        }

        for (let i = 1; i < this.columns; i++) {
            line(width / this.columns * i, 0, height / this.columns * i, height)
        }
        for (let y = 0; y < this.rows; y++) {
            for (let x = 0; x < this.columns; x++) {
                push()
                switch (this.board[y][x]) {
                    case "X":
                        stroke("#346751")
                        fill("#346751")
                        this.drawCross(x, y)
                        break
                    case "O":
                        strokeWeight(10)
                        stroke("#F05454")
                        fill("rgba(0, 0, 0, 0)")
                        this.drawCircle(x, y)
                        break
                }
                pop()
            }
        }
    }

    drawCross(index_x, index_y) {
        let length = width / this.columns * 0.75
        let weight = 10

        let x = index_x * width / this.columns + this.size / 4
        let y = index_y * height / this.columns + this.size / 4
        translate(x, y)
        rotate(45)
        rect(0, 0, length, weight)
        rotate(90)
        rect(-(length / 2 - weight / 2), -(length / 2 + weight / 2), length, weight)
    }

    drawCircle(index_x, index_y) {
        let diameter = 100
        let x = index_x * width / this.columns + width / this.columns / 2
        let y = index_y * height / this.columns + width / this.columns / 2
        circle(x, y, diameter)
    }

    showCross(index_x, index_y) {
        if (!this.board[index_y][index_x]) {
            push()
            let c = color("#346751")
            c.setAlpha(100)
            stroke(c)
            fill(c)
            this.drawCross(index_x, index_y)
            pop()
        }
    }

    showCircle(index_x, index_y) {
        if (!this.board[index_y][index_x]) {
            push()
            let c = color("#F05454")
            c.setAlpha(100)
            strokeWeight(10)
            stroke(c)
            fill("rgba(0, 0, 0, 0)")
            this.drawCircle(index_x, index_y)
            pop()
        }
    }

    checkHorizontal(y) {
        for (let i = 1; i < this.columns; i++) {
            if (this.board[y][i] == null || this.board[y][i] != this.board[y][i - 1]) {
                return false
            }
        }
        return true
    }

    checkHorizontalCounter(y, followed) {
        let counter = 0
        for (let i = 1; i < this.columns; i++) {
            if (counter == followed) {
                return true
            }
            if (this.board[y][i] == null || this.board[y][i] != this.board[y][i - 1]) {
                return false
            }

        }
        return true
    }

    checkVerticalCounter(x, followed) {
        let counter = 0
        for (let i = 1; i < this.rows; i++) {
            if (counter == followed) {
                return true
            }
            if (this.board[i][x] == null || this.board[i][x] != this.board[i - 1][x]) {
                return false
            }
        }
        return true
    }

    checkVertical(x) {
        for (let i = 1; i < this.rows; i++) {
            if (this.board[i][x] == null || this.board[i][x] != this.board[i - 1][x]) {
                return false
            }
        }
        return true
    }

    checkDiagonal() {
        return this.checkDiagonalPositive() || this.checkDiagonalNegative()
    }

    checkDiagonalPositive() {
        for (let i = 1; i < this.rows; i++) {
            if (this.board[i][i] == null || this.board[i][i] != this.board[i - 1][i - 1]) {
                return false
            }
        }
        return true
    }

    checkDiagonalNegative() {
        for (let i = 1; i < this.rows; i++) {
            if (this.board[i][this.rows - i - 1] == null || this.board[i][this.rows - i - 1] != this.board[i - 1][this.rows - i]) {
                return false
            }
        }
        return true
    }

}
