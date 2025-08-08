import { Punto } from "../classes/Punto";
import { Direccional } from "../classes/Direccional";
import { ControlDireccional } from "../classes/ControlDireccional";
import Phaser from "phaser";
import PiezaBase from "./PiezaBase";

export default class Pieza extends Phaser.GameObjects.Container {
    constructor(scene, config) {
        super(scene);
        this.scene = scene;
        this.config = config;
        const { x, y, row, col, pieceWidth, pieceHeight, pivote } = config;
        this.deltaX = 0;
        this.deltaY = 0;
        if (this.tienePunta("top")) {
            this.deltaY = pivote;
        }
        if (this.tienePunta("left")) {
            this.deltaX = pivote;
        }
        config.deltaX = this.deltaX;
        config.deltaY = this.deltaY;
        this.pivote = pivote;
        this.origen = new Punto(row, col);
        this.anterior = new Punto(x, y);
        this.moviendo = false;
        this.pieceWidth = pieceWidth;
        this.pieceHeight = pieceHeight;
        this.direccional = new ControlDireccional();
        this.crearDireccionales();

        if (this.getPosition().some(property => config[property])) {
            this.compuesta();
        } else {
            this.simple();
        }
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.body.setSize(pieceWidth - 2 * pivote, pieceHeight - 2 * pivote);
        this.body.setOffset(x + this.deltaX + pivote, y + this.deltaY + pivote);
    }

    actualizarConfig() {

    }

    simple() {
        const base = this.add(new PiezaBase(this.scene, this.config));
        this.enableGroupDrag(base);
    }

    enableGroupDrag(group) {
        const { x, deltaX, y, deltaY, pieceWidth, pieceHeight, pivote } = group.config;
        group.setInteractive(new Phaser.Geom.Rectangle(x + deltaX + pivote, y + deltaY + pivote, pieceWidth - 2 * pivote, pieceHeight - 2 * pivote), Phaser.Geom.Rectangle.Contains);

        this.scene.input.setDraggable(group)
        this.scene.input.on('dragstart', (_, gameObject) => {
            gameObject.moviendo = true;
        });

        this.scene.input.on('drag', (_, gameObject, dragX, dragY) => {
            if (!gameObject.moviendo) return;
            gameObject.x = dragX;
            gameObject.y = dragY;
        });

        this.scene.input.on('dragend', (_, gameObject) => {
            gameObject.finMovimiento();
        });
    }

    compuesta() {
        const config = { ...this.config };
        for (const p of this.getPosition().filter(p => config[p])) {
            delete config[p];
        }

        const base = this.add(new PiezaBase(this.scene, config));
        this.enableGroupDrag(base);

        const { pivote, pieceWidth, pieceHeight, deltaX, deltaY } = this.config;
        if (this.config["top"]) {
            const pm = (pieceWidth - pivote) / 2;
            this.recortar(pm + deltaX, 0, pivote, pivote);
        }

        if (this.config["right"]) {
            const pm = (pieceHeight - pivote) / 2;
            this.recortar(deltaX + pieceWidth, pm + deltaY, pivote, pivote);
        }

        if (this.config["bottom"]) {
            const pm = (pieceWidth - pivote) / 2;
            this.recortar(pm + deltaX, deltaY + pieceHeight, pivote, pivote);
        }

        if (this.config["left"]) {
            const pm = (pieceHeight - pivote) / 2;
            this.recortar(0, pm + deltaY, pivote, pivote);
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
        return (punto.x >= 0 && punto.x <= this.config.rows - 1)
            && (punto.y >= 0 && punto.y <= this.config.cols - 1)
    }

    crearDireccionales() {
        const direccionales = [
            new Direccional(1, "TOP", new Punto(-1, 0)),
            new Direccional(2, "RIGHT", new Punto(0, 1)),
            new Direccional(3, "BOTTOM", new Punto(1, 0)),
            new Direccional(4, "LEFT", new Punto(0, -1))
        ]

        for (const direccional of direccionales) {
            const punto = this.siguiente(this.origen, direccional.vector)
            if (this.isValido(punto)) {
                this.direccional.add(direccional)
            }
        }
    }

    getVectores() {
        return this.direccional.getVectores()
    }

    eliminarVector(vector) {
        this.direccional.eliminar(vector)
    }

    setVector(vector) {
        const direccional = this.direccional.newInstance()
        direccional.setVector(vector)
        return direccional
    }

    isMovValido() {
        if (!this.moviendo) return false;
        const distancia = Phaser.Math.Distance.BetweenPoints(this.anterior, this.actual());
        if (distancia < 100) return false;
        return true;
    }

    actual() {
        return new Punto(this.x+this.deltaX+this.pivote, this.y+this.deltaY+this.pivote);
    }

    finMovimiento() {
        this.moviendo = false;
        this.anterior = this.actual();
    }

    existe(property) {
        return property in this.config;
    }

    tieneAgujero(property) {
        return this.existe(property) && !this.config[property];
    }

    tienePunta(property) {
        return this.existe(property) && this.config[property];
    }

}