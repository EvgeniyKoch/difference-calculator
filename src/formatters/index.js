import renderDiff from './renderDiff';
import renderPlain from './renderPlainOutput';

const formatter = {
  plain: renderPlain,
  json: JSON.stringify,
  stringify: renderDiff,
};

export default (ast, format) => formatter[format](ast);
