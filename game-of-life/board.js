class Board {
    constructor(columns, rows, size) {
        this.columns = columns
        this.rows = rows
        this.size = size
        this.cells = this.createCells()
    }

    createCells() {
        let cells = []
        for (let i = 0; i < this.rows; i++) {
            let empty = []
            for (let j = 0; j < this.columns; j++) {
                empty.push(new Cell(j, i, this.size))
            }
            cells.push(empty)
        }
        return cells
    }

    updateCells() {
        let toUpdate = []
        for (let row of this.cells) {
            for (let cell of row) {
                cell.update(this.cells, toUpdate)
            }
        }
        if (toUpdate.length == 0) {
            return false // We can stop the simulation
        }

        for (let cell of toUpdate) {
            if (cell[1]) {
                cell[0].live()
            } else {
                cell[0].die()
            }
        }
        return true
    }

    drawCells() {
        for (let row of this.cells) {
            for (let cell of row) {
                cell.draw()
            }
        }
    }
}