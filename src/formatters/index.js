import render from './render';
import renderPlain from './renderPlainOutput';

const formatter = {
  plain: renderPlain,
  json: console.warn,
  default: render,
};

export default (ast, format) => formatter[format](ast);
