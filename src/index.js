import createAstTree from './crerate-ast-tree';
import getDataToObjectFormat from './utils';
import render from './render';

export default (pathToFile1, pathToFile2) => {
  const fileBefore = getDataToObjectFormat(pathToFile1);
  const fileAfter = getDataToObjectFormat(pathToFile2);

  if (!fileBefore || !fileAfter) {
    console.warn('There is nothing compare!');

    return;
  }

  const diffObj = createAstTree(fileBefore, fileAfter)
    |> render;

  console.log(`{\n${diffObj}\n}`);
};
