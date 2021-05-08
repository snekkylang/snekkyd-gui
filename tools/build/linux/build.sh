#!/bin/bash
curl -L https://github.com/AppImage/AppImageKit/releases/download/12/appimagetool-x86_64.AppImage --output appimagetool-x86_64.AppImage
chmod +x AppRun
chmod +x usr/bin/scapp
chmod a+x appimagetool-x86_64.AppImage
cp -r ../../../public/* usr/bin
./appimagetool-x86_64.AppImage .