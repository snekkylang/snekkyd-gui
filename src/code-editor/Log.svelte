<script>
    export let content;

    const ansiUp = new AnsiUp();

    function handleLogClose(e) {
        content = [];
    }
</script>

{#if content.length > 0}
    <splitter />
    <div class="log">
        <div class="buttons">
            <div class="button" on:click={handleLogClose}>&times;</div>   
        </div>
        <div class="content">
            {#each content as line}
                <pre class="line">{@html ansiUp.ansi_to_html(line)}</pre>
            {/each}
        </div>
    </div>
{/if}

<style>
    splitter:hover,
    splitter {
        background: transparent;
        margin-bottom: -5px;
    }

    .log {
        border-top: solid 1px #414141;
        width: 1*;
        height: 200px;
        min-height: 80px;
        flow: vertical;
    }

    .button {
        display: inline-block;
        color: #C2C2C2;
        font-size: 16px;
        behavior: button;
        margin-top: 3px;
        cursor: pointer;
    }

    .buttons {
        text-align: right;
        padding-right: 3px;
    }

    .content {
        overflow: auto;
        padding: 0 10px;
        height: 1*;
        behavior: selectable;
    }

    .line {
        color: #CCCCCC;
    }
</style>