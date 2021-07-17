class AI {
    constructor(activated, board=null) {
        this.board = board
        this.player = "O"
        this.opponent = "X"
        this.checkbox = document.getElementById("toggle-ai")
        this.activated = true
        this.checkbox.addEventListener("click", e => {
            this.activated = !this.activated
            console.log(this.activated)
            if (this.activated) {
                this.checkbox.style.color = "#346751"
                this.checkbox.innerText = "AI Enabled, click to Disable"
            } else {
                this.checkbox.style.color = "#F05454"
                this.checkbox.innerText = "AI Disable, click to Enabled"
            }
        })
    }

    setBoard(board) {
        this.board = board
    }

    evaluate() {
        if (this.board.checkDiagonalPositive()) {
            return this.board.board[0][0] == this.player ? 10 : -10
        }

        if (this.board.checkDiagonalNegative()) {
            return this.board.board[0][this.board.columns - 1] == this.player ? 10 : -10
        }

        for (let i = 0; i < this.board.rows; i++) {
            if (this.board.checkHorizontal(i)) {
                return this.board.board[i][0] == this.player ? 10 : -10
            }
            if (this.board.checkVertical(i)) {
                return this.board.board[0][i] == this.player ? 10 : -10
            }
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

        if (this.board.dimensions > 3 && depth >= 4) {
            return score
        }

        let best
        if (isMax) { // Maximizer
            best = -1000
            for (let i = 0; i < this.board.rows; i++) {
                for (let j = 0; j < this.board.columns; j++) {
                    if (this.board.board[i][j] == null) {
                        this.board.board[i][j] = this.player
                        best = max(best, this.minimax(depth + 1, !isMax))
                        this.board.board[i][j] = null
                    }
                }
            }
        } else { // Minimizer
            best = 1000
            for (let i = 0; i < this.board.rows; i++) {
                for (let j = 0; j < this.board.columns; j++) {
                    if (this.board.board[i][j] == null) {
                        this.board.board[i][j] = this.opponent
                        best = min(best, this.minimax(depth + 1, !isMax))
                        this.board.board[i][j] = null
                    }
                }
            }
        }
        return best
    }

    hasMovesLeft() {
        for (let i = 0; i < this.board.rows; i++) {
            for (let j = 0; j < this.board.columns; j++) {
                if (this.board.board[i][j] == null) {
                    return true
                }
            }
        }
        return false
    }

    findBestMove() {
        let bestVal = -1000
        let bestMove = [-1, -1]
        let idx = 0
        for (let i = 0; i < this.board.rows; i++) {
            for (let j = 0; j < this.board.columns; j++) {
                if (idx == this.board.rows * this.board.columns) {
                    return [-2, -2]
                }
                if (this.board.board[i][j] == null) {
                    this.board.board[i][j] = this.player
                    let moveVal = this.minimax(0, false)
                    this.board.board[i][j] = null
                    if (moveVal > bestVal) {
                        bestMove = [j, i]
                        bestVal = moveVal
                    }
                }
                idx++
            }
        }
        return bestMove
    }
}