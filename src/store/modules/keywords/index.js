import { gethotData } from '../../../api/search/index'
export default {
    namespaced: true,
    state: {
        historyKeyword: localStorage['historyKeyword'] ? JSON.parse(localStorage['historyKeyword']) : [],
        hot: []
    },
    mutations: {
        // 设置数据
        ['SET_HISTORYKEYWORD'](state, payload) {
            state.historyKeyword = payload.historyKeyword
                // 解决f5刷新 数据丢失问题 储存到localstorage里面
            localStorage['historyKeyword'] = JSON.stringify(state.historyKeyword)
        },
        // 清楚数据
        ['CLEAR_HISTORYKEYWORD'](state) {
            state.historyKeyword = []
            localStorage['historyKeyword'] = []
        },
        ['SET_HOT'](state, payload) {
            state.hot = payload.hot
            console.log('热门搜索数据:', state.hot);
        }
    },
    actions: {
        gethot(conText) {
            gethotData().then(res => {
                if (res.code === 200) {
                    conText.commit('SET_HOT', { hot: res.data })
                }
            })
        }
    }
}