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

<pre class="editor">
    <div class="content">
        <plaintext type="text/snekky" readonly={code === ""} bind:this={editorElement}></plaintext>
    </div>
</pre>

<style>
    .content {
        behavior: selectable;
        font-family: "Consolas";
        height: 1*;
        width: 1*;
    }

    .editor {
        height: 1*;
        width: 1*;
        flow: horizontal;
        overflow: auto;
    }

/*     .line {
        font-family: "Consolas";
        font-size: 14px;
        text-align: right;
        color: #858585;
        padding: 0 15px 0 5px;
    } */
</style>
