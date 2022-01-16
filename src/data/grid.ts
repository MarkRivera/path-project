import { Cell } from "./cell";
import { Queue } from "./queue";
import { CellValues } from "./types";

export class Grid {
  private _columns = 10;
  private _rows = 10;
  private _numOfCells = this._rows * this._columns;
  private _grid = this.makeGrid();
  private _prevGrid = this.makePrevGrid();
  private _rowQueue = new Queue();
  private _columnQueue = new Queue();
  private _startingPointRow;
  private _startingPointColumn;
  private _endPointRow;
  private _endPointColumn;
  private _reachedEnd = false;
  private _northSouthVector = [-1, 1, 0, 0]; // N, S, E, W
  private _eastWestVector = [0, 0, 1, -1]; // N, S, E, W

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

  private makePrevGrid(): Array<boolean> {
    let map = [];
    for (let i = 0; i < this._columns; i++) {
      map[i] = [];
      for (let j = 0; j < this._rows; j++) {
        map[i][j] = null;
      }
    }

    return map;
  }

  private exploreNeighbors(row: number, col: number): void {
    for (let i = 0; i < 4; i++) {
      let nextRow = row + this._northSouthVector[i];
      let nextCol = col + this._eastWestVector[i];

      // Skip out of bounds locations
      if (nextRow < 0 || nextCol < 0) continue;
      if (nextRow >= this._rows || nextCol >= this._columns) continue;

      // Skip invalid or visited squares
      if (
        this._grid[nextRow][nextCol].value === CellValues.wall ||
        this._grid[nextRow][nextCol].isVisited
      )
        continue;

      // Otherwise the cell is good and we can queue it up
      this._rowQueue.enqueue(nextRow);
      this._columnQueue.enqueue(nextCol);

      // Mark cell as visited
      this._grid[nextRow][nextCol].isVisited = true;

      // Track parent node of the next valid node
      this._prevGrid[nextRow][nextCol] = [row, col];
    }
  }

  public breadthFirstSearch() {
    if (this.startPointCol === undefined || this.startPointRow === undefined)
      throw new Error(
        "You need a valid starting point before trying to search!"
      );

    // Enqueue the starting point:
    this._rowQueue.enqueue(this.startPointRow);
    this._columnQueue.enqueue(this.startPointCol);

    // Mark the starting point as visited:
    this.grid[this.startPointRow][this.startPointCol].isVisited = true;

    while (!this._rowQueue.isEmpty()) {
      // Do this while items are in our queues
      const row = this._rowQueue.dequeue(); // Remove a row number from the queue
      const col = this._columnQueue.dequeue(); // Remove a col number from the queue

      if (this.grid[row][col].value === CellValues.end) {
        // Check to see if this cell is an end point
        this._reachedEnd = true; // if it is, mark as true then break
        this.endPointRow = row;
        this.endPointCol = col;
        break;
      }
      this.exploreNeighbors(row, col); // explore the cells next to it
    }

    if (this._reachedEnd) return this.findPath(); // if an exit is found, say so
    return -1; // if not, return -1
  }

  public findPath() {
    const path = [[this.endPointRow, this.endPointCol]];
    let prev = this._prevGrid[this.endPointRow][this.endPointCol];

    while (prev) {
      path.push(prev);
      prev = this._prevGrid[prev[0]][prev[1]];
    }

    return path.reverse();
  }

  private get startPointCol() {
    return this._startingPointColumn;
  }

  private set startPointCol(num: number) {
    this._startingPointColumn = num;
  }

  private get startPointRow() {
    return this._startingPointRow;
  }

  private set startPointRow(num: number) {
    this._startingPointRow = num;
  }

  private get endPointCol() {
    return this._endPointColumn;
  }

  private set endPointCol(num: number) {
    this._endPointColumn = num;
  }

  private get endPointRow() {
    return this._endPointRow;
  }

  private set endPointRow(num: number) {
    this._endPointRow = num;
  }

  public get startPointData() {
    return [this._startingPointRow, this._startingPointColumn];
  }

  public get endPointData() {
    return [this._endPointRow, this._endPointColumn];
  }

  private addCell(x: number, y: number, map: Array<Array<Cell>>) {
    map[x][y] = new Cell();
  }

  private setStartPoints(x: number, y: number, cellType: CellValues) {
    this.startPointRow = x;
    this.startPointCol = y;
  }

  private setEndPoints(x: number, y: number, cellType: CellValues) {
    this.endPointRow = x;
    this.endPointCol = y;
  }

  public changeCellValue(x: number, y: number, cellType: CellValues) {
    if (cellType === CellValues.start) {
      if (
        this.startPointRow === undefined &&
        this.startPointCol === undefined
      ) {
        this.setStartPoints(x, y, cellType);
        return (this._grid[x][y].value = cellType);
      } else {
        this.changeCellValue(
          this.startPointRow,
          this.startPointCol,
          CellValues.valid
        ); // Removes from grid
        this.setStartPoints(x, y, cellType); // Sets new start point
        return (this._grid[x][y].value = cellType);
      }
    }

    if (cellType === CellValues.end) {
      if (this.endPointRow === undefined && this.endPointCol === undefined) {
        this.setEndPoints(x, y, cellType);
        return (this._grid[x][y].value = cellType);
      } else {
        this.changeCellValue(
          this.endPointRow,
          this.endPointCol,
          CellValues.valid
        ); // Removes from grid
        this.setEndPoints(x, y, cellType); // Sets new end point
        return (this._grid[x][y].value = cellType);
      }
    }

    if (this._grid[x][y].value === CellValues.start) {
      this.setStartPoints(undefined, undefined, cellType);
    }

    if (this._grid[x][y].value === CellValues.end) {
      this.setEndPoints(undefined, undefined, cellType);
    }

    if (this._grid[x][y].value !== cellType) this._grid[x][y].value = cellType;
  }

  public get size() {
    return this._numOfCells;
  }

  public get grid() {
    return this._grid;
  }

  public displayGrid() {
    let result = ``;

    for (let i = 0; i < this.grid.length; i++) {
      for (let j = 0; j < this.grid[i].length; j++) {
        result += `${this.grid[i][j].value} `;
      }
      result += "\n";
    }

    console.log(result);
  }
}
