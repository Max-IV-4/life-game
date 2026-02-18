# Write method nextMatrix of LifeGameService class
## Algorithm
### Rules: Cells live or die based on 8 neighbors:
# Write method nextMatrix of LifeGameService class

## Algorithm

### Rules: Cells live or die based on 8 neighbors

**Survival**: A live cell with 2-3 neighbors lives on.

**Death**: A live cell with fewer than 2 neighbors (underpopulation) or more than 3 neighbors (overpopulation) dies.

**Birth**: A dead cell with exactly 3 neighbors becomes a live cell.

---

## Implementation notes (added)

- **File changed:** [src/services/LifeGameService.ts](src/services/LifeGameService.ts)
- **Method implemented:** `nextMatrix()` — computes the next generation following the above rules.
- **Behavior:** `nextMatrix()` inspects the current internal matrix, computes a new matrix applying Game of Life rules to every cell, replaces the internal matrix with the new state, and returns it. This lets callers (for example `src/components/Matrix.tsx`) call `lifeGame.current!.nextMatrix()` and receive the next state while keeping service state consistent.
- **Complexity:** Time O(rows * cols) and space O(rows * cols) (uses a new matrix for the next state before swapping in).
- **Edge handling:** The implementation treats the grid as finite and does not wrap edges — neighbors outside bounds are ignored.
- **Seeding:** The initial matrix is generated using `getRandomIntMatrix` (used in `Matrix.tsx` when constructing `LifeGameService`). The service itself no longer generates random matrices; it evolves the supplied matrix.

## Notes for maintainers

- The neighbor-count inner loops are intentionally simple and readable for correctness and maintainability. If performance becomes critical for large grids, consider optimizations like tracking active regions or using typed arrays.
- To run the app locally, start the Vite dev server (typical command):

```
npm run dev
```