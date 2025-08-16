import { EventBus } from '../EventBus'
import { Scene } from 'phaser'
import { TableroMovible } from '../sprites/TableroMovible'
import { Punto } from '../classes/Punto'
import Pieza from '../sprites/Pieza'
import Tablero from '../sprites/Tablero'
import VistaPrevia from '../sprites/VistaPrevia'


export class Game extends Scene {
    constructor() {
        super('Game')
        this.tablero = null;
        this.vistaPrevia = null;
        this.tableroMovible = null;
        this.timer = null;
    }

    create() {
        this.physics.world.setBounds(0, 0, 1024, 600);
        this.input.mouse.disableContextMenu();

        const piezaConfig = {
            pivote: 40,
            piezas: [
                {
                    imageKey: "pieza_1",
                    pieceWidth: 160,
                    pieceHeight: 214,
                    right: true,
                    bottom: true
                },
                {
                    imageKey: "pieza_2",
                    pieceWidth: 160,
                    pieceHeight: 214,
                    right: false,
                    bottom: false,
                    left: false
                },
                {
                    imageKey: "pieza_3",
                    pieceWidth: 160,
                    pieceHeight: 214,
                    right: true,
                    bottom: true,
                    left: true
                },
                {
                    imageKey: "pieza_4",
                    pieceWidth: 160,
                    pieceHeight: 214,
                    left: false,
                    bottom: false
                },
                {
                    imageKey: "pieza_5",
                    pieceWidth: 160,
                    pieceHeight: 214,
                    top: false,
                    right: false
                },
                {
                    imageKey: "pieza_6",
                    pieceWidth: 160,
                    pieceHeight: 214,
                    top: true,
                    right: true,
                    left: true
                },
                {
                    imageKey: "pieza_7",
                    pieceWidth: 160,
                    pieceHeight: 214,
                    top: false,
                    right: false,
                    left: false
                },
                {
                    imageKey: "pieza_8",
                    pieceWidth: 160,
                    pieceHeight: 214,
                    top: true,
                    left: true
                }
            ]
        };

        const config = {
            x: 100,
            y: 60,
            rows: 2,
            cols: 4,
            gap: 150
        };

        this.tablero = new Tablero(this, piezaConfig, config);

        this.vistaPrevia = new VistaPrevia(this, piezaConfig, config);

        this.tableroMovible = new TableroMovible(this);

        this.physics.add.collider(this.tablero, this.tablero, this.encajando, this.primeraVez, this);
        this.physics.add.collider(this.tablero, this.tableroMovible, this.encajando, this.seguirEncajando, this);

        EventBus.emit('current-scene-ready', this);
    }

    volverTablero() {
        this.vistaPrevia.borrar();
        this.tablero.mostrar();
        this.tableroMovible.mostrar();
        this.timer = null;
    }

    verImagen() {
        if (this.timer) return;
        this.tablero.ocultar();
        this.tableroMovible.ocultar();
        this.vistaPrevia.redibujar();
        this.timer = this.time.delayedCall(1000, this.volverTablero, [], this);
    }

    primeraVez(izq, der) {
        const [estatica, movible] = this.fijarPareja(izq, der);
        return movible.isMovValido() && this.empatar(estatica, movible).length > 0 && this.tableroMovible.vacio();
    }

    seguirEncajando(izq, der) {
        const [estatica, movible] = this.fijarPareja(izq, der);
        return movible.isMovValido() && this.empatar(estatica, movible).length > 0 && this.tableroMovible.hayPiezas();
    }

    encajando(izq, der) {
        const [estatica, movible] = this.fijarPareja(izq, der);
        movible.finMovimiento();
        if (this.tableroMovible.vacio()) {
            return this.moverParejaTableroMovible(estatica, movible);
        } else if (this.tableroMovible.hayPiezas()) {
            return this.moverPiezaTableroMovible(estatica, movible);
        }
    }

    fijarPareja(izq, der) {
        let estatica = izq;
        let movible = der;
        if (estatica.moviendo) {
            estatica = der;
            movible = izq;
        }
        return [estatica, movible];
    }

    moverParejaTableroMovible(estatica, movible) {
        const { x, y } = estatica.actual();
        const config = { ...estatica.config };
        const fija = new Pieza(this, config);
        fija.x = x;
        fija.y = y;
        this.input.setDraggable(fija, false);
        this.tableroMovible.add(fija);
        this.tablero.remove(estatica, true, true);
        this.moverPiezaTableroMovible(fija, movible);
    }

    moverPiezaTableroMovible(estatica, movible) {
        const pieza = new Pieza(this, { ...movible.config });
        const [vector, opuesto] = this.empatar(estatica, pieza);
        const direccional = pieza.direccional.newInstance();
        direccional.setVector(opuesto);
        pieza.finMovimiento();

        if (direccional.top()) {
            if (pieza.tienePunta("top")) {
                pieza.x = estatica.x - 40;
                pieza.y = estatica.y + 20;
            } else if (pieza.tieneAgujero("top")) {
                if (pieza.tieneAgujero("left")) {
                    pieza.x = estatica.x + 40;
                    pieza.y = estatica.y + 60;
                } else {
                    pieza.x = estatica.x;
                    pieza.y = estatica.y + 60;
                }
            }
        } else if (direccional.right()) {
            if (pieza.tienePunta("right")) {
                pieza.x = estatica.x - 10;
                pieza.y = estatica.y;
            } else if (pieza.tieneAgujero("right")) {
                pieza.x = estatica.x+30;
                pieza.y = estatica.y;
            }  
        } else if (direccional.bottom()) {
            if (pieza.tienePunta("bottom")) {
                if (pieza.tieneAgujero("left")) {
                    pieza.x = estatica.x + 40;
                    pieza.y = estatica.y - 60;
                } else if (pieza.tienePunta("left")) {
                    pieza.x = estatica.x - 40;
                    pieza.y = estatica.y - 60;
                } else {
                    pieza.x = estatica.x;
                    pieza.y = estatica.y - 60;
                }
            } else if (pieza.tieneAgujero("bottom")) {
                if (pieza.tieneAgujero("left") && estatica.tienePunta("top")) {
                    pieza.x = estatica.x + 40;
                    pieza.y = estatica.y - 20;
                } else if (pieza.tieneAgujero("left")) {
                    pieza.x = estatica.x + 40;
                    pieza.y = estatica.y - 60;
                } else {
                    pieza.x = estatica.x;
                    pieza.y = estatica.y - 60;
                }
            }
        } else if (direccional.left()) {
            if (pieza.tienePunta("left")) {
                pieza.x = estatica.x - 30;
                pieza.y = estatica.y;

                if (pieza.tienePunta("top")) {
                    pieza.y = estatica.y - 40;
                    pieza.x = estatica.x - 30;
                }

            } else if (pieza.tieneAgujero("left")) {
                if (pieza.tieneAgujero("top")) {
                    pieza.y = estatica.y + 40;
                    pieza.x = estatica.x + 50;
                } else if (estatica.tienePunta("left") && estatica.tienePunta("right")) {
                    pieza.y = estatica.y;
                    pieza.x = estatica.x + 50;
                } else {
                    pieza.x = estatica.x + 10;
                    pieza.y = estatica.y;
                }
            }
        }

        estatica.eliminarVector(vector);
        pieza.eliminarVector(opuesto);

        this.tablero.remove(movible, true, true);
        this.tableroMovible.add(pieza);
        this.input.setDraggable(pieza, false);
    }

    empato(izq, v1, der, v2) {
        const derecha = this.siguiente(izq, v1);
        const izquierda = this.siguiente(der, v2);
        return izq.toString() === izquierda.toString()
            && der.toString() === derecha.toString();
    }

    puedeAcercarse(v1, v2) {
        return v1.x + v2.x === 0 && v1.y + v2.y === 0
    }

    empatar(izq, der) {
        for (const v1 of izq.getVectores()) {
            for (const v2 of der.getVectores()) {
                if (this.puedeAcercarse(v1, v2) && this.empato(izq.origen, v1, der.origen, v2)) {
                    return [v1, v2];
                }
            }
        }
        return [];
    }

    siguiente(origen, vector) {
        return new Punto(origen.x + vector.x, origen.y + vector.y)
    }

    changeScene() {
        this.timer = null;
        this.tablero = null;
        this.vistaPrevia = null;
        this.scene.start("MainMenu");
    }

}