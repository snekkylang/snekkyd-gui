<script>
    export let value;
</script>

<div class="wrapper">
    {#if value.length > 0}
        <table>
            <tr class="head">
                <th>Line</th>
                <th>Address</th>
                <th>Instruction</th>
            </tr>

            {#each value as ins, line}
                <tr>
                    <td>{line}</td>
                    <td>{ins.info.bytePosition}</td>
                    <td>{ins.toString()}</td>
                </tr>
            {/each}
        </table>
    {/if}
</div>

<style>
    .wrapper {
        height: 1*;
        width: 1*;
        background-color: #1e1e1e;
        min-width: 100px;
        padding: 10px;
        overflow: auto;
    }

    table,
    th,
    td {
        border-collapse: collapse;
    }

    table {
        width: 1*;
    }

    th {
        font-weight: bold;
        color: #d4d4d4;
        border-bottom: solid 1px #b9b9b9;
        padding: 5px;
    }

    td {
        color: #d4d4d4;
        padding: 5px;
        border-bottom: solid 1px #474747;
        font-family: "Consolas";
    }
</style>
