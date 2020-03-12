import genDiff from '../src';
import { readFile } from '../src/utils';

const testingFiles = [
  ['before.json', 'after.json'],
  ['before.ini', 'after.ini'],
  ['before.yml', 'after.yml'],
];

describe('genDiff:', () => {
  describe('default comparison', () => {
    const expectedVal = readFile('expectDefault.txt');

    test.each(testingFiles)('should return a string representation of the file change as an object', (a, b) => {
      expect(genDiff(a, b, 'default')).toBe(expectedVal);
    });
  });

  describe('output changes to a regular string presentation', () => {
    const expectedVal = readFile('expectPlain.txt');

    test.each(testingFiles)('should return a string representation of the file change as an string', (a, b) => {
      expect(genDiff(a, b, 'plain')).toBe(expectedVal);
    });
  });
});
