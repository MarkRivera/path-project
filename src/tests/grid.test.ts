import { Grid } from "../data/grid";

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
    console.log(myGrid.grid);
    myGrid.grid.forEach((column) => {
      expect(column.length).toBe(10);
    });
  });
});
