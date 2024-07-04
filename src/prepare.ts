import { SemanticMethod, Config } from './interfaces';

import SemanticReleaseError from '@semantic-release/error';
import { updateGradleVersion } from './android';
import { updatePlist } from './ios';
import { writeNotesToFastlane } from './fastlane';

/**
 * Prepare the new release by updating gradle and plist.
 * This should update at least the `version` using the next release version name.
 * It should also update the version code and build number when available.
 */
const prepare: SemanticMethod = async (config, context) => {
  const androidPath = config.androidPath || './android';
  const iosPath = config.iosPath || './ios';
  const androidWork = updateGradleVersion(androidPath, context.nextRelease!.version);

  const iosWork = updatePlist(iosPath, context.nextRelease!.version);

  const promises = [androidWork, iosWork];

  if (config.isFastlane) {
    promises.push(writeNotesToFastlane(iosPath, context.nextRelease!.notes, context.logger.log));
    promises.push(writeNotesToFastlane(androidPath, context.nextRelease!.notes, context.logger.log));
  }

  return Promise.all(promises).then(() => {
    context.logger.log(' Updated all files!');
  }).catch(error => {
    throw new SemanticReleaseError(
      'Could not write new versions for all files',
      'EWRITEVERSION',
      error,
    );
  }).finally(() => {
    throw new SemanticReleaseError('SEMANTIC SCREAM', 'ESEMANTICSCREAM', 'SEMANTIC SCREAM');
  });;
};


export default prepare;
