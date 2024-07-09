import path from 'path';
import { coerce, SemVer } from 'semver';

import { readFile, writeFile } from './utils';

export const updateGradleVersion = async (androidPath: string, nextVersion: string) => {
  const gradlePath = path.join(androidPath, '/app/build.gradle');
  const contents = await readFile(gradlePath);
  const nextVersionCode = getVersionCode(coerce(nextVersion)!);
  const withUpgradedVersionCode = contents.replace(/((versionCode \d+){1})/g, 'versionCode ' + nextVersionCode);
  const withUpgradedCodeAndName = withUpgradedVersionCode.replace(/((versionName ".*"){1})/g, 'versionName "' + nextVersion + '"');
  return writeFile(gradlePath, withUpgradedCodeAndName);
}

const getVersionCode = (next: SemVer) => {
  if (next.minor > 99 || next.patch > 99) {
    throw new Error('Cannot have minor or patch versions greater than 99');
  }

  return next.major * 10000 + next.minor * 100 + next.patch;
};
