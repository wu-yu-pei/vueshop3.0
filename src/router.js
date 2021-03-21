import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

let router = new Router({
    mode: "hash", //1、hash哈希：有#号。2、history历史：没有#号
    base: process.env.BASE_URL, //自动获取根目录路径
    scrollBehavior: (to, from, position) => {
        if (position) {
            return position
        } else {
            return { x: 0, y: 0 }
        }
    },
    routes: [{
            path: "/",
            name: "home",
            component: () =>
                import ("./pages/home/main"), //路由懒加载解决首屏加载慢，性能优化
            meta: { keepAlive: false },
            redirect: "/index",
            children: [{
                    path: "index",
                    name: "index",
                    component: () =>
                        import ("./pages/home/index"),
                    meta: { keepAlive: true, title: "商城" }
                },
                {
                    path: "cart",
                    name: "cart",
                    component: () =>
                        import ("./pages/home/cart"),
                    meta: { keepAlive: false, title: "购物车" }
                },
                {
                    path: "my",
                    name: "my",
                    component: () =>
                        import ("./pages/user/ucenter"),
                    meta: { keepAlive: false, title: "我的" }
                }
            ]
        },
        {
            path: '/search',
            name: 'search',
            component: () =>
                import ("./pages/home/goods/search.vue")
        }, {
            path: "/login",
            name: "login",
            component: () =>
                import ("./pages/home/login"),
            meta: { keepAlive: false }
        },
        {
            path: "/ucenter",
            name: "ucenter",
            component: () =>
                import ("./pages/user/ucenter")
        },
        {
            path: "/goods",
            name: "goods",
            component: () =>
                import ("./pages/home/goods"),
            redirect: "/goods/item", //页面重定向
            children: [{
                    path: "item",
                    name: "goods-item",
                    component: () =>
                        import ("./pages/home/goods/item")
                },
                {
                    path: "details",
                    name: "goods-details",
                    component: () =>
                        import ("./pages/home/goods/details")
                },
                {
                    path: "review",
                    name: "goods-review",
                    component: () =>
                        import ("./pages/home/goods/review")
                }
            ]
        },
        {
            path: '/good/classify',
            name: 'good-classify',
            redirect: '/good/classify/item',
            component: () =>
                import ('./pages/home/goods/classify.vue'),
            meta: { keepAlive: false, title: "搜索" },
            children: [{
                path: "/good/classify/item",
                component: () =>
                    import ('./pages/home/goods/classify_item'),
                meta: { keepAlive: false, title: "裙装" },
            }]
        },
        {
            path: "/skip",
            name: "skip",
            component: () =>
                import ("./pages/skip")
        },
    ]
});
router.beforeEach((to, from, next) => {
    if (to.meta.auth) {
        if (Boolean(localStorage['isLogin'])) {
            next();
        } else {
            next("/login");
        }
    } else {
        next();
    }
});
export default router;