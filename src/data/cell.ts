enum CellValues {
  start = "S",
  end = "E",
  wall = "#",
  valid = ".",
}

export class Cell {
  private _value;
  private _isVisited = false;

  constructor(value: CellValues = CellValues.valid) {
    this._value = value;
  }

  public get value() {
    return this._value;
  }

  public set value(input: CellValues) {
    this._value = input;
  }

  public get isVisited() {
    return this._isVisited;
  }

  public set isVisited(input: boolean) {
    if (typeof input != "boolean") {
      throw new Error("This must be a boolean value of true or false");
    }

    this._isVisited = input;
  }
}
