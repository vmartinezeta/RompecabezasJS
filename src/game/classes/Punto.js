export class Punto {
    constructor(x, y) {
        this.x = x
        this.y = y
    }

    isIgual(x, y) {
        return this.x === x && this.y === y
    }

    toString() {
        return `P(${this.x},${this.y})`
    }
}