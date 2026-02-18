export default class LifeGameService {

    constructor(private _matrix: number[][]){ }
    get matrix() {
        return this._matrix
    }
    nextMatrix(): number[][] {
        return [];
    }
}