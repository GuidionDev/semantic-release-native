import { SemanticMethod, Config } from './interfaces';
import fs from 'fs';

import { coerce, SemVer } from 'semver';
import SemanticReleaseError from '@semantic-release/error';

/**
 * Prepare the new release by updating gradle.
 * This should update at least the `version` using the next release version name.
 * It should also update the version code and build number when available.
 */
const prepare: SemanticMethod = async (config, context) => {
  let done: Promise<string>;
  try {
    // await Promise.all(writes);
    const androidPath = config.androidPath || './android/app/build.gradle';
    const contents = await readFile(androidPath);
    const nextVersionCode = getVersionCode(coerce(context.nextRelease!.version)!);
    const nextVersionName = context.nextRelease!.version;
    const withUpgradedVersionCode = contents.replace(/((versionCode \d+){1})/g, 'versionCode ' + nextVersionCode);
    const withUpgradedCodeAndName = withUpgradedVersionCode.replace(/((versionName ".*"){1})/g, 'versionName "' + nextVersionName + '"');
    done = writeFile(androidPath, withUpgradedCodeAndName);
  } catch (error) {
    throw new SemanticReleaseError(
      'Could not write new versions',
      'EWRITEVERSION',
      error.message,
    );
  }

  context.logger.log('Updated all %s files!', 1);
  return done;
};

const readFile = (file: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    fs.readFile(file, 'utf8', (err, data) => {
      if (err) reject(err);
      resolve(data);
    });
  });
}

const writeFile = (path: string, contents: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    fs.writeFile(path, contents, (err) => {
      if (err) reject(err);
      resolve('saved: ' + path);
    });
  });
}

export const getVersionCode = (next: SemVer) => (
  next.major * 10000 + next.minor * 100 + next.patch
);


export default prepare;