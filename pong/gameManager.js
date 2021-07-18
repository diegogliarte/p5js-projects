class GameManager {
    constructor() {
        this.states = {
            PLAYING: 0,
            GOAL: 1,
        }
        this.state = this.states.PLAYING
        this.playerScored = null
        this.time = millis()
    }

    changeState(state) {
        this.state = state
    }

    updateTime(ms = 0) {
        this.time = millis() + ms
    }
}