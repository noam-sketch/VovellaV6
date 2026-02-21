import './App.css'
import { CompilerUI } from './components/CompilerUI'

function App() {
  return (
    <div className="app-container">
      <header>
        <h1>Syntaxis Volvella V6</h1>
        <p className="subtitle">Forensic Hardware Compiler Reconstruction</p>
      </header>
      <main>
        <CompilerUI />
      </main>
      <footer>
        <p>© 2026 Harpia Network - SOMA String Machine</p>
      </footer>
    </div>
  )
}

export default App
