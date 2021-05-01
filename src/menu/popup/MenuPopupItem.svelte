<script>
    export let text;
    export let keyCombination = "";
    export let identifier;
    export let onClick;

    function handleClick(e) {
        onClick(identifier);
    }
</script>

<div class="item" on:click={handleClick}>
    <div class="text">{text}</div>
    <div class="key">{keyCombination}</div>
</div>

<style>
    .item {
        color: #CCCCCC;
        behavior: button;
        font-weight: 500;
        padding: 3px 20px;
        flow: horizontal;
        behavior: button;
    }

    .item:hover {
        background-color: #094771;
        color: white;
    }

    .text {
        width: 1*;
    }
</style>