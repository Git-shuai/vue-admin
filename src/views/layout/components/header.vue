<template>
    <div id="header-wrap">
        <div class="pull-left head-icon" @click="navMenuStatus">
            <svg-icon icon-class="menu" className="menu"></svg-icon>
        </div>
        <div class="pull-right">
            <div class="pull-left user-info">
                {{username}}
            </div>
            <div class="pull-left head-icon" @click="exit">
                <svg-icon icon-class="exit" className="exit"></svg-icon>
            </div>
        </div>
    </div>
</template>

<script>
    import {reactive, computed, ref, onMounted} from "@vue/composition-api";

    export default {
        name: "headerMenu",
        setup(props, {root}) {
            const username = computed(() => root.$store.state.Login.username);

            const navMenuStatus = (() => {
                root.$store.commit('App/SET_isCollapse');
            });
            //退出登录


            const exit = (() => {
                root.$confirm('确定要退出吗?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    root.$message({message: "注销成功", type: 'success'});
                    root.$router.push({
                        name: 'Login'
                    })
                }).catch(() => {
                    root.$message({
                        type: 'info',
                        message: '已取消注销'
                    });
                });
            });
            return {
                navMenuStatus,
                username,
                exit
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
        @include webkit(box-shadow, 0 3px 16px 0 rgba(0, 0, 0, .1));
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

    .open {
        #header-wrap {
            left: $navMenu;
        }
    }

    .close {
        #header-wrap {
            left: $navMenuMin;
        }
    }
</style>
