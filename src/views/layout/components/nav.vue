<template>
    <div id="nav-wrap">
        <div class="logo">
            <img src="../../../assets/logo.png" height="66" width="150"/>
        </div>

        <el-menu class="el-menu-vertical-demo"
                 :collapse="isCollapse" background-color="#344a5f" text-color="#fff"
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
    import {reactive, computed, ref, onMounted} from "@vue/composition-api";

    export default {
        name: "navMenu",
        setup(props, {root}) {
            //定义数据
            //***************************************************************************************************
            const isCollapse = computed(() => root.$store.state.App.isCollapse);
            const routes = reactive(root.$router.options.routes);

            //vuex
            // console.log(root.$store.state.isCollapse);
            // root.$store.commit('SET_isCollapse',true);
            // console.log(root.$store.state.isCollapse);
            //***************************************************************************************************

            //自定义定义方法
            //***************************************************************************************************



            //***************************************************************************************************


            //return 数据
            //***************************************************************************************************
            return {
                //数据
                isCollapse,
                routes,
                //方法
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
        @include webkit(transition, all .5s ease 0s);
        svg {
            font-size: 20px;
            margin-right: 8px;
        }
    }

    .logo {
        img {
            width: 50px;
            margin: 25px auto 25px;
        }
    }

    .open{
        #nav-wrap{
            width: $navMenu;
        }
    }
    .close{
        #nav-wrap{
            width: $navMenuMin;
        }
    }
</style>
