import { Cell } from "./cell";

export class Queue {
  private _elements = [];

  public enqueue(element: Cell) {
    this._elements.push(element);
  }

  public dequeue() {
    return this._elements.shift();
  }

  public isEmpty() {
    return this._elements.length === 0;
  }

  public peek() {
    return !this.isEmpty() ? this._elements[0] : undefined;
  }

  public length() {
    return this._elements.length;
  }
}
