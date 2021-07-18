function setup() {
    let canvas = createCanvas(600, 500)
    let x = (windowWidth - width) / 2
    let y = (windowHeight - height) / 2
    canvas.position(x, y)
    startGame()
    textSize(32)
    textAlign(CENTER)
    textFont("Encode Sans SC")
}

function draw() {
    background(220)
    player.drawRacket()
    ai.drawRacket()
    player.drawScore(width / 3)
    ai.drawScore(2 * width / 3)
    switch (gameManager.state) {
        case gameManager.states.PLAYING:
            ball.bounceRacket(player)
            ball.bounceRacket(ai)
            ball.bounceWall() // If I check wall before racket, it bugs out at 45º angles
            ball.update()
            ball.draw()
            ai.checkScored(ball)
            player.checkScored(ball)
            break
        case gameManager.states.GOAL:
            if (millis() - gameManager.time > 1000) {
                ball.reset(gameManager.playerScored)
                gameManager.changeState(gameManager.states.PLAYING)
            }
            break

    }


}

function startGame() {
    gameManager = new GameManager()
    ball = new Ball()
    player = new Player(gameManager)
    ai = new AI(gameManager, ball)
}


