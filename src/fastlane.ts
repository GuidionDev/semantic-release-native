import path from 'path';
import { writeFile } from './utils';
import { mkdir } from 'fs/promises';
import { Context } from './interfaces';

export const writeNotesToFastlane = async (osPath: string, languages: string[], releaseNotes: string, log: Context['logger']['log']) => {
  return Promise.all([languages.map(async language => {
    const metaDataPath = path.join(osPath, 'fastlane', 'metadata', language);
    const notesPath = path.join(metaDataPath, 'release_notes.txt');
    log('[📝] Writing release notes to', notesPath);

    return mkdir(metaDataPath, { recursive: true })
      .then(() => writeFile(notesPath, releaseNotes));
  })]);
}
