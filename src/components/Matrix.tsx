import React, { ReactNode } from 'react'
import LifeGameService from "../services/LifeGameService";
import { getRandomIntMatrix } from "../utils/random";
import matrixData from "../config/matrix-config";

function Matrix() {
    const {rows, columns} = matrixData
    const [matrix, setMatrix] = React.useState<number[][]>([])
    React.useEffect(() => {
            const lifeGame = new LifeGameService(getRandomIntMatrix(rows, columns, 0, 1))
            setMatrix(lifeGame.matrix)
    }, [rows, columns])
    function getCells(matrix: number[][]): ReactNode {
        return matrix.map((row, rInd) => {
            return row.map((cellValue, cInd) => <div key={`${rInd}-${cInd}`}
             className={`cell ${cellValue ? "cell-alive" : "cell-dead"}`}></div>)
        })
    }
  return (
    <div style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
        gridTemplateRows: `repeat(${rows}, 1fr)`,
        width: '80vh',
        height: '80vh'
    }}>
      {getCells(matrix)}
    </div>
  )
}

export default Matrix
