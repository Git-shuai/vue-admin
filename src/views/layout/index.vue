<template>
    <div :class="[menuStatus?'close':'open']">
        <LayoutHeader/>
        <LayoutNav/>
        <LayoutMain/>
    </div>
</template>

<script>
    //导入组件
    //*************************************************************************************************
    import LayoutHeader from './components/header';
    import LayoutNav from './components/nav';
    import LayoutMain from './components/main';
    import { computed} from "@vue/composition-api";
    //*************************************************************************************************
    export default {
        name: "index",
        components: {LayoutHeader, LayoutNav, LayoutMain},
        setup(props, {root}) {
            const menuStatus = computed(() => root.$store.state.App.isCollapse);
            return {
                menuStatus
            }
        }
    }
</script>

<style lang="scss" scoped>
</style>
