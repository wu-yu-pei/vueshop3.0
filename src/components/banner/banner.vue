<template>
    <div class="banner-wrap" @mouseover="stop()" @mouseout="play()">
        <transition-group name="banner">
            <div class="slide" v-for="(item,index) in data" :key="index" v-show="item.checked"><img :src="item.image" alt=""></div>
        </transition-group>
        <div class="spot-wrap">
            <div :class="{spot:true, active:item.checked}" v-for="(item,index) in data" :key="index" @click="changeImg(index)"></div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "my-banner",
        props:{
            images:{
                type:Array,
                required:true
            }
        },
        data(){
            return {
                data:[]
            }
        },
        created(){
            this.index =0;
            this.play();
        },
        destroyed(){//页面离开清除定时器
            this.stop();
        },
        methods:{
            changeImg(index){
                this.index=index;
                if (this.data.length>0){
                    for (let i=0;i<this.data.length;i++){
                        if (this.data[i].checked){
                            this.data[i].checked=false;
                            break;
                        }
                    }
                    this.data[this.index].checked=true;
                    this.$set(this.data,this.index, this.data[this.index]);
                }
            },
            //停止动画
            stop(){
                clearInterval(this.timer);
            },
            //开始执行动画
            play(){
                this.timer=setInterval(()=>{
                    if (this.index<this.data.length-1){
                        this.index++;
                    } else{
                        this.index=0;
                    }
                    this.changeImg(this.index);
                },3000)
            }
        },
        watch:{
            images:{//监听images解决异步问题
                handler(val) {
                    this.data=[...val]; //使用浅拷贝解决引用类型的问题
                    if(this.data.length>0){
                        for (let i=0;i<this.data.length;i++){
                            if (i===0){
                                this.data[i].checked=true;
                            } else{
                                this.data[i].checked=false;
                            }

                        }
                    }
                }
            }
        }
    }
</script>

<style scoped>
    .banner-wrap{width:100%;height:100%;position: relative;z-index:1;}
    .banner-wrap .slide{width:100%;height:100%;position: absolute;z-index:1;left:0px;top:0px;}
    .banner-wrap .slide img{width:100%;height:100%;}
    .banner-wrap .spot-wrap{width:auto;height:auto;position: absolute;z-index:1;left:50%;bottom:8%;transform: translateX(-50%)}
    .banner-wrap .spot-wrap .spot{width:30px;height:8px;background-color:rgba(0,0,0,0.6);display:inline-block;margin:0px 3px;cursor: pointer;}
    .banner-wrap .spot-wrap .spot.active{background-color:rgba(255,255,255,0.6)}

    .banner-enter-active,.banner-leave-active{transition: 1s;}
    .banner-enter{opacity:0}
    .banner-enter-to{opacity:1}
    .banner-leave{opacity:1}
    .banner-leave-to{opacity:0}
</style>