import {loginData,safeUserData,safeOutLoginData} from "../../../api/user";
let modules={
    namespaced:true,
    state:{
        users:[
            {name:"张三",age:8},
            {name:"李四",age:18},
            {name:"王五",age:28},
            {name:"赵六",age:38}
        ],
        uid:localStorage['uid']?localStorage['uid']:"",
        nickname:localStorage['nickname']?localStorage['nickname']:"",
        isLogin:localStorage['isLogin']?Boolean(localStorage['isLogin']):false,
        authToken:localStorage["authToken"]?localStorage["authToken"]:""
    },
    getters:{//有时候我们需要从 store 中的 state 中派生出一些状态，例如对列表进行过滤并计数
        getUsers(state){
            // console.log(state);
            let aUser=state.users.filter((item)=>{
                return item.age>=18
            })
            // console.log(aUser);
            return aUser;
        }
    },
    mutations:{
        ["SET_LOGIN"](state,payload){
            state.uid=payload.uid;
            state.nickname=payload.nickname;
            state.isLogin=payload.isLogin;
            state.authToken=payload.authToken;
            localStorage["uid"]=payload.uid;
            localStorage['nickname']=payload.nickname;
            localStorage['isLogin']=payload.isLogin;
            localStorage["authToken"]=payload.authToken;
        },
        ["OUT_LOGIN"](state){
            state.uid="";
            state.nickname="";
            state.isLogin=false;
            state.authToken="";
            localStorage.removeItem("uid");
            localStorage.removeItem("nickname");
            localStorage.removeItem("isLogin");
            localStorage.removeItem("authToken");
        }
    },
    actions:{
        //会员登录
        login(conText,payload){
            loginData(payload).then(res=>{
                // console.log(res);
                if (res.code===200){
                    conText.commit("SET_LOGIN",{uid:res.data.uid,nickname:res.data.nickname,isLogin:true,authToken:res.data.auth_token});
                }
                if (payload.success) {
                    payload.success(res)
                }
            })
        },
        //安全退出
        outLogin(conText){
            safeOutLoginData({uid:conText.state.uid}).then(res=>{
                // console.log(res);
            });
            conText.commit("OUT_LOGIN");
        },
        //会员安全认证
        safeUser(conText,payload){
            // console.log(conText.state.uid);
            safeUserData({uid:conText.state.uid,auth_token:conText.state.authToken}).then(res=>{
                // console.log(res);
                conText.commit("OUT_LOGIN");
                if (payload.success){
                    payload.success(res)
                }
            });
        }
    }
}
export default modules;