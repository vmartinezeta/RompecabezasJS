import { useRef, useState } from 'react'
import { PhaserGame } from './game/PhaserGame'
import "./estilos.css"


function App() {
    const phaserRef = useRef()
    const [scene, setScene] = useState(null)
    const [text, setText] = useState("")

    const changeScene = () => {
        if (!scene) return
        scene.changeScene()
    }

    const currentScene = scene => {
        setScene(scene)
        if (scene.scene.key === "MainMenu") {
            setText("Menu principal")
        } else if (scene.scene.key === "Game") {
            setText("Juego")
        }
    }


    const verImagen = () => {
        if (scene && scene.scene.key === "Game") {
            scene.verImagen()
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
                    {scene.scene.key==="Game" && <button disabled={false} className="button" onClick={verImagen} >Ver original</button>}
                </div>
            </div>
        </div>
    </div>
}

export default App