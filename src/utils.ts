import fs from 'fs';

export const readFile = (file: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    fs.readFile(file, 'utf8', (err, data) => {
      if (err) reject(err);
      resolve(data);
    });
  });
}

export const writeFile = (path: string, contents: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    fs.writeFile(path, contents, (err) => {
      if (err) reject(err);
      resolve('saved: ' + path);
    });
  });
}

export const readDir = (path: string): Promise<string[]> => {
  return new Promise((resolve, reject) => {
    return fs.readdir(path, function (err, filenames) {
      if (err) {
        throw ('directory not found' + path);
      }
      resolve(filenames);
    });
  });
}