import 'source-map-support/register';
import fs from 'fs';
import path from 'path';

import createAst from './crerate-ast';
import parse from './parser';
import render from './formatters';

export default (pathToFile1, pathToFile2, format) => {
  const typeData1 = path.extname(pathToFile1).slice(1);
  const typeData2 = path.extname(pathToFile2).slice(1);

  const fileDataBefore = fs.readFileSync(pathToFile1, 'utf8')
    |> ((_) => parse(_, typeData1));

  const fileDataAfter = fs.readFileSync(pathToFile2, 'utf8')
    |> ((_) => parse(_, typeData2));

  if (!fileDataBefore || !fileDataAfter) {
    throw new Error('There is nothing compare!');
  }

  const ast = createAst(fileDataBefore, fileDataAfter);

  return render(ast, format);
};
