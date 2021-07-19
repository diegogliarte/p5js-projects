class Invader {
  constructor(x, y, invasion) {
    this.sprite = loadImage("invader.png")
    this.position = createVector(x, y)
    this.invasion = invasion
    this.projectile = null
  }

  draw() {
    image(this.sprite, this.position.x, this.position.y + this.invasion.y)
  }

  update() {
    this.position.x += this.invasion.speed * this.invasion.direction
  }

  bounce() {
    return (
      this.position.x + this.invasion.invaderWidth > width ||
      this.position.x < 0
    );
  }
}
