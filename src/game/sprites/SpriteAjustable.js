import Phaser from 'phaser';

export default class SpriteAjustable extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, imageKey) {
        super(scene, x, y, imageKey);        
        this.setOrigin(0);
        this.setScale(1);
        scene.add.existing(this);
    }

    recortar(x, y, width, height) {
        this.setCrop(x, y, width, height);
        return this;
    }
}