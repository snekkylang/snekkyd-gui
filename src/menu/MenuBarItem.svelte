<script>
    export let title;
</script>

<li class="item">
    <caption class="title">{title}</caption>
    <menu>
        <slot />
    </menu>
</li>

<style>
    menu {
        behavior: menu; 
        flow: vertical;
        display: none; 
        background-color: #252526;
        min-width: 250px;
        padding: 5px 0;
        box-shadow: 0px 2px 4px 0px rgba(20, 20, 20, 1); 
    }

    .title {
        display: block;
        padding: 5px 7px;
    }

    .title:hover {
        background-color: #505050;    
    }

    .item { 
        display: block; 
        margin: 0;
        white-space: nowrap;
        flow: horizontal;
        color: #CCCCCC;
        font-weight: 500;
    }
</style>