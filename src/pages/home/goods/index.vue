<template>
    <div>
        <button type="button" @click="$router.go(-1)">返回</button>
        <ul>
            <li @click="goPage('/goods/item')">商品</li>
            <li @click="goPage('/goods/details')">详情</li>
            <li @click="goPage('/goods/review')">评价</li>
        </ul>
        <div>
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
    export default {
        name: "goods",
        methods:{
            goPage(url){
                this.$router.replace(url);
            }
        }
    }
</script>

<style scoped>

</style>