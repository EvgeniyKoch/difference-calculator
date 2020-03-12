import render from './render';
import renderPlain from './renderPlainOutput';

const formatter = {
  plain: renderPlain,
  json: JSON.stringify,
  default: render,
};

export default (ast, format) => formatter[format](ast);
