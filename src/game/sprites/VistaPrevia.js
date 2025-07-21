import Phaser from "phaser";
import Pieza from "./Pieza";
import { Punto } from "../classes/Punto";

export default class VistaPrevia extends Phaser.GameObjects.Group {
    constructor(scene, piezas, config) {
        super(scene)
        this.scene = scene
        this.config = config
        this.sprites = piezas
        this.piezas = []
        this.piezaArray = []
        this.scene.physics.add.existing(this, true)
    }

    crearTablero() {
        const { gap, x, y, rows, cols } = this.config
        const array = Object.entries(this.sprites)

        for (let i = 0; i < rows; i++) {
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
                this.piezaArray.push(pieza)
            }
        }
    }

    redibujar() {
        this.borrar()
        this.crearTablero() 
        this.ordenar()       
    }

    ordenar() {
        this.cuadricular()
        let anterior = null
        const origen = new Punto(100, 0)
        for (let i = 0; i < this.config.rows; i++) {
            for (let j = 0; j < this.config.cols; j++) {
                const child = this.piezas[i][j]
                if (anterior) {
                    this.horizontal(anterior, child, i)
                } else {
                    const primera = this.piezas[0][0]
                    if (i > 0) {
                        origen.y = i * primera.config.pieceHeight - 100
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

    cuadricular() {
        let l = []
        for(let i=0; i<this.piezaArray.length; i++) {
            if (i === this.config.cols) {
                this.piezas.push(l)
                l = []
                l.push(this.piezaArray[i])
            } else {
                l.push(this.piezaArray[i])
            }
        }
        this.piezas.push(l)
    }

    posicionar(child, origen) {
        child.x = origen.x
        child.y = origen.y
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
        } else if (fila > 0 && ("top" in child.config && !child.config.top)) {
            child.y += child.config.pivote
        }
    }

    borrar() {
        for (const p of this.piezaArray) {
            this.remove(p, true, true)
        }
        this.piezaArray = []
        this.piezas = []
    }
}