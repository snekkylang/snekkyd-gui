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
    <Folder name={rootFile} files={root} root expanded depth={0} {onFileChange} />
</div>

<style>
    .tree {
        width: 220px;
        height: 1*;
        background-color: #252526;
        resize: horizontal;
        overflow: auto;
    }
</style>