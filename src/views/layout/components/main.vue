<template>
    <div id="main-wrap">
        <div class="main-content">
            <div class="content">
                <router-view/>
            </div>
        </div>

    </div>
</template>

<script>
    export default {
        name: "mainMenu"
    }
</script>

<style lang="scss" scoped>
    @import "../../../styles/config.scss";

    #main-wrap {
        height: 100vh;
    }

    .main-content {
        width: 100%;
        height: 100%;
        padding-right: 30px;
        padding-top: $layoutHeader + 30;
        padding-left: $navMenu + 30;
        @include webkit(box-sizing,border-box);
        @include webkit(transition, all .5s ease 0s);

    }

    .content {
        width: 100%;
        height: 100%;
        padding-top: 30px;
        padding-left: 30px;
        @include webkit(box-sizing,border-box);
        background-color: #fff;
    }


    .open {
        .main-content {
            padding-left: $navMenu + 30;
        }
    }

    .close {
        .main-content {
            padding-left: $navMenuMin + 30;
        }
    }
</style>
