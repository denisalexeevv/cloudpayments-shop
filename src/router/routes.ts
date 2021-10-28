import {RouteConfig} from "vue-router";

const routes: Array<RouteConfig> = [
    {
        path: '/',
        name: 'Catalog',
        component: () => import('../views/Catalog.vue')
    },
    {
        path: '/cart',
        name: 'Cart',
        component: () => import('../views/Cart.vue')
    }
]

export default routes
