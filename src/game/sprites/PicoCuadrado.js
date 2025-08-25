import Phaser from 'phaser';

export default class PicoCuadrado extends Phaser.GameObjects.Container {
    constructor(scene, config) {
        super(scene);
        this.scene = scene;
        this.config = config;
        scene.add.existing(this);
    }

    getBorders() {
        return Object.keys(this.config).filter(value => ["top", "right", "bottom", "left"].includes(value));
    }

    existe(property) {
        return property in this.config;
    }

    tieneAgujero(property) {
        return this.existe(property) && !this.config[property];
    }

    tienePunta(property) {
        return this.existe(property) && this.config[property];
    }

}