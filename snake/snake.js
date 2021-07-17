class Snake {
    color = "#346751"

    constructor(head, size, initialSize) {
        this.head = head
        this.size = size
        this.body = []
        for (let i = 0; i < initialSize; i++) {
            this.body.push([])
        }
    }

    update(direction) {
        this.body.unshift(this.head)
        this.body.pop()
        this.head = addPoints(direction, this.head)
    }

    draw() {
        fill(this.color)
        stroke(this.color)
        rect(this.head[0], this.head[1], this.size, this.size)
        for (let i = 0; i < this.body.length; i++) {
            if (this.body[i].length > 0) {
                rect(this.body[i][0], this.body[i][1], this.size, this.size)
            }
        }
    }

    checkEaten(apple) {
        if (floor(this.head[0]) == floor(apple.x) && floor(this.head[1]) == floor(apple.y)) {
            this.body.push([])
            apple.update()
        }
    }

    isOutside(direction) {
        let head = addPoints(direction, this.head)
        return Math.trunc(head[0]) < 0 || floor(head[0]) > floor(width - this.size) ||
            Math.trunc(head[1]) < 0 || floor(head[1]) > floor(height - this.size)
    }

    isInsideSnake(direction) {
        let head = addPoints(direction, this.head)
        for (let i = 0; i < this.body.length; i++) {
            if (this.body[i].length > 0 && head[0] == this.body[i][0] && head[1] == this.body[i][1]) {
                return true
            }
        }
        return false
    }
}