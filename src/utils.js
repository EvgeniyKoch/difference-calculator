import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';
import ini from 'ini';

const getFixturePath = filename => path.join(__dirname, '..', 'fixtures', filename);
const readFile = filename => fs.readFileSync(getFixturePath(filename), 'utf8');

const parsers = {
  '.json': JSON.parse,
  '.yaml': yaml.safeLoad,
  '.ini': ini.parse,
};

export default (filepath) => {
  const extension = path.extname(filepath);
  let dataFile;

  try {
    dataFile = readFile(filepath);
  } catch (e) {
    console.error(`${filepath} an incorrect path name`);

    return null;
  }

  return parsers[extension](dataFile);
};
