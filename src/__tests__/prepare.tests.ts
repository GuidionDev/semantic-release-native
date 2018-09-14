import { prepare } from "../../src";
import { Context } from "../interfaces";
import fs from 'fs';

const context: Context = {
  logger: {
    log: () => true,
    error: () => true,
  },
  nextRelease: { version: '2.2.3', gitHead: 'bla', gitTag: '', notes: 'super cool release!' }
};

const config = { androidPath: 'dist/__tests__/fixtures/build.gradle' };
describe('prepare', () => {
  test('should correctly set the versions in gradle', (done) => {
    prepare(config, context).then((result: string) => {
      fs.readFile(config.androidPath, 'utf8', (err, data) => {
        if (err) done(err);
        expect(data.indexOf('versionCode 20203') > -1);
        expect(data.indexOf('versionName "2.2.3"') > -1);
        done();
      });
    });
  });
  test('should correctly set the versions in gradle again', (done) => {
    context.nextRelease!.version = '3.10.0';
    prepare(config, context).then((result: string) => {
      fs.readFile(config.androidPath, 'utf8', (err, data) => {
        if (err) done(err);
        expect(data.indexOf('versionCode 31000') > -1);
        expect(data.indexOf('versionName "3.10.0"') > -1);
        done();
      });
    });
  });
});