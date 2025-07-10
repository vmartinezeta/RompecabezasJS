import Phaser from "phaser"
import PiezaBase from "./PiezaBase"

export default class Pieza extends Phaser.GameObjects.Container {
    constructor(scene, config) {
        super(scene)
        this.scene = scene
        this.config = config

        if (this.getPosition().some(property => config[property])) {
            this.compuesta()
        } else {
            this.add(new PiezaBase(scene, config))
        }
        scene.add.existing(this)
    }

    compuesta() {
        const config = { ...this.config }
        for (const p of this.getPosition().filter(p => config[p])) {
            delete config[p]
        }
        
        this.add(new PiezaBase(this.scene, config))

        const { pivote, pieceWidth, pieceHeight, deltaX, deltaY } = this.config
        if (this.config["top"]) {
            const pm = (pieceWidth - pivote) / 2
            this.recortar(pm + deltaX, 0, pivote, pivote)
        }

        if (this.config["right"]) {
            const pm = (pieceHeight - pivote) / 2
            this.recortar(deltaX + pieceWidth, pm + deltaY, pivote, pivote)
        }

        if (this.config["bottom"]) {
            const pm = (pieceWidth - pivote) / 2
            this.recortar(pm + deltaX, deltaY + pieceHeight, pivote, pivote)
        }

        if (this.config["left"]) {
            const pm = (pieceHeight - pivote) / 2
            this.recortar(0, pm + deltaY, pivote, pivote)
        }

    }

    getPosition() {
        return Object.keys(this.config).filter(value => ["top", "right", "bottom", "left"].includes(value))
    }

    recortar(x, y, width, height) {
        const { x: x0, y: y0, imageKey } = this.config
        const sprite = this.scene.add.sprite(x0, y0, imageKey)
        sprite.setOrigin(0)
        sprite.setCrop(x, y, width, height)
        this.add(sprite)
        return sprite
    }
}