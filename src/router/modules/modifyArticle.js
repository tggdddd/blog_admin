const Layout = () => import('@/layout/index.vue')

export default {
    path: '/modify',
    component: Layout,
    redirect: '/modify/article',
    name: 'modify',
    meta: {
        title: '修改文字',
        icon: 'ep:tickets'
    },
    children: [
        {
            path: 'article/:id',
            name: 'modify',
            component: () => import('@/views/article/modifyArticle.vue'),
            props: true
        }
    ]
}
