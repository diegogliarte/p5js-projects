class Board {
    constructor(gameManager) {
        this.gameManager = gameManager
        this.rows = 8
        this.columns = 8
        this.width = width / this.columns
        this.height = height / this.rows
        this.board = this.createBoard()
        this.selected = null
        this.validMoves = []
        this.colors = {
            'G': "#346751",
            'R': "#F05454",
        }

    }

    createBoard() {
        let board = [
            [" ", "R", " ", "R", " ", "R", " ", "R"],
            ["R", " ", "R", " ", "R", " ", "R", " "],
            [" ", "R", " ", "R", " ", "R", " ", "R"],
            [" ", " ", " ", " ", " ", " ", " ", " "],
            [" ", " ", " ", " ", " ", " ", " ", " "],
            ["G", " ", "G", " ", "G", " ", "G", " "],
            [" ", "G", " ", "G", " ", "G", " ", "G"],
            ["G", " ", "G", " ", "G", " ", "G", " "],

        ]
//     let board = [
//               [" ", " ", " ", " ", " ", " ", " ", " "], 
//               [" ", " ", " ", " ", " ", " ", " ", " "],
//               [" ", " ", " ", " ", " ", " ", " ", " "],
//               [" ", " ", " ", " ", " ", " ", " ", " "],
//               [" ", " ", " ", "R", " ", " ", " ", " "],
//               [" ", " ", " ", " ", " ", " ", " ", " "],
//               [" ", " ", " ", " ", " ", "G", " ", " "],
//               [" ", " ", " ", " ", " ", " ", " ", " "],

//     ]

        return board
    }

    drawBoard() {
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.columns; j++) {
                stroke("#222831")
                noFill()
                rect(j * this.width, i * this.height, this.width, this.height)
                noStroke()
                if (this.board[i][j] == 'R') {
                    fill("#F05454")
                } else if (this.board[i][j] == 'G') {
                    fill("#346751")
                } else {
                    noFill()
                }
                this.drawChecker(createVector(j, i))
            }
        }
    }

    checkWin() {
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.columns; j++) {
                let pos = createVector(j, i)
                if (this.getSymbol(pos) != ' ' && this.getSymbol(pos) != this.gameManager.turn()) {
                    return false
                }
            }
        }
        return true
    }


    drawChecker(position) {
        let x = position.x * this.width + this.width / 2
        let y = position.y * this.height + this.height / 2
        circle(x, y, this.width * 0.65)
    }

    move(to) {
        if (to.dist(this.selected) > 2) {
            let direction = p5.Vector.sub(to, this.selected).div(2)
            let middle = p5.Vector.sub(to, direction)
            this.changeBoard(middle, " ")
        }
        this.changeBoard(this.selected, " ")
        let symbol = this.gameManager.turn()
        this.changeBoard(to, symbol)
        this.validMoves = []
        if (this.checkWin() || this.boardLimit(to)) {
            this.gameManager.winner = this.gameManager.turn()
            this.gameManager.changeState(this.gameManager.states.WON)
            this.gameManager.updateTime()
        } else {
            this.gameManager.nextTurn()
        }
    }

    boardLimit(pos) {
        return pos.y == 0 || pos.y == this.rows - 1
    }


    select(selected) {
        this.selected = selected
        this.generateValidMoves(this.selected)
    }

    generateValidMoves(from) {
        let validMoves = []
        let directions = []
        if (this.getSymbol(from) == 'G') { // Down
            directions = [createVector(-1, -1), createVector(1, -1)]
        } else if (this.getSymbol(from) == 'R') {
            directions = [createVector(-1, 1), createVector(1, 1)]
        }
        for (let direction of directions) {
            let move = p5.Vector.add(from, direction)
            if (isInside(move)) {
                if (this.getSymbol(move) == " ") {
                    validMoves.push(move)
                } else if (this.getSymbol(move) != this.getSymbol(from)) {
                    move.add(direction)
                    if (isInside(move) && this.getSymbol(move) == " ") {
                        validMoves.push(move)
                    }
                }
            }
        }
        this.validMoves = validMoves
    }

    deselect() {
        this.selected = null
        this.validMoves = []
    }

    getSymbol(position) {
        return this.board[position.y][position.x]
    }

    drawSelected() {
        for (let move of this.validMoves) {
            let c = color(this.colors[this.gameManager.turn()])
            c.setAlpha(100)
            noStroke()
            fill(c)
            this.drawChecker(move)

        }
    }

    changeBoard(position, symbol) {
        this.board[position.y][position.x] = symbol
    }

}