import Phaser from "phaser"

export class TableroMovible extends Phaser.GameObjects.Container{
    constructor(scene) {
        super(scene);
        scene.add.existing(this);
    }

    agregar(pieza) {
        this.add(pieza)
    }

    vacio() {
        return this.list.length === 0
    }

    existe(origen) {
        return this.list.find(p => p.origen.toString() === origen.toString())
    }

    borrar() {
        for(const p of this.list) {
            this.remove(p, true)
        }
    }
}