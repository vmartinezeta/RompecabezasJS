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
                pivote: 40,
                pieceWidth: 200,
                pieceHeight: 254,
                right: true,
                bottom: true
            },
            "pieza_2": {
                pivote: 40,
                pieceWidth: 160,
                pieceHeight: 214,
                right:false,
                bottom: false,
                left: false
            },
            "pieza_3": {
                pivote: 40,
                pieceWidth: 240,
                pieceHeight: 254,
                right:true,
                bottom: true,
                left: true
            },
            "pieza_4": {
                pivote: 40,
                pieceWidth: 160,
                pieceHeight: 214,
                left: false,
                bottom: false
            },
            "pieza_5": {
                pivote: 40,
                pieceWidth: 160,
                pieceHeight: 214,
                top: false,
                right: false
            },
            "pieza_6": {
                pivote: 40,
                pieceWidth: 240,
                pieceHeight: 254,
                top: true,
                right: true,
                left: true
            },
            "pieza_7": {
                pivote: 40,
                pieceWidth: 160,
                pieceHeight: 214,
                top: false,
                right: false,
                left: false
            },
            "pieza_8": {
                pivote: 40,
                pieceWidth: 200,
                pieceHeight: 254,
                top: true,
                left: true
            }
        }

        new Tablero(this, piezas, {
            x: 50,
            y: 50,
            rows: 2,
            cols: 4,
            gap: 100
        })

        this.keyboard = this.input.keyboard.createCursorKeys()

        EventBus.emit('current-scene-ready', this);
    }

    changeScene() {
        this.scene.start("MainMenu")
    }

}