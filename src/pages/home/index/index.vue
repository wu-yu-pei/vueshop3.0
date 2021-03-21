<template>
  <div class="page">
    <div :class="{header:true,scroll:isScroll}">
      <div class="classify-icon" @click="goPage('/good/classify')"></div>
      <div class="search-wrap" @click="searchShow.show = true">
        <div class="search-icon"></div>
        <div class="text">请输入宝贝名称</div>
      </div>
      <div class="login">登录</div>
    </div>
    <div class="banner-wrap">
      <div class="swiper-container" ref="swiper-container">
        <div class="swiper-wrapper">
        <div class="swiper-slide" v-for="(item,index) in swiper" :key="index">
          <img :src="item.image" alt="">
        </div>
      </div>
      <div class="swiper-pagination" ref="swiper-pagination"></div>
    </div>
    </div>
    <div class="quick-nav">
      <ul class="item" v-for="(item,index) in nav" :key="index">
        <li>
          <!-- 图片懒加载 src里存放静态图片 data-echo存放真实的图片当触发到指定事件后在加载图片 -->
          <img src="../../../assets/images/common/lazyImg.jpg" :data-echo="item.image" alt="" />
        </li>
        <li>{{item.title}}</li>
      </ul>
    </div> 
    <!-- v-for 和 v-if 尽量不要同时出现写在同一个标签中 如果有必要 可以向=像现在这样 在template里面写v-for 内部标签写div 否则会有性能问题 -->
    <template v-for="(item,index) in goods">
    <div class="goods-main"  :key="index" v-if="(index+1)%2 !== 0">
      <div :class="'classify-name color-'+index">—— {{item.title}} ——</div>
      <div class="goods-row-1">
        <div class="goods-column">
          <div class="goods-title">
             <!-- 在读取数组的时候会有如果网速过慢 会报错 以下是解决方案 -->
             <!-- 一 三元运算符 会有性能问题 -->
            <!-- {{item.items[0]?item.items[0].title : ''}} -->
            <!-- 二 使用与字符 更简便 性能好  -->
            {{item.items[0] && item.items[0].title}}
          </div>
          <div class="goods-tip">精品打折</div>
          <div :class="'goods-price bg-color-'+index">{{item.items[0].price}}元</div>
          <div class="goods-image">
            <img src="../../../assets/images/common/lazyImg.jpg" :data-echo="item.items[0].image" alt="" />
          </div>
        </div>
        <div class="goods-column">
          <div class="goods-list">
            <div class="goods-list-title">
             {{item.items[1]?item.items[1].title : ''}}
            </div>
            <div class="goods-list-tip">品质精挑</div>
            <div class="goods-list-image">
              <img src="../../../assets/images/common/lazyImg.jpg"
                :data-echo="item.items[1].image"
                alt=""
              />
            </div>
          </div>
          <div class="goods-list">
            <div class="goods-list-title">
              {{item.items[2]?item.items[2].title : ''}}
            </div>
            <div class="goods-list-tip">品质精挑</div>
            <div class="goods-list-image">
              <img src="../../../assets/images/common/lazyImg.jpg"
                :data-echo="item.items[2].image"
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
      <div class="goods-row-2">
        <!-- 用slice 方法 截取数组 从3开始截取到7  -->
        <div class="goods-list" v-for="(item2,index2) in item.items.slice(3,7)" :key="index2">
          <div class="goods-title">
            {{item2.title}}
          </div>
          <div class="goods-image">
            <img src="../../../assets/images/common/lazyImg.jpg" :data-echo="item2.image" alt="" />
          </div>
          <div class="price">¥{{item2.price}}</div>
          <div class="price line">¥{{item2.price*1.5}}</div>
        </div>
      </div>
    </div>
    <div class="goods-main" v-else :key="index">
      <div class="classify-name color-1">—— 品牌男装 ——</div>
      <div class="goods-row-1">
        <div class="goods-column-2">
          <div class="goods-title">
            <!-- 在读取数组的时候会有如果网速过慢 会报错 一下是解决方案 -->
            {{item.items?item.items[0].title : ''}}
          </div>
          <div class="goods-tip">火爆开售</div>
          <div class="goods-image">
            <img src="../../../assets/images/common/lazyImg.jpg" :data-echo="item.items[0].image" alt="" />
          </div>
        </div>
        <div class="goods-column-2">
          <div class="goods-title">
             {{item.items?item.items[1].title : ''}}
          </div>
          <div class="goods-tip">火爆开售</div>
          <div class="goods-image">
            <img src="../../../assets/images/common/lazyImg.jpg" :data-echo="item.items[1].image" alt="" />
          </div>
        </div>
      </div>
      <div class="goods-row-2">
        <div class="goods-list" v-for="(item2,index2) in item.items.slice(2,6)" :key="index2">
          <div class="goods-title">
            {{item2.title}}
          </div>
          <div class="goods-image">
            <img src="../../../assets/images/common/lazyImg.jpg" :data-echo="item2.image" alt="" />
          </div>
          <div class="price">¥{{item2.price}}</div>
          <div class="price line">¥{{item2.price*2}}</div>
        </div>
      </div>
    </div>
    </template>
    <div class="goods-recom-nav">
      <div class="line"></div>
      <div class="recom-wrap">
        <div class="icon"></div>
        <div class="text">为您推荐</div>
      </div>
      <div class="line"></div>
    </div>
    <div class="goods-recom">
      <div class="goods-list" v-for="(item,index) in recom" :key="index">
        <div class="goods-image">
          <img src="../../../assets/images/common/lazyImg.jpg" :data-echo="item.image" alt="" />
        </div>
        <div class="goods-title">{{item.title}}</div>
        <div class="goods-price">¥{{item.price}}</div>
      </div>
    </div>
    <my-search :show="searchShow" v-show="searchShow.show"></my-search>
  </div>
</template>

<script>
// 引入swiperjs  需要安装一个插件  在package.json里配置 支持commen.js规范 否则Swiper无法使用
import Swiper from "../../../assets/js/libs/swiper-3.4.2.min.js"
import MySearch from "../../../components/search/index.vue"
// vueX的辅助函数
import {mapActions,mapState} from 'vuex'
export default {
  name: "index",
  data() {
    return {
      // 控制顶部导航栏变色变量
      isScroll:false,
      // 给子组件穿传的值
      searchShow:{show:false}
    };
  },
  components:{
    // 搜索组件
    MySearch
  },
  created() {
    // 添加滚动事件 
    window.addEventListener('scroll',this.eventScroll)
    // 通过传入回调函数 结合nextTick演出获取Dom元素完成异步数据流的使用
    this.getSwiper({success:() => {
      // nextTick延迟获取dom
      this.$nextTick(
        () => {
          this.newSwiper()
        }
      )
    }}),
    // 获取首页快速导航数据
    this.getNav({success:() => {
      this.$nextTick(() => {
          this.$utils.lazyImg()// 图片懒加载 需要获取dom 又因为实在created里面 所以需要this.$nextTick()函数 延迟获取dom
      })
    }})
    // 获取首页中间数据
    this.getGoods(
      {success:() => {
      this.$nextTick(() => {
          this.$utils.lazyImg() // 图片懒加载
      })
    }}
    )
    // 获取首页为你推荐数据
    this.getReom(
      {success:() => {
      this.$nextTick(() => {
          this.$utils.lazyImg() // 图片懒加载
      })
    }}
    )
  },
  mounted() {

  },
  methods: {
    // 辅助函数获取vueX里面的action函数便于使用
    ...mapActions({
      getSwiper:'index/getSwiper',
      getNav:'index/getNavs',
      getGoods:'index/getGoods',
      getReom:'index/getRecom'
    }),
    // 监听滚动 导航变色函数
    eventScroll(){
      // 获取body 兼容ie浏览器 
      let scrollTop = document.body.scrollTop || document.documentElement.scrollTop
      if(scrollTop > 150) {
        this.isScroll = true
      }else {
        this.isScroll = false
      }
    },
    //创造轮播图对象
    newSwiper() {
      new Swiper(this.$refs['swiper-container'], {
          autoplay: 2000,//可选选项，自动滑动
          pagination : this.$refs['swiper-pagination'],
          paginationClickable :true,
          autoplayDisableOnInteraction : false,
          loop:true
        })
    },
    goPage(url) {
      this.$router.push(url)
    }
  },
  // 计算属性 里面放有 mapState的辅助函数 用来获取vuex里面的state数据 一边在页面中直接使用
  computed: {
    // 辅助寒素 获取vueX里面的数据方便使用 vueX里面的state只能放在这里computed里面
    ...mapState({
      swiper:(state) =>state.index.swipers,
      nav:(state) => state.index.navs,
      goods:(state) => state.index.goods,
      recom:(state) => state.index.recom
    })
  },
  destroyed() {
    //销毁监听的事件 不可以写在这里 因为在路由里keep-alive为true
    // window.removeEventListener('scroll',this.eventScroll)
    window.addEventListener('scroll',this.eventScroll)
  },
  activated() {
    //activated为进入页面前的钩子函数
  },
  deactivated() {
    //移除监听事件应该写在这里 离开页面之后
    window.removeEventListener('scroll',this.eventScroll)
  },
};
</script>

<style scoped>
/* 引入Swiper.css  前面必须加@符号*/
@import "../../../assets/css/common/swiper-3.4.2.min.css";

.page {
  width: 100%;
  min-height: 100%;
  margin-bottom: 1.5rem;
}
.header {
  width: 100%;
  height: 1rem;
  position: fixed;
  z-index: 10;
  left: 0px;
  top: 0px;
  background: linear-gradient(rgba(1, 1, 1, 0.2), hsla(0, 0%, 100%, 0));
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0px 0.3rem;
  box-sizing: border-box;
}
.header.scroll {
  background: linear-gradient(#eb1625, hsla(0, 0%, 100%, 0));
}
.header .classify-icon {
  width: 0.6rem;
  height: 0.6rem;
  background-image: url("../../../assets/images/common/class.png");
  background-size: 100%;
  background-repeat: no-repeat;
  background-position: center;
}
.header .search-wrap {
  width: 5.26rem;
  height: 0.52rem;
  background-color: rgba(255, 255, 255, 0.5);
  border-radius: 4px;
  display: flex;
  align-items: center;
}
.header .search-wrap .search-icon {
  width: 0.44rem;
  height: 0.44rem;
  background-image: url("../../../assets/images/common/search.png");
  background-size: 100%;
  background-repeat: no-repeat;
  background-position: center;
  margin-left: 0.2rem;
  margin-right: 0.2rem;
}
.header .search-wrap .text {
  font-size: 0.32rem;
  color: #ffffff;
}
.header .login {
  width: auto;
  height: 0.44rem;
  font-size: 0.32rem;
  color: #ffffff;
}
.banner-wrap {
  width: 100%;
  height: 3.66rem;
}
.banner-wrap img {
  width: 100%;
  height: 100%;
}

.quick-nav {
  width: 100%;
  height: 1.6rem;
  background-color: #ffffff;
  margin-top: 0.2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0px 0.2rem;
  box-sizing: border-box;
}
.quick-nav .item {
  width: 1.4rem;
}
.quick-nav .item li:nth-child(1) {
  width: 0.8rem;
  height: 0.8rem;
  margin: 0 auto;
}
.quick-nav .item li:nth-child(1) img {
  width: 100%;
  height: 100%;
}
.quick-nav .item li:nth-child(2) {
  font-size: 0.28rem;
  color: #7b7f82;
  text-align: center;
  margin-top: 0.2rem;
}

.goods-main {
  width: 100%;
  height: 7.36rem;
  background-color: #ffffff;
  margin-top: 0.2rem;
}
.goods-main .classify-name {
  width: 100%;
  height: 0.64rem;
  border-bottom: 1px solid #efefef;
  font-size: 0.32rem;
  text-align: center;
  line-height: 0.64rem;
}
.goods-main .classify-name.color-0 {
  color: #f73b61;
}
.goods-main .classify-name.color-1 {
  color: #fe6719;
}
.goods-main .classify-name.color-2 {
  color: #5fc600;
}
.goods-main .goods-row-1 {
  width: 100%;
  height: 3.5rem;
  border-bottom: 1px solid #efefef;
  display: flex;
  overflow: hidden;
}
.goods-main .goods-row-1 .goods-column,
.goods-main .goods-row-1 .goods-column-2 {
  width: 50%;
  height: 100%;
  border-right: 1px solid #efefef;
  position: relative;
}
.goods-main .goods-row-1 .goods-column .goods-title {
  width: 95%;
  height: 0.32rem;
  overflow: hidden;
  position: absolute;
  left: 0.2rem;
  top: 0.2rem;
  font-size: 0.28rem;
  font-weight: bold;
}
.goods-main .goods-row-1 .goods-column .goods-tip {
  width: auto;
  height: auto;
  font-size: 0.28rem;
  color: #cb385d;
  position: absolute;
  left: 0.2rem;
  top: 0.6rem;
}
.goods-main .goods-row-1 .goods-column .goods-price {
  width: auto;
  height: 0.4rem;
  border-radius: 10px;
  position: absolute;
  right: 1rem;
  top: 0.6rem;
  color: #ffffff;
  font-size: 0.28rem;
}
.goods-main .goods-row-1 .goods-column .goods-price.bg-color-0 {
  background-color: #f21d4f;
}
.goods-main .goods-row-1 .goods-column .goods-price.bg-color-2 {
  background-color: #5fc600;
}
.goods-main .goods-row-1 .goods-column .goods-image {
  width: 3rem;
  height: 2rem;
  position: absolute;
  left: 0.35rem;
  bottom: 0.3rem;
}
.goods-main .goods-row-1 .goods-column .goods-image img {
  width: 100%;
  height: 100%;
}
.goods-main .goods-row-1 .goods-column .goods-list {
  width: 100%;
  height: 50%;
  border-bottom: 1px solid #efefef;
  position: relative;
}
.goods-main .goods-row-1 .goods-column .goods-list-title {
  width: 2.04rem;
  height: 0.32rem;
  overflow: hidden;
  font-size: 0.28rem;
  font-weight: bold;
  position: absolute;
  z-index: 1;
  left: 0.2rem;
  top: 0.2rem;
}
.goods-main .goods-row-1 .goods-column .goods-list-tip {
  width: auto;
  height: auto;
  font-size: 0.24rem;
  color: #7b7f82;
  position: absolute;
  left: 0.2rem;
  top: 0.6rem;
}
.goods-main .goods-row-1 .goods-column .goods-list-image {
  width: 1.2rem;
  height: 1.2rem;
  position: absolute;
  right: 0.2rem;
  top: 0.2rem;
}
.goods-main .goods-row-1 .goods-column .goods-list-image img {
  width: 100%;
  height: 100%;
}

.goods-main .goods-row-1 .goods-column-2 .goods-title {
  width: 95%;
  height: 0.32rem;
  overflow: hidden;
  font-size: 0.28rem;
  font-weight: bold;
  text-align: center;
  margin: 0 auto;
  margin-top: 0.2rem;
}
.goods-main .goods-row-1 .goods-column-2 .goods-tip {
  width: auto;
  height: auto;
  font-size: 0.28rem;
  color: #7b7f82;
  text-align: center;
  margin-top: 0.1rem;
}
.goods-main .goods-row-1 .goods-column-2 .goods-image {
  width: 1.8rem;
  height: 2rem;
  margin: 0 auto;
  margin-top: 0.1rem;
}
.goods-main .goods-row-1 .goods-column-2 .goods-image img {
  width: 100%;
  height: 100%;
}

.goods-main .goods-row-2 {
  width: 100%;
  height: 3.2rem;
  overflow: hidden;
  display: flex;
}
.goods-main .goods-row-2 .goods-list {
  width: 25%;
  height: 100%;
  border-right: #efefef 1px solid;
}
.goods-main .goods-row-2 .goods-title {
  width: 100%;
  height: 0.4rem;
  overflow: hidden;
  font-size: 0.28rem;
  font-weight: bold;
  text-align: center;
  margin-top: 0.2rem;
}
.goods-main .goods-row-2 .goods-image {
  width: 1.5rem;
  height: 1.5rem;
  margin: 0 auto;
  margin-top: 0.2rem;
}
.goods-main .goods-row-2 .goods-image img {
  width: 100%;
  height: 100%;
}
.goods-main .goods-row-2 .price {
  width: 100%;
  height: auto;
  text-align: center;
  font-size: 0.28rem;
  color: #d32a4e;
  margin-top: 0.1rem;
}
.goods-main .goods-row-2 .price.line {
  color: #7b7f82;
  text-decoration: line-through;
  margin-top: 0px;
}

.goods-recom-nav {
  width: 100%;
  height: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.goods-recom-nav .line {
  width: 35%;
  height: 1px;
  background-color: #d4d4d4;
}
.goods-recom-nav .recom-wrap {
  width: 1.8rem;
  height: 0.44rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.goods-recom-nav .recom-wrap .icon {
  width: 0.4rem;
  height: 0.4rem;
  background-image: url("../../../assets/images/home/index/recom.png");
  background-size: 100%;
  background-repeat: no-repeat;
  background-position: center;
}
.goods-recom-nav .recom-wrap .text {
  width: auto;
  height: auto;
  font-size: 0.32rem;
  font-weight: bold;
}
.goods-recom {
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 0px 0.2rem;
  box-sizing: border-box;
  flex-wrap: wrap;
}
.goods-recom .goods-list {
  width: 48%;
  height: 4.5rem;
  background-color: #ffffff;
  margin-top: 0.2rem;
}
.goods-recom .goods-list .goods-image {
  width: 2.8rem;
  height: 2.8rem;
  margin: 0 auto;
  margin-top: 0.2rem;
}
.goods-recom .goods-list .goods-image img {
  width: 100%;
  height: 100%;
}
.goods-recom .goods-list .goods-title {
  width: 100%;
  height: 0.8rem;
  overflow: hidden;
  font-size: 0.28rem;
  margin-top: 0.1rem;
}
.goods-recom .goods-list .goods-price {
  width: auto;
  height: auto;
  font-size: 0.32rem;
  color: #d32a4e;
  margin-top: 0.1rem;
}
</style>