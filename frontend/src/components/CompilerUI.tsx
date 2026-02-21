import React, { useState, useMemo } from 'react'
import { compileVoynich } from '../logic/VoynichCompiler'
import type { StatorAMode } from '../logic/VoynichCompiler'
import { MachineVisualization } from './MachineVisualization'
import { generateStatorAGCode } from '../logic/GCodeGenerator'
import { FirmwareSimulator } from '../logic/FirmwareSimulator'
import { generateStatorASVG } from '../logic/SVGGenerator'

export const CompilerUI: React.FC = () => {
  const [input, setInput] = useState('')
  const [manualMode, setManualMode] = useState<StatorAMode | null>(null)
  const [showGCode, setShowGCode] = useState(false)
  const state = compileVoynich(input)

  // Use manual mode if selected, otherwise use compiled state
  const activeMode = manualMode || state.statorA

  const statorSimulator = useMemo(() => new FirmwareSimulator(), [])
  const rotorSimulator = useMemo(() => new FirmwareSimulator(), [])

  // Map modes to angles (72 deg intervals for 5 modes)
  const modeAngles: Record<string, number> = {
    'k': 0,
    't': 72,
    'p': 144,
    'f': 216,
    'qo': 288,
    'NULL': 0
  }

  const targetStatorAngle = modeAngles[activeMode] || 0
  const statorSteps = statorSimulator.calculateStepsTo(targetStatorAngle)

  // Rotor B movement (16.3636 deg per atom)
  const atomCount = state.rotorB ? state.rotorB.split(',').length : 0
  const targetRotorAngle = atomCount * 16.3636
  const rotorSteps = rotorSimulator.calculateStepsTo(targetRotorAngle)

  // Tooth jumps
  const jump13 = statorSimulator.calculateToothJump(13)
  const jump17 = statorSimulator.calculateToothJump(17)

  const modes: StatorAMode[] = ['k', 't', 'p', 'f', 'qo']

  const handleDownloadGCode = () => {
    const gcode = generateStatorAGCode()
    const blob = new Blob([gcode], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = 'stator_a_windows.nc'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  const handleDownloadSVG = () => {
    const svg = generateStatorASVG()
    const blob = new Blob([svg], { type: 'image/svg+xml' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = 'stator_a_windows.svg'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  return (
    <div className="compiler-ui">
      <h2>Voynich Hardware Compiler</h2>
      
      <div className="mode-selector">
        <label>Manual Mode Override:</label>
        <div className="mode-buttons">
          <button 
            className={`mode-btn ${manualMode === null ? 'active' : ''}`}
            onClick={() => setManualMode(null)}
          >
            AUTO
          </button>
          {modes.map(m => (
            <button
              key={m}
              className={`mode-btn ${manualMode === m ? 'active' : ''}`}
              onClick={() => setManualMode(m)}
            >
              {m.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      <div className="firmware-telemetry">
        <div className="telemetry-item">
          <label>Stator A Stepper:</label>
          <span>{statorSteps} steps ({targetStatorAngle.toFixed(1)}°)</span>
        </div>
        <div className="telemetry-item">
          <label>Rotor B Stepper:</label>
          <span>{rotorSteps} steps ({targetRotorAngle.toFixed(1)}°)</span>
        </div>
        <div className="telemetry-item full-width">
          <label>Standard Tooth Jumps:</label>
          <span>13: {jump13.toFixed(2)}° | 17: {jump17.toFixed(2)}°</span>
        </div>
      </div>

      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter Voynich text..."
        className="voynich-input"
      />
      
      <MachineVisualization state={{ ...state, statorA: activeMode }} />
      
      <div className="state-display">
        <div className="state-item">
          <label>Stator A (Mode):</label>
          <span data-testid="stator-a">{state.statorA}</span>
        </div>
        <div className="state-item">
          <label>Rotor B (Atoms):</label>
          <span data-testid="rotor-b">{state.rotorB}</span>
        </div>
        <div className="state-item">
          <label>Scalar Cam:</label>
          <span data-testid="scalar-cam">{state.scalarCam}</span>
        </div>
        <div className="state-item">
          <label>Stator C:</label>
          <span data-testid="stator-c">{state.statorC}</span>
        </div>
      </div>

      <div className="actions">
        <button 
          className="action-button"
          onClick={() => setShowGCode(!showGCode)}
        >
          {showGCode ? 'Hide G-Code' : 'Show Stator A G-Code'}
        </button>
        <button 
          className="action-button"
          onClick={handleDownloadGCode}
        >
          Download .NC File
        </button>
        <button 
          className="action-button"
          onClick={handleDownloadSVG}
        >
          Download .SVG Layout
        </button>
      </div>

      {showGCode && (
        <div className="gcode-viewer">
          <h3>Stator A G-Code</h3>
          <pre>{generateStatorAGCode()}</pre>
        </div>
      )}
    </div>
  )
}
