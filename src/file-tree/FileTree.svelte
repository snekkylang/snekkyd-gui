<script>
    import { afterUpdate } from "svelte";

    export let files;
    export let rootFile;
    export let onFileChange;

	import Folder from "./Folder.svelte";

    let root = [];

    function updateTree() {
        root = Object.keys(files).reduce((r, p) => {
            const names = p.split("/");
            names.reduce((q, name) => {
                let temp = q.find(o => o.name === name);
                if (!temp) {
                    temp = { name, files: [], path: p };
                    q.push(temp);
                }

                return temp.files;
            }, r);

            return r;
        }, []);
    }

    afterUpdate(updateTree);
</script>

<div class="tree">
    {#if root.length > 0}
        <Folder name={rootFile} files={root} root expanded depth={0} {onFileChange} />
    {/if}
</div>

<style>
    .tree {
        width: 220px;
        min-width: 150px;
        max-width: 90vw;
        height: 1*;
        background-color: #252526;
        resize: horizontal;
        overflow: auto;
    }
</style>