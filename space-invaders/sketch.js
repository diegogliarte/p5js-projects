function setup() {
    let canvas = createCanvas(400, 550)
    let x = (windowWidth - width) / 2
    let y = (windowHeight - height) / 2
    canvas.position(x, y)
    textSize(32)
    textAlign(CENTER)
    textFont("Encode Sans SC")
    startGame(width / 2)
}

function draw() {
    background("#DDDDDD")
    if (gameManager.state != gameManager.states.WON) {
        updateInvasion()
    }

    if (gameManager.state != gameManager.states.LOST) {
        if (mouseIsPressed && mouseX < 0) {
            player.input(forceLeft = true)
        } else if (mouseIsPressed && mouseX > width) {
            print("right")
            player.input(forceLeft = false, forceRight = true)
        } else {
            player.input()
        }
        player.draw()
    }

    switch (gameManager.state) {
        case gameManager.states.MOVING:
            if (!player.canShoot) {
                player.shoot()
                gameManager.changeState(gameManager.states.SHOT)
            }
            break

        case gameManager.states.SHOT:
            updateProjectile()
            break
        case gameManager.states.WON:
        case gameManager.states.LOST:
            noStroke()
            if (gameManager.state == gameManager.states.WON) {
                fill(player.color)
                text("You Win", width / 2, height / 2)
            } else {
                fill(invasion.color)
                text("You Lose", width / 2, height / 2)
            }
            if (millis() - gameManager.time > 2000) {
                startGame(player.x)
                gameManager.changeState(gameManager.states.MOVING)
            }
            break
    }
}

function startGame(initialX) {
    gameManager = new GameManager()
    player = new Player(initialX, 50, 3, gameManager)
    invasion = new Invasion(4, 6, gameManager, player)
}

function updateInvasion() {
    invasion.invadersUpdate()
    invasion.invadersBounce()
    invasion.invadersDraw()
    invasion.shoot()
    invasion.checkLoseWinConditions()
}

function updateProjectile() {
    player.projectileUpdate()
    player.projectileDraw()
    player.projectileCollisioned(invasion)
}


function mouseClicked() {
    if (player.canShoot && mouseX >= 0 && mouseX < width) {
        player.canShoot = false
    }
}

function keyPressed() {
    if (key == " " && player.canShoot) {
        player.canShoot = false
    }
}