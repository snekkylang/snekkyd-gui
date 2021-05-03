<script>
    export let text;
    export let keyCombination = "";
    export let identifier;
    export let onClick;

    function handleClick(e) {
        onClick(identifier);
    }
</script>

<li class="item" on:click={handleClick}>{text} <span class="key">{keyCombination}</span></li>

<style>
    .item {  
        width: 1*;
        display: block;
        flow: horizontal;
        color: #CCCCCC;
        font-weight: 500;
        padding: 3px 20px;
        behavior: menu-bar;
    }

    .item:hover {  
        background-color: #094771;
        color: white;
    }

    .key {
        display: block;
        white-space: nowrap;
        margin-left: 1*; 
    }
</style>