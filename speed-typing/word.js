class Word {
    constructor(word) {
        this.word = word
        this.length = word.length
        this.typed = 0
        this.margin = 10
        this.x = random(this.margin, width - this.margin - textWidth(word))
        this.y = -50
        this.speed = 2
    }

    draw() {
        let typed = this.word.slice(0, this.typed)
        let notTyped = this.word.slice(this.typed)
        fill("#346751")
        text(typed, this.x, this.y)
        let widthTyped = textWidth(typed)
        fill("#F05454")
        text(notTyped, widthTyped + this.x, this.y)

    }

    update() {
        this.y += this.speed
    }

    offScreen() {
        return this.y > height + textAscent()
    }

    checkTyped(character) {
        if (this.word[this.typed] == character) {
            this.typed++
            if (this.typed == this.length) {
                return true
            }
        }
        return false
    }

}