import { useRef, useState } from 'react'
import { PhaserGame } from './game/PhaserGame'
import "./estilos.css"


function App() {
    const phaserRef = useRef()
    const [text, setText] = useState("")

    const changeScene = () => {
        const scene = phaserRef.current.scene
        if (scene) {
            scene.changeScene()
        }
    }

    const currentScene = scene => {
        if (scene.scene.key === "MainMenu") {
            setText("Menu principal")
        } else if (scene.scene.key === "Game") {
            setText("Juego")
        }
    }

    return <div className="app">
        <h1 className="pagina__titulo">{text}</h1>
        <div className="columna">
            <div className="columna__izquierda">
                <PhaserGame ref={phaserRef} currentActiveScene={currentScene} />
            </div>
            <div className="columna__derecha">
                <div className="centroControl">
                    <button disabled={false} className="button" onClick={changeScene} >Play</button>
                </div>
            </div>
        </div>
    </div>
}

export default App