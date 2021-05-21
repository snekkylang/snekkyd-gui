<script>
    import { afterUpdate } from "svelte";

    export let value;
    export let onCodeChange;

    let editorElement;

    afterUpdate(() => {
        editorElement.value = value;

        editorElement.onChange(v => {
            onCodeChange(v);
        });
    });
</script>

<div class="wrapper">
    <plaintext linenumbers="on" class:hidden={value === ""} type="text/snekky" bind:this={editorElement}></plaintext>
</div>

<style>
    .wrapper {
        height: 1*;
        width: 1*;
        background-color: #1E1E1E;
        min-width: 100px;
    }

    .hidden {
        display: none;
    }
</style>