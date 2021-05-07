7z a snekkyd-gui.7z ..\..\..\public\*
copy /b 7zSD.sfx + sfx_config.txt + snekkyd-gui.7z "decompiler_sfx.exe"
ResourceHacker.exe -script rh_script.txt