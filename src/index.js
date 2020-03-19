import fs from 'fs';
import path from 'path';

import createAst from './crerate-ast';
import parse from './parser';
import getFormatterToDisplayDiff from './formatters';

const readFile = (filename) => {
  const fullPath1 = path.join(__dirname, '..', 'fixtures', filename);

  return fs.readFileSync(fullPath1, 'utf-8');
};

export default (pathToFile1, pathToFile2, format) => {
  const ext1 = path.extname(pathToFile1);
  const ext2 = path.extname(pathToFile2);

  const fileDataBefore = readFile(pathToFile1)
    |> (_ => parse(_, ext1));

  const fileDataAfter = readFile(pathToFile2)
    |> (_ => parse(_, ext2));

  if (!fileDataBefore || !fileDataAfter) {
    throw new Error('There is nothing compare!');
  }

  const ast = createAst(fileDataBefore, fileDataAfter);

  return getFormatterToDisplayDiff(ast, format);
};
