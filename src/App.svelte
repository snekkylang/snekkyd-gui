<script>
    import MenuBar from "./menu/MenuBar.svelte";
    import EditorView from "./code-editor/EditorView.svelte";
    import FileTree from "./file-tree/FileTree.svelte";
    import MenuBarItem from "./menu/MenuBarItem.svelte";
    import MenuPopupItem from "./menu/popup/MenuPopupItem.svelte";
    import MenuPopupDivider from "./menu/popup/MenuPopupDivider.svelte";

    let snekkyInstalled = false;

    let logContent = [];

    let rootFile = "Project";
    let files = {};

    let editorTabs = [];
    let currentFile = {
        name: "None",
        path: null,
        code: "",
        instructions: []
    };

    try {
        const screen = Window.this.screenBox("frame");
        const screenWidth = screen[2];
        const screenHeight = screen[3];
        const windowWidth = 1100;
        const windowHeight = 660;

        Window.this.minSize = [500, 300];
        Window.this.move(screenWidth / 2 - windowWidth / 2, screenHeight / 2 - windowHeight / 2, windowWidth, windowHeight);
    } catch (err) {
        console.log(err);
    }

    function handleFileChange(name, path) {
        const targetTab = editorTabs.find(tab => tab.path === path);
        const activeTab = editorTabs.find(tab => tab.active);

        if (activeTab !== undefined) {
            activeTab.active = false;
        }

        if (targetTab !== undefined) {
            targetTab.active = true;
        } else {
            const newTab = {
                name,
                path,
                active: true
            };

            editorTabs.push(newTab);
        }

        editorTabs = editorTabs;
        let currentTab = editorTabs.find(tab => tab.active);
        currentFile = {
            name: currentTab.name,
            path: currentTab.path,
            code: files[currentTab.path].code,
            instructions: files[currentTab.path].instructions
        };
    }

    function checkSnekkyInstallation() {
        try {
            spawn(["snekky", "-v"]);
            return true;
        } catch (e) {
            console.log(e);
            return false;
        }
    }

    document.addEventListener("load", () => {
        snekkyInstalled = checkSnekkyInstallation();   
    });

    function handleTabClose(name, path) {
        let targetTab;
        let targetTabIndex;

        for (let i = 0; i < editorTabs.length; i++) {
            if (editorTabs[i].path === path) {
                targetTab = editorTabs[i];
                targetTabIndex = i;
            }
        }

        if (targetTab.active) {
            if (targetTabIndex > 0) {
                handleFileChange(editorTabs[targetTabIndex - 1].name, editorTabs[targetTabIndex - 1].path);
            } else if (targetTabIndex === 0 && editorTabs.length > 1) {
                handleFileChange(editorTabs[1].name, editorTabs[1].path);
            } else {
                currentFile = {
                    name: "None",
                    path: null,
                    code: "",
                    instructions: []
                };
            }
        }

        editorTabs = [...editorTabs.filter(tab => tab.path !== path)];
    }

    function handleCodeChange(code) {
        files[currentFile.path] = code;
    }

    function openBytecodeFile(path) {
        const content = btoa(String.fromCharCode.apply(null, new Uint8Array(fs.$readfile(path))));
        const snekkyP = SnekkyP.fromBase64(content);
        const decompiled = SnekkyDecompiler.decompileBase64(content);
        rootFile = path.split("/").pop();
        editorTabs = [];
        currentFile = {
            name: "None",
            path: null,
            code: "",
            instructions: []
        };

        files = {};
        for (const fileName in decompiled.h) {
            files[fileName] = {
                code: decompiled.h[fileName],
                instructions: snekkyP.getInstructions(fileName)
            };
        }

        console.log(JSON.stringify(files));
    }

    function applyPathFixes(path) {
        return path.replace("file://", "").replace("%20", " ");
    }

    async function handleMenuButtonClick(identifier) {
        async function saveFiles(baseDir) {
            let createDirRecursive = (base, path) => {
                const pathParts = path.split("/");
                for (let i = 0; i < pathParts.length + 1; i++) {
                    fs.$mkdir(`${base}/${pathParts.slice(0, i).join("/")}`);
                }
            }
                
            for (let filePath in files) {
                let content = files[filePath];
                const fileDir = filePath.substring(0, filePath.lastIndexOf("/"));
                createDirRecursive(baseDir, fileDir);
                const file = await fs.open(`${baseDir}/${filePath}`, "w+", 0o666);
                await file.write(content, "utf-8");
            }
        }

        function select(type, modifiers = {}) {
            let path;
            if (type === "file") {
                path = Window.this.selectFile(modifiers);
            } else {
                path = Window.this.selectFolder(modifiers);
            }
            if (path === null) {
                return null;
            }
            path = applyPathFixes(path);
                
            return path;
        }

        switch (identifier) {
            case "file.open-file": {
                let path = select("file", {
                    filter: "Snekky Bytecode Files (*.bite)|*.bite|All Files (*.*)|*.*", 
                    extension: "bite",
                    caption: "Select bytecode file"
                });
                if (path === null) {
                    return;
                }

                openBytecodeFile(path);

                break;
            }
            case "file.save-files": {
                let baseDir = select("folder", {
                    caption: "Select output folder"
                });
                if (baseDir === null) {
                    return;
                }
                baseDir = `${baseDir}/${rootFile}`;

                await saveFiles(baseDir);

                break;
            }
            case "file.exit": {
                Window.this.close();

                break;
            }
            case "run.recompile": {
                let path = select("file", {
                    mode: "save",
                    caption: "Select output file",
                    filter: "Snekky Bytecode Files (*.bite)|*.bite|All Files (*.*)|*.*",
                    extension: "bite"
                });
                if (path === null) {
                    return;
                }
                path = path.split(".").slice(0, -1).join(".");

                const tempFolder = `${tmpdir()}/sd-${Date.now()}`;
                await saveFiles(tempFolder);

                logContent = [...logContent, `Recompiling ${currentFile.name}...`];
                const proc = spawn(["snekky", currentFile.path, "-o", path], { 
                    stdout: "pipe", 
                    stderr: "pipe", 
                    cwd: tempFolder
                });

                logContent = [...logContent, ...(await readPipe(proc.stdout))];

                break;
            }
            case "run.run": {
                const tempFolder = `${tmpdir()}/sd-${Date.now()}`;
                await saveFiles(tempFolder);
                logContent = [...logContent, `Running ${currentFile.name}...`];
                const proc = spawn(["snekky", currentFile.path], { 
                    stdout: "pipe", 
                    stderr: "pipe", 
                    cwd: tempFolder
                });

                logContent = [...logContent, ...(await readPipe(proc.stdout))];

                break;
            }
            case "help.info": {

                break;
            }
        }
    }

    dropZone({ 
        container: document,
        accept: "*.bite",
        ondrop: function(files) { 
            openBytecodeFile(applyPathFixes(files[0]));
        }
    });
</script>

<main class="app">
    <MenuBar windowTitle={[currentFile.name, rootFile, "Snekky Decompiler"].join(" - ")}>
        <MenuBarItem title="File">
            <MenuPopupItem text="Open file..." identifier="file.open-file" onClick={handleMenuButtonClick} keyCombination="CTRL+O" />
            <MenuPopupItem text="Save as..." identifier="file.save-files" onClick={handleMenuButtonClick} keyCombination="CTRL+S" disabled={Object.keys(files).length === 0} />
            <MenuPopupDivider />
            <MenuPopupItem text="Exit" identifier="file.exit" onClick={handleMenuButtonClick} />
        </MenuBarItem>

        <MenuBarItem title="Run">
            <MenuPopupItem text="Run current file..." identifier="run.run" onClick={handleMenuButtonClick} keyCombination="F5" disabled={currentFile.path === null || !snekkyInstalled} />
            <MenuPopupItem text="Recompile" identifier="run.recompile" onClick={handleMenuButtonClick} disabled={currentFile.path === null || !snekkyInstalled} />
        </MenuBarItem>

        <MenuBarItem title="Help">
            <MenuPopupItem text="Info" identifier="help.info" onClick={handleMenuButtonClick} />
        </MenuBarItem>
    </MenuBar>

    <frameset cols="auto, *" class="main-content">
        <FileTree {files} {rootFile} onFileChange={handleFileChange} />
        <splitter />
        <EditorView {logContent} code={currentFile.code} instructions={currentFile.instructions} {editorTabs} onFileChange={handleFileChange} onTabClose={handleTabClose} onCodeChange={handleCodeChange} />
    </frameset>
</main>

<style>
    .app {
        height: 100vh;
    }

    splitter:hover,
    splitter {
        margin-left: -5px;
        background: transparent;
    }

    .main-content {
        flow: horizontal;
        height: 1*;
    }
</style>
