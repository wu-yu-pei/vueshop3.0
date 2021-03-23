<template>
    <div class='search-component'>
        <div class='search-header'>
            <div class='close' @click="show.show=false"></div>
            <div class='search-wrap'>
                <div class='search-input-wrap'>
                    <input type="text" class='search' placeholder="请输入宝贝名称" v-model="keyword" />
                </div>
                <button type="button" class='search-btn' @click="goSearch()"></button>
            </div>
        </div>
        <div class='search-main'>
            <div class='search-title-wrap' v-if="historyKeyword.length > 0">
                <div class='search-title'>最近搜索</div>
                <div class='bin' @click="clear()"></div>
            </div>
            <div class='search-keywords-wrap'>
                <div class='keywords' v-for="(item,index) in historyKeyword" :key="index" @click="goSearch(item)">{{item}}</div>
            </div>
        <div class='search-main'>
            <div class='search-title-wrap'>
                <div class='search-title'>热门搜索</div>
            </div>
            <div class='search-keywords-wrap'>
                <div class='keywords' v-for="(item2,index2) in hot" :key="index2" @click="goSearch(item2.title)">{{item2.title}}</div>
            </div>
        </div>
    </div>
    </div>
</template>

<script>
    import Vue from 'vue'
    import {mapMutations,mapState,mapActions} from 'vuex';
    import { Dialog } from 'vant';
    Vue.use(Dialog)
    export default {
        name: "my-search",
        data(){
            return {
                // 与input双向绑定
                keyword:""
            }
        },
        created() {
            this.keywords =this.historyKeyword? this.historyKeyword :[],
            // 获取热门搜索数据
            this.gethot()
        },
        computed:{
            // 辅助函数 拿vuex里面的值
            ...mapState({
                historyKeyword:state => state.keywords.historyKeyword,
                hot:state => state.keywords.hot
            })
        },
        props:{
            // 父子组件传值 使用引用数据类型 可以避免一些复杂的操作
            show:{
                type:Object,
                default:{}
            },
            isLocal:{
                type:Boolean,
                default:false
            }
        },
        methods:{
            // 辅助函数 直接调用vuex里面的方法
            ...mapMutations({
                SET_HISTORYKEYWORD:'keywords/SET_HISTORYKEYWORD',
                CLEAR_HISTORYKEYWORD:'keywords/CLEAR_HISTORYKEYWORD'
            }),
            ...mapActions({
                gethot:'keywords/gethot'
            }),
            // 将搜索数据添加到历史记录中
            goSearch(keyword) {
                // 此表达式比if语句用起来更加方便 性能还好
                // this.keyword = keyword
                let tempkeyword = keyword || this.keyword || ''
                if(tempkeyword.match(/^\s*$/)) {
                    // 正则匹配 如果是空格 则直接结束函数 不执行
                    return 0;
                }
                else if(this.keywords.length > 0) {
                    for(let i = 0;i<this.keywords.length;i++) {
                        if(tempkeyword == this.keywords[i]) {
                            this.keywords.splice(i--,1)
                        }
                    }
                } 
                this.keywords.unshift(tempkeyword)
                // 把值传到vueX里面 
                this.SET_HISTORYKEYWORD({historyKeyword:this.keywords})
               
                // 跳转到 搜索页面
                if(this.isLocal) {
                    this.$router.replace('/search?keyword='+tempkeyword)
                }else {
                    console.log(2);
                    this.$router.push('/search?keyword='+tempkeyword)
                }
                //输入完之后清空输入框
                this.keyword = ''
                this.show.show = false
            },
            clear() {
                Dialog.confirm({
                // title: '标题',
                message: '确认删除吗',
                })
                .then(() => {
                    this.keywords = []
                    this.CLEAR_HISTORYKEYWORD()
                })
                .catch(() => {

                });
            }
        }
    }
</script>

<style scoped>
    .search-component{width:100%;height:100%;position: fixed;z-index:99;left:0px;top:0px;background-color:#ffffff; opacity: 7;}
    .search-component .search-header{width:100%;height:1rem;border-bottom:#EFEFEF solid 1px;display:flex;display:-webkit-flex;align-items: center;-webkit-align-items: center;}
    .search-component .search-header .close{width:0.5rem;height: 0.5rem;background-image:url("../../assets/images/common/search_x.png");background-size:100%;background-repeat: no-repeat;background-position: center;margin-left:0.2rem;margin-right:0.2rem;}
    .search-component .search-header .search-wrap{width:78%;height:0.64rem;border:#B2B2B2 solid 1px;border-radius: 0.1rem;display:flex;display:-webkit-flex;align-items: center;-webkit-align-items: center;}
    .search-component .search-header .search-wrap .search-input-wrap{width:85%;height:100%;border-right: #B2B2B2 solid 1px;}
    .search-component .search-header .search-wrap .search{width:80%;height:93%;margin-left:0.2rem;font-size:0.28rem;}
    .search-component .search-header .search-wrap .search-btn{width:0.5rem;height:0.5rem;background-image:url("../../assets/images/common/search_icon.png");background-size:100%;background-repeat: no-repeat;background-position: center;background-color:#ffffff;border:0px none;outline: none;margin-left:0.15rem;}

    .search-component .search-main{width:100%;margin-top:0.2rem;}
    .search-component .search-main .search-title-wrap{width:auto;display:flex;display:-webkit-flex;justify-content: space-between;-webkit-justify-content: space-between;padding-left:0.4rem;padding-right:0.4rem;}
    .search-component .search-main .search-title-wrap .search-title{width:auto;font-size:0.28rem;}
    .search-component .search-main .search-title-wrap .bin{width:0.4rem;height:0.4rem;background-image:url('../../assets/images/common/bin.png');background-size:100%;background-repeat: no-repeat;background-position: center;}
    .search-component .search-main .search-keywords-wrap{width:auto;display:flex;display:-webkit-flex;justify-content: flex-start;-webkit-justify-content: flex-start;padding-left:0.4rem;padding-right:0.4rem;margin-top:0.3rem;flex-wrap: wrap;-webkit-flex-wrap: wrap;}
    .search-component .search-main .search-keywords-wrap .keywords{width:26%;height:0.6rem;color:#717376;border:#EFEFEF solid 1px;border-radius: 0.64rem;font-size:0.28rem;text-align: center;overflow:hidden;line-height:0.6rem;margin-right:1.3%;margin-left:1.3%;margin-bottom:0.2rem;padding-left:0.1rem;padding-right:0.1rem;}

</style>
