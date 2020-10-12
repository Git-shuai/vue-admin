<template>
    <div id="nav-wrap">
        <div class="logo">
            <img src="../../../assets/logo.png" height="66" width="150"/>
        </div>

        <el-menu class="el-menu-vertical-demo"
                 @open="handleOpen" @close="handleClose"
                 :collapse="isCollapse" background-color="transparent" text-color="#fff"
                 router>

            <template v-for="(item,index) in routes">
                <el-submenu v-if="!item.hidden" :key="item.id" :index="index+''">
                    <!--一级菜单-->
                    <template slot="title">
                        <svg-icon :iconClass="item.meta.icon" :className="item.meta.icon"/>
                        <span slot="title">{{item.meta.name}}</span>
                    </template>
                    <el-menu-item v-for="subItem in item.children" :key="subItem.id" :index="subItem.path">
                        {{subItem.meta.name}}
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


            // console.log(plusOne)
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
        svg {
            font-size: 20px;
            margin-right: 8px;
        }
    }
    .logo {
        img {
            width: 70px;
            margin: 25px auto 25px;
        }
    }
</style>
