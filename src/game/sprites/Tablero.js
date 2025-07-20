import Phaser from "phaser"
import Pieza from "./Pieza"
import { Punto } from "../classes/Punto"

export default class Tablero extends Phaser.GameObjects.Group {
    constructor(scene, piezas, config) {
        super(scene)
        this.scene = scene
        this.config = config
        this.piezas = []
        this.crearTablero(piezas, config)
        this.desordenar(new Punto(100, 100), 150)
        this.scene.physics.add.existing(this, true)
    }

    crearTablero(piezas, config) {
        const { gap, x, y, rows, cols } = config
        const array = Object.entries(piezas)

        for (let i = 0; i < rows; i++) {
            const l = []
            for (let j = 0; j < cols; j++) {
                const idx = cols * i + j
                if (idx > array.length - 1) break
                const [imageKey, options] = array[idx]
                const x0 = gap * j + x
                const y0 = gap * i + y

                const pieza = new Pieza(
                    this.scene,
                    {
                        ...options,
                        imageKey,
                        rows,
                        cols,
                        row: i,
                        col: j,
                        x: x0,
                        y: y0
                    })

                this.add(pieza)
                l.push(pieza)
            }
            this.piezas.push(l)
        }
    }

    mostrar() {
        let anterior = null
        const origen = new Punto(100, 0)
        for (let i = 0; i < this.config.rows; i++) {
            for (let j = 0; j < this.config.cols; j++) {
                const child = this.piezas[i][j]
                if (anterior) {
                    this.horizontal(anterior, child, i)
                } else {
                    const primera= this.piezas[0][0]
                    if (i>0) {
                        origen.y = i*primera.config.pieceHeight-100
                    }
                    this.posicionar(child, origen)
                }

                if (this.config.cols - 1 === j) {
                    anterior = null
                } else {
                    anterior = child
                }
            }
        }
    }

    posicionar(child, origen) {
        child.x = origen.x
        child.y = origen.y
    }

    redibujar() {
        this.desordenar(new Punto(100, 60), 150)
    }

    horizontal(anterior, child, fila) {
        if ("right" in anterior.config && !anterior.config.right) {
            child.x = anterior.x - anterior.config.pivote
        } if ("right" in anterior.config && anterior.config.right) {
            child.x = anterior.x + anterior.config.pivote
            if ("left" in anterior.config && anterior.config.left && "left" in child.config && !child.config.left) {
                child.x = anterior.x + 2 * anterior.config.pivote
            }
        } else {
            child.x = anterior.x
        }

        child.y = anterior.y
        if (fila > 0 && ("top" in child.config && child.config.top)) {
            child.y -= child.config.pivote
        } else if (fila > 0 && ("top" in child.config && !child.config.top)){
            child.y += child.config.pivote
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