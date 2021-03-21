<template>
 <div class="good-content" ref="good-content">
      <div>
       <div class="good-content-items" v-for="(item,index) in right" :key="index">
            <p>{{item.title}}</p>
            <div class="good-content-item">
                <ul>
                  <li v-for="(item2,index2) in item.goods" :key="index2">
                      <div><img src="../../../assets/images/common/lazyImg.jpg" :data-echo="item2.image" alt=""></div>
                      <p>{{item2.title}}</p>
                  </li>
                </ul>
            </div>
       </div>
       <div v-show="right == 0" class="no-data">
         没有数据
       </div>
      </div>    
  </div>
 
</template>

<script>
import IScroll from '../../../assets/js/libs/iscroll'
import {mapActions,mapState} from 'vuex'
export default {
  methods: {
    // 阻止默认事件
    scrollPreventDefault(e) {
      e.preventDefault()
    }
  },
  created(){
    this.getClassifyRight({cid:this.$route.query.cid,success:() => {
      this.$nextTick(() => {
        // 重新计算位置
        this.Mycroll.refresh()
        // 当点击其他类型的时候，回到顶部 
        this.Mycroll.scrollTo(0,0)
        // 图片懒加载  只这样写会出现一个问题 后面的图片不加载 需要对ISscroll监听事件来解决
        this.$utils.lazyImg()
      })
    }})
  },
  computed:{
    ...mapState({
      right:(state) => state.goods.right
    })
  },
  methods:{
    // 辅助函数
    ...mapActions({
      getClassifyRight:'goods/getClassifyRight'
    }),
    // 阻止默认事件
     scrollPreventDefault(e) {
      e.preventDefault()
    }
  },
  mounted() {
    // 滚动
    this.$refs['good-content'].addEventListener('touchmove',this.scrollPreventDefault)
    this.Mycroll = new IScroll(this.$refs['good-content'],{
      scrollX:true,
      scrollY:true,
      preventDefault:false
    }),
    this.Mycroll.on('scrollEnd',() => {
        this.$utils.lazyImg()
    })
  },
  beforeDestroy() {
    // 解除绑定
      this.$refs['good-content'].removeEventListener('touchmove',this.scrollPreventDefault)
  },
  // url更新 页面没有发生变化 获取数据 用此钩子函数 beforeRouteUpdate(to,from,next){}  必须最后调用一下next()
  beforeRouteUpdate(to,from,next) {
    this.getClassifyRight({cid:to.query.cid,success:() => {
      this.$nextTick(() => {
        // 重新计算位置
        this.Mycroll.refresh()
        // 当点击其他类型的时候，回到顶部 
        this.Mycroll.scrollTo(0,0)
        // 图片懒加载
        this.$utils.lazyImg()
      })
    }})
    next()
  }
}
</script> 

<style scoped>
.good-content {width: calc(100% - 2rem);height: 100%;overflow: hidden;position: relative;z-index: 1;}
.good-content-items {width: 100%;}
.good-content-items p {margin: 5px;font-size: 0.3rem;}
.good-content-items .good-content-item {width: 100%;background-color: #fff;}
.good-content-items .good-content-item ul {width: 100%;display: flex;flex-wrap: wrap;}
.good-content-items .good-content-item li {display: block;width: 33%;height: 2rem;font-size: 0.2rem;box-sizing: border-box;}
.good-content-items .good-content-item li p {font-size: 0.2rem;text-align: center;overflow: hidden;width: 1.3rem;height: 0.26rem;padding: 0 0.1rem;}
.good-content-items .good-content-item li div {width: 1.3rem;height: 1.2rem;margin: 0.1rem auto;}
.good-content-items .good-content-item li img {width: 100%;height: 100%}
.no-data {width: 100%;height: 2rem;text-align: center;margin-top: 2rem;}
</style>