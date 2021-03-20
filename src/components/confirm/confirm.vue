<template>
    <div class="mask" v-if="isShow">
        <div class="confirm-wrap">
            <div class="message">{{msg}}</div>
            <div class="handle">
                <div class="btn" v-for="(item,index) in btns" :key="index" @click="handleBtn(index)">{{item.text}}</div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "my-confirm",
        data(){
            return {
                msg:"",
                btns:[],
                isShow:true
            }
        },
        methods:{
            handleBtn(index){
                if (this.btns[index].onPress){
                    this.btns[index].onPress();
                }
                this.isShow=false;
            }
        }
    }
</script>

<style scoped>
    .mask{width:100%;height:100%;position: fixed;z-index:99;left:0px;top:0px;background-color:rgba(0,0,0,0.6)}
    .confirm-wrap{width:400px;height:200px;background-color:#FFFFFF;position:absolute;z-index:1;left:50%;top:50%;transform: translate(-50%,-50%);border-radius: 5px;}
    .confirm-wrap .message{text-align: center;margin-top:45px;font-size:16px;}
    .confirm-wrap .handle{width:100%;display: flex;justify-content: space-between;margin-top:50px;padding:0px 40px;box-sizing: border-box;}
    .confirm-wrap .handle .btn{font-size:16px;cursor:pointer;}
</style>