<script>
    import { afterUpdate } from "svelte";

    export let code;
    export let onCodeChange;

    let editorElement;

    afterUpdate(() => {
        editorElement.value = code;

        editorElement.onChange(v => {
            onCodeChange(v);
        });
    });
</script>

<div class="wrapper">
    <plaintext linenumbers="on" class:hidden={code === ""} type="text/snekky" bind:this={editorElement}></plaintext>
</div>

<style>
    .wrapper {
        height: 1*;
        width: 1*;
        background-color: #1E1E1E;
    }

    .hidden {
        display: none;
    }
</style>