import { Punto } from "./Punto"

export class ControlDireccional {
    constructor(direccionales, vector) {
        this.direccionales = direccionales || [];
        this.vector = vector || new Punto(0);
    }

    setVector(vector) {
        this.vector = vector
    }

    top() {
        const direccional = this.direccionales.find(d => d.vector.toString() === this.vector.toString())
        return direccional && direccional.id === 1
    }

    right() {
        const direccional = this.direccionales.find(d => d.vector.toString() === this.vector.toString())
        return direccional && direccional.id === 2
    }

    bottom() {
        const direccional = this.direccionales.find(d => d.vector.toString() === this.vector.toString())
        return direccional && direccional.id === 3
    }

    left() {
        const direccional = this.direccionales.find(d => d.vector.toString() === this.vector.toString())
        return direccional && direccional.id === 4
    }

    add(direccional) {
        this.direccionales.push(direccional)
    }

    eliminar(vector) {
        if (!(vector instanceof Punto)) {
            throw new TypeError("No es valido el vector")
        }
        const idx = this.direccionales.findIndex(d => d.vector.toString() === vector.toString())
        if (idx < 0) return
        this.direccionales.splice(idx, 1)
    }

    getVectores() {
        return this.direccionales.map(d => d.vector)
    }

    newInstance() {
        return new ControlDireccional(this.direccionales, this.vector);
    }
}