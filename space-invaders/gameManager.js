class GameManager {
    constructor() {
        this.states = {
            MOVING: 0,
            SHOT: 1,
            WON: 2,
            LOST: 3,
        }
        this.state = this.states.MOVING
        this.time = millis()
    }

    changeState(state) {
        this.state = state
    }

    updateTime(ms = 0) {
        this.time = millis() + ms
    }

}