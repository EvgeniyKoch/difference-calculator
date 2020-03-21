import { has, union, keys } from 'lodash';

const propertyActions = [
  {
    type: 'parent',
    check: (data1, data2, key) => (data1[key] instanceof Object && data2[key] instanceof Object),
    process: (value1, value2, func) => ({ children: func(value1, value2) }),
  },
  {
    type: 'unchanged',
    check: (data1, data2, key) => (has(data1, key) && has(data2, key) && (data1[key] === data2[key])),
    process: (value) => ({ value }),
  },
  {
    type: 'changed',
    check: (data1, data2, key) => (has(data1, key) && has(data2, key) && (data1[key] !== data2[key])),
    process: (valueBefore, valueAfter) => ({ valueBefore, valueAfter }),
  },
  {
    type: 'removed',
    check: (data1, data2, key) => (has(data1, key) && !has(data2, key)),
    process: (value) => ({ value }),
  },
  {
    type: 'added',
    check: (data1, data2, key) => (!has(data1, key) && has(data2, key)),
    process: (value1, value2) => ({ value: value2 }),
  },
];

const getPropertyAction = (data1, data2, key) => propertyActions.find(({ check }) => check(data1, data2, key));

const createAst = (fileDataBefore = {}, fileDataAfter = {}) => {
  const uniqueKeys = union(keys(fileDataBefore), keys(fileDataAfter));

  return uniqueKeys.map((key) => {
    const { type, process } = getPropertyAction(fileDataBefore, fileDataAfter, key);

    return { key, type, ...process(fileDataBefore[key], fileDataAfter[key], createAst) };
  });
};

export default createAst;
