<template>
    <div>
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
    //*************************************************************************************************
    export default {
        name: "index",
        components: {LayoutHeader, LayoutNav, LayoutMain},
        setup() {

        }
    }
</script>

<style lang="scss" scoped>
</style>
