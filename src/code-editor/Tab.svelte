<script>
    export let name;
    export let path;
    export let active = false;
    export let onFileChange;
    export let onTabClose;

    function handleTabChange(e) {
        onFileChange(name, path)
    }

    function handleTabClose(e) {
        onTabClose(name, path);
    }
</script>

<div class="tab" class:active>
    <div on:click={handleTabChange} class="name">{name}</div>
    <div on:click={handleTabClose} class="close">&times;</div>
</div>

<style>
    .tab {
        background-color: #2D2D2D;
        color: #969696;
/*         padding: 8px 10px 8px 30px; */
        background-image: url("../img/file-tree/default_file.png");
        background-repeat: no-repeat;
        background-position: 10px center;
        flow: horizontal;
        border-right: solid 1px #252526;
        cursor: pointer;
    }

    .tab:last-of-type {
        border-right: none;
    }

    .name {
        padding: 8px 0 8px 30px;
        behavior: button;
    }

    .close {
        font-size: 20px;
        line-height: 16px;
        visibility: hidden;
        behavior: button;
        padding: 8px 10px 8px 10px;
    }

    .tab:hover .close {
        visibility: visible;
    }

    .tab.active {
        color: white;
        background-color: #1E1E1E;
    }

    .tab.active .close {
        visibility: visible;
    }
</style>