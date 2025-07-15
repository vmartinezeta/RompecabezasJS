import Phaser from "phaser"


export class BorderSolido extends Phaser.GameObjects.Graphics {
    constructor(scene, config = {}) {
        super(scene)
        this.scene = scene;
        this.originX = config.x || 0;
        this.originY = config.y || 0;
        this.width = config.width || scene.scale.width;
        this.height = config.height || scene.scale.height;
        this.lineWidth = config.lineWidth || 1;
        this.color = config.color !== undefined ? config.color : 0xffffff;
        this.alpha = config.alpha !== undefined ? config.alpha : 1;
        this.setScale(.75);
        scene.add.existing(this);    
        this.drawBorders()
    }

    drawBorders() {
        // Limpiar gráficos previos
        this.clear();

        // Establecer estilo de línea
        this.lineStyle(this.lineWidth, this.color, this.alpha);

        // Dibujar rectángulo (bordes)
        this.strokeRect(
            this.originX,
            this.originY,
            this.width,
            this.height
        );
    }

    // Métodos para actualizar propiedades
    setOrigin(x, y) {
        this.originX = x;
        this.originY = y;
        this.drawBorders();
        return this;
    }

    setSize(width, height) {
        this.width = width;
        this.height = height;
        this.drawBorders();
        return this;
    }

    setLineStyle(lineWidth, color, alpha) {
        this.lineWidth = lineWidth;
        this.color = color;
        this.alpha = alpha;
        this.drawBorders();
        return this;
    }
}