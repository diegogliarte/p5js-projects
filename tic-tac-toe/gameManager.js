class GameManager {
    constructor(board) {
        this.states = {
            GREEN: "Green",
            RED: "Red",
            WON: 2,
            DRAW: 3,
            WAITING: 4,
        }
        this.state = random([this.states.GREEN, this.states.RED])
        this.winner = null
        this.moves = 0
        this.time = millis()
        this.board = board
        this.message = ""
    }

    move(x, y) {
        let symbol = this.state == this.states.GREEN ? "X" : "O"
        this.board.board[y][x] = symbol
        this.moves++
        if (this.hasWon(x, y)) {
            this.winner = this.state
            this.changeState(this.states.WON)
        } else if (this.moves == this.board.rows * this.board.columns) { // Max moves
            this.changeState(this.states.DRAW)
        } else {
            this.nextTurn()
        }
    }

    hasWon(x, y) {
        return this.board.checkHorizontal(y) || this.board.checkVertical(x) || this.board.checkDiagonal()
    }

    nextTurn() {
        let state = this.state == this.states.GREEN ? this.states.RED : this.states.GREEN
        this.changeState(state)
    }

    updateTime(ms = 0) {
        this.time = millis() + ms
    }

    changeState(state) {
        this.state = state
    }
}