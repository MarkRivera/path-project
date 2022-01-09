import { Grid } from "../data/grid";
import { CellValues } from "../data/types";

describe("Grid Initialization Tests", () => {
  // Create Grid
  const myGrid = new Grid();

  test("Check ClassType", () => {
    expect(Grid.classType).toBe("Grid");
  });

  test("Check Grid Size", () => {
    // Check Grid Size
    expect(myGrid.size).toBe(100);
  });

  test("Check num of grid columns", () => {
    expect(myGrid.grid.length).toBe(10);
  });

  test("Check num of grid rows", () => {
    myGrid.grid.forEach(column => {
      expect(column.length).toBe(10);
    });
  });
});

describe("Create, Read, Update and Remove Start, End, and Wall cells", () => {
  const myGrid = new Grid();
  const x = 0;
  const y = 0;

  test("Create and Read Start Point", () => {
    myGrid.changeCellValue(x, y, CellValues.start); // Create Start Point
    expect(myGrid.grid[x][y].value).toEqual(CellValues.start); // Get start point value from grid

    myGrid.changeCellValue(5, 5, CellValues.start); // Update Start Point
    expect(myGrid.grid[x][y].value).toEqual(CellValues.valid); // Check to see if previous start point is a '.' now
    expect(myGrid.grid[5][5].value).toEqual(CellValues.start); // Check new start point
    expect(myGrid.startPointData).toEqual([5, 5]);
  });

  test("Create and Read End Point", () => {
    myGrid.changeCellValue(x, y, CellValues.end); // Create End Point
    expect(myGrid.grid[x][y].value).toEqual(CellValues.end); // Get end point value from grid

    myGrid.changeCellValue(4, 4, CellValues.end); // Update End Point
    expect(myGrid.grid[x][y].value).toEqual(CellValues.valid); // Check to see if previous End point is a '.' now
    expect(myGrid.grid[4][4].value).toEqual(CellValues.end); // Check new End point
    expect(myGrid.endPointData).toEqual([4, 4]);
  });

  test("Create and Read Wall Point", () => {
    myGrid.changeCellValue(x, y, CellValues.wall);
    expect(myGrid.grid[x][y].value).toEqual(CellValues.wall);
  });

  test("Create and Read Valid Point", () => {
    myGrid.changeCellValue(x, y, CellValues.valid);
    expect(myGrid.grid[x][y].value).toEqual(CellValues.valid);

    myGrid.changeCellValue(x, y, CellValues.wall);
    expect(myGrid.grid[x][y].value).toEqual(CellValues.wall);
  });
});

describe("Create a maze and test if we can find the exit", () => {
  // Create the maze:
  let myGrid = new Grid();

  beforeEach(() => {
    myGrid = new Grid();
    const startNodeRow = 0;
    const startNodeCol = 0;
    const endNodeRow = 5;
    const endNodeCol = 5;

    // Place start and end nodes:
    myGrid.changeCellValue(startNodeRow, startNodeCol, CellValues.start);
    myGrid.changeCellValue(endNodeRow, endNodeCol, CellValues.end);

    console.log(myGrid);
  });

  it("Finds exit without walls", () => {
    // Print Grid:
    myGrid.displayGrid();
    expect(myGrid.breadthFirstSearch()).toEqual("We found an exit!");
  });

  it("Returns -1 because no exit can be reached", () => {
    // Place walls
    const wallOneRow = 0;
    const wallOneCol = 1;
    const wallTwoRow = 1;
    const wallTwoCol = 0;

    myGrid.changeCellValue(wallOneRow, wallOneCol, CellValues.wall);
    myGrid.changeCellValue(wallTwoRow, wallTwoCol, CellValues.wall);

    // Print Grid
    myGrid.displayGrid();

    expect(myGrid.breadthFirstSearch()).toEqual(-1);

    // Remove a wall and find exit
    myGrid.changeCellValue(wallTwoRow, wallTwoCol, CellValues.valid);
    expect(myGrid.breadthFirstSearch()).toEqual("We found an exit!");
  });
});
