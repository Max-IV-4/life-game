export default class LifeGameService {

    constructor(private _matrix: number[][]){ }

    get matrix(): number[][] {
        return this._matrix
    }

    // Compute next generation using Conway's Game of Life rules.
    // - Live cell with 2 or 3 neighbors survives.
    // - Live cell with <2 or >3 neighbors dies.
    // - Dead cell with exactly 3 neighbors becomes live.
    // This method updates the internal matrix state and returns it.
    nextMatrix(): number[][] {
        const rows = this._matrix.length
        const cols = this._matrix[0]?.length || 0
        const newMatrix: number[][] = Array.from({ length: rows }, () => new Array(cols).fill(0))

        for (let r = 0; r < rows; r++) {
            for (let c = 0; c < cols; c++) {
                let liveNeighbors = 0
                for (let dr = -1; dr <= 1; dr++) {
                    for (let dc = -1; dc <= 1; dc++) {
                        if (dr === 0 && dc === 0) continue
                        const nr = r + dr
                        const nc = c + dc
                        if (nr >= 0 && nr < rows && nc >= 0 && nc < cols) {
                            liveNeighbors += this._matrix[nr][nc] ? 1 : 0
                        }
                    }
                }

                const cell = this._matrix[r][c]
                if (cell) {
                    // Survival: 2 or 3 neighbors
                    newMatrix[r][c] = (liveNeighbors === 2 || liveNeighbors === 3) ? 1 : 0
                } else {
                    // Birth: exactly 3 neighbors
                    newMatrix[r][c] = (liveNeighbors === 3) ? 1 : 0
                }
            }
        }

        this._matrix = newMatrix
        return this._matrix
    }
}