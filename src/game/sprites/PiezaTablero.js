import Phaser from "phaser"

export default class PiezaTablero extends Phaser.GameObjects.Container {
    constructor(scene, imageKey, origen, config) {
        super(scene)
        this.scene = scene
        this.imageKey = imageKey
        this.origen = origen
        this.config = config
        this.arriba()
        this.derecha()
        this.abajo()
        this.izquierda()
        this.esquinaIzqArriba()
        this.esquinaIzqAbajo()
        this.esquinaDerArriba()
        this.esquinaDerAbajo()
        this.centro()
        scene.add.existing(this)
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

    arriba() {
        if (this.tienePunta("top")) {
            this.arribaCentro()
        } else if (this.tieneAgujero("top")) {
            this.arribaIzquierda()
            this.arribaDerecha()
        }
    }

    arribaCentro() {
        const puntoMedio = (this.config.pieceWidth - this.config.pivote) / 2
        const sprite = this.scene.add.sprite(this.origen.x, this.origen.y, this.imageKey)
        sprite.setOrigin(0)
        sprite.setCrop(puntoMedio, 0, this.config.pivote, this.config.pivote)
        this.add(sprite)
    }

    arribaIzquierda() {
        const pm = (this.config.pieceWidth - this.config.pivote) / 2
        const sprite = this.scene.add.sprite(this.origen.x, this.origen.y, this.imageKey)
        sprite.setOrigin(0)
        sprite.setCrop(this.config.pivote, 0, pm - this.config.pivote, this.config.pivote)
        this.add(sprite)
    }
    arribaDerecha() {
        const pm = (this.config.pieceWidth - this.config.pivote) / 2
        const sprite = this.scene.add.sprite(this.origen.x, this.origen.y, this.imageKey)
        sprite.setOrigin(0)
        sprite.setCrop(pm + this.config.pivote, 0, pm - this.config.pivote, this.config.pivote)
        this.add(sprite)
    }

    derecha() {
        if (this.tienePunta("right")) {
            this.derechaCentro()
        } else if (this.tieneAgujero("right")) {
            this.derechaArriba()
            this.derechaAbajo()
        }
    }

    derechaCentro() {
        const pm = (this.config.pieceHeight - this.config.pivote) / 2
        const sprite = this.scene.add.sprite(this.origen.x, this.origen.y, this.imageKey)
        sprite.setOrigin(0)
        sprite.setCrop(this.config.pieceWidth - this.config.pivote,pm-this.config.pivote, this.config.pivote, this.config.pivote)
        this.add(sprite)
    }

    derechaArriba() { 
        const pm = (this.config.pieceHeight - this.config.pivote) / 2
        const sprite = this.scene.add.sprite(this.origen.x, this.origen.y, this.imageKey)
        sprite.setOrigin(0)
        sprite.setCrop(this.config.pieceWidth-this.config.pivote, this.config.pivote, this.config.pivote, pm - this.config.pivote)
        this.add(sprite)        
    }

    derechaAbajo() { 
        const pm = (this.config.pieceHeight - this.config.pivote) / 2
        const sprite = this.scene.add.sprite(this.origen.x, this.origen.y, this.imageKey)
        sprite.setOrigin(0)
        sprite.setCrop(this.config.pieceWidth-this.config.pivote, pm + this.config.pivote, this.config.pivote, pm - this.config.pivote)
        this.add(sprite)        
    }

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
        const sprite = this.scene.add.sprite(this.origen.x, this.origen.y, this.imageKey)
        sprite.setOrigin(0)
        sprite.setCrop(this.config.pivote, this.config.pieceHeight - this.config.pivote, pm - this.config.pivote, this.config.pivote)
        this.add(sprite)
    }

    abajoCentro() {
        const puntoMedio = (this.config.pieceWidth - this.config.pivote) / 2
        const sprite = this.scene.add.sprite(this.origen.x, this.origen.y, this.imageKey)
        sprite.setOrigin(0)
        sprite.setCrop(puntoMedio, this.config.pieceHeight - this.config.pivote, this.config.pivote, this.config.pivote)
        this.add(sprite)
    }

    abajoDerecha() {
        const pm = (this.config.pieceWidth - this.config.pivote) / 2
        const sprite = this.scene.add.sprite(this.origen.x, this.origen.y, this.imageKey)
        sprite.setOrigin(0)
        sprite.setCrop(pm + this.config.pivote, this.config.pieceHeight - this.config.pivote, pm, this.config.pivote)
        this.add(sprite)
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
        const sprite = this.scene.add.sprite(this.origen.x, this.origen.y, this.imageKey)
        sprite.setOrigin(0)
        sprite.setCrop(0, this.config.pivote, this.config.pivote, altura - this.config.pivote)
        this.add(sprite)
    }

    izquierdaCentro() {
        const altura = (this.config.pieceHeight - this.config.pivote) / 2
        const sprite = this.scene.add.sprite(this.origen.x, this.origen.y, this.imageKey)
        sprite.setOrigin(0)
        sprite.setCrop(0, altura, this.config.pivote, this.config.pivote)
        this.add(sprite)
    }

    izquierdaAbajo() {
        const altura = (this.config.pieceHeight - this.config.pivote) / 2
        const sprite = this.scene.add.sprite(this.origen.x, this.origen.y, this.imageKey)
        sprite.setOrigin(0)
        sprite.setCrop(0, altura + this.config.pivote, this.config.pivote, altura - this.config.pivote)
        this.add(sprite)
    }

    esquinaIzqArriba() {
        if (this.tienePunta("left") || this.tienePunta("top")) {
            return
        }
        const sprite = this.scene.add.sprite(this.origen.x, this.origen.y, this.imageKey)
        sprite.setOrigin(0)
        sprite.setCrop(0, 0, this.config.pivote, this.config.pivote)
        this.add(sprite)
    }

    esquinaIzqAbajo() {
        if (this.tienePunta("left") || this.tienePunta("bottom")) {
            return
        }
        const sprite = this.scene.add.sprite(this.origen.x, this.origen.y, this.imageKey)
        sprite.setOrigin(0)
        sprite.setCrop(0, this.config.pieceHeight - this.config.pivote, this.config.pivote, this.config.pivote)
        this.add(sprite)
    }

    esquinaDerArriba() {
        if (this.tienePunta("top") || this.tienePunta("right")) {
            return
        }
        const sprite = this.scene.add.sprite(this.origen.x, this.origen.y, this.imageKey)
        sprite.setOrigin(0)
        sprite.setCrop(this.config.pieceWidth - this.config.pivote, 0, this.config.pivote, this.config.pivote)
        this.add(sprite)
    }

    esquinaDerAbajo() {
        if (this.tienePunta("bottom") || this.tienePunta("right")) {
            return
        }
        const sprite = this.scene.add.sprite(this.origen.x, this.origen.y, this.imageKey)
        sprite.setOrigin(0)
        sprite.setCrop(this.config.pieceWidth - this.config.pivote, this.config.pieceHeight - this.config.pivote, this.config.pivote, this.config.pivote)
        this.add(sprite)
    }

    centro() {
        if (!this.existe("top")) {
            const arriba = this.scene.add.sprite(this.origen.x, this.origen.y, this.imageKey)
            arriba.setOrigin(0)
            arriba.setCrop(this.config.pivote, 0, this.config.pieceWidth - 2 * this.config.pivote, this.config.pivote)
            this.add(arriba)
        }

        if (!this.existe("bottom")) {
            const abajo = this.scene.add.sprite(this.origen.x, this.origen.y, this.imageKey)
            abajo.setOrigin(0)
            abajo.setCrop(this.config.pivote, this.config.pieceHeight - this.config.pivote, this.config.pieceWidth - 2 * this.config.pivote, this.config.pivote)
            this.add(abajo)
        }

        if (!this.existe("left")) {
            const izq = this.scene.add.sprite(this.origen.x, this.origen.y, this.imageKey)
            izq.setOrigin(0)
            izq.setCrop(0, this.config.pivote, this.config.pivote, this.config.pieceHeight - 2 * this.config.pivote)
            this.add(izq)
        }

        if (!this.existe("right")) {
            const der = this.scene.add.sprite(this.origen.x, this.origen.y, this.imageKey)
            der.setOrigin(0)
            der.setCrop(this.config.pieceWidth - this.config.pivote, this.config.pivote, this.config.pivote, this.config.pieceHeight - 2 * this.config.pivote)
            this.add(der)
        }

        const sprite = this.scene.add.sprite(this.origen.x, this.origen.y, this.imageKey)
        sprite.setOrigin(0)
        sprite.setCrop(this.config.pivote, this.config.pivote, this.config.pieceWidth - 2 * this.config.pivote, this.config.pieceHeight - 2 * this.config.pivote)
        this.add(sprite)
    }
}