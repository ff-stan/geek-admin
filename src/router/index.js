import {
    createRouter,
    createWebHashHistory,
} from 'vue-router'
import Test from '../pages/Test.vue'
import About from '../pages/About.vue'
import Login from '../pages/loginPage.vue'

const routes = [
    {
        path: '/',
        name: 'Index',
        component: () => import('../pages/Index.vue'),
    },
    {
        path: '/test',
        name: 'Test',
        component: Test
    },
    {
        path: '/login',
        name: 'Login',
        component: Login
    },
    {
        path: '/register',
        name: 'register',
        component: () => import('../pages/RegisterPage.vue'),
    },
    {
        path: '/moviesList',
        name: 'moviesList',
        component: () => import('../pages/MoviesList.vue'),
    },
    {
        path: '/articlesList',
        name: 'articlesList',
        component: () => import('../pages/ArticlesList.vue'),
    },
    {
        path: '/movieDetail',
        name: 'movieDetail',
        component: () => import('../pages/MovieDetail.vue')
    },
    {
        path: '/articleDetail',
        name: 'ArticleDetail',
        component: () => import('../pages/ArticleDetail.vue')
    },
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router