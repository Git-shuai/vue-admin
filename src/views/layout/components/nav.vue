<template>
    <div id="nav-wrap">
        导航
    </div>
</template>

<script>
    export default {
        name: "nav"
    }
</script>

<style lang="scss" scoped>
    @import "../../../styles/config.scss";

    #nav-wrap {
        position: fixed;
        top: 0;
        left: 0;
        width: $navMenu;
        height: 100vh;
        background-color: #344a5f;
    }
</style>
