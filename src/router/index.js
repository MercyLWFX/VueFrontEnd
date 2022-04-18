import Vue from 'vue'
import VueRouter from 'vue-router'
import User from "@/views/User";
import Home from "@/views/Home";
import store from "@/store";
import Login from "@/views/Login";
import Person from "@/views/Person";
import File from "@/views/File";
import Role from "@/views/Role";
import Menu from "@/views/Menu";
import QualificationClass from "@/views/QualificationClass";
import Exam from "@/views/Exam";
import Pay from "@/views/front/Pay";
import PaySuccess from "@/views/front/PaySuccess";
import Competition from "@/views/front/Competition";
import DetailCompetition from "@/views/front/DetailCompetition";
import FrontArticle from "@/views/front/FrontArticle";


Vue.use(VueRouter)

//解决编程式路由往同一地址跳转时会报错的情况
const originalPush = VueRouter.prototype.push;
const originalReplace = VueRouter.prototype.replace;
//push
VueRouter.prototype.push = function push(location, onResolve, onReject) {
    if (onResolve || onReject)
        return originalPush.call(this, location, onResolve, onReject);
    return originalPush.call(this, location).catch(err => err);
};
//replace
VueRouter.prototype.replace = function push(location, onResolve, onReject) {
    if (onResolve || onReject)
        return originalReplace.call(this, location, onResolve, onReject);
    return originalReplace.call(this, location).catch(err => err);
};


const routes = [
    {
        path: '/login',
        name: '登录',
        component: Login
    },
    {
        path: '/404',
        name: '404',
        component: () => import('../views/404.vue'),
    },
    {
        path: '/front',
        name: '前端展示界面',
        component: () => import('../views/front/Front.vue'),
        children:[
            {
                path: 'home',
                name: 'FRONT',
                component: () => import('../views/front/Home.vue'),
            },
            {
                path: 'detail/:examName',
                name: 'DETAIL',
                component: () => import('../views/front/Detail.vue'),

            },
            {
                path: 'more',
                name: 'More',
                component: () => import('../views/front/More.vue'),
            },
            {
                path: 'cart',
                name: 'Cart',
                component: () => import('../views/front/Cart.vue'),
            },
            {
                path: 'sign',
                name: 'Sign',
                component: () => import('../views/front/Sign.vue'),
            },
            {
                path: 'pay/:examId/:total',
                name: 'Pay',
                component: Pay,
            },
            {
                path: 'paySuccess',
                name: 'PaySuccess',
                component: PaySuccess,
            },
            {
                path: 'competition',
                name: 'Competition',
                component: Competition,
            },
            {
                path: 'detailCompetition/:id',
                name: 'DetailCompetition',
                component: DetailCompetition,
            },
            {
                path: 'article',
                name: 'FrontArticle',
                component: FrontArticle,
            },
            {
                path: 'articleDetail',
                name: 'ArticleDetail',
                component: () => import('../views/front/ArticleDetail')
            },
            {
                path: 'socialDetail',
                name: 'SocialDetail',
                component: () => import('../views/front/SocialArticle')
            },
            {
                path: 'score',
                name: 'Score',
                component: () => import('../views/front/Score')
            },
            {
                path: 'certify',
                name: 'Certify',
                component: () => import('../views/front/Certify')
            },

        ]
    }
]


const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

// 提供一个重置路由的方法
export const resetRouter = () => {
    router.matcher = new VueRouter({
        mode: 'history',
        base: process.env.BASE_URL,
        routes
    })
}


//注意，刷新页面会重置路由
export const setRouters = () => {
    const storeMenus = localStorage.getItem("menus");
    if (storeMenus) {
        const manageRoute = {
            path: '/', name: 'Manage', component: () => import('../views/Manage'), redirect: "/home",
            children: [
                {path: 'person', name: '个人信息', component: () => import('../views/Person.vue')},
                {path: 'password', name: '修改密码', component: () => import('../views/Password.vue')}
            ]
        }
        const menus = JSON.parse(storeMenus)
        menus.forEach(item => {
            if (item.path) {//当且仅当path不为空的时候才去设置路由
                let itemMenu = {
                    path: item.path.replace("/", ""),
                    name: item.name,
                    component: () => import('../views/' + item.pagePath + '.vue')
                }
                manageRoute.children.push(itemMenu)
            } else if (item.children.length) {
                item.children.forEach(item => {
                    if (item.path) {
                        let itemMenu = {
                            path: item.path.replace("/", ""),
                            name: item.name,
                            component: () => import('../views/' + item.pagePath + '.vue')
                        }
                        manageRoute.children.push(itemMenu)
                    }
                })
            }
        })
        //获取当前的路由对象名称数组
        const currentRoutesName = router.getRoutes().map(v => v.name)
        if (!currentRoutesName.includes("Manage")) {
            //动态添加到现在的路由对象中去
            router.addRoute(manageRoute)
        }
    }
}

setRouters()


// 路由守卫
router.beforeEach((to, from, next) => {
    localStorage.setItem("currentPathName", to.name)  // 设置当前的路由名称
    store.commit("setPath")

    // 未找到路由的情况
    if (!to.matched.length) {
        const storeMenus = localStorage.getItem("token")
        if (storeMenus) {
            next("/404")
        } else {
            // 跳回登录页面
            next("/login")
        }
    }
    // 其他的情况都放行
    next()
})

export default router
