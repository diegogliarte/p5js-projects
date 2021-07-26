class GameManager {
    constructor() {
        this.states = {
            GREEN: 0,
            RED: 1,
            WON: 2,
            DRAW: 3,
        }
        this.state = this.states.GREEN
        this.time = millis()
        this.winner = null
    }

    changeState(state) {
        this.state = state
    }

    updateTime(ms = 0) {
        this.time = millis() + ms
    }

    turn() {
        return this.state == this.states.GREEN ? 'G' : 'R'
    }

    nextTurn() {
        this.state = this.state == this.states.GREEN ? this.states.RED : this.states.GREEN
    }


}