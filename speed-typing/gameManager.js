class GameManager {
    constructor() {
        this.states = {
            PLAYING: 0,
            LOST: 1,
        }
        this.state = this.states.PLAYING
        this.time = millis()
    }

    changeState(state) {
        this.state = state
    }

    updateTime(ms = 0) {
        this.time = millis() + ms
    }
}