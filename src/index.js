import createAst from './crerate-ast';
import getDataToObjectFormat from './utils';
import formattersFactory from './formatters';

export default (pathToFile1, pathToFile2, format) => {
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
