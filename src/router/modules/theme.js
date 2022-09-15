const Layout = () => import('@/layout/index.vue')

export default {
    path: '/theme',
    component: Layout,
    name: 'theme',
    meta: {
        title: '博客主题',
        icon: 'ep:setting'
    },
    children: [
        {
            path: '',
            name: 'theme',
            component: () => import('@/views/theme/manageTheme.vue'),
            meta: {
                title: '设置'
            }
        }
    ]
}
