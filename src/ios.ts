import { readDir, readFile, writeFile } from './utils';
import { statSync } from 'fs';
import { join } from 'path';
import plist from 'plist';
export const updatePlist = async (path: string, newVersion: string) => {

  const files = await readDir(path);
  const dirs = files.map(f => join(path, f)).filter(baseFile => statSync(baseFile).isDirectory());

  return dirs.reduce((prev: Promise<any>, dirPath) => {
    const plistPath = join(dirPath, 'Info.plist');
    return prev
      .then(() => readFile(plistPath))
      .then(file => writeFile(plistPath, editPlistVersion(file, newVersion)))
      .catch(err => console.log('could not find a plist file in:', err.path));
  }, Promise.resolve());
}

const editPlistVersion = (file: string, newVersion: string) => {
  const plistContents = plist.parse(file);
  plistContents.CFBundleVersion = newVersion;
  plistContents.CFBundleShortVersionString = newVersion;
  return plist.build(plistContents);
}
