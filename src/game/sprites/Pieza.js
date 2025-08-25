import { Punto } from "../classes/Punto";
import { Direccional } from "../classes/Direccional";
import { ControlDireccional } from "../classes/ControlDireccional";
import Phaser from "phaser";
import PiezaBase from "./PiezaBase";
import PicoCuadrado from "./PicoCuadrado";


export default class Pieza extends PicoCuadrado {
    constructor(scene, config) {
        super(scene, config);
        this.scene = scene;
        this.config = {...config, deltaX: 0, deltaY: 0 };
        const { x, y, row, col, pieceWidth, pieceHeight, pivote } = config;
        if (this.tienePunta("top")) {
            this.config.deltaY = pivote;
        }

        if (this.tienePunta("left")) {
            this.config.deltaX = pivote;
        }

        this.pivote = pivote;
        this.origen = new Punto(row, col);
        this.anterior = new Punto(x, y);
        this.moviendo = false;
        this.pieceWidth = pieceWidth;
        this.pieceHeight = pieceHeight;
        this.direccional = new ControlDireccional();
        this.crearDireccionales();

        if (this.getBorders().some(property => config[property])) {
            this.compuesta();
        } else {
            this.simple();
        }

        scene.physics.add.existing(this);
        const {deltaX, deltaY} = this.config;
        this.body.setSize(pieceWidth - 2 * pivote, pieceHeight - 2 * pivote);
        this.body.setOffset(x+deltaX+pivote, y+deltaY+pivote);
    }

    simple() {
        const base = this.add(new PiezaBase(this.scene, this.config));
        this.enableGroupDrag(base);
    }

    enableGroupDrag(group) {
        const { x, y, pieceWidth, pieceHeight, pivote, deltaX, deltaY } = group.config;
        group.setInteractive(new Phaser.Geom.Rectangle(x+deltaX+pivote, y+deltaY+pivote, pieceWidth - 2 * pivote, pieceHeight - 2 * pivote), Phaser.Geom.Rectangle.Contains);

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
        for (const p of this.getBorders().filter(p => config[p])) {
            delete config[p];
        }

        const base = this.add(new PiezaBase(this.scene, config));
        this.enableGroupDrag(base);

        const { pivote, pieceWidth, pieceHeight, deltaX, deltaY } = this.config;
        if (this.tienePunta("top")) {
            const pm = (pieceWidth - pivote) / 2;
            this.recortar(pm + deltaX, 0, pivote, pivote);
        }

        if (this.tienePunta("right")) {
            const pm = (pieceHeight - pivote) / 2;
            this.recortar(deltaX + pieceWidth, pm + deltaY, pivote, pivote);
        }

        if (this.tienePunta("bottom")) {
            const pm = (pieceWidth - pivote) / 2;
            this.recortar(pm + deltaX, deltaY + pieceHeight, pivote, pivote);
        }

        if (this.tienePunta("left")) {
            const pm = (pieceHeight - pivote) / 2;
            this.recortar(0, pm + deltaY, pivote, pivote);
        }
    }

    recortar(x, y, width, height) {
        const sprite = this.scene.add.sprite(this.config.x, this.config.y, this.config.imageKey);
        sprite.setOrigin(0);
        sprite.setCrop(x, y, width, height);
        this.add(sprite);
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
        return new Punto(this.x, this.y);
    }

    finMovimiento() {
        this.moviendo = false;
        this.anterior = this.actual();
    }

}