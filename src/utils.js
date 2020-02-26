import path from 'path';
import fs from 'fs';

export const getJsonDataToObjectFormat = filepath => filepath
  |> (pathToFile => path.resolve(pathToFile))
  |> (pathToFileFull => fs.readFileSync(pathToFileFull, 'utf8'))
  |> (file => JSON.parse(file));

export const getFilesDifferenceJsonInObject = (fileBefore, fileAfter) => {
  const keys = Object.keys({ ...fileBefore, ...fileAfter });

  return keys.reduce((acc, key) => {
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
  }, {});
};
