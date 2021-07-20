function setup() {
  let canvas = createCanvas(500, 500)
  let x = (windowWidth - width) / 2
  let y = (windowHeight - height) / 2
  canvas.position(x, y)
  angleMode(DEGREES)
  n = 2
  maxDepth = 11
  stroke("#222831")
  listeners()
}

function draw() {
  background("#DDDDDD")
  translate(width / 2, height)
  let x = constrain(mouseX / width, 0, 1)
  let angle = map(x, 0, 1, 0, 90)

  let y = constrain(mouseY / height, 0, 1)
  let depth = map(y, 0, 1, maxDepth, 0)

  tree = new Tree(n, 140, 180, angle, 0, depth, true)
  tree.draw()
}

function listeners() {
  let less = document.getElementById("less")
  let more = document.getElementById("more")
  let result = document.getElementById("result")
  less.addEventListener("click", e => {
    if (n > 2) {
      n--
      result.innerText = n
      maxDepth = round(logBase(n, 2**12))
    }
  })
  more.addEventListener("click", e => {
    n++
    result.innerText = n
    maxDepth = round(logBase(n, 2**12))
  })
}

function logBase(base, n) {
  return log(n) / log(base)
}


  