import { EventBus } from '../EventBus'
import { Scene } from 'phaser'
import Tablero from '../sprites/Tablero'
import { TableroMovible } from '../sprites/TableroMovible'
import { Punto } from '../classes/Punto'


export class Game extends Scene {
    constructor() {
        super('Game')
        this.tablero = null
        this.toggle = false
    }

    create() {
        this.physics.world.setBounds(0, 0, 1024, 600)

        this.input.mouse.disableContextMenu()

        const piezas = {
            "pieza_1": {
                deltaX: 0,
                deltaY: 0,
                pieceWidth: 160,
                pieceHeight: 214,
                pivote: 40,
                right: true,
                bottom: true
            },
            "pieza_2": {
                deltaX: 0,
                deltaY: 0,
                pieceWidth: 160,
                pieceHeight: 214,
                pivote: 40,
                right: false,
                bottom: false,
                left: false
            },
            "pieza_3": {
                deltaX: 40,
                deltaY: 0,
                pieceWidth: 160,
                pieceHeight: 214,
                pivote: 40,
                right: true,
                bottom: true,
                left: true
            },
            "pieza_4": {
                deltaX: 0,
                deltaY: 0,
                pieceWidth: 160,
                pieceHeight: 214,
                pivote: 40,
                left: false,
                bottom: false
            },
            "pieza_5": {
                deltaX: 0,
                deltaY: 0,
                pieceWidth: 160,
                pieceHeight: 214,
                pivote: 40,
                top: false,
                right: false
            },
            "pieza_6": {
                deltaX: 40,
                deltaY: 40,
                pieceWidth: 160,
                pieceHeight: 214,
                pivote: 40,
                top: true,
                right: true,
                left: true
            },
            "pieza_7": {
                deltaX: 0,
                deltaY: 0,
                pieceWidth: 160,
                pieceHeight: 214,
                pivote: 40,
                top: false,
                right: false,
                left: false
            },
            "pieza_8": {
                deltaX: 40,
                deltaY: 40,
                pieceWidth: 160,
                pieceHeight: 214,
                pivote: 40,
                top: true,
                left: true
            }
        }

        this.tablero = new Tablero(this, piezas, {
            x: 20,
            y: 20,
            rows: 2,
            cols: 4,
            gap: 160
        })

        this.tableroMovible = new TableroMovible(this)

        this.physics.add.collider(this.tablero, this.tablero, this.encajando, this.encajarPrimeraVez, this)
        this.physics.add.collider(this.tablero, this.tableroMovible, this.encajando, this.seguirEncajando, this)

        this.keyboard = this.input.keyboard.createCursorKeys()

        EventBus.emit('current-scene-ready', this)
    }

    verImagen() {
        this.toggle = !this.toggle
        if (this.toggle) {
            this.tablero.mostrar()
        } else {
            this.tablero.redibujar()
        }
    }

    encajarPrimeraVez(izq, der) {
        return (izq.movible || der.movible) && this.empatar(izq, der).length > 0 && this.tableroMovible.vacio()
    }

    seguirEncajando(izq, der) {
        return (izq.movible || der.movible) && this.empatar(izq, der).length > 0 && !this.tableroMovible.vacio()
    }

    encajando(izq, der) {
        const [estatica, movible] = this.clasificarPiezas(izq, der)
        const [vector, opuesto] = this.empatar(estatica, movible)

        this.eliminarVector(estatica, vector)
        this.eliminarVector(movible, opuesto)
        if (this.tableroMovible.vacio()) {
            this.moverParejaTableroMovible(movible, estatica)
        } else {
            this.moverPiezaTableroMovible(movible)
        }

        estatica.movible = false
        movible.movible = false

        // posicionar las piezas depende del vector
        if (vector.isIgual(-1, 0)) {
            // top
        } else if (vector.isIgual(0, 1)) {
            // right
        } else if (vector.isIgual(1, 0)) {
            // bottom
        } else if (vector.isIgual(0, -1)) {
            // left
        }
    }

    clasificarPiezas(izq, der) {
        let estatica = izq
        let movible = der
        if (estatica.movible) {
            estatica = der
            movible = izq
        }
        return [estatica, movible]
    }

    moverParejaTableroMovible(izq, der) {
        this.moverPiezaTableroMovible(izq)
        this.moverPiezaTableroMovible(der)
    }

    moverPiezaTableroMovible(sprite) {
        this.input.setDraggable(sprite, false)
        this.tablero.remove(sprite, false, false)
        this.tableroMovible.agregar(sprite)
    }

    eliminarVector(pieza, vector) {
        const idx = pieza.vectores.findIndex(v => v.toString() === vector.toString())
        if (idx < 0) return
        pieza.vectores.splice(idx, 1)
    }

    empato(izq, v1, der, v2) {
        const derecha = this.siguiente(izq, v1);
        const izquierda = this.siguiente(der, v2);
        return der.toString() === derecha.toString()
            && izq.toString() === izquierda.toString();
    }

    vectorNulo(v1, v2) {
        return v1.x + v2.x === 0 && v1.y + v2.y === 0
    }

    empatar(izq, der) {
        for (const v1 of izq.getExtensiones()) {
            for (const v2 of der.getExtensiones()) {
                if (this.vectorNulo(v1, v2) && this.empato(izq.origen, v1, der.origen, v2)) {
                    return [v1, v2];
                }
            }
        }
        return []
    }

    siguiente(origen, vector) {
        return new Punto(origen.x + vector.x, origen.y + vector.y)
    }

    changeScene() {
        this.scene.start("MainMenu")
    }

}