import createAstTree from './parsers';
import getDataToObjectFormat from './utils';

export const toStringObj = obj => Object.keys(obj)
  .map(key => `${[key]}: ${obj[key]}`)
  .join('\n');

export default (pathToFile1, pathToFile2) => {
  const fileBefore = getDataToObjectFormat(pathToFile1);
  const fileAfter = getDataToObjectFormat(pathToFile2);

  if (!fileBefore || !fileAfter) {
    console.warn('There is nothing compare!');

    return;
  }

  // const diffObj = getFilesDifference(fileBefore, fileAfter);
  console.log(createAstTree(fileBefore, fileAfter), 'getFilesDifference(fileBefore, fileAfter)');
  // const result = toStringObj(diffObj);

  console.log('index.js');
};
