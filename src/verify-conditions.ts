import { SemanticMethod } from './interfaces';

import * as SemanticReleaseError from '@semantic-release/error';

/**
 * Verify the configuration of this plugin.
 * This checks if all Expo manifests are readable.
 */
const verifyConditions: SemanticMethod = async (config, context) => {
  // TODO check if this commit should update version?
};

export default verifyConditions;