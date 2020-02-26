import { getJsonDataToObjectFormat, getFilesDifferenceJsonInObject } from './utils';

export default (pathToFile1, pathToFile2) => {
  const fileBefore = getJsonDataToObjectFormat(pathToFile1);
  const fileAfter = getJsonDataToObjectFormat(pathToFile2);
  const diffObj = getFilesDifferenceJsonInObject(fileBefore, fileAfter);
  const result = Object.keys(diffObj)
    .map(key => ` ${[key]}: ${diffObj[key]}`)
    .join('\n');
  console.log(`{\n ${result} \n}`);
};
