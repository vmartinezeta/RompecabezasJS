import { Punto } from "./Punto"

export class PiezaDireccional {
    constructor(vectores, vector) {
        this.vectores = vectores
        this.vector = vector
    }

    setVector(vector) {
        this.vector = vector
    }

    top() {
        return this.vectores.length === 1 && this.vectores[0].toString() === this.vector.toString()
    }

    right() {
        return this.vectores.length === 2 && this.vectores[1].toString() === this.vector.toString()
    }

    bottom() {
        return this.vectores.length === 3 && this.vectores[2].toString() === this.vector.toString()
    }

    left() {
        return this.vectores.length === 4 && this.vectores[3].toString() === this.vector.toString()
    }

    eliminar(vector) {
        if (!(vector instanceof Punto)) {
            throw new TypeError("No es valido el vector")
        }
        const idx = this.vectores.findIndex(v => v.toString() === vector.toString())
        if (idx < 0) return
        this.vectores.splice(idx, 1)
    }
}