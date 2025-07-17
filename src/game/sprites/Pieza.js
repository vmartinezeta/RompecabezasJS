import Phaser from "phaser"
import PiezaBase from "./PiezaBase"
import { Punto } from "../classes/Punto";

export default class Pieza extends Phaser.GameObjects.Container {
    constructor(scene, config) {
        super(scene);
        this.scene = scene;
        this.config = config;
        const {row, col} = config;
        this.origen = new Punto(row, col);

        if (this.getPosition().some(property => config[property])) {
            this.compuesta();
        } else {
            const base = new PiezaBase(scene, config);
            this.add(base);
            this.enableGroupDrag(base);
        }
        scene.add.existing(this);
    }

    enableGroupDrag(group) {
        const {x, y} = group.config
        group.setInteractive(new Phaser.Geom.Rectangle(x, y, 200, 200), Phaser.Geom.Rectangle.Contains)

        this.scene.input.setDraggable(group)

        this.scene.input.on('drag', (pointer, gameObject, dragX, dragY) => {
            gameObject.x = dragX;
            gameObject.y = dragY;
        });
    }

    compuesta() {
        const config = { ...this.config }
        for (const p of this.getPosition().filter(p => config[p])) {
            delete config[p]
        }

        const base = this.add(new PiezaBase(this.scene, config))
        this.enableGroupDrag(base)

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

    siguiente(origen, vector) {
        return new Punto(origen.x + vector.x, origen.y+vector.y)
    }

    isValido(punto) {
        return punto.x>=0 && punto.x<this.config.col
        && punto.y>=0 && punto.y<this.config.y
    }

    getExtensiones() {
        const vectores = [
            new Punto(-1, 0),
            new Punto(0, 1),
            new Punto(1, 0),
            new Punto(0, -1)
        ]
        const puntos = []
        for(const vector of vectores) {
            const punto = this.siguiente(this.origen, vector)
            if (this.isValido(punto)) {
                puntos.push(punto)
            }
        }
        return puntos
    }
}