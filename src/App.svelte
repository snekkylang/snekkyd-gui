<script>
    import MenuBar from "./menu/MenuBar.svelte";
    import EditorView from "./code-editor/EditorView.svelte";
    import FileTree from "./file-tree/FileTree.svelte";

    let rootFile = "Project";
    let files = {};

    let editorTabs = [];
    let code = "";

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
                code: files[path],
                active: true
            };

            editorTabs.push(newTab);
        }

        editorTabs = editorTabs;
        code = editorTabs.find(tab => tab.active).code;
    }

    function handleTabClose(name, path) {
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
    <MenuBar onMenuButtonClick={handleMenuButtonClick} />

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
