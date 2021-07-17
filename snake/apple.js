class Apple {
    color = "#F05454"

    constructor(cells, size, snake) {
        this.cells = cells
        this.size = size
        this.snake = snake
        this.update()
    }

    update() {
        this.x = floor(random(this.cells)) * this.size
        this.y = floor(random(this.cells)) * this.size
        for (let i = 0; i < this.snake.body.length; i++) {
            if (this.snake.body[i][0] == this.x && this.snake.body[i][1] == this.y) {
                this.update()
            }
        }
    }

    draw() {
        fill(this.color)
        stroke(this.color)
        rect(this.x, this.y, this.size, this.size)
    }
}