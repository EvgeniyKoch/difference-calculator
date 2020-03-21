const stringifyValue = (val) => (val instanceof Object ? '[complex value]' : `'${val}'`);

const renderPlainMapping = {
  parent: (path, { children }, func) => func(children, path),
  removed: (path) => `Property '${path.join('.')}' was deleted`,
  added: (path, { value }) => `Property '${path.join('.')}' was added with value: ${stringifyValue(value)}`,
  changed: (path, { valueBefore, valueAfter }) => {
    const before = stringifyValue(valueBefore);
    const after = stringifyValue(valueAfter);
    return `Property '${path.join('.')}' was changed from '${before}' to ${after}`;
  },
  unchanged: () => null,
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
