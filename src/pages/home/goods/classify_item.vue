<template>
 <div class="good-content" ref="good-content">
      <div>
       <div class="good-content-items">
            <p>群装</p>
            <div class="good-content-item">
                <ul>
                  <li>1</li>
                  <li>2</li>
                  <li>3</li>
                  <li>4</li>
                  <li>5</li>
                  <li>6</li>
                </ul>
            </div>
       </div>
       <div class="good-content-items">
            <p>群装</p>
            <div class="good-content-item">
                <ul>
                  <li>1</li>
                  <li>2</li>
                  <li>3</li>
                  <li>4</li>
                  <li>5</li>
                  <li>6</li>
                </ul>
            </div>
       </div>
       <div class="good-content-items">
            <p>群装</p>
            <div class="good-content-item">
                <ul>
                  <li>1</li>
                  <li>2</li>
                  <li>3</li>
                  <li>4</li>
                  <li>5</li>
                  <li>6</li>
                </ul>
            </div>
       </div>
       <div class="good-content-items">
            <p>群装</p>
            <div class="good-content-item">
                <ul>
                  <li>1</li>
                  <li>2</li>
                  <li>3</li>
                  <li>4</li>
                  <li>5</li>
                  <li>6</li>
                </ul>
            </div>
       </div>
       <div class="good-content-items">
            <p>群装</p>
            <div class="good-content-item">
                <ul>
                  <li>1</li>
                  <li>2</li>
                  <li>3</li>
                  <li>4</li>
                  <li>5</li>
                  <li>6</li>
                </ul>
            </div>
        </div>
      </div>     
  </div>
 
</template>

<script>
import IScroll from '../../../assets/js/libs/iscroll'
export default {
  methods: {
    // 阻止默认事件
    scrollPreventDefault(e) {
      e.preventDefault()
    }
  },
  mounted() {
    this.$refs['good-content'].addEventListener('touchmove',this.scrollPreventDefault)
    new IScroll(this.$refs['good-content'],{
      scrollX:true,
      scrollY:true,
      preventDefault:false
    })
  },
  beforeDestroy() {
    // 解除绑定
      this.$refs['good-content'].removeEventListener('touchmove',this.scrollPreventDefault)
  },
}
</script> 

<style scoped>
.good-content {width: calc(100% - 2rem);height: 100%;overflow: hidden;position: relative;z-index: 1;}
.good-content-items {width: 100%;}
.good-content-items p {margin: 5px;font-size: 0.3rem;}
.good-content-items .good-content-item {width: 100%;background-color: #fff;}
.good-content-items .good-content-item ul {width: 100%;display: flex;flex-wrap: wrap;}
.good-content-items .good-content-item li {display: block;width: 33%;height: 2rem;font-size: 0.2rem;}
</style>