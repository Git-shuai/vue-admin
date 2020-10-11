<template>
    <div id="header-wrap">
        头部区
    </div>
</template>

<script>
    export default {
        name: "headerMenu"
    }
</script>

<style lang="scss" scoped>
    @import "../../../styles/config.scss";

    #header-wrap {
        position: fixed;
        top: 0;
        left: $navMenu;
        right: 0;
        height: 75px;
        background-color: #fff;
        -webkit-box-shadow: 0 3px 16px 0 rgba(0, 0, 0, .1);
    }
</style>
