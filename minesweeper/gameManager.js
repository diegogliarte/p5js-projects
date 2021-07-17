class GameManager {
    constructor(difficulty) {
        this.difficulty = difficulty
        this.rows = difficulty[0]
        this.columns = difficulty[1]
        this.mines = difficulty[2]
        this.cellSize = 40
        this.states = {
            PLAYING: 0,
            WON: 1,
            LOST: 2,
        }
        this.state = this.states.PLAYING
        this.colors = {
            1: "blue",
            2: "forestgreen",
            3: "red",
            4: "darkblue",
            5: "brown",
            6: "lightblue",
            7: "black",
            8: "grey",
            "B": "black",
        }
    }

    changeState(state) {
        this.state = state
    }

    updateTime(ms = 0) {
        this.time = millis() + ms
    }
}