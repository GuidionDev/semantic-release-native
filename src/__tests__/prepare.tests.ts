import { prepare } from '../../src';
import { Context } from '../interfaces';
import fs from 'fs';
import plist from 'plist';

const context: Context = {
  logger: {
    log: () => true,
    error: () => true,
  },
  nextRelease: { version: '2.2.3', gitHead: 'bla', gitTag: '', notes: 'super cool release!' }
};

const config = { androidPath: 'dist/__tests__/fixtures/android_project', iosPath: 'dist/__tests__/fixtures' };
describe('prepare', () => {
  test('should correctly set the versions in gradle', (done) => {
    prepare(config, context).then((result: string) => {
      fs.readFile(config.androidPath + '/app/build.gradle', 'utf8', (err, data) => {
        if (err) done(err);
        expect(data.indexOf('versionCode 20203') > -1);
        expect(data.indexOf('versionName "2.2.3"') > -1);
        fs.readFile(config.iosPath + '/ios_project/info.plist', 'utf8', (err, data) => {
          if (err) done(err);
          const plistContents = plist.parse(data);
          expect(plistContents.CFBundleVersion === '2.2.3');
          expect(plistContents.CFBundleShortVersionString === '2.2.3');
          done();
        });
      });
    });
  });
  test('should correctly set the versions in gradle again', (done) => {
    context.nextRelease!.version = '3.10.0';
    prepare(config, context).then((result: string) => {
      fs.readFile(config.androidPath + '/app/build.gradle', 'utf8', (err, data) => {
        if (err) done(err);
        expect(data.indexOf('versionCode 31000') > -1);
        expect(data.indexOf('versionName "3.10.0"') > -1);
        fs.readFile(config.iosPath + '/ios_project/info.plist', 'utf8', (err, data) => {
          if (err) done(err);
          const plistContents = plist.parse(data);
          expect(plistContents.CFBundleVersion === '3.10.0');
          expect(plistContents.CFBundleShortVersionString === '3.10.0');
          done();
        });
      });
    });
  });
});
