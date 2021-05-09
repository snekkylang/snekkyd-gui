<script>
    import File from "./File.svelte";

    export let expanded = false;
    export let root = false;
    export let name;
    export let files;
    export let depth;
    export let onFileChange;

    function toggle() {
        expanded = !expanded;
    }
</script>

<div style="padding-left: {depth * 10 + 30}px; background-position: {(depth + 1) * 10}px center;" class="folder" class:root {onFileChange} class:expanded on:click={toggle}>{name}</div>

{#if expanded}
    <ul>
        {#each files as file}
            <li>
                {#if file.files.length > 0}
                    <svelte:self {...file} depth={depth + 1} {onFileChange} />
                {:else}
                    <File depth={depth + 1} {...file} {onFileChange} />
                {/if}
            </li>
        {/each}
    </ul>
{/if}

<style>
    .folder {
        background-image: url("../img/file-tree/default_folder.png");
        background-repeat: no-repeat;
        background-position: 10px center;
        cursor: pointer;
        color: #CCCCCC;
        padding: 2px 0 2px 30px;
        behavior: button;
    }

    .folder:hover {
        background-color: #2A2D2E;
    }

    .expanded {
        background-image: url("../img/file-tree/default_folder_opened.png");
    }

    .root {
        font-weight: 600;
    }

    ul {
        list-style: none;
    }
</style>