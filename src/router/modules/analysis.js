const Layout = () => import('@/layout/index.vue')

export default {
    path: '/analysis',
    component: Layout,
    name: 'analysis',
    meta: {
        title: '主页',
        icon: 'ep:house'
    },
    children: [
        {
            path: 'do',
            name: 'analysis',
            component: () => import('@/views/analysis/analysis.vue'),
            meta: {
                title: '分析'
            }
        }
    ]
}
