const isComplexValue = val => (val instanceof Object ? '[complex value]' : `'${val}'`);

const renderPlain = (ast) => {
  const iter = (list, pathList = []) => list.forEach((node) => {
    if (node.type === 'parent' && node.children.length) {
      return iter(node.children, [...pathList, node.key]);
    }

    if (node.type === 'removed') {
      const pathTo = [...pathList, node.key];
      console.log(`Property '${pathTo.join('.')}' was deleted`);
    }

    if (node.type === 'added') {
      const pathTo = [...pathList, node.key];
      console.log(`Property '${pathTo.join('.')}' was added with value: ${isComplexValue(node.value)}`);
    }

    if (node.type === 'changed') {
      const pathTo = [...pathList, node.key];
      console.log(`Property '${pathTo.join('.')}' was changed from '${node.valueBefore}' to ${isComplexValue(node.valueAfter)}`);
    }
  });

  return iter(ast);
};

export default renderPlain;
