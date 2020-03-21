const ident = (depth, tab = 2) => ' '.repeat(depth * tab);

const stringify = (value, depth = 2) => {
  if (!(value instanceof Object)) {
    return value;
  }

  return Object.keys(value)
    .map((key) => `{\n${ident(depth + 2)}${key}: ${value[key]}\n${ident(depth)}}`);
};

const renderMapping = {
  parent: ({ key, children }, depth, func) => (
    `${ident(depth + 1)}${key}: {\n${func(children, depth + 2)}\n${ident(depth + 1)}}`
  ),
  changed: ({ key, valueBefore, valueAfter }, depth) => (
    `${ident(depth)}- ${key}: ${stringify(valueBefore, 4)}\n${ident(depth)}+ ${key}: ${stringify(valueAfter, 4)}`
  ),
  removed: ({ key, value }, depth) => `${ident(depth)}- ${key}: ${stringify(value)}`,
  added: ({ key, value }, depth) => `${ident(depth)}+ ${key}: ${stringify(value, depth + 1)}`,
  unchanged: ({ key, value }, depth) => `${ident(depth + 1)}${key}: ${stringify(value)}`,
};

export default (ast) => {
  const iter = (tree, depth = 1) => (
    tree.map((node) => renderMapping[node.type](node, depth, iter)).join('\n')
  );

  return `{\n${iter(ast)}\n}\n`;
};
