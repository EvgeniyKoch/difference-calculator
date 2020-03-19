const checkValue = val => (val instanceof Object ? '[complex value]' : `'${val}'`);

const renderPlainMapping = {
  parent: (path, { children }, func) => func(children, path),
  removed: path => `Property '${path.join('.')}' was deleted`,
  added: (path, { value }) => `Property '${path.join('.')}' was added with value: ${checkValue(value)}`,
  changed: (path, { valueBefore, valueAfter }) => {
    const before = checkValue(valueBefore);
    const after = checkValue(valueAfter);
    return `Property '${path.join('.')}' was changed from '${before}' to ${after}`;
  },
  unchanged: () => '',
};

export default (ast) => {
  const iter = (list, pathList) => list.map((node) => {
    const path = [...pathList, node.key];

    return renderPlainMapping[node.type](path, node, iter);
  });

  const result = iter(ast, [])
    .flat(Infinity)
    .filter(Boolean)
    .join('\n');

  return `${result}\n`;
};
