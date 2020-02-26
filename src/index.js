import path from 'path';
import fs from 'fs';

export const getJsonDataToObjectFormat = (filepath) => {
  const pathToFileFull = path.resolve(filepath);
  let dataFile;

  try {
    dataFile = fs.readFileSync(pathToFileFull, 'utf8');
  } catch (e) {
    console.error(`${filepath} an incorrect path name`);

    return null;
  }

  return JSON.parse(dataFile);
};

export const getFilesDifferenceJsonInObject = (fileBefore, fileAfter) => (
  Object.keys({ ...fileBefore, ...fileAfter })
    .reduce((acc, key) => {
      const deleteKey = `- ${key}`;
      const addKey = `+ ${key}`;
      const currentKey = ` ${key}`;

      if (!fileAfter[key]) {
        return { ...acc, [deleteKey]: fileBefore[key] };
      }

      if (!fileBefore[key]) {
        return { ...acc, [addKey]: fileAfter[key] };
      }

      if (fileAfter[key] !== fileBefore[key]) {
        return { ...acc, [addKey]: fileAfter[key], [deleteKey]: fileBefore[key] };
      }

      return { ...acc, [currentKey]: fileAfter[key] };
    }, {})
);

export const toStringObj = obj => Object.keys(obj)
  .map(key => ` ${[key]}: ${obj[key]}`)
  .join('\n');

export default (pathToFile1, pathToFile2) => {
  const fileBefore = getJsonDataToObjectFormat(pathToFile1);
  const fileAfter = getJsonDataToObjectFormat(pathToFile2);

  if (!fileBefore || !fileAfter) {
    console.warn('There is nothing compare!');

    return;
  }

  const diffObj = getFilesDifferenceJsonInObject(fileBefore, fileAfter);
  const result = toStringObj(diffObj);

  console.log(`{\n ${result} \n}`);
};
