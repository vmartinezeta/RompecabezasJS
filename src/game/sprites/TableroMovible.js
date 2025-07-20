import Phaser from "phaser"

export class TableroMovible extends Phaser.GameObjects.Group{
    constructor(scene) {
        super(scene)
        scene.physics.add.existing(this, true)
    }

    agregar(pieza) {
        this.add(pieza)
    }

    vacio() {
        return this.countActive() === 0
    }

    existe(origen) {
        return this.list.find(p => p.origen.toString() === origen.toString())
    }
}