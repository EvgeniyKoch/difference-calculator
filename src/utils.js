import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';
import ini from 'ini';

const getFixturePath = filename => path.join(__dirname, '..', 'fixtures', filename);
const readFile = filename => fs.readFileSync(getFixturePath(filename), 'utf8');

const parser = {
  '.json': file => JSON.parse(file),
  '.yaml': file => yaml.safeLoad(file),
  '.ini': file => ini.parse(file),
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

  return parser[extension](dataFile);
};
