function setup() {
  createCanvas(500, 500);
  
  cells = 20 // Only works with certain numbers. If "size" ends up being a float, there are problems
  size = width / cells
  gameSpeed = 15 // FPS. The more, the faster
  directions = {
    37: [-size, 0], // Left
    38: [0, -size], // Up
    39: [size, 0], // Right
    40: [0, size], // Down
  }
  
  startGame()
}

function draw() {
  if (millis() - time > 1000 / gameSpeed) {
    waiting = false
    background(225);
    
    if (hasLost(snake)) {
      apple.draw()
      snake.draw()
      
      fill("black")
      stroke("black")
      textSize(32);
      textAlign(CENTER)
      text("You ate " + (snake.body.length - 2) + " apples", width / 2, height / 2);
      
      startGame()
      waiting = true
      time = millis() + 1500
      
    } else {
      snake.update(offset)
      snake.draw()
      snake.checkEaten(apple)
      apple.draw()
      time = millis()
    }
  }
}

function keyPressed() {
  if (!waiting) { // To avoid key presses during resets
    offset = directions[keyCode]
  }
}

function startGame() {
  snake = new Snake([0, cells / 2 * size], size)
  apple = new Apple(cells, size, snake)
  offset = directions[39]
  time = millis()
}

function hasLost(snake) {
  return snake.isOutside(offset) || snake.isInsideSnake(offset)
}


class Snake{
  constructor(head, size) {
    this.head = head
    this.size = size
    this.body = [[], []]
  }
  
  update(offset) {
    this.body.unshift(this.head)
    this.body.pop()
    this.head = this.addOffset(offset)
  }
  
  draw() {
    fill("green")
    stroke("green")
    rect(this.head[0], this.head[1], this.size, this.size)
    for (let i = 0; i < this.body.length; i++) {
      if (this.body[i].length > 0) {
        rect(this.body[i][0], this.body[i][1], this.size, this.size)
      }
    }
  }
  
  checkEaten(apple) {
    if (this.head[0] == apple.x && this.head[1] == apple.y) {
      this.body.push([])
      apple.update()
    }
  }
  
  isOutside(offset) {
    let head = this.addOffset(offset)
    return head[0] < 0 || head[0] > width - this.size || 
      head[1] < 0 || head[1] > height - this.size
  }
  
  isInsideSnake(offset) {
    let head = this.addOffset(offset)
    for (let i = 0; i < this.body.length; i++) {
      if (this.body[i].length > 0 && head[0] == this.body[i][0] && head[1] == this.body[i][1]) {
        return true
      }
    }
    return false
  }
  
  addOffset(offset) {
    return [this.head[0] + offset[0], this.head[1] + offset[1]]
  }
}

class Apple{
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
    fill("red")
    stroke("red")
    rect(this.x, this.y, this.size, this.size)
  }
}