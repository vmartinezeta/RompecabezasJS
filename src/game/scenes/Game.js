import { EventBus } from '../EventBus'
import  { Scene } from 'phaser'
import Tablero from '../sprites/Tablero'

export class Game extends Scene {
    constructor() {
        super('Game')
    }

    create() {
        // this.add.image(512, 384, 'background')
        this.physics.world.setBounds(0, 0, 1024, 600)

        this.input.mouse.disableContextMenu()

        new Tablero(this, {
            x: 50,
            y: 40,
            rows: 2,
            cols: 4,
            pieceWidth: 160,
            pieceHeight: 214,
        })


        this.keyboard = this.input.keyboard.createCursorKeys()

        EventBus.emit('current-scene-ready', this);
    }

    changeScene() {
        this.scene.start("MainMenu")
    }
}