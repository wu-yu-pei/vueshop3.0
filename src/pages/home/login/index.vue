<template>
    <div>
        用户名：<input type="text" v-model="username" placeholder="请输入用户名" /><br>
        密码：<input type="text" placeholder="请输入密码" v-model="password" /><br>
        <button type="button" @click="doLogin()">登录</button>
    </div>
</template>

<script>
    // import {request} from '../../assets/js/utils/request';
    import {mapActions} from "vuex";
    export default {
        name: "login",
        data(){
            return {
                username:"",
                password:""
            }
        },
        methods:{
            ...mapActions({
                login:"user/login"
            }),
            doLogin(){
                if (this.username.match(/^\s*$/)){
                    alert("请输入用户名");
                    return;
                }
                if (this.password.match(/^\s*$/)){
                    alert("请输入密码");
                    return;
                }
                this.login({cellphone:this.username,password:this.password,success:(res)=>{
                        // console.log(res);
                        if (res.code===200){
                            this.$router.go(-1)
                        } else{
                            alert(res.data);
                        }
                    }});
                // request(process.env.VUE_APP_API+"/home/user/pwdlogin?token=1ec949a15fb709370f","post",{cellphone:this.username,password:this.password}).then(res=>{
                //     // console.log(res);
                //     if (res.code===200){
                //         localStorage['uid']=res.data.uid;
                //         localStorage['nickname']=res.data.nickname;
                //         localStorage['isLogin']=true;
                //         this.$router.go(-1);
                //     } else{
                //         alert(res.data);
                //     }
                // })
            }
        }
    }
</script>

<style scoped>

</style>