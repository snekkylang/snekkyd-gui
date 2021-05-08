#!/bin/bash
curl -L https://github.com/AppImage/AppImageKit/releases/download/12/appimagetool-x86_64.AppImage --output appimagetool-x86_64.AppImage
chmod a+x appimagetool-x86_64.AppImage
cp -r ../../../public/* usr/bin
./appimagetool-x86_64.AppImage .