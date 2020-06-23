import 'source-map-support/register';
import fs from 'fs';
import path from 'path';

import createAst from './crerate-ast';
import parse from './parser';
import render from './formatters';

export default (pathToFile1, pathToFile2, format) => {
  const typeData1 = path.extname(pathToFile1).slice(1);
  const typeData2 = path.extname(pathToFile2).slice(1);

  const data1 = fs.readFileSync(pathToFile1, 'utf8');
  const fileDataBefore = parse(data1, typeData1);

  const data2 = fs.readFileSync(pathToFile2, 'utf8');
  const fileDataAfter = parse(data2, typeData2);

  if (!fileDataBefore || !fileDataAfter) {
    throw new Error('There is nothing compare!');
  }

  const ast = createAst(fileDataBefore, fileDataAfter);

  return render(ast, format);
};
