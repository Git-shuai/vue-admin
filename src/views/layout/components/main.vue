<template>
    <div id="main-wrap">
        <router-view/>
    </div>
</template>

<script>
    export default {
        name: "main"
    }
</script>

<style lang="scss" scoped>
    @import "../../../styles/config.scss";

    #main-wrap {
        position: fixed;
        left: $navMenu;
        top: 75px;
        right: 0;
        bottom: 0;
        border: 30px solid #edf6ff;
        border-bottom: none;
        /*border-right: none;*/
        -webkit-box-sizing: border-box;
    }
</style>
