import { useRef, useState } from 'react'
import { PhaserGame } from './game/PhaserGame'
import "./estilos.css"
import { useGame } from './context/GameContext'


function App() {
    const phaserRef = useRef()
    const {onToggleMusica} = useGame()
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
            setText("Rompecabeza")
        }
    }

    const verImagen = () => {
        if (scene && scene.scene.key === "Game") {
            scene.verImagen()
        }
    }

    return <div className="columna">
        <div className="columna__arriba">
            <h1 className="titulo-principal">{text}</h1>
        </div>
        <div className="columna__abajo">
            <div className="columna__izquierda">
                <PhaserGame ref={phaserRef} currentActiveScene={currentScene} />
            </div>
            <div className="columna__derecha">
                <div className="centro-control">
                    <button disabled={false} className="button" onClick={changeScene} >Play</button>
                    {scene && scene.scene.key==="Game" && <button disabled={false} className="button" onClick={verImagen} >Ver original</button>}
                    <button disabled={false} className="button" onClick={onToggleMusica} >Música fondo</button>
                </div>
            </div>
        </div>
    </div>
}

export default App