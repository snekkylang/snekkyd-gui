<script>
    import Tab from "./Tab.svelte";
    import Editor from "./Editor.svelte";

    export let editorTabs;
    export let onFileChange;
    export let onTabClose;
    export let code;
</script>

<div class="editor">
    <div class="tabs">
        {#each editorTabs as tab}
            <Tab {onFileChange} {onTabClose} {...tab} />
        {/each}
    </div>

    <Editor {code} />
</div>

<style>
    .tabs {
        flow: horizontal;
        background-color: #252526;
    }

    .editor {
        width: 1*;
        height: 1*;
        background-color: #1e1e1e;
    }
</style>
