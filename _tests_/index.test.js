import {
  getDataToObjectFormat,
  getFilesDifference,
  toStringObj,
} from '../src';

const setup = () => ({
  pathToFile1: 'before.json',
  pathToFile2: 'after.json',
  objectPathToFile1: {
    host: 'hexlet.io',
    timeout: 50,
    proxy: '123.234.53.22',
    follow: false,
  },
  objectPathToFile2: {
    timeout: 20,
    verbose: true,
    host: 'hexlet.io',
  },
  objDiff: {
    ' host': 'hexlet.io',
    '+ timeout': 20,
    '+ verbose': true,
    '- follow': false,
    '- proxy': '123.234.53.22',
    '- timeout': 50,
  },
});

describe('getJsonDataToObjectFormat reads, searches for data by file name and returns them in the form of an object', () => {
  const {
    pathToFile1,
    pathToFile2,
    objectPathToFile1,
    objectPathToFile2,
  } = setup();

  test.each([
    [pathToFile1, objectPathToFile1],
    [pathToFile2, objectPathToFile2],
  ])(
    'should return object when file name is correct', (path, exp) => {
      expect(getDataToObjectFormat(path)).toEqual(exp);
    },
  );

  test('should return null when incorrect file name', () => {
    const incorrectFileName = '_tests_.json';

    expect(getDataToObjectFormat(incorrectFileName)).toBeNull();
  });
});

describe('getFilesDifferenceJsonInObject compare two objects and returns an object describing the change', () => {
  const {
    objectPathToFile1,
    objectPathToFile2,
    objDiff,
  } = setup();

  test.each([
    [objectPathToFile1, objectPathToFile2, objDiff],
    [{ name: 'test' }, { value: 'test' }, { '- name': 'test', '+ value': 'test' }],
  ])(
    'should return difference object', (obj1, obj2, exp) => {
      expect(getFilesDifference(obj1, obj2)).toEqual(exp);
    },
  );
});

describe('toStringObj returns an object in a string representation', () => {
  test('should return string', () => {
    expect(toStringObj({ name: 'Jon' })).toBe(' name: Jon');
  });
});
