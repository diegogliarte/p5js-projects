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
        this.directions = {
            UP: [createVector(-1, -1), createVector(1, -1)],
            DOWN: [createVector(-1, 1), createVector(1, 1)],
        }
        this.hasEaten = false

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
        return board
    }

    drawBoard() {
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.columns; j++) {
                let position = createVector(j, i)
                stroke("#222831")
                noFill()
                rect(j * this.width, i * this.height, this.width, this.height)
                noStroke()
                if (this.isRed(position)) {
                    fill("#F05454")
                } else if (this.isGreen(position)) {
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
                if (!this.isEmpty(pos) && (this.gameManager.turn() == 'R' && this.isGreen(pos) || this.gameManager.turn() == 'G' && this.isRed(pos))) {
                    return false
                }
            }
        }
        return true
    }


    drawChecker(position) {
        let x, y
        [x, y] = this.getDrawCoordinates(position)
        let size = this.width * 0.65
        circle(x, y, size)
        imageMode(CENTER)
        if (this.isQueen(position)) {
            this.drawQueen(x, y)
        }
    }

    drawQueen(x, y) {
        image(queen, x, y)
    }

    getDrawCoordinates(position) {
        return [position.x * this.width + this.width / 2, position.y * this.height + this.height / 2]
    }

    move(to) {
        this.hasEaten = false
        if (to.dist(this.selected) > 2) {
            let direction = this.normalize(p5.Vector.sub(to, this.selected))
            let middle = p5.Vector.sub(to, direction)
            if (this.isRed(middle) || this.isGreen(middle)) {
                this.hasEaten = true
            }
            this.changeBoard(middle, " ")
        }
        let symbol = this.gameManager.turn()
        this.changeBoard(to, this.getSymbol(this.selected))
        this.changeBoard(this.selected, " ")
        this.validMoves = []
        if (this.boardLimit(to)) {
            this.promoteToQueen(to)
        }
        if (this.checkWin()) {
            this.gameManager.winner = this.gameManager.turn()
            this.gameManager.changeState(this.gameManager.states.WON)
            this.gameManager.updateTime()
        } else if (this.hasEaten) {
            this.select(to)
            if (this.validMoves.length == 0) {
                this.hasEaten = false
                this.gameManager.nextTurn()
            }
        } else {
            this.gameManager.nextTurn()
        }
    }


    normalize(vector) {
        let x = vector.x > 0 ? 1 : -1
        let y = vector.y > 0 ? 1 : -1
        return createVector(x, y)
    }

    boardLimit(pos) {
        return this.gameManager.turn() == 'G' && pos.y == 0 || this.gameManager.turn() == 'R' && pos.y == this.rows - 1
    }


    select(selected) {
        this.selected = selected
        this.generateValidMoves(this.selected)
    }

    generateValidMoves(from) {
        let validMoves = []
        let directions = []
        if (this.isQueen(from)) {
            this.generateQueenMoves(from)
            return
        } else if (this.hasEaten) {
            directions = this.directions.UP.concat(this.directions.DOWN)
        } else if (this.isGreen(from)) {
            directions = this.directions.UP
        } else if (this.isRed(from)) {
            directions = this.directions.DOWN
        }
        for (let direction of directions) {
            let move = p5.Vector.add(from, direction)
            if (isInside(move)) {
                if (this.isEmpty(move)) {
                    if (!this.hasEaten) {
                        validMoves.push(move)
                    }
                } else if (!this.isSameColor(from, move)) {
                    move.add(direction)
                    if (isInside(move) && this.isEmpty(move)) {
                        validMoves.push(move)
                    }
                }
            }
        }
        this.validMoves = validMoves
    }

    generateQueenMoves(from) {
        let directions = this.directions.UP.concat(this.directions.DOWN)
        let validMoves = []
        for (let direction of directions) {
            let move = p5.Vector.add(from, direction)
            while (isInside(move) && this.isEmpty(move)) {
                if (!this.hasEaten) {
                    validMoves.push(move.copy())
                }
                move.add(direction)
            }
            if (isInside(move) && !this.isSameColor(from, move)) {
                move.add(direction)
                if (isInside(move) && this.isEmpty(move)) {
                    validMoves.push(move.copy())
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

    isEmpty(position) {
        let symbol = this.getSymbol(position)
        return symbol == " "
    }

    isGreen(position) {
        let symbol = this.getSymbol(position)
        return symbol.includes('G')
    }

    isRed(position) {
        let symbol = this.getSymbol(position)
        return symbol.includes('R')
    }

    isQueen(position) {
        let symbol = this.getSymbol(position)
        return symbol.includes('Q')
    }

    isSameColor(pos1, pos2) {
        let symbol1 = this.getSymbol(pos1)
        let symbol2 = this.getSymbol(pos2)
        return symbol1.replace("Q", "") == symbol2.replace("Q", "")
    }

    promoteToQueen(position) {
        if (!this.isQueen(position)) {
            this.board[position.y][position.x] += 'Q'
        }
    }

    drawSelected() {
        for (let move of this.validMoves) {
            let c = color(this.colors[this.gameManager.turn()])
            c.setAlpha(100)
            noStroke()
            fill(c)
            this.drawChecker(move)
            if (this.isQueen(this.selected)) {
                let x, y
                [x, y] = this.getDrawCoordinates(move)
                push()
                tint(255, 100)
                this.drawQueen(x, y)
                pop()
            }
        }
    }

    changeBoard(position, symbol) {
        this.board[position.y][position.x] = symbol
    }

}