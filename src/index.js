import fs from 'fs';
import path from 'path';

import createAst from './crerate-ast';
import getParser from './parser';
import formattersFactory from './formatters';

const readFile = (filename) => {
  const fullPath1 = path.join(__dirname, '..', 'fixtures', filename);
  try {
    return fs.readFileSync(fullPath1, 'utf-8');
  } catch (e) {
    throw new Error(`Invalid file name \n ${e.message}`);
  }
};

export default (pathToFile1, pathToFile2, format) => {
  const [ext1, ext2] = [pathToFile1, pathToFile2].map(path.extname);

  const fileBefore = readFile(pathToFile1)
    |> (_ => getParser(_, ext1));

  const fileAfter = readFile(pathToFile2)
    |> (_ => getParser(_, ext2));

  if (!fileBefore || !fileAfter) {
    throw new Error('There is nothing compare!');
  }

  const ast = createAst(fileBefore, fileAfter);

  return formattersFactory(ast, format);
};
