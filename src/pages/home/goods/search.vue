<template>
  <div class="page">
    <div class="search-top">
      <div class="search-header">
        <div class="back" @click="back()"></div>
        <div class="search-wrap">
          <div class="search-icon"></div>
          <div class="search-text" @click="searchshow()">{{this.$route.query.keyword}}</div>
        </div>
        <div class="screen-btn" @click="isScreen = true">筛选</div>
      </div>
      <div class="order-main">
        <div :class="{'order-item':true,active:isPriveOder}" @click="isPriveOder = !isPriveOder,isSalesOder=false">
          <div class="order-text" >综合</div>
          <div class="order-icon"></div>
          <ul class="order-menu" v-show="isPriveOder">
            <li :class="{active:item.active}" v-for="(item,index) in priceOrderList" :key="index" @click="selectPriceOrder(index)">{{item.title}}</li>
          </ul>
        </div>
        <div :class="{'order-item':true,active:isSalesOder}" @click="selectSales()">
          <div class="order-text" >销量</div>
        </div>
      </div>
    </div>
    <div class="goods-main">
      <div class="goods-list" v-for="(item,index) in goods.goods" :key="index">
        <div class="image">
          <img :src="item.image" />
        </div>
        <div class="goods-content">
          <div class="goods-title">{{item.title}}</div>
          <div class="price">¥{{item.price}}</div>
          <div class="sales">销量<span>{{item.sales}}</span>件</div>
        </div>
      </div>
      <div class="no-data" v-show="goods.length<=0">没有相关商品！</div>
    </div>
    <div
      ref="mask"
      class="mask" v-show="isScreen" @click="isScreen = false"></div>
    <div ref="screen" :class="isScreen? 'screen move':'screen unmove'">
      <div>
        <div class="attr-wrap">
          <div class="attr-title-wrap" @click="isClassify = !isClassify">
            <div class="attr-name">分类</div>
            <div :class="{'attr-icon':true,up:isClassify}"></div>
          </div>
          <div class="item-wrap" v-show="isClassify">
            <div :class="{item:true,active:item.active}" v-for="(item,index) in classifyData" :key="index" @click="change(index)">{{item.title}}</div>
          </div>
        </div>
        <div style="width: 100%; height: 1px; backgroundcolor: #efefef"></div>
        <div class="attr-wrap">
          <div class="attr-title-wrap">
            <div class="attr-name">价格区间</div>
            <div class="price-wrap">
              <div class="price-input">
                <input v-model="minprice" type="tel" placeholder="最低价" />
              </div>
              <div class="price-line"></div>
              <div class="price-input">
                <input v-model="maxprice" type="tel" placeholder="最高价" />
              </div>
            </div>
            <div :class="{'attr-icon':true,up:isSize}" @click="isSize = !isSize"></div>
          </div>
          <div class="item-wrap" v-show="isSize">
            <div :class="{item:true,active:item.active}" v-for="(item,index) in priceData" :key="index" @click="priceDataclick(index)">{{item.minprice+'-'+item.maxprice}}</div>
          </div>
        </div>
        <div
          style="width: 100%; height: 0.3rem; backgroundcolor: #efefef"></div>
        <div>
          <div class="attr-wrap">
            <div class="attr-title-wrap">
              <div class="attr-name">颜色</div>
              <div :class="{'attr-icon':true,up:colorisShow}" @click="colorisShow = !colorisShow"></div>
            </div>
            <div class="item-wrap" v-show="colorisShow">
              <div :class="{item:true,active:item.active}" v-for="(item,index) in colorData" :key="index" @click="changeColor(index)">{{item.color}}</div>
            </div>
          </div>
          <div style="width: 100%; height: 1px; backgroundcolor: #efefef"></div>
        </div>
        <div style="width: 100%; height: 1.2rem"></div>
      </div>
      <div class="handel-wrap">
        <div class="item">共<span>10</span>件</div>
        <div class="item reset" @click="submit()">全部重置</div>
        <div class="item sure">确定</div>
      </div>
    </div>
    <my-search :show="searchShow" v-show="searchShow.show" :isLocal="true"></my-search>
  </div>
  
</template>

<script>
import { mapState, mapActions, mapMutations } from "vuex";
import MySearch from "../../../components/search/index.vue"
import IScroll from '../../../assets/js/libs/iscroll'
export default {
  name: "goods-search",
  data() {
    return {
       // 给子组件穿传的值
      searchShow:{show:false},
      // 综合菜单下拉
      isPriveOder:false,
      // 销量颜色
      isSalesOder:false,
      isScreen:false,
      isClassify:true,
      isSize:true,
      // 保存数据 服用 防止与分类页面数据发生冲突
      classifyData:'',
      // 价格区间数据
      priceData:[
        {active:true,minprice:1,maxprice:49},
        {active:false,minprice:50,maxprice:100},
        {active:false,minprice:101,maxprice:149},
        {active:false,minprice:150,maxprice:200},
        {active:false,minprice:201,maxprice:250},
        {active:false,minprice:251,maxprice:300},
        {active:false,minprice:301,maxprice:999},
      ],
      colorData:[
        {active:true,color:"红色"},
        {active:false,color:"绿色"},
        {active:false,color:"紫色"},
        {active:false,color:"黄色"},
        {active:false,color:"粉色"},
      ],
      // 颜色
      colorisShow:true,
      // 下拉出来的数据
      priceOrderList:[
        {
          title:"综合",type:'all',active:true
        },
        {
          title:"价格从高到底",type:'up',active:false
        },
        {
          title:"价格从低到高",type:'down',active:false
        }
      ]
    };
  },
  components: {
    MySearch
  },
  computed: {
    // 分类数据，数据的复用
    ...mapState({
      classify:(state) => state.goods.classify,
      goods:state => state.keywords.goods
    }),
  },
  created() {
    //发送一次网络请求
    this.getClassify({success:() => {
    this.classifyData = this.classify
    // 默认第一个带颜色
    // iSSroll 异步问题
    this.classifyData[0].active = true
    this.$nextTick(() => {
      this.myscroll.refresh()
    })
    }})
    this.minprice=this.priceData[0].minprice
    this.maxprice=this.priceData[0].maxprice
    this.keyword = this.$route.query.keyword
    this.getSearch({keyword:this.keyword})
  },
  mounted() {
    // IsScroll   使用IScroll的时候一定要注意 异步问题 由于数据是异步获取 刚开始iSscroll获取的高度是不正确的 所以需要在获取数据的时候重新计算domd元素的高度 在create里面获取dom 必须用this.$nextTick() 延迟获取dom
     this.$refs['screen'].addEventListener('touchmove',this.scrollPreventDefault)
    this.myscroll =  new IScroll(this.$refs['screen'],{
      scrollX:false,
      scrollY:true,
      preventDefault:false
    })
  },
  methods: {
    ...mapActions({
      getClassify:'goods/getClassify' ,
      getSearch:'keywords/getSearch'
    }),
    ...mapMutations({
     
    }),
    selectPrice() {},
    searchshow() {
      this.searchShow.show = true
    },
    //返回按钮
    back() {
      this.$router.go(-1);
    },

    //价格排序
    selectPriceOrder(index) {
      for(let i = 0;i<this.priceOrderList.length;i++) {
        if(this.priceOrderList[i].active) {
          this.priceOrderList[i].active = false
          break
        }
      }
      this.priceOrderList[index].active = true
      // 解决部分情况下试图不渲染
      this.$set(this.priceOrderList,index,this.priceOrderList[index])
      this.isSalesOder = false
    },

    //销量排序
    selectSales() {
      this.isSalesOder = true
      for(let i = 0;i<this.priceOrderList.length;i++) {
        if(this.priceOrderList[i].active) {
          this.priceOrderList[i].active = false
          break
        }
      }
    },
    // 点击改变右侧分类颜色
    change(index){
      for(let i = 0;i<this.classifyData.length;i++) {
        if(this.classifyData[i].active) {
          this.classifyData[i].active = false
          break
        }
      }
     this.classifyData[index].active = true
    },
    //禁用touchmove事件
    scrollPreventDefault(e) {
      // console.log(2);
      e.preventDefault()
    },
    // 价格区间点击
    priceDataclick(index) {
      for(let i = 0;i<this.priceData.length;i++) {
        if(this.priceData[i].active){
          this.priceData[i].active= false
          break
        }
      }
      this.priceData[index].active = true
      this.minprice = this.priceData[index].minprice
      this.maxprice = this.priceData[index].maxprice
    },
    // 颜色
    changeColor(index){
      this.colorData[index].active = ! this.colorData[index].active
      // for(let i = 0;i<this.colorData.length;i++){
      //   if(this.colorData[i].active) {
      //     this.colorData[i].active = false
      //     break
      //   }
      // }
      // this.colorData[index].active = true
    },
    // 重置按钮
    submit() {
      for(let i = 0;i<this.classifyData.length;i++) {
        this.classifyData[i].active= false
      }
      for(let i = 0;i<this.priceData.length;i++) {
        this.priceData[i].active = false
      }
      for(let i = 0;i<this.colorData.length;i++) {
        this.colorData[i].active = false
      }
      this.minprice = ''
      this.maxprice = ''
    }
  },
  beforeDestroy() {
    this.$refs['screen'].removeEventListener('touchmove',this.scrollPreventDefault)
  },
  beforeRouteUpdate (to,from,next) {
    this.keyword = to.query.keyword
    this.getSearch({keyword:this.keyword})
    next()
  },
};
</script>

<style scoped>
.page {
  width: 100%;
  height: auto;
  background-color: #ffffff;
  overflow: hidden;
}

.search-top {
  width: 100%;
  position: fixed;
  z-index: 10;
  left: 0px;
  top: 0px;
  background-color: #ffffff;
}

.search-header {
  width: 100%;
  height: 0.8rem;
  border-bottom: 1px solid #efefef;
  display: flex;
  display: -webkit-flex;
  justify-content: space-between;
  -webkit-justify-content: space-between;
  align-items: center;
  -webkit-align-items: center;
}

.search-header .back {
  width: 0.8rem;
  height: 0.8rem;
  background-image: url("../../../assets/images/home/goods/back.png");
  background-size: 100%;
  background-repeat: no-repeat;
  background-position: center;
}

.search-header .search-wrap {
  width: 75%;
  background: #eaeaea;
  height: 80%;
  border-radius: 0.1rem;
  display: flex;
  display: -webkit-flex;
  align-items: center;
  -webkit-align-items: center;
}

.search-header .search-wrap .search-icon {
  width: 0.5rem;
  height: 0.5rem;
  background-image: url("../../../assets/images/common/search.png");
  background-repeat: no-repeat;
  background-size: 100%;
  background-position: center;
  margin-left: 0.1rem;
  margin-right: 0.2rem;
}

.search-header .search-wrap .search-text {
  width: 90%;
  height: auto;
  font-size: 0.32rem;
}

.search-header .screen-btn {
  width: auto;
  height: auto;
  font-size: 0.32rem;
  margin-right: 0.1rem;
}

.search-top .order-main {
  width: 100%;
  height: 0.8rem;
  border-bottom: 1px solid #efefef;
  display: flex;
  display: -webkit-flex;
  align-items: center;
  -webkit-align-items: center;
}

.search-top .order-main .order-item {
  width: auto;
  height: auto;
  display: flex;
  display: -webkit-flex;
  margin-left: 0.4rem;
  position: relative;
  z-index: 1;
}

.search-top .order-main .order-item .order-text {
  font-size: 0.32rem;
}

.search-top .order-main .order-item.active .order-text {
  color: #fda208;
}

.search-top .order-main .order-item .order-icon {
  width: 0.35rem;
  height: 0.35rem;
  background-image: url("../../../assets/images/home/goods/down.png");
  background-size: 100%;
  background-position: center;
  background-repeat: no-repeat;
  margin-left: 0.1rem;
}

.search-top .order-main .order-item.active .order-icon {
  background-image: url("../../../assets/images/home/goods/up.png");
  background-size: 100%;
  background-position: center;
  background-repeat: no-repeat;
}
body > div > div > div.search-top > div.order-main > div.\{\'order-item\'\:true\,active\:true\} > div.order-icon {
    background-image: url("../../../assets/images/home/goods/up.png");
  background-size: 100%;
  background-position: center;
  background-repeat: no-repeat;
}
/*.search-top .order-main .order-item .order-icon.up{background-image:url("../../../../assets/images/home/goods/up.png");background-size:100%;background-position: center;background-repeat: no-repeat;}*/
.search-top .order-main .order-item .order-menu {
  width: 688%;
  height: auto;
  background-color: #ffffff;
  position: absolute;
  z-index: 1;
  left: -35%;
  top: 0.63rem;
}

.search-top .order-main .order-item .order-menu li {
  width: 95%;
  height: 0.8rem;
  border-bottom: 1px solid #efefef;
  font-size: 0.28rem;
  line-height: 0.8rem;
  padding-left: 0.4rem;
}

.search-top .order-main .order-item .order-menu li.active {
  color: #fda208;
}

.goods-main {
  width: 100%;
  height: auto;
  margin-top: 2rem;
}

.goods-main .goods-list {
  width: 100%;
  height: 2rem;
  display: flex;
  display: -webkit-flex;
  justify-content: space-between;
  -webkit-justify-content: space-between;
  overflow: hidden;
  margin-bottom: 0.4rem;
}

.goods-main .goods-list .image {
  width: 2rem;
  height: 2rem;
  margin-left: 0.1rem;
  overflow: hidden;
  text-align: center;
}

.goods-main .goods-list .image img {
  width: auto;
  height: auto;
  max-height: 100%;
  max-height: 100%;
}

.goods-main .goods-list .goods-content {
  width: 67%;
  height: 98%;
  border-bottom: solid 1px #cccccc;
}

.goods-main .goods-list .goods-title {
  width: 95%;
  height: 1rem;
  font-size: 0.28rem;
  overflow: hidden;
}

.goods-main .goods-list .price {
  font-size: 0.32rem;
  color: #f93036;
  margin-top: 0.1rem;
}

.goods-main .goods-list .sales {
  font-size: 0.24rem;
  color: #969696;
  margin-top: 0.1rem;
}

.goods-main .goods-list .sales span {
  color: #fda208;
}

.mask {
  width: 100%;
  height: 100%;
  position: fixed;
  z-index: 99;
  left: 0px;
  top: 0px;
  background-color: rgba(0, 0, 0, 0.3);
}

.screen {
  width: 80%;
  height: 100%;
  position: fixed;
  z-index: 100;
  right: 0px;
  top: 0px;
  background-color: #ffffff;
  transform: translateX(100%);
  -webkit-transform: translateX(100%);
  overflow: hidden;
}

.screen.move {
  transition: transform 0.3s;
  -webkit-transition: transform 0.3s;
  transform: translateX(0%);
  -webkit-transform: translateX(0%);
}
.no-data {
  text-align: center;
}
.screen.unmove {
  transition: transform 0.3s;
  -webkit-transition: transform 0.3s;
  transform: translateX(100%);
  -webkit-transform: translateX(100%);
}

.screen .attr-wrap {
  width: 100%;
}

.screen .attr-wrap .attr-title-wrap {
  width: 94%;
  height: 0.8rem;
  display: flex;
  display: -webkit-flex;
  justify-content: space-between;
  -webkit-justify-content: space-between;
  align-items: center;
  -webkit-align-items: center;
  padding-left: 0.2rem;
  padding-right: 0.2rem;
}

.screen .attr-wrap .attr-title-wrap .attr-name {
  font-size: 0.32rem;
}

.screen .attr-wrap .attr-title-wrap .attr-icon {
  width: 0.4rem;
  height: 0.4rem;
  background-image: url("../../../assets/images/home/goods/down.png");
  background-size: 100%;
  background-repeat: no-repeat;
  background-position: center;
}

.screen .attr-wrap .attr-title-wrap .attr-icon.up {
  background-image: url("../../../assets/images/home/goods/up.png");
  background-size: 100%;
  background-repeat: no-repeat;
  background-position: center;
}

.screen .attr-wrap .attr-title-wrap .price-wrap {
  width: auto;
  height: auto;
  display: flex;
  display: -webkit-flex;
  align-items: center;
  -webkit-align-items: center;
  margin-left: 18%;
}

.screen .attr-wrap .attr-title-wrap .price-wrap .price-input {
  width: 1rem;
  height: 0.4rem;
  border: 1px solid #efefef;
}

.screen .attr-wrap .attr-title-wrap .price-wrap .price-input input {
  width: 100%;
  height: 89%;
  font-size: 0.28rem;
}

.screen .attr-wrap .attr-title-wrap .price-wrap .price-line {
  width: 0.4rem;
  height: 1px;
  background-color: #efefef;
  margin-left: 0.1rem;
  margin-right: 0.1rem;
}

.screen .attr-wrap .item-wrap {
  width: 100%;
  display: flex;
  display: -webkit-flex;
  flex-wrap: wrap;
  -webkit-flex-wrap: wrap;
}

.screen .attr-wrap .item-wrap .item {
  width: 30%;
  height: 0.64rem;
  background-color: #efefef;
  text-align: center;
  line-height: 0.64rem;
  overflow: hidden;
  font-size: 0.28rem;
  border-radius: 0.1rem;
  margin-left: 2%;
  margin-right: 1%;
  margin-bottom: 0.2rem;
}

.screen .attr-wrap .item-wrap .item.active {
  color: #ffffff;
  background-color: #fda208;
}

.screen .handel-wrap {
  width: 100%;
  height: 1rem;
  background-color: #ffffff;
  border-top: 1px solid #efefef;
  position: absolute;
  z-index: 1;
  left: 0px;
  bottom: 0px;
  display: flex;
  display: -webkit-flex;
}

.screen .handel-wrap .item {
  width: auto;
  height: 100%;
  font-size: 0.28rem;
  text-align: center;
  line-height: 1rem;
  flex: 1;
  -webkit-flex: 1;
}

.screen .handel-wrap .item span {
  color: #fda208;
}

.screen .handel-wrap .item.reset {
  background-color: #efefef;
}

.screen .handel-wrap .item.sure {
  background-color: #fda208;
  color: #ffffff;
}
</style>
