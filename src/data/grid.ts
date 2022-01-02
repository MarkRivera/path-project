import { Cell } from "./cell";
import { Queue } from "./queue";
import { CellValues } from "./types";

export class Grid {
  private _columns = 10;
  private _rows = 10;
  private _numOfCells = this._rows * this._columns;
  private _grid = this.makeGrid();
  private _rowQueue = new Queue();
  private _columnQueue = new Queue();
  private _startingPointRow;
  private _startingPointColumn;

  static classType = "Grid";

  private makeGrid(): Array<Array<Cell>> {
    let map = [];
    for (let i = 0; i < this._columns; i++) {
      map[i] = [];
      for (let j = 0; j < this._rows; j++) {
        this.addCell(i, j, map);
      }
    }
    return map;
  }

  private addCell(x: number, y: number, map: Array<Array<Cell>>) {
    map[x][y] = new Cell();
  }

  public get size() {
    return this._numOfCells;
  }

  public get grid() {
    return this._grid;
  }
}
