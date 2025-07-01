import { EventBus } from '../EventBus'
import { Scene } from 'phaser'

export class MainMenu extends Scene {

    constructor() {
        super('MainMenu')
        this.animation = null        
    }

    create() {
        this.cameras.main.setBackgroundColor(0x00ff00);
        this.add.image(512, 384, 'background')
        EventBus.emit('current-scene-ready', this)
    }

    changeScene() {
        this.scene.start('Game');
    }
}