function preload() {
    wordList = loadStrings('words.txt');
}

function setup() {
    let canvas = createCanvas(500, 500)
    let x = (windowWidth - width) / 2
    let y = (windowHeight - height) / 2
    canvas.position(x, y)
    textFont("Encode Sans SC")
    textSize(32)
    startGame()
}

function draw() {
    background("#DDDDDD")
    switch (gameManager.state) {
        case gameManager.states.PLAYING:
            if (millis() > gameManager.time) {
                words.push(new Word(random(wordList)))
                gameManager.updateTime(random(500, 2250))
            }
            drawWords()
            updateWords()
            if (words.length > 0 && words[0].offScreen()) {
                gameManager.changeState(gameManager.states.LOST)
                gameManager.updateTime(2000)
            }
            break
        case gameManager.states.LOST:
            push()
            textAlign(CENTER)
            fill("#F05454")
            text("You Lost", width / 2, height / 2)
            pop()
            if (millis() > gameManager.time) {
                gameManager.changeState(gameManager.states.PLAYING)
                startGame()
            }
            break
    }
}

function keyPressed() {
    if (words[0].checkTyped(key)) {
        words.shift()
    }
}

function startGame() {
    words = []
    gameManager = new GameManager()
    gameManager.updateTime(random(500, 1500))
}

function drawWords() {
    for (let word of words) {
        word.draw()
    }
}


function updateWords() {
    for (let word of words) {
        word.update()
    }
}

