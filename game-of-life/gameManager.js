class GameManager {
    constructor() {
        this.states = {
            RUNNING: 0,
            PAUSED: 1,
        }
        this.state = this.states.PAUSED

    }

    changeState(state) {
        this.state = state
    }

}