import Phaser from "phaser"

export class TableroMovible extends Phaser.GameObjects.Group {
    constructor(scene) {
        super(scene);
        this.scene = scene;
        scene.physics.add.existing(this, true);
    }

    vacio() {
        return this.countActive() === 0;
    }

    hayPiezas() {
        return this.countActive() > 0;
    }

    existe(origen) {
        return this.getChildren().find(p => p.origen.toString() === origen.toString())
    }

    borrar() {
        for (const p of this.getChildren()) {
            this.remove(p, true, true)
        }
    }

    ocultar() {
        for (const p of this.getChildren()) {
            p.setVisible(false);
        }
    }

    mostrar() {
        for (const p of this.getChildren()) {
            p.setVisible(true);
        }
    }

}