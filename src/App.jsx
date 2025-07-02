import { useRef, useState } from 'react'
import { PhaserGame } from './game/PhaserGame'
import "./estilos.css"

function App() {
    const phaserRef = useRef();
    const [text, setText] = useState("")

    const changeScene = () => {
        const scene = phaserRef.current.scene
        if (scene) {
            scene.changeScene()
        }
    }

    const currentScene = scene => {
        if (scene.scene.key === "MainMenu") {
            setText("Menu Principal")
        } else if (scene.scene.key === "Game") {
            setText("Juego")
        }
    }

    return <div id="app">
        <div className="centro">
            <h1>{text}</h1>
            <PhaserGame ref={phaserRef} currentActiveScene={currentScene} />
        </div>
        <div>
            <div>
                <button disabled={false} className="button" onClick={changeScene} >Play</button>
            </div>
        </div>
    </div>
}

export default App