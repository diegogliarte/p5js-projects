class AI {
    constructor(activated) {
        this.board = board
        this.player = "O"
        this.opponent = "X"
        this.checkbox = document.getElementById("AI")
        this.activated = this.checkbox.checked
        this.checkbox.addEventListener("change", e => this.activated = this.checkbox.checked)
    }

    evaluate() {
        for (let i = 0; i < this.board.rows; i++) {
            if (this.board.checkHorizontal(i)) {
                return this.board.board[i][0] == this.player ? 10 : -10
            }
            if (this.board.checkVertical(i)) {
                return this.board.board[0][i] == this.player ? 10 : -10
            }
        }
        if (this.board.checkDiagonal()) {
            return this.board.board[1][1] == this.player ? 10 : -10
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
        for (let i = 0; i < this.board.rows; i++) {
            for (let j = 0; j < this.board.columns; j++) {
                if (this.board.board[i][j] == null) {
                    this.board.board[i][j] = this.player
                    let moveVal = this.minimax(0, false)
                    this.board.board[i][j] = null
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