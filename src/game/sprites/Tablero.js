import Phaser from "phaser"
import Pieza from "./Pieza"
import { Punto } from "../classes/Punto"

export default class Tablero extends Phaser.GameObjects.Group {
    constructor(scene, piezas, config) {
        super(scene);
        this.scene = scene;
        this.config = config;
        this.sprites = piezas;
        this.piezas = [];
        this.crearTablero();
        this.desordenar(new Punto(50, 50), 100);
        this.scene.physics.add.existing(this);
    }

    crearTablero() {
        const { gap, x, y, rows, cols } = this.config;
        const array = this.sprites.piezas;
        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < cols; j++) {
                const idx = cols * i + j;
                if (idx > array.length - 1) break;
                const config = array[idx];
                config.pivote = this.sprites.pivote;
                const x0 = gap * j + x;
                const y0 = gap * i + y;
                const pieza = new Pieza(
                    this.scene,
                    {
                        ...config,
                        rows,
                        cols,
                        row: i,
                        col: j,
                        x: x0,
                        y: y0
                    });

                this.add(pieza);
                this.piezas.push(pieza);
            }
        }
    }

    ocultar() {
        for (const p of this.piezas) {
            p.setVisible(false);
        }
    }

    mostrar() {
        for (const p of this.piezas) {
            p.setVisible(true);
        }        
    }

    desordenar(origen, radio) {
        const THETA_EN_RADIANES = 2 * Math.PI
        let cantidadPuntos = this.config.rows * this.config.cols
        const sectorCircular = []
        while (cantidadPuntos) {
            const theta = Math.random() * THETA_EN_RADIANES
            const r = Math.random() * radio
            const x = Math.ceil(r * Math.cos(theta)) + origen.x
            const y = Math.ceil(r * Math.sin(theta)) + origen.y

            const punto = new Punto(x, y)
            if (!this.existe(punto, sectorCircular)) {
                sectorCircular.push(punto)
                cantidadPuntos--
            }
        }


        for (let i = 0; i < this.config.rows; i++) {
            for (let j = 0; j < this.config.cols; j++) {
                const children = this.getChildren()
                const sprite = children[this.config.cols * i + j]
                const { x, y } = sectorCircular[this.config.cols * i + j]
                sprite.x = x
                sprite.y = y
            }
        }
    }

    existe(origen, sector) {
        return sector.map(c => c.toString()).includes(origen.toString())
    }

}