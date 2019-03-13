//导入vue vue-router
import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter);

//导入组件
import login from '../components/login.vue'
import index from '../components/index.vue'
import users from '../components/users.vue'
import roles from '../components/roles.vue'
//路由规则
let routes = [
    {
        path:'/login',
        component:login
    },
    {
        path:'/',
        component:index,
        children:[
            {
                path:'users',
                component:users
            },
            {
                path:'roles',
                component:roles
            }
        ]
    }
]

//实例化路由
let router = new VueRouter({
    routes
})
router.beforeEach((to, from, next) => {
    if(to.path == '/login'){
        next()
    }else{
        if(window.sessionStorage.getItem('token')){
            next()
        }else{
            Vue.prototype.$message.warning('请先登录')
            next('/login')
        }
    }
})
//暴露/导出路由
export default router;