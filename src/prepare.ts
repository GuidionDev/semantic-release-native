import { SemanticMethod, Config } from './interfaces';

import SemanticReleaseError from '@semantic-release/error';
import { updateGradleVersion } from './android';
import { updatePlist } from './ios';

/**
 * Prepare the new release by updating gradle and plist.
 * This should update at least the `version` using the next release version name.
 * It should also update the version code and build number when available.
 */
const prepare: SemanticMethod = (config, context) => {
  const androidPath = config.androidPath || './android/app/build.gradle';
  const iosPath = config.iosPath || './ios';
  const iosOrAndroid = config.iosOrAndroid || 'both';
  let androidWork, iosWork;

  if (iosOrAndroid == 'both' || iosOrAndroid == 'android')
  {
    androidWork = updateGradleVersion(androidPath, context.nextRelease!.version);
  }
  if (iosOrAndroid == 'both' || iosOrAndroid == 'ios')
  {
    iosWork = updatePlist(iosPath, context.nextRelease!.version);
  }

  return Promise.all([androidWork, iosWork])
    .then(() => {
      context.logger.log('Updated all files!');
    })
    .catch(error => {
      throw new SemanticReleaseError(
        'Could not write new versions for all files',
        'EWRITEVERSION',
        error,
      );
    });;
};


export default prepare;