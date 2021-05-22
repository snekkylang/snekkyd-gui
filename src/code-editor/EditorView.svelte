<script>
    import Tab from "./Tab.svelte";
    import Editor from "./Editor.svelte";
    import Log from "./Log.svelte";
    import BytecodeViewer from "./BytecodeViewer.svelte";

    export let editorTabs;
    export let onFileChange;
    export let onTabClose;
    export let onCodeChange;
    export let code;
    export let instructions;
    export let logContent;
</script>

<div class="editor">
    <div class="tabs">
        {#each editorTabs as tab}
            <Tab {onFileChange} {onTabClose} {...tab} />
        {/each}
    </div>

    <frameset rows="*, auto">
<!--         <frameset cols="*, *"> -->
            <Editor {onCodeChange} value={code} />
<!--             <splitter />
            <BytecodeViewer value={instructions} />
        </frameset> -->

        <Log content={logContent} />
    </frameset>
</div>

<style>
    splitter:hover,
    splitter {
        margin-left: -5px;
        background: transparent;
        border-right: solid 1px #444444;
    }

    .tabs {
        flow: horizontal;
        background-color: #252526;
        width: 1*;
        overflow: hidden;
    }

    .editor {
        width: 1*;
        height: 1*;
        background-color: #1e1e1e;
    }
</style>
