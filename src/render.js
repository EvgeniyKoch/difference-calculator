const ident = (depth, tab = 2) => ' '.repeat(depth * tab);

const stringify = (value, depth = 2) => {
  if (!(value instanceof Object)) {
    return value;
  }

  return Object.keys(value)
    .map(key => `{\n${ident(depth + 2)}${key}: ${value[key]} \n${ident(depth)}}`)
    .flat();
};

const render = (ast, depth = 1) => ast.map(({
  type, key, children, value, valueBefore, valueAfter,
}) => {
  if (type === 'parent') {
    return [`${ident(depth + 1)}${key}: {\n${render(children, depth + 2)}\n${ident(depth + 1)}}`];
  }

  if (type === 'removed') {
    return [`${ident(depth)}- ${key}: ${stringify(value)}`];
  }

  if (type === 'added') {
    return [`${ident(depth)}+ ${key}: ${stringify(value, depth + 1)}`];
  }

  if (type === 'unchanged') {
    return [`${ident(depth + 1)}${key}: ${stringify(value)}`];
  }

  return [
    `${ident(depth)}- ${key}: ${stringify(valueBefore, 4)}\
    \n${ident(depth)}+ ${key}: ${stringify(valueAfter, 4)}`,
  ];
})
  .join('\n');

export default render;
