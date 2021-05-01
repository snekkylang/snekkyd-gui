<script>
    import MenuBarItem from "./MenuBarItem.svelte";
    import MenuPopupItem from "./popup/MenuPopupItem.svelte";
    import MenuPopupDivider from "./popup/MenuPopupDivider.svelte";
    import WindowButton from "./WindowButton.svelte";

    export let onMenuButtonClick;

    let canExpand = false;
    let windowTitle = "main.snek - snekkyscript.bite - Snekky Decompiler"

    function handleExpandToggle(e) {
        canExpand = !canExpand;
    }
</script>

<div class="menu" role="window-caption">
    <div class="window-menu-bar" on:click={handleExpandToggle}>
        <MenuBarItem text="File" {canExpand}>
            <MenuPopupItem text="Open file..." identifier="file.open-file" onClick={onMenuButtonClick} keyCombination="CTRL+O" />
            <MenuPopupDivider />
            <MenuPopupItem text="Exit" identifier="file.exit" onClick={onMenuButtonClick} />
        </MenuBarItem>

        <MenuBarItem text="Help" {canExpand}>
            <MenuPopupItem text="Info" identifier="help.info" onClick={onMenuButtonClick} />
        </MenuBarItem>
    </div>

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
        flow: horizontal;
    }

    .window-buttons {
        flow: horizontal;
    }

    .window-title {
        width: 1*;
        text-align: center;
        color: #CCCCCC;
        padding: 5px 7px;
    }
</style>