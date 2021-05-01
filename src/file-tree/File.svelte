<script>
    export let name;
    export let path;
    export let depth;
    export let onFileChange;

    function handleClick(e) {
        onFileChange(name, path);
    }
</script>

<div on:click={handleClick} style="padding-left: {depth * 10 + 30}px; background-position: {(depth + 1) * 10}px center;" class="file">{name}</div>

<style>
    .file {
        background-image: url("../img/file-tree/default_file.png");
        background-repeat: no-repeat;
        background-position: 10px center;
        cursor: pointer;
        color: #CCCCCC;
        padding: 2px 0 2px 30px;
        behavior: button;
    }

    .file:hover {
        background-color: #2A2D2E;
    }
</style>
