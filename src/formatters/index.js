import render from './render';
import renderPlain from './renderPlain';

// eslint-disable-next-line consistent-return
const formattersFactory = (ast, format) => {
  switch (format) {
    case 'plain':
      renderPlain(ast);
      break;
    default:
      return render(ast);
  }
};

export default formattersFactory;
