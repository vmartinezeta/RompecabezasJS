import Phaser from "phaser"

export default class Tablero extends Phaser.GameObjects.Group {
    constructor(scene, config = {}) {
        super(scene)
        this.config = config
        this.scene = scene
        this.scene.physics.add.existing(this, true); // Añadir físicas al grupo (opcional)

        const { rows, cols, pieceWidth, pieceHeight } = config
        this.createPuzzlePieces(rows, cols, pieceWidth, pieceHeight)
    }

    createPuzzlePieces(rows, cols, pieceWidth, pieceHeight) {
        for (let row = 0; row < rows; row++) {
            for (let col = 0; col < cols; col++) {
                const x = col * pieceWidth
                const y = row * pieceHeight
                const texture = 'pieza_' + (cols * row + col + 1)
                const piece = this.createPuzzlePieceWithMask(this, x, y, texture)
                piece.encajado = false
                piece.setInteractive()
                this.scene.input.setDraggable(piece)
            }

        }


        this.scene.input.on('dragstart', (pointer, piece) => {
            // this.bringToTop(piece);
        })

        this.scene.input.on('drag', (pointer, piece, dragX, dragY) => {
            piece.x = dragX;
            piece.y = dragY;
        });
    }

    createPuzzlePieceWithMask(tablero, x, y, imageKey) {
        // Crear sprite con la imagen completa
        const piece = tablero.create(x, y, imageKey)
        piece.setOrigin(0)

        // Crear máscara con forma de pieza de rompecabezas
        // const mask = scene.make.graphics();
        // drawPuzzleMask(mask, width, height);

        // Aplicar máscara
        // const maskShape = mask.createGeometryMask();
        // piece.setMask(maskShape);

        return piece
    }

    drawPuzzleMask(graphics, width, height, row, col, totalRows, totalCols) {
        graphics.clear();
        graphics.fillStyle(0xffffff);
        graphics.beginPath();

        // Similar al método anterior pero solo dibujando la máscara
        // Implementa la misma lógica de bordes entrelazados

        graphics.closePath();
        graphics.fillPath();
    }

}