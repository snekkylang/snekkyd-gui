<script>
    import WindowButton from "./WindowButton.svelte";
    import MenuBarItem from "./MenuBarItem.svelte";
    import MenuPopupItem from "./popup/MenuPopupItem.svelte";
    import MenuPopupDivider from "./popup/MenuPopupDivider.svelte";

    export let onMenuButtonClick;
    export let windowTitle;
</script>

<div class="menu" role="window-caption">
    <ul class="window-menu-bar">
        <MenuBarItem title="File">
            <MenuPopupItem text="Open file..." identifier="file.open-file" onClick={onMenuButtonClick} keyCombination="CTRL+O" />
            <MenuPopupItem text="Save as..." identifier="file.save-files" onClick={onMenuButtonClick} keyCombination="CTRL+S" />
            <MenuPopupDivider />
            <MenuPopupItem text="Exit" identifier="file.exit" onClick={onMenuButtonClick} />
        </MenuBarItem>

        <MenuBarItem title="Help">
            <MenuPopupItem text="Info" identifier="help.info" onClick={onMenuButtonClick} />
        </MenuBarItem>
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
    }

    .window-title {
        width: 1*;
        text-align: center;
        color: #CCCCCC;
        padding: 5px 7px;
    }
</style>