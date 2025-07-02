import Phaser from "phaser"

export default class PiezaTablero extends Phaser.GameObjects.Group {
    constructor(scene, imageKey, origen, config) {
        super(scene)
        this.imageKey = imageKey
        this.config = config
        this.origen = origen
        this.arriba()
        this.derecha()
        this.abajo()
        this.izquierda()
        this.esquinaIzqArriba()
        this.esquinaIzqAbajo()
        this.esquinaDerArriba()
        this.esquinaDerAbajo()
        this.centro()
    }

    existe(property) {
        return property in this.config
    }

    tienePunta(property) {
        return this.existe(property) && this.config[property]
    }

    tieneAgujero(property) {
        return this.existe(property) && !this.config[property]
    }

    arriba() { }

    derecha() { }

    abajo() {
        if (this.tienePunta("bottom")) {
            this.abajoCentro()
        } else if (this.tieneAgujero("bottom")) {
            this.abajoIzquierda()
            this.abajoDerecha()
        }
    }

    abajoIzquierda() {
        const pm = (this.config.pieceWidth - this.config.pivote) / 2
        const sprite = this.create(this.origen.x, this.origen.y, this.imageKey)
        sprite.setOrigin(0)
        sprite.setCrop(this.config.pivote, this.config.pieceHeight - this.config.pivote, pm - this.config.pivote, this.config.pivote)
    }

    abajoCentro() {
        const puntoMedio = (this.config.pieceWidth - this.config.pivote) / 2
        const sprite = this.create(this.origen.x, this.origen.y, this.imageKey)
        sprite.setOrigin(0)
        sprite.setCrop(puntoMedio, this.config.pieceHeight - this.config.pivote, this.config.pivote, this.config.pivote)
    }

    abajoDerecha() {
        const pm = (this.config.pieceWidth - this.config.pivote) / 2
        const sprite = this.create(this.origen.x, this.origen.y, this.imageKey)
        sprite.setOrigin(0)
        sprite.setCrop(pm + this.config.pivote, this.config.pieceHeight - this.config.pivote, pm, this.config.pivote)
    }

    izquierda() {
        if (this.tienePunta("left")) {
            this.izquierdaCentro()
        } else if (this.tieneAgujero("left")) {
            this.izquierdaArriba()
            this.izquierdaAbajo()
        }
    }

    izquierdaArriba() {
        const altura = (this.config.pieceHeight - this.config.pivote) / 2
        const sprite = this.create(this.origen.x, this.origen.y, this.imageKey)
        sprite.setOrigin(0)
        sprite.setCrop(0, this.config.pivote, this.config.pivote, altura - this.config.pivote)
    }

    izquierdaCentro() {
        const altura = (this.config.pieceHeight - this.config.pivote) / 2
        const sprite = this.create(this.origen.x, this.origen.y, this.imageKey)
        sprite.setOrigin(0)
        sprite.setCrop(0, altura, this.config.pivote, this.config.pivote)
    }

    izquierdaAbajo() {
        const altura = (this.config.pieceHeight - this.config.pivote) / 2
        const sprite = this.create(this.origen.x, this.origen.y, this.imageKey)
        sprite.setOrigin(0)
        sprite.setCrop(0, altura + this.config.pivote, this.config.pivote, altura - this.config.pivote)
    }

    esquinaIzqArriba() {
        if (this.tienePunta("left") || this.tienePunta("top")) {
            return
        }
        const sprite = this.create(this.origen.x, this.origen.y, this.imageKey)
        sprite.setOrigin(0)
        sprite.setCrop(0, 0, this.config.pivote, this.config.pivote)
    }

    esquinaIzqAbajo() {
        if (this.tienePunta("left") || this.tienePunta("bottom")) {
            return
        }
        const sprite = this.create(this.origen.x, this.origen.y, this.imageKey)
        sprite.setOrigin(0)
        sprite.setCrop(0, this.config.pieceHeight - this.config.pivote, this.config.pivote, this.config.pivote)
    }

    esquinaDerArriba() {
        if (this.tienePunta("top") || this.tienePunta("right")) {
            return
        }
        const sprite = this.create(this.origen.x, this.origen.y, this.imageKey)
        sprite.setOrigin(0)
        sprite.setCrop(this.config.pieceWidth - this.config.pivote, 0, this.config.pivote, this.config.pivote)
    }

    esquinaDerAbajo() {
        if (this.tienePunta("bottom") || this.tienePunta("right")) {
            return
        }
        const sprite = this.create(this.origen.x, this.origen.y, this.imageKey)
        sprite.setOrigin(0)
        sprite.setCrop(this.config.pieceWidth - this.config.pivote, this.config.pieceHeight - this.config.pivote, this.config.pivote, this.config.pivote)
    }

    centro() {
        if (!this.existe("top")) {
            const arriba = this.create(this.origen.x, this.origen.y, this.imageKey)
            arriba.setOrigin(0)
            arriba.setCrop(this.config.pivote, 0, this.config.pieceWidth - 2 * this.config.pivote, this.config.pivote)
        }

        if (!this.existe("bottom")) {
            const abajo = this.create(this.origen.x, this.origen.y, this.imageKey)
            abajo.setOrigin(0)
            abajo.setCrop(this.config.pivote, this.config.pieceHeight - this.config.pivote, this.config.pieceWidth - 2 * this.config.pivote, this.config.pivote)
        }

        if (!this.existe("left")) {
            const izq = this.create(this.origen.x, this.origen.y, this.imageKey)
            izq.setOrigin(0)
            izq.setCrop(0, this.config.pivote, this.config.pivote, this.config.pieceHeight - 2 * this.config.pivote)
        }

        if (!this.existe("right")) {
            const der = this.create(this.origen.x, this.origen.y, this.imageKey)
            der.setOrigin(0)
            der.setCrop(this.config.pieceWidth - this.config.pivote, this.config.pivote, this.config.pivote, this.config.pieceHeight - 2 * this.config.pivote)
        }

        const sprite = this.create(this.origen.x, this.origen.y, this.imageKey)
        sprite.setOrigin(0)
        sprite.setCrop(this.config.pivote, this.config.pivote, this.config.pieceWidth - 2 * this.config.pivote, this.config.pieceHeight - 2 * this.config.pivote)
    }
}