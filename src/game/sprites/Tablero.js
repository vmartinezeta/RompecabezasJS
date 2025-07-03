import Phaser from "phaser"
import PiezaTablero from "./PiezaTablero"

export default class Tablero extends Phaser.GameObjects.Group {
    constructor(scene, piezas, config) {
        super(scene)
        this.scene = scene
        this.scene.physics.add.existing(this, true)
        this.crearTablero(piezas, config)
    }

    crearTablero(piezas, config) {
        const { gap, x, y, rows, cols } = config
        const array = Object.entries(piezas)
        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < cols; j++) {
                const x0 = gap * j + x
                const y0 = gap * i + y
                const idx = cols * i + j
                if (idx > array.length - 1) break
                const [imageKey, options] = array[idx]

                const pieza = new PiezaTablero(
                    this.scene,
                    imageKey,
                    new Phaser.Geom.Point(x0, y0),
                    options
                )
                this.add(pieza)
                this.enableGroupDrag(pieza)
            }
        }
    }

    enableGroupDrag(group) {
        // Habilitar interacción para todos los hijos del grupo
        group.setInteractive(new Phaser.Geom.Rectangle(group.origen.x, group.origen.y, 200, 200), Phaser.Geom.Rectangle.Contains)
        // group.setSize(200, 200)
        // group.setInteractive()
        this.scene.input.setDraggable(group)

        this.scene.input.on('drag', (pointer, gameObject, dragX, dragY) => {
            gameObject.x = dragX;
            gameObject.y = dragY;
        });
    }

}