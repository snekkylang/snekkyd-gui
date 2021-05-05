<script>
    import WindowButton from "./WindowButton.svelte";

    export let windowTitle;
</script>

<div class="menu" role="window-caption">
    <ul class="window-menu-bar">
        <slot />
    </ul>

    <div class="window-title">{windowTitle}</div>

    <div class="window-buttons">
        <WindowButton text="&minus;" role="window-minimize" />
        <WindowButton text="&plus;" role="window-maximize" />
        <WindowButton text="&times;" isClose role="window-close" />
    </div>
</div>

<style>
    .menu {
        background-color: #3C3C3C;
        width: 100%;
        flow: horizontal;
    }

    .window-menu-bar {
        behavior: menu-bar;
        flow: horizontal;
    }

    .window-buttons {
        flow: horizontal;
        height: 1*;
    }

    .window-title {
        width: 1*;
        text-align: center;
        color: #CCCCCC;
        padding: 5px 7px;
    }
</style>