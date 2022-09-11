const Layout = () => import('@/layout/index.vue')

export default {
    path: '/setting',
    component: Layout,
    name: 'setting',
    meta: {
        title: '设置',
        icon: 'ep:setting'
    },
    children: [
        {
            path: 'carousel',
            name: 'carousel',
            component: () => import('@/views/setting/carousel.vue'),
            meta: {
                title: '轮播图'
            }
        }
    ]
}
