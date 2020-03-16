import fs from 'fs';
import path from 'path';
import genDiff from '../src';

const getFixturePath = filename => path.join(__dirname, '..', 'fixtures', filename);
const getExpectedResult = filename => fs.readFileSync(getFixturePath(filename), 'utf8');

const filenames = [
  ['before.json', 'after.json'],
  ['before.ini', 'after.ini'],
  ['before.yml', 'after.yml'],
];

describe('genDiff:', () => {
  describe('default comparison', () => {
    const expectedResult = getExpectedResult('expectObjectViewDifference.txt');

    test.each(filenames)('should return a string representation of the file change as an object', (a, b) => {
      expect(genDiff(a, b, 'default')).toBe(expectedResult);
    });
  });

  describe('output changes to a regular string presentation', () => {
    const expectedResult = getExpectedResult('expectPlain.txt');

    test.each(filenames)('should return a string representation of the file change as an string', (a, b) => {
      expect(genDiff(a, b, 'plain')).toBe(expectedResult);
    });
  });
});
