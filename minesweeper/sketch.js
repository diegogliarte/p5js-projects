function setup() {
  mines = 10
  rows = 8
  columns = 10
  size = 40
  states = {
    PLAYING: 0,
    WON: 1,
    LOST: 2,
    WAITING: 3,
  }
  createCanvas(columns * size, rows * size)
  startGame()
}

function draw() {
  background(220)
  drawBoard()
  drawHideBoard()
  switch (state) {
    case states.PLAYING:
      index_x = floor(mouseX / (width / columns))
      index_y = floor(mouseY / (height / rows))
      if (isInside(index_x, index_y) && !visible[index_y][index_x]) {
        fill("white")
        stroke("black")
        rect(index_x * size, index_y * size, size)
      }
      break
    case states.WON:
      break
      
    case states.LOST:
      textAlign(CENTER)
      textSize(32)
      stroke("red")
      fill("red")
      text("You lost", width / 2, height / 2)
      if (millis() - time > 5) {
        finished = revealBoard()
        console.log(finished,  millis() - time)
        if (finished && millis() - time > 1500) {
          startGame() 
        } else if (!finished) {
          time = millis()
        }
      }
      
      break
      
      
  }
  
}

function mousePressed() {
  if (isInside(index_x, index_y)) {
    visible[index_y][index_x] = true
 
    if (board[index_y][index_x] == 0) { // Reveal all zeros
      zeros = []
      getZeros(index_x, index_y, zeros)
    } else if (board[index_y][index_x] == "B") {
      state = states.LOST
      time = millis()
    }
  }
}

function revealBoard() {
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < columns; j++) {
      if (!visible[i][j]) {
        visible[i][j] = true
        return false
      }
    } 
  }  
  return true
}

function getZeros(x, y, zeros) {
  for (let i = -1; i <= 1; i++) {
    for (let j = -1; j <= 1; j++) {
      let new_x = x + j
      let new_y = y + i
      if (isInside(new_x, new_y) && !visible[new_y][new_x]) {
        visible[new_y][new_x] = true
        if (board[new_y][new_x] == '0') {
          getZeros(new_x, new_y, zeros)
        }
      }
    }  
  }
}
  

function startGame() {
  state = states.PLAYING
  board = createBoard()
  visible = createVisible()
}

function createVisible() {
  let board = []
  for (let i = 0; i < rows; i++) {
    let empty = []
    for (let j = 0; j < columns; j++) {
      empty.push(false)
    } 
    board.push(empty)
  } 
  return board
}

function createBoard() {
  let board = []
  for (let i = 0; i < rows; i++) {
    let empty = []
    for (let j = 0; j < columns; j++) {
      empty.push(0)
    } 
    board.push(empty)
  }
  
  minesToPlace = mines
  let i = 100
  while (minesToPlace > 0 && i > 0) {
    x = floor(random(columns))
    y = floor(random(rows))
    if (board[y][x] != 'B') {
      board[y][x] = 'B'
      minesToPlace--
    }
    i++
  }
  
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < columns; j++) {
      if (board[i][j] != 'B') {
        board[i][j] = countNeighbors(board, j, i)
      }
    } 
  }
  return board
}

function countNeighbors(board, x, y) {
  counter = 0
  for (let i = -1; i <= 1; i++) {
    for (let j = -1; j <= 1; j++) {
      if (isInside(x + j, y + i) && board[y + i][x + j] == 'B') {
        counter++
      }
    }  
  }
  return counter
}

function isInside(x, y) {
  return 0 <= x && x < columns && 0 <= y && y < rows
}

function drawBoard() {
  textAlign(CENTER)
  textSize(12)
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < columns; j++) {
      fill("white")
      stroke("black")
      rect(j * size, i * size, size)
      fill("black")
      stroke("rgba(0, 0, 0, 0)")
      text(board[i][j], j * size + size / 2, i * size + size / 2) 
    } 
  }
}

function drawHideBoard() {
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < columns; j++) {
      if (!visible[i][j]) {
      fill("grey")
      stroke("black")
      rect(j * size, i * size, size)
      }
    } 
  }
}
