import echo from '../libs/echo'
// 导入图片懒加载js  导出init函数 挂载在vue的原型上
function lazyImg() {
    echo.init({
        offset: 20, // "可视区域多少像素可以被加载"
        throttle: 0 //设置图片延迟加载时间
    })
}
// 到出 挂载到全局vue里面 便于使用
export default {
    lazyImg
}