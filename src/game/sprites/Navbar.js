import Phaser from "phaser"

export class Navbar extends Phaser.GameObjects.Group{
    constructor(scene, tablero, origen, gap) {
        super(scene)
        this.tablero = tablero
        let anterior = null
        const ESCALA_SPRITE = .3
        for(const p of tablero.getChildren()) {
            p.setScale(ESCALA_SPRITE)
            if (anterior) {
                p.x = anterior.x+anterior.ancho*ESCALA_SPRITE+gap
                p.y = origen.y
            } else {
                p.x = origen.x
                p.y = origen.y
            }
            anterior = p
        }
    }
}