<script>
    import MenuPopup from "./popup/MenuPopup.svelte";

    export let text;
    export let canExpand;

    let hovered = false;

    function handleMouseEnter(e) {
        hovered = true;
    }

    function handleMouseLeave(e) {
        hovered = false;
    }
</script>

<div class="item" on:mouseenter={handleMouseEnter} on:mouseleave={handleMouseLeave}>
    <div class="text">{text}</div>

    {#if hovered && canExpand}
        <MenuPopup>
            <slot />
        </MenuPopup>
    {/if}
</div>

<style>
    .text {
        color: #CCCCCC;
        padding: 5px 7px;
        behavior: button;
        font-weight: 500;
    }

    .item:hover {
        background-color: #505050;
    }
</style>