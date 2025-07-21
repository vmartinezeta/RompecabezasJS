import { EventBus } from '../EventBus'
import { Scene } from 'phaser'
import Tablero from '../sprites/Tablero'
import { TableroMovible } from '../sprites/TableroMovible'
import { Punto } from '../classes/Punto'
import VistaPrevia from '../sprites/VistaPrevia'


export class Game extends Scene {
    constructor() {
        super('Game')
        this.tablero = null
        this.vistaPrevia = null
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

        const config = {
            x: 20,
            y: 20,
            rows: 2,
            cols: 4,
            gap: 160
        }
        this.tablero = new Tablero(this, piezas, config)

        this.vistaPrevia = new VistaPrevia(this, piezas, config)

        this.tableroMovible = new TableroMovible(this)

        this.physics.add.collider(this.tablero, this.tablero, this.encajando, this.encajarPrimeraVez, this)
        this.physics.add.collider(this.tablero, this.tableroMovible, this.encajando, this.seguirEncajando, this)

        this.keyboard = this.input.keyboard.createCursorKeys()

        EventBus.emit('current-scene-ready', this)
    }

    verImagen() {
        this.toggle = !this.toggle
        if (this.toggle) {
            this.tablero.borrar()
            this.vistaPrevia.redibujar()
        } else {
            this.vistaPrevia.borrar()
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

        movible.eliminarVector(opuesto)
        if (this.tableroMovible.vacio()) {
            // this.moverParejaTableroMovible(movible, estatica)
        } else {
            // this.moverPiezaTableroMovible(movible)
        }

        estatica.direccional.setVector(vector)
        estatica.movible = false
        movible.movible = false

        if (estatica.top()) {
            estatica.eliminarVector(vector)
        } else if (estatica.right()) {
            estatica.eliminarVector(vector)
        } else if (estatica.bottom()) {
            estatica.eliminarVector(vector)
        } else if (estatica.left()) {
            estatica.eliminarVector(vector)
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
        this.tableroMovible.agregar(sprite)
        this.tablero.remove(sprite, false, false)
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
        for (const v1 of izq.getVectores()) {
            for (const v2 of der.getVectores()) {
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
        this.toggle = false
        this.tablero = null
        this.vistaPrevia = null        
        this.scene.start("MainMenu")
    }

}