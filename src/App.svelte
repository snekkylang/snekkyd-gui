<script>
    import MenuBar from "./menu/MenuBar.svelte";
    import EditorView from "./code-editor/EditorView.svelte";
    import FileTree from "./file-tree/FileTree.svelte";

    let rootFile = "Project";
    let files = {};

    let editorTabs = [];
    let code = "";

    let currentFile = "None";

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
        console.log("change");
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
                code: files[path],
                active: true
            };

            editorTabs.push(newTab);
        }

        editorTabs = editorTabs;
        let currentTab = editorTabs.find(tab => tab.active);
        code = currentTab.code;
        currentFile = currentTab.name;
    }

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
                code = "";
                currentFile = "None";
            }
        }

        editorTabs = [...editorTabs.filter(tab => tab.path !== path)];
    }

    async function handleMenuButtonClick(identifier) {
        switch (identifier) {
            case "file.open-file": {
                const path = Window.this.selectFile().replace("file://", "");
                if (path === null) {
                    return;
                }

                const content = btoa(String.fromCharCode.apply(null, new Uint8Array(fs.$readfile(path))));
                const decompiled = SnekkyDecompiler.decompileBase64(content);
                rootFile = path.split("/").pop();
                editorTabs = [];
                code = "";
                files = decompiled.h;

                break;
            }
            case "file.exit": {
                Window.this.close();

                break;
            }
            case "help.info": {

                break;
            }
        }
    }
</script>

<main class="app">
    <MenuBar onMenuButtonClick={handleMenuButtonClick} windowTitle={[currentFile, rootFile, "Snekky Decompiler"].join(" - ")} />

    <div class="main-content">
        <FileTree {files} {rootFile} onFileChange={handleFileChange} />
        <EditorView {code} {editorTabs} onFileChange={handleFileChange} onTabClose={handleTabClose} />
    </div>
</main>

<style>
    .app {
        height: 100vh;
    }

    .main-content {
        flow: horizontal;
        height: 1*;
        background-color: green;
    }
</style>
