import * as VueRouter from 'vue-router';
import FreshIdeasList from "@/views/FreshIdeasList";

const routes = [
    {
        title: 'Лист свежих идей',
        path: '/',
        component: FreshIdeasList,
        meta: { title: 'Лист свежих идей' }
    },
    {
        title: 'Идеи в моем листе',
        path: '/IdeasInMyList',
        component: () => import('./views/IdeasInMyList'),
        meta: { title: 'Идеи в моем листе' }
    },
    {
        title: 'Завершенные идеи',
        path: '/FinishedIdeas',
        component: () => import('./views/FinishedIdeas'),
        meta: { title: 'Завершенные идеи' }
    }
]
const router = VueRouter.createRouter({
    history: VueRouter.createWebHistory(),
    routes
})

router.beforeEach((to, from, next) => {
    document.title = to.meta.title;
    next();
});


export default router