import { has } from 'lodash';

const propertyActions = [
  {
    type: 'parent',
    check: (data1, data2, key) => (data1[key] instanceof Object && data2[key] instanceof Object),
    process: (value1, value2, func) => ({ children: func(value1, value2) }),
  },
  {
    type: 'notChanged',
    check: (data1, data2, key) => (has(data1, key) && has(data2, key) && (data1[key] === data2[key])),
    process: value => ({ value }),
  },
  {
    type: 'changed',
    check: (data1, data2, key) => (has(data1, key) && has(data2, key) && (data1[key] !== data2[key])),
    process: (valueBefore, valueAfter) => ({ valueBefore, valueAfter }),
  },
  {
    type: 'deleted',
    check: (data1, data2, key) => (has(data1, key) && !has(data2, key)),
    process: value => ({ value }),
  },
  {
    type: 'added',
    check: (data1, data2, key) => (!has(data1, key) && has(data2, key)),
    process: (value1, value2) => ({ value: value2 }),
  },
];

const getPropertyAction = (data1, data2, key) => propertyActions.find(({ check }) => check(data1, data2, key));

const createAstTree = (fileBefore = {}, fileAfter = {}) => {
  const keys = Object.keys({ ...fileBefore, ...fileAfter });

  return keys.map((key) => {
    const { type, process } = getPropertyAction(fileBefore, fileAfter, key);

    return { key, type, ...process(fileBefore[key], fileAfter[key], createAstTree) };
  });
};

export default createAstTree;
