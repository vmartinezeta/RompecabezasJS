import { EventBus } from '../EventBus'
import { Scene } from 'phaser'
import Tablero from '../sprites/Tablero'


export class Game extends Scene {
    constructor() {
        super('Game')
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

        new Tablero(this, piezas, {
            x: 20,
            y: 20,
            rows: 2,
            cols: 4,
            gap: 260
        })



        this.keyboard = this.input.keyboard.createCursorKeys()

        EventBus.emit('current-scene-ready', this)
    }

    changeScene() {
        this.scene.start("MainMenu")
    }

}