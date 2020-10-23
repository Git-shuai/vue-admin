<template>
    <div>文章详情</div>
</template>

<script>
    import {ref, reactive, watch, onMounted} from "@vue/composition-api";

    export default {
        name: "infoDetailed",
        setup(props,{root}) {
            let id=root.$route.params.id;


            const detailedData = reactive({});


            return {
                detailedData
            }
        }
    }
</script>

<style scoped>

</style>
