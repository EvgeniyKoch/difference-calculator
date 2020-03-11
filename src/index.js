import path from 'path';
import createAst from './crerate-ast';
import getDataToObjectFormat from './utils';
import formattersFactory from './formatters';

export default (pathToFile1, pathToFile2, format) => {
  const [ext1, ext2] = [pathToFile1, pathToFile2].map(path.extname);

  if (ext1 !== ext2) {
    console.log('You are comparing different file formats!\n');
  }

  const fileBefore = getDataToObjectFormat(pathToFile1);
  const fileAfter = getDataToObjectFormat(pathToFile2);

  if (!fileBefore || !fileAfter) {
    console.warn('There is nothing compare!');
    return;
  }

  const ast = createAst(fileBefore, fileAfter);
  const result = formattersFactory(ast, format);
  console.log(result);
};
