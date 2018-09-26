import { SemanticMethod } from './interfaces';

import * as SemanticReleaseError from '@semantic-release/error';

/**
 * Verify the configuration of this plugin.
 * This checks if all Expo manifests are readable.
 */
const verifyConditions: SemanticMethod = async (config, context) => {
  // TODO check if configpath / defaultpath is valid?
};

export default verifyConditions;