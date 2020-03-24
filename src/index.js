import 'source-map-support/register';
import fs from 'fs';
import path from 'path';

import createAst from './crerate-ast';
import parse from './parser';
import render from './formatters';

export default (pathToFile1, pathToFile2, format) => {
  const ext1 = path.extname(pathToFile1);
  const ext2 = path.extname(pathToFile2);

  const fileDataBefore = fs.readFileSync(pathToFile1, 'utf8')
    |> ((_) => parse(_, ext1));

  const fileDataAfter = fs.readFileSync(pathToFile2, 'utf8')
    |> ((_) => parse(_, ext2));

  if (!fileDataBefore || !fileDataAfter) {
    throw new Error('There is nothing compare!');
  }

  const ast = createAst(fileDataBefore, fileDataAfter);

  return render(ast, format);
};
