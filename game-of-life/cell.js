class Cell {
  constructor(x, y, size) {
    this.x = x
    this.y = y
    this.size = size
    this.alive = false
  }
  
  die() {
    this.alive = false
  }
  
  live() {
    this.alive = true
  }
  
  toggle() {
    this.alive = !this.alive
  }
  
  isAlive() {
    return this.alive
  }
  
  
  update(cells, toUpdate) {
    let neighbors = this.countNeighbors(cells)
    // if (this.isAlive()) {
    //   print(this, neighbors)
    // }
    if (!this.isAlive() && neighbors == 3) {
      toUpdate.push([this, true])
    } else if (neighbors != 2 && neighbors != 3) {
      toUpdate.push([this, false])
    } else {
      toUpdate.push([this, this.isAlive()])
    }
  }
  
  countNeighbors(cells) {
    let counter = 0
    for (let i = -1; i <= 1; i++) {
      for (let j = -1; j <= 1; j++) {
        let x = this.x + j
        let y = this.y + i
        if (isInside(x, y) && cells[y][x].isAlive() && !(this.x == x && this.y == y)) {
          counter++
        }
      }  
    }
    return counter
  }
  
  draw() {
    if (this.isAlive()) {
      fill("black")
    } else {
      stroke("#222831")
      noFill()
    }
    rect(this.x * this.size, this.y * this.size, this.size, this.size)
  }
}