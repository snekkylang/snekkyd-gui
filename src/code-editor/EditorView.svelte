<script>
    import Tab from "./Tab.svelte";
    import Editor from "./Editor.svelte";
    import Log from "./Log.svelte";

    export let editorTabs;
    export let onFileChange;
    export let onTabClose;
    export let code;
    export let logShown;
    export let logContent;
</script>

<div class="editor">
    <div class="tabs">
        {#each editorTabs as tab}
            <Tab {onFileChange} {onTabClose} {...tab} />
        {/each}
    </div>

    <Editor {code} />

    <Log shown={logShown} content={logContent} />
</div>

<style>
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
