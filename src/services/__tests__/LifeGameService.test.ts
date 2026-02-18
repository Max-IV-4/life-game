import { describe, it, expect } from 'vitest'
import LifeGameService from '../LifeGameService'

function matrixEquals(a: number[][], b: number[][]) {
  if (a.length !== b.length) return false
  for (let i = 0; i < a.length; i++) {
    if (a[i].length !== b[i].length) return false
    for (let j = 0; j < a[i].length; j++) {
      if (a[i][j] !== b[i][j]) return false
    }
  }
  return true
}

describe('LifeGameService.nextMatrix', () => {
  it('keeps block (still life) unchanged', () => {
    const init = [
      [0,0,0,0],
      [0,1,1,0],
      [0,1,1,0],
      [0,0,0,0]
    ]
    const svc = new LifeGameService(init)
    const next = svc.nextMatrix()
    expect(matrixEquals(next, init)).toBe(true)
  })

  it('oscillates blinker (period 2)', () => {
    const init = [
      [0,0,0,0,0],
      [0,0,0,0,0],
      [0,1,1,1,0],
      [0,0,0,0,0],
      [0,0,0,0,0]
    ]
    const expected = [
      [0,0,0,0,0],
      [0,0,1,0,0],
      [0,0,1,0,0],
      [0,0,1,0,0],
      [0,0,0,0,0]
    ]
    const svc = new LifeGameService(init)
    const next = svc.nextMatrix()
    expect(matrixEquals(next, expected)).toBe(true)

    // second step should return to original (period 2)
    const next2 = svc.nextMatrix()
    expect(matrixEquals(next2, init)).toBe(true)
  })

  it('moves glider correctly after 4 generations (translation by +1,+1)', () => {
    const init = [
      [0,0,0,0,0],
      [0,0,1,0,0],
      [0,0,0,1,0],
      [0,1,1,1,0],
      [0,0,0,0,0]
    ]
    const expectedShifted = [
      [0,0,0,0,0],
      [0,0,0,0,0],
      [0,0,0,1,0],
      [0,0,0,0,1],
      [0,0,1,1,1]
    ]

    const svc = new LifeGameService(init)
    let cur = svc.nextMatrix()
    cur = svc.nextMatrix()
    cur = svc.nextMatrix()
    cur = svc.nextMatrix()

    // debug: printed during test runs if needed
    expect(matrixEquals(cur, expectedShifted)).toBe(true)
  })
})
