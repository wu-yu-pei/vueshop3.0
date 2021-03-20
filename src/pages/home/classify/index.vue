<template>
    <div>
        <button type="button" @click="$router.go(-1)">返回</button>
        <ul>
            <li @click="goPage('/classify?cid=1')">潮流女装</li>
            <li @click="goPage('/classify?cid=2')">品牌男装</li>
            <li @click="goPage('/classify?cid=3')">电脑办公</li>
        </ul>
        <div class="box" v-show="isShow" >
            <div class="close" @click="isShow=false">x</div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "classify",
        data(){
            return {
                isShow:true
            }
        },
        methods:{
            goPage(url){
                //this.$router.replace('/skip');
                //setTimeout(()=>{
                    this.$router.replace(url);
                //});
            }
        },
        created() {
            console.log(this.$route.query.cid);
            this.count=0;
            this.timer = setInterval(()=>{
                console.log(++this.count);
            },1000)
        },
        beforeRouteUpdate(to,from,next){
            console.log(to.query.cid);
            next();
        },
        beforeRouteLeave(to,from,next){
            // clearInterval(this.timer);
            if (this.isShow){
                alert('请关闭窗口再离开页面');
                next(false);
            } else {
                next();
            }
        },
        destroyed() {
            clearInterval(this.timer);
        }
    }
</script>

<style scoped>
    .box{width:100px;height:100px;position: fixed;z-index:10;left:50%;top:50%;transform: translate(-50%,-50%);background-color:#0000FF}
    .box .close{font-size:20px;color:#FFFFFF;position:absolute;z-index:1;right:0px;top:0px;cursor:pointer}
</style>