import React, { ReactNode } from 'react'
import LifeGameService from "../services/LifeGameService";

interface MatrixConfig {
  rows: number
  columns: number
  initialMatrix: number[][]
  ticInterval: number
}

interface MatrixProps {
  config: MatrixConfig
  onReset?: () => void
}

function Matrix({ config, onReset }: MatrixProps) {
    const { rows, columns, initialMatrix, ticInterval } = config
    const [matrix, setMatrix] = React.useState<number[][]>(initialMatrix)
    const lifeGame = React.useRef<LifeGameService>(null)
    
    React.useEffect(() => {
            lifeGame.current = new LifeGameService(initialMatrix)
            setMatrix(lifeGame.current.matrix)
    }, [rows, columns, initialMatrix])
    
    React.useEffect(() => {
        function tic() {
            setMatrix(lifeGame.current!.nextMatrix())
        }
        const intervalId = setInterval(tic, ticInterval)
        return () => clearInterval(intervalId)
    }, [ticInterval])
    
    function getCells(matrix: number[][]): ReactNode {
        return matrix.map((row, rInd) => {
            return row.map((cellValue, cInd) => <div key={`${rInd}-${cInd}`}
             className={`cell ${cellValue ? "cell-alive" : "cell-dead"}`}></div>)
        })
    }
    
  return (
    <div className="matrix-wrapper">
      <div className="matrix-header">
        <h1>Seeking Alpha</h1>
        {onReset && (
          <button onClick={onReset} className="btn-reset">
            Reset
          </button>
        )}
      </div>
      <div style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${columns}, 1fr)`,
          gridTemplateRows: `repeat(${rows}, 1fr)`,
          width: '80vh',
          height: '80vh'
      }}>
        {getCells(matrix)}
      </div>
    </div>
  )
}

export default Matrix
