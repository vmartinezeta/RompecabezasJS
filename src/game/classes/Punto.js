export class Punto {
    constructor(x, y) {
        this.x = x;
        if(arguments.length === 1) {
            this.y = x;
        } else {
            this.y = y;
        }
    }

    toString() {
        return `P(${this.x},${this.y})`
    }
}