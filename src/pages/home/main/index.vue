<template>
    <div>
        <router-view></router-view>
        <div class="bottom-nav">
            <ul :class="{home:true, active:homeStyle}" @click="goPage('/index')">
                <li></li>
                <li>首页</li>
            </ul>
            <ul :class="{cart:true, active:cartStyle}" @click="goPage('/cart')">
                <li></li>
                <li>购物车</li>
            </ul>
            <ul :class="{my:true, active:myStyle}" @click="goPage('/my')">
                <li></li>
                <li>我的</li>
            </ul>
        </div>
    </div>
</template>

<script>
    export default {
        name: "home",
        data(){
            return {
                homeStyle:true,
                cartStyle:false,
                myStyle:false
            }
        },
        methods:{
            goPage(url){
                this.$router.replace(url);
            },
            changeStyleNav(name){
                switch (name) {
                    case "index":
                        this.homeStyle=true;
                        this.cartStyle=false;
                        this.myStyle=false;
                        break;
                    case "cart":
                        this.homeStyle=false;
                        this.cartStyle=true;
                        this.myStyle=false;
                        break;
                    case "my":
                        this.homeStyle=false;
                        this.cartStyle=false;
                        this.myStyle=true;
                        break;
                    default:
                        this.homeStyle=true;
                        this.cartStyle=false;
                        this.myStyle=false;
                        break;
                }
            }
        },
        created(){
            document.title=this.$route.meta.title;
            this.changeStyleNav(this.$route.name);
        },
        beforeRouteUpdate(to, from, next) {
            // console.log(to);
            document.title=to.meta.title;
            this.changeStyleNav(to.name);
            next();
        },
        activated(){
            document.title=this.$route.meta.title;
            this.changeStyleNav(this.$route.name);
        }
    }
</script>

<style scoped>
    .bottom-nav{width:100%;height:1.2rem;background-color:#FFFFFF;box-shadow: 0 0 10px #efefef;position: fixed;z-index:10;left:0px;bottom:0px;display: flex;justify-content: space-between;align-items: center;padding:0px 0.5rem;box-sizing: border-box;}
    .bottom-nav ul{width:1rem;}
    .bottom-nav ul li:nth-child(1){width:0.6rem;height:0.6rem;margin:0 auto;}
    .bottom-nav ul li:nth-child(2){font-size:0.28rem;text-align: center;}
    .bottom-nav ul.active li:nth-child(2){color:#eb1625}

    .bottom-nav ul.home li:nth-child(1){background-image:url("../../../assets/images/home/main/home1.png");background-size:100%;background-repeat: no-repeat;background-position: center}
    .bottom-nav ul.home.active li:nth-child(1){background-image:url("../../../assets/images/home/main/home2.png");background-size:100%;background-repeat: no-repeat;background-position: center}

    .bottom-nav ul.cart li:nth-child(1){background-image:url("../../../assets/images/home/main/cart1.png");background-size:100%;background-repeat: no-repeat;background-position: center}
    .bottom-nav ul.cart.active li:nth-child(1){background-image:url("../../../assets/images/home/main/cart2.png");background-size:100%;background-repeat: no-repeat;background-position: center}

    .bottom-nav ul.my li:nth-child(1){background-image:url("../../../assets/images/home/main/my1.png");background-size:100%;background-repeat: no-repeat;background-position: center}
    .bottom-nav ul.my.active li:nth-child(1){background-image:url("../../../assets/images/home/main/my2.png");background-size:100%;background-repeat: no-repeat;background-position: center}
</style>