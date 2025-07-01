import { useRef, useState} from 'react'
import { PhaserGame } from './game/PhaserGame'
import "./estilos.css"

function App() {
    const phaserRef = useRef();
    const [text, setText] = useState("N/D")

    const changeScene = () => {
        const scene = phaserRef.current.scene

        if (scene) {
            scene.changeScene()
        }
    }

    const currentScene = (scene) => {
        if (scene.scene.key === "MainMenu") {
            setText("MainMenu")
        } else if (scene.scene.key === "Game") {
            setText("Game")
        }
    }


    return (
        <div id="app">
            <div className="centro">
                {text}
                <PhaserGame ref={phaserRef} currentActiveScene={currentScene} />
            </div>
            <div>
                <div>
                    <button disabled={false} className="button" onClick={changeScene} >Play</button>
                </div>
            </div>
        </div>
    )
}

export default App