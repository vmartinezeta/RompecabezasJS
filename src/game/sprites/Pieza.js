import Phaser from "phaser"
import PiezaBase from "./PiezaBase"
import { Punto } from "../classes/Punto";
import { PiezaDireccional } from "../classes/PiezaDireccional";

export default class Pieza extends Phaser.GameObjects.Container {
    constructor(scene, config) {
        super(scene);
        this.scene = scene;
        this.config = config;
        this.movible = false;
        const { row, col } = config;
        this.origen = new Punto(row, col);     
        this.direccional = new PiezaDireccional([
            new Punto(-1, 0),
            new Punto(0, 1),
            new Punto(1, 0),
            new Punto(0, -1)
        ]);
        this.crearDireccionales();

        if (this.getPosition().some(property => config[property])) {
            this.compuesta();
        } else {
            const base = this.add(new PiezaBase(scene, config));
            this.enableGroupDrag(base);
        }
        this.setSize(200, 200);
        scene.physics.world.enable(this);
        this.body.setOffset(this.config.x + this.config.pieceWidth / 2, this.config.y + this.config.pieceHeight / 2);
        scene.add.existing(this);
    }

    enableGroupDrag(group) {
        const { x, y } = group.config
        group.setInteractive(new Phaser.Geom.Rectangle(x + 100, y + 100, 200, 200), Phaser.Geom.Rectangle.Contains)

        this.scene.input.setDraggable(group)
        this.scene.input.on('dragstart', (pointer, gameObject) => {
            gameObject.movible = true
        });

        this.scene.input.on('drag', (pointer, gameObject, dragX, dragY) => {
            gameObject.x = dragX;
            gameObject.y = dragY;
        });

        this.scene.input.on('dragend', (pointer, gameObject) => {
            gameObject.movible = false
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
        return new Punto(origen.x + vector.x, origen.y + vector.y)
    }

    isValido(punto) {
        return punto.x >= 0 && punto.x < this.config.rows
            && punto.y >= 0 && punto.y < this.config.cols
    }

    crearDireccionales() {
        for (const vector of this.getVectores()) {
            const punto = this.siguiente(this.origen, vector)
            if (!this.isValido(punto)) {
                this.direccional.eliminar(vector)
            }
        }
    }

    getVectores() {
        return this.direccional.vectores
    }

    top() {
        return this.direccional.top()
    }

    right() {
        return this.direccional.right()
    }

    bottom() {
        return this.direccional.bottom()
    }

    left() {
        return this.direccional.left()
    }

    eliminarVector(vector) {
        this.direccional.eliminar(vector)
    }
}