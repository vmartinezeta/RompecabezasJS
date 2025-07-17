import Phaser from "phaser"

export class PiezaEncajadas extends Phaser.GameObjects.Container{
    constructor(scene) {
        super(scene)
    }

    add(pieza){
        this.add(pieza)
    }

    existe(origen) {
        return this.list.find(p => p.origen.toString() === origen.toString())
    }
}