import Phaser from "phaser"

export default class PiezaBase extends Phaser.GameObjects.Container {
    constructor(scene, config) {
        super(scene);
        this.scene = scene;
        this.config = config;
        this.arriba();
        this.derecha();
        this.abajo();
        this.izquierda();
        this.centro();
        scene.add.existing(this);
    }

    existe(property) {
        return property in this.config
    }

    tieneAgujero(property) {
        return this.existe(property) && !this.config[property]
    }

    tienePunta(property) {
        return this.existe(property) && this.config[property]
    }

    arriba() {
        if (this.tienePunta("top")) {
            throw new TypeError("No es valido")
        }
        if (this.tieneAgujero("top")) {
            this.arribaIzquierda()
            this.arribaDerecha()
        }
    }

    arribaIzquierda() {
        const { pivote, pieceWidth } = this.config
        const pm = (pieceWidth - pivote) / 2
        this.recortar(pivote, 0, pm - pivote, pivote)
    }

    arribaDerecha() {
        const {pieceWidth, pivote } = this.config
        const pm = (pieceWidth - pivote) / 2
        this.recortar(pm + pivote, 0, pm - pivote, pivote)
    }

    derecha() {
        if (this.tienePunta("right")) {
            throw new TypeError("No es valido")
        }
        if (this.tieneAgujero("right")) {
            this.derechaArriba()
            this.derechaAbajo()
        }
    }

    derechaArriba() {
        const {pieceWidth, pieceHeight, pivote } = this.config
        const pm = (pieceHeight - pivote) / 2
        this.recortar(pieceWidth - pivote, pivote, pivote, pm - pivote)
    }

    derechaAbajo() {
        const {pieceWidth, pieceHeight, pivote } = this.config
        const pm = (pieceHeight - pivote) / 2
        this.recortar(pieceWidth - pivote, pm + pivote, pivote, pm - pivote)
    }

    abajo() {
        if (this.tienePunta("bottom")) {
            throw new TypeError("No es valido")
        }
        if (this.tieneAgujero("bottom")) {
            this.abajoIzquierda()
            this.abajoDerecha()
        }
    }

    abajoIzquierda() {
        const {pieceWidth, pieceHeight, pivote } = this.config
        const pm = (pieceWidth - pivote) / 2
        this.recortar(pivote, pieceHeight - pivote, pm - pivote, pivote)
    }

    abajoDerecha() {
        const { pieceWidth, pieceHeight, pivote } = this.config
        const pm = (pieceWidth - pivote) / 2
        this.recortar(pm + pivote, pieceHeight - pivote, pm - pivote, pivote)
    }

    izquierda() {
        if (this.tienePunta("left")) {
            throw new TypeError("No es valido")
        }
        if (this.tieneAgujero("left")) {
            this.izquierdaArriba()
            this.izquierdaAbajo()
        }
    }

    izquierdaArriba() {
        const {pivote, pieceHeight } = this.config
        const pm = (pieceHeight - pivote) / 2
        this.recortar(0, pivote, pivote, pm - pivote)
    }

    izquierdaAbajo() {
        const {pivote, pieceHeight } = this.config
        const pm = (pieceHeight - pivote) / 2
        this.recortar(0, pm + pivote, pivote, pm - pivote)
    }

    centro() {
        const {pivote, pieceWidth, pieceHeight } = this.config
        this.recortar(pieceWidth - pivote, 0, pivote, pivote)
        this.recortar(0, 0, pivote, pivote)

        this.recortar(0, pieceHeight - pivote, pivote, pivote)
        this.recortar(pieceWidth - pivote, pieceHeight - pivote, pivote, pivote)

        if (!this.existe("top")) {
            const pm = pieceWidth/2
            this.recortar(pivote, 0, pm-pivote, pivote)
            this.recortar(pm, 0, pm-pivote, pivote)
        }

        if (!this.existe("right")) {
            const pm = pieceHeight/2
            this.recortar(pieceWidth-pivote, pivote, pivote, pm-pivote)
            this.recortar(pieceWidth-pivote, pm, pivote, pm-pivote)
        }

        if (!this.existe("bottom")) {
            const pm = pieceWidth/2
            this.recortar(pivote, pieceHeight-pivote, pm-pivote, pivote)
            this.recortar(pm, pieceHeight-pivote, pm-pivote, pivote)
        }

        if (!this.existe("left")) {
            const pm = pieceHeight/2
            this.recortar(0, pivote, pivote, pm-pivote)
            this.recortar(0, pm, pivote, pm-pivote)
        }

        this.recortar(pivote, pivote, pieceWidth - 2 * pivote, pieceHeight - 2 * pivote);
    }

    recortar(x, y, width, height) {
        const {deltaX, deltaY, x:x0, y:y0, imageKey} = this.config;
        const sprite = this.scene.add.sprite(x0, y0, imageKey);
        sprite.setOrigin(0);
        sprite.setCrop(deltaX+x, deltaY+y, width, height);
        this.add(sprite);
        return sprite;
    }    
}