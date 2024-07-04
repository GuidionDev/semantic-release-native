import path from 'path';
import { writeFile } from './utils';
import { mkdir } from 'fs/promises';
import { Context } from './interfaces';

export const writeNotesToFastlane = async (osPath: string, releaseNotes: string, log: Context['logger']['log']) => {
  const metaDataPath = path.join(osPath, 'fastlane', 'metadata', 'review_information');
  const notesPath = path.join(metaDataPath, 'notes.txt');
  log('[📝] Writing release notes to', notesPath);

  await mkdir(metaDataPath, { recursive: true });

  return writeFile(notesPath, releaseNotes);
}
