#!/bin/bash

# build latest sources
ionic build android

# create release apk
cordova build --release android

# sign apk
jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore my-release-key.keystore platforms/android/build/outputs/apk/android-release-unsigned.apk alias_name

# zipalign
~/Library/Android/sdk/build-tools/24.0.1/zipalign -v 4 platforms/android/build/outputs/apk/android-release-unsigned.apk platforms/android/build/outputs/apk/PioX.apk

echo -e "\n\n  Done. Final APK can be found here: platforms/android/build/outputs/apk/PioX.apk\n\n"
