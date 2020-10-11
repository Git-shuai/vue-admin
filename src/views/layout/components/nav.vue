<template>
    <div id="nav-wrap">
        <el-menu class="el-menu-vertical-demo"
                 @open="handleOpen" @close="handleClose"
                 :collapse="isCollapse" background-color="transparent" text-color="#fff"
                  router >

            <template v-for="(item,index) in routes">
                <el-submenu v-if="!item.hidden" :key="item.id" :index="index">
                    <!--一级菜单-->
                    <template slot="title">
                        <i class="el-icon-location"></i>
                        <span slot="title">{{item.meta.name}}</span>
                    </template>
                    <el-menu-item v-for="subItme in item.children" :key="subItme.id" :index="subItme.path">
                        {{subItme.meta.name}}
                    </el-menu-item>
                </el-submenu>
            </template>
        </el-menu>
    </div>
</template>

<script>
    //导入
    import {reactive, ref, onMounted} from "@vue/composition-api";

    export default {
        name: "navMenu",
        setup(props, {root}) {
            //定义数据
            //***************************************************************************************************
            const isCollapse = ref(false);
            const routes = reactive(root.$router.options.routes);
            console.log(routes)
            //***************************************************************************************************

            //自定义定义方法
            //***************************************************************************************************
            const handleOpen = ((key, keyPath) => {
                console.log(key, keyPath);
            });
            const handleClose = ((key, keyPath) => {
                console.log(key, keyPath);
            });
            //***************************************************************************************************


            //return 数据
            //***************************************************************************************************
            return {
                //数据
                isCollapse,
                routes,

                //方法
                handleClose,
                handleOpen
            };
            //***************************************************************************************************

        }
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
