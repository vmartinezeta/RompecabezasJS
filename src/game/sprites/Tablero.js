import Phaser from "phaser"
import PiezaTablero from "./PiezaTablero"

export default class Tablero extends Phaser.GameObjects.Group {
    constructor(scene, origen, piezas) {
        super(scene)
        this.scene = scene
        this.origen = origen
        this.piezas = piezas
        this.scene.physics.add.existing(this, true)

        const gap = 210
        const array = Object.entries(piezas)
        for (let i = 0; i < 2; i++) {
            for (let j = 0; j < 4; j++) {
                const x0 = gap*j + this.origen.x
                const y0 = gap*i + this.origen.y
                const [imageKey, config] = array[4 * i + j]
                const sprite = new PiezaTablero(
                    scene,
                    imageKey,
                    new Phaser.Geom.Point(x0, y0),
                    config
                )
                this.add(sprite)
            }
        }
    }
}