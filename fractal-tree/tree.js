class Tree {
  constructor(n, length, rotation, angle, depth, maxDepth) {
    this.n = n
    this.length = length
    this.rotation = rotation
    this.angle = angle
    this.depth = depth
    this.maxDepth = maxDepth
    this.children = this.createChildren()
  }
  
  createChildren() {
    let children = []
    if (this.depth < this.maxDepth) {
      for (let i = 0; i < this.n; i++) {
        let mappedAngle = map(i, 0, this.n - 1, -this.angle, this.angle)
        let child = new Tree(this.n, this.length / 1.5, mappedAngle, this.angle, this.depth + 1, this.maxDepth)
        children.push(child)
      }
    }
    return children
    // if (this.length > this.minLength) {
    //   children.push(this.n, length / 2, this.minLength)
    // }
  }
  
  draw() {
    push()
    rotate(this.rotation)  
    line(0, 0, 0, this.length)
    translate(0, this.length)
    for (let child of this.children) {
      child.draw()
    }
    pop()
  }
}