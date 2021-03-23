import { getClassifyData, getClassifyRightData } from "../../../api/goods";
import Vue from 'vue'
export default {
    namespaced: true,
    state: {
        classify: [],
        right: []
    },
    mutations: {
        ['SET_CLASSIFY'](state, payload) {
            state.classify = payload.classify
                // console.log('分类页面左侧数据：', state.classify);
        },
        // 改变分类左侧颜色
        ['SET_SELLECT'](state, payload) {
            if (state.classify.length > 0) {
                for (let i = 0; i < state.classify.length; i++) {
                    if (state.classify[i].active) { //for循环这样写 性能更好 只用循环到位true就跳出
                        state.classify[i].active = false
                        break
                    }

                }
            }
            // 这里改变了数组里面某个值的状态，可能出现视图不渲染的情况   解决方案：this.$set() 但是在vueX里面没有this.$set()所以需要导入vue
            state.classify[payload.index].active = true
                //Vue.set(state.classify, payload.index, state.classify[payload.index]) //三个参数 第一个：原数据 第二个：要改变的索引值 第三个：改变之后的值
        },
        ['SET_RIGHT'](state, payload) {
            state.right = payload.right
                // console.log('分类页面右侧数据：', state.right);
        }
    },
    actions: {
        getClassify(conText, payload) {
            getClassifyData().then(res => {
                if (res.code === 200) {
                    // 组装数据 向res.data里面添加数据
                    for (let i = 0; i < res.data.length; i++) {
                        res.data[i].active = false
                    }
                    conText.commit('SET_CLASSIFY', { classify: res.data })
                    if (payload) {
                        payload.success()
                    }
                }

            })
        },
        getClassifyRight(conText, payload) {
            getClassifyRightData(payload.cid).then(res => {
                if (res.code === 200) {
                    conText.commit('SET_RIGHT', { right: res.data })
                    if (payload.success) {
                        payload.success()
                    }
                }
                if (res.code === 201) {
                    conText.commit('SET_RIGHT', { right: [] })
                }
            })
        }
    }
}