
import './App.css'
import { useState } from 'react'
import Setup, { SetupMode } from './components/Setup'
import Matrix from './components/Matrix'

interface SimulationConfig {
  rows: number
  columns: number
  initialMatrix: number[][]
  ticInterval: number
}

function App() {
  const [mode, setMode] = useState<'setup' | 'simulation'>('setup')
  const [config, setConfig] = useState<SimulationConfig | null>(null)

  const handleSetupComplete = (rows: number, columns: number, matrix: number[][], _setupMode: SetupMode) => {
    setConfig({
      rows,
      columns,
      initialMatrix: matrix,
      ticInterval: 100, // Can be made configurable later
    })
    setMode('simulation')
  }

  const handleReset = () => {
    setMode('setup')
    setConfig(null)
  }

  return (
    <div className="app">
      {mode === 'setup' ? (
        <Setup onStart={handleSetupComplete} />
      ) : (
        config && (
          <div className="simulation-wrapper">
            <Matrix config={config} onReset={handleReset} />
          </div>
        )
      )}
    </div>
  )
}

export default App
