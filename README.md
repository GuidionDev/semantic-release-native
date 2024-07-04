# semantic-release-native

A semantic release plugin to update your android and ios app version using the semver version from semantic release.

## Usage

Simply `npm install @gdn/semantic-release-native --save-dev` and add the plugin to your prepare step in semantic release config like so:

```json
"prepare": [
  "@gdn/semantic-release-native"`
]
```
## Advanced

By default for android semantic-release-native will attempt to look for your build.gradle file in the ./android/app/ folder. If your folder structure is different, pass the complete path to your file in the configuration property 'androidPath'.

For ios it takes the '/ios/' folder and attempts to update all subdirectories with plist files to the new version. If your plist files are not below a '/ios/' folder you can pass an alternative folder to iosPath in the semantic release configuration.

## Fastlane

If you want to generate release notes for your fastlane, pass isFastlane boolean as following, and locales that you want it to generate under.

```json
"prepare": [
  {
    "path": "@gdn/semantic-release-native"`,
    "isFastlane": true,
    "fastlaneReleaseNoteLanguages": ["en-US", "nl-NL"]
  }
]
```
