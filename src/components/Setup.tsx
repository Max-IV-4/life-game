import React, { useState } from 'react'
import '../styles/Setup.css'

export type SetupMode = 'random' | 'manual'

interface SetupProps {
  onStart: (rows: number, columns: number, matrix: number[][], mode: SetupMode) => void
}

function Setup({ onStart }: SetupProps) {
  const [mode, setMode] = useState<SetupMode>('random')
  const [rows, setRows] = useState(20)
  const [columns, setColumns] = useState(20)
  const [grid, setGrid] = useState<number[][]>(() =>
    Array.from({ length: rows }, () => Array(columns).fill(0))
  )

  // Update grid when rows/columns change
  React.useEffect(() => {
    const newGrid = Array.from({ length: rows }, () => Array(columns).fill(0))
    setGrid(newGrid)
  }, [rows, columns])

  const toggleCell = (r: number, c: number) => {
    const newGrid = grid.map(row => [...row])
    newGrid[r][c] = newGrid[r][c] ? 0 : 1
    setGrid(newGrid)
  }

  const handleRandomize = () => {
    const newGrid = Array.from({ length: rows }, () =>
      Array.from({ length: columns }, () => Math.floor(Math.random() * 2))
    )
    setGrid(newGrid)
  }

  const handleClear = () => {
    setGrid(Array.from({ length: rows }, () => Array(columns).fill(0)))
  }

  const handleStart = () => {
    const initialMatrix = mode === 'random'
      ? Array.from({ length: rows }, () =>
          Array.from({ length: columns }, () => Math.floor(Math.random() * 2))
        )
      : grid
    onStart(rows, columns, initialMatrix, mode)
  }

  return (
    <div className="setup-container">
      <div className="setup-header">
        <h1>Seeking Alpha</h1>
      </div>

      <div className="setup-content">
        {/* Configuration Panel */}
        <div className="config-panel">
          <h2>Configuration</h2>

          <div className="input-group">
            <label htmlFor="rows">Rows:</label>
            <input
              id="rows"
              type="number"
              min="4"
              max="100"
              value={rows}
              onChange={(e) => setRows(Math.max(4, parseInt(e.target.value) || 4))}
            />
          </div>

          <div className="input-group">
            <label htmlFor="columns">Columns:</label>
            <input
              id="columns"
              type="number"
              min="4"
              max="100"
              value={columns}
              onChange={(e) => setColumns(Math.max(4, parseInt(e.target.value) || 4))}
            />
          </div>

          <div className="mode-selector">
            <h3>Start Mode</h3>
            <div className="radio-group">
              <label>
                <input
                  type="radio"
                  name="mode"
                  value="random"
                  checked={mode === 'random'}
                  onChange={() => setMode('random')}
                />
                Random
              </label>
              <label>
                <input
                  type="radio"
                  name="mode"
                  value="manual"
                  checked={mode === 'manual'}
                  onChange={() => setMode('manual')}
                />
                Manual
              </label>
            </div>
          </div>

          {mode === 'manual' && (
            <div className="manual-controls">
              <button onClick={handleRandomize} className="btn btn-secondary">
                Randomize Grid
              </button>
              <button onClick={handleClear} className="btn btn-secondary">
                Clear Grid
              </button>
            </div>
          )}
        </div>

        {/* Grid Preview */}
        <div className="grid-preview-panel">
          <h2>
            {mode === 'random'
              ? 'Random Start Preview'
              : 'Click to Set Initial State'}
          </h2>
          <div
            className="grid-preview"
            style={{
              gridTemplateColumns: `repeat(${columns}, 1fr)`,
              gridTemplateRows: `repeat(${rows}, 1fr)`,
            }}
          >
            {grid.map((row, rIdx) =>
              row.map((cellValue, cIdx) => (
                <div
                  key={`${rIdx}-${cIdx}`}
                  className={`preview-cell ${cellValue ? 'cell-alive' : 'cell-dead'}`}
                  onClick={() => {
                    if (mode === 'manual') {
                      toggleCell(rIdx, cIdx)
                    }
                  }}
                  style={{
                    cursor: mode === 'manual' ? 'pointer' : 'default',
                  }}
                />
              ))
            )}
          </div>
        </div>
      </div>

      {/* Start Button */}
      <div className="setup-footer">
        <button onClick={handleStart} className="btn btn-primary btn-large">
          Start Life
        </button>
      </div>
    </div>
  )
}

export default Setup
