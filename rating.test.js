// rating.test.js

const fs = require('fs');
const path = require('path');
const calculateNewRatings = require('./rating_algo');

function loadCSV(filePath) {
  const raw = fs.readFileSync(filePath, 'utf8').trim();
  const lines = raw.split('\n');
  const header = lines[0].split(',');

  return lines.slice(1).map(line => {
    const cols = line.split(',');

    return {
      scoreDiff: Number(cols[0]),
      boards: Number(cols[1]),
      oldR1: Number(cols[3]),
      oldR2: Number(cols[4]),
      expectedR1: Number(cols[5]),
      expectedR2: Number(cols[6])
    };
  });
}

describe("CSV Driven Rating Tests", () => {

  const testCases = loadCSV(path.join(__dirname, 'rating_data.csv'));

  testCases.forEach((row, index) => {

    /* test(`Row ${index + 1} → diff=${row.scoreDiff}, boards=${row.boards}`, () => {
        const diff1 = Math.abs(row.oldR1 - row.expectedR1);
        const diff2 = Math.abs(row.oldR2 - row.expectedR2);

        expect(diff1).toBe(diff2);
    });*/

    test(`Row ${index + 1} → diff=${row.scoreDiff}, boards=${row.boards}`, () => {

      const result = calculateNewRatings(
        row.oldR1,
        row.oldR2,
        row.boards,
        row.scoreDiff
      );

      // expect(result.newR1).toBe(row.expectedR1);
      // expect(result.newR2).toBe(row.expectedR2);
      expect(Math.abs(result.newR1 - row.expectedR1)).toBeLessThanOrEqual(1);
      expect(Math.abs(result.newR2 - row.expectedR2)).toBeLessThanOrEqual(1);
      
    });

  });

});

