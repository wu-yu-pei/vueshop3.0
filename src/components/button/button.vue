<template>
    <button :type="type" class="btn" @click="handleClick()"><slot></slot></button>
</template>

<script>
    export default {
        name: "my-button",
        props:{
            type:{
                type:String,
                default:"button"
            }
        },
        methods:{
            handleClick(){
                this.$emit("click");
            }
        }
    }
</script>

<style scoped>
    .btn{background-color: #0000FF;font-size:14px;color:#FFFFFF;outline: none;border-radius: 3px;border:0 none;}
</style>