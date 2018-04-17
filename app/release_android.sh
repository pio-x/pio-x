#!/bin/bash

# remove old file
if [ -e platforms/android/build/outputs/apk/PioX.apk ]
then
    rm platforms/android/build/outputs/apk/PioX.apk
fi

# build latest sources
ionic cordova build android

# create release apk
cordova build --release android

# sign apk
jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore my-release-key.keystore platforms/android/build/outputs/apk/release/android-release-unsigned.apk alias_name

# zipalign
~/Library/Android/sdk/build-tools/26.0.2/zipalign -v 4 platforms/android/build/outputs/apk/release/android-release-unsigned.apk platforms/android/build/outputs/apk/PioX.apk

if [ -e platforms/android/build/outputs/apk/PioX.apk ]
then
    echo -e "\n\n  Done. Final APK can be found here: platforms/android/build/outputs/apk/PioX.apk\n\n"
else
    echo -e "\n\n  ERROR while building APK\n\n"
fi
