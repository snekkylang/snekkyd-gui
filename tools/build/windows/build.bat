curl -L http://www.angusj.com/resourcehacker/resource_hacker.zip --output resource_hacker.zip
7z e resource_hacker.zip
7z a snekkyd-gui.7z scapp.exe ..\..\..\public\*
copy /b 7zSD.sfx + sfx_config.txt + snekkyd-gui.7z "decompiler_sfx.exe"
ResourceHacker.exe -script rh_script.txt