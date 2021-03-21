<template>
  <div class="classify">
      <div class="classify-top">
        <div class="back" @click="$router.go(-1)"></div>
        <div class="search"><input type="text" name="" id="" placeholder="请输入宝贝名称" @click="searchShow.show = true"></div>
      </div>
      <div class="classify-main">
        <div class="scroll-classify" ref="scroll-classify">
          <div>
          <div v-for="(item,index) in classify" ref="item" :key="index" :class="{active:item.active}" @click="goPage('/good/classify/item?cid='+item.cid+'',index)">{{item.title}}</div>
          </div>
        </div>
        <router-view>
          <div>
            
          </div>
        </router-view>
      </div>
      <my-search :show="searchShow" v-show="searchShow.show"></my-search>
  </div>
</template>

<script>
import IScroll from '../../../assets/js/libs/iscroll'
import {mapActions,mapMutations,mapState} from 'vuex'
import MySearch from "../../../components/search/index.vue"

export default {
  data(){
    return {
       // 给子组件穿传的值
      searchShow:{show:false}
    }
  },
  components:{
    // 搜索组件
    MySearch
  },
  created() {
    this.cid = this.$route.query.cid?this.$route.query.cid:''
    // 获取数据
    this.getClassify({success:() => {
      this.$nextTick(() => {
        // 重新计算高度
        this.myScroll.refresh()
        // cid
        if(this.classify>0 && this.cid){
          let i = 0
          for(;i<this.classify.length;i++) {
          if(this.classify[i].cid == this.cid ) {
            break
          }
        }
          this.setselect({index:i})
        }else {
          // this.setselect({index:0})
          this.goPage('/good/classify/item?cid='+this.classify[0].cid+'',0)
        }
      })
    }})
  },
  mounted() {
    // 修改显示标签
    document.title = this.$route.meta.title
    // scroll
    this.$refs['scroll-classify'].addEventListener('touchmove',this.scrollPreventDefault)
    this.myScroll = new IScroll(this.$refs['scroll-classify'],{
      scrollX:true,
      scrollY:true,
      preventDefault:false
    })
  },
  methods: {
    // 辅助函数 便于使用vueX
    ...mapActions({
      getClassify:'goods/getClassify'
    }),
    ...mapMutations({
      setselect:'goods/SET_SELLECT'
    }),
    // 阻止默认事件
    scrollPreventDefault(e) {
      e.preventDefault()
    },
    //点击改变颜色 添加动画
    changeColor(index){
      // 添加动画效果
      // let height = document.querySelector('body > div > div > div.classify-main > div.scroll-classify > div > div:nth-child(1)').offsetHeight  //在vue 中不建议这么写 vue官方推荐用this.$refs()来获取dom
      let height = this.$refs['item'][0].offsetHeight
      let helfheight = parseInt(this.$refs['scroll-classify'].offsetHeight/3)
      let bottomheight = parseInt(this.$refs['scroll-classify'].scrollHeight - height*index)
      if(height*index > helfheight &&  bottomheight>this.$refs['scroll-classify'].offsetHeight) {
         this.myScroll.scrollTo(0,-height*index,1000)
      }
      this.setselect({index:index})
    },
    goPage(url,index) {
      this.$router.replace(url)
      this.changeColor(index)
    }
  },
  computed:{
    ...mapState({
      classify:(state) =>state.goods.classify
    })
  },
  beforeDestroy() {
    // 接触绑定  beforeDestroy钩子函数可以获取DOM
    this.$refs['scroll-classify'].removeEventListener('touchmove',this.scrollPreventDefault)
  },
  destroyed() {
    // destroyed钩子函数不可以获取钩子函数
  },
}
</script>

<style scoped>
.classify {width: 100vw;height: 100vh;}
.classify-top {width: 100%;height: 1rem;border-bottom: 1px solid #ccc;display: flex;;z-index:2;padding: 2px 6px;box-sizing: border-box;background-color: #fff;position: fixed;top: 0;left: 0;right: 0;}
.classify-top .back {width: 0.9rem;height: 100%;padding: 4px;box-sizing: border-box; background: url("../../../assets/images/common/right_arrow.png") no-repeat;background-size: 70%;transform: rotate(180deg);background-position: center;}
.classify-top .search {width: 80%;padding: 0.15rem;height: 100%;box-sizing: border-box;}
.classify-top .search input {width: 100%;border: 1px solid #000;height: 0.5rem;border-radius: 0.1rem;padding-left: 0.2rem;font-size: 0.3rem;}
.classify-main {width: 100%;height: calc(100% - 1rem);display: flex;justify-content: space-between;margin-top: 1rem;} 

/* .parent{overflow: auto;position: relative;z-index: 1;height:calc(100% - 1rem);width: 1.7rem;} */
.classify-main .scroll-classify {width: 1.7rem;border-right: 1px solid #ccc;background-color: #fff;height:100%;overflow: hidden;}
.classify-main .scroll-classify div div{width: 100%;height:100%;padding:0 0.1rem;text-align: center;height: 0.9rem;line-height: 0.9rem;box-sizing: border-box;border-bottom: 1px solid #ccc;font-size: 0.3rem;}
.active {color: red;}

</style>