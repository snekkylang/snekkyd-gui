<script>
    export let text;
    export let role;
    export let isClose = false;
</script>

<div {role} class:close={isClose} class="button">{text}</div>

<style>
    .button {
        color: #CCCCCC;
        height: 1*;
        width: 40px;
        behavior: button;
        font-weight: 500;
        text-align: center;
        font-size: 20px;
        vertical-align: center;
    }

    .button:hover {
        background-color: #505050;
    }

    .close:hover {
        background-color: #D71526;
    }
</style>