<template>
    <div id="header-wrap">
        <div class="pull-left head-icon" @click="navMenuStatus">
            <svg-icon icon-class="menu" className="menu"></svg-icon>
        </div>
        <div class="pull-right">
            <div class="pull-left user-info">
                管理员
            </div>
            <div class="pull-left head-icon">
                <svg-icon icon-class="exit" className="exit"></svg-icon>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "headerMenu",

        setup(props, {root}) {

            const navMenuStatus = () => {
                root.$store.commit('SET_isCollapse');
            };

            return{
                navMenuStatus
            }
        }
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
        line-height: 75px;
        background-color: #fff;
        @include webkit(box-shadow,0 3px 16px 0 rgba(0, 0, 0, .1));
        @include webkit(transition, all .5s ease 0s);
    }

    .head-icon {
        padding: 0 32px;

        svg {
            margin-bottom: -6px;
            font-size: 25px;
            cursor: pointer;
        }
    }

    .user-info {
        height: 100%;
        padding: 0 32px;
        border-right: 1px solid #ededed;

        + .head-icon {
            padding: 0 28px;
        }
    }

    .open{
        #header-wrap{
            left: $navMenu;
        }
    }
    .close{
        #header-wrap{
            left: $navMenuMin;
        }
    }
</style>
