import { getNavsData, getSwiperData, getGoodsData, gatRecomData } from "../../../api/index";

export default {
    namespaced: true,
    state: {
        navs: [],
        swipers: [],
        goods: [],
        recom: []
    },
    mutations: {
        //修改快速导航数据
        ["SET_NAVS"](state, payload) {
            state.navs = payload.navs;
            // console.log("首页快速导航数据：", state.navs);
        },
        //修改Swiper数据
        ['SET_SWIPER'](state, payload) {
            state.swipers = payload.swiper
                // console.log("首页轮播图数据：", state.swipers);
        },
        ['SET_GOODS'](state, payload) {
            state.goods = payload.goods
                // console.log("首页Goos数据：", state.goods);
        },
        ['SET_RECOM'](state, payload) {
            state.recom = payload.recom
                // console.log("首页为你推荐数据：", state.recom);
        }
    },
    actions: {
        // 这里的payload 携带的都是一个成功的回调函数
        // 获取快速导航数据
        getNavs(conText, payload) {
            getNavsData().then(res => {
                // console.log(res);
                if (res.code === 200) {
                    conText.commit("SET_NAVS", { navs: res.data });
                    if (payload.success) {
                        payload.success()
                    }
                }
            })
        },
        // 获取Swiper数据
        getSwiper(conText, payload) {
            getSwiperData().then(res => {
                if (res.code === 200) {
                    conText.commit("SET_SWIPER", { swiper: res.data })
                    if (payload.success) {
                        payload.success()
                    }
                }
            })
        },
        //获取goods数据
        getGoods(conText, payload) {
            getGoodsData().then(res => {
                if (res.code === 200) {
                    conText.commit('SET_GOODS', { goods: res.data })
                    if (payload.success) {
                        payload.success()
                    }
                }
            })
        },
        // 获取首页为你推荐数据
        getRecom(conText, payload) {
            gatRecomData().then(res => {
                if (res.code === 200) {
                    conText.commit('SET_RECOM', { recom: res.data })
                    if (payload.success) {
                        payload.success()
                    }
                }
            })
        }
    }
}