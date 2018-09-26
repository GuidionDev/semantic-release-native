import { readFile, writeFile } from './utils';
import { coerce, SemVer } from 'semver';

export const updateGradleVersion = async (path: string, nextVersion: string) => {
  const contents = await readFile(path);
  const nextVersionCode = getVersionCode(coerce(nextVersion)!);
  const withUpgradedVersionCode = contents.replace(/((versionCode \d+){1})/g, 'versionCode ' + nextVersionCode);
  const withUpgradedCodeAndName = withUpgradedVersionCode.replace(/((versionName ".*"){1})/g, 'versionName "' + nextVersion + '"');
  return writeFile(path, withUpgradedCodeAndName);
}

const getVersionCode = (next: SemVer) => (
  next.major * 10000 + next.minor * 100 + next.patch
);
