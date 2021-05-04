<script>
    export let text;
    export let keyCombination = "";
    export let identifier;
    export let disabled = false;
    export let onClick;

    function handleClick(e) {
        if (!disabled) {
            onClick(identifier);
        }
    }
</script>

<li class="item" class:disabled on:click={handleClick}>{text} <span class="key">{keyCombination}</span></li>

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

    .disabled {
        color: #686868;
        behavior: disabled;   
    }

    .item:not(.disabled):hover {  
        background-color: #094771;
        color: white;
    }

    .key {
        display: block;
        white-space: nowrap;
        margin-left: 1*; 
    }
</style>