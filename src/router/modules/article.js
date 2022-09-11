const Layout = () => import('@/layout/index.vue')

export default {
    path: '/article',
    component: Layout,
    redirect: '/article/all',
    name: 'article',
    meta: {
        title: '文章',
        icon: 'ep:tickets'
    },
    children: [
        {
            path: 'all',
            name: 'allArticle',
            component: () => import('@/views/article/manageArticle.vue'),
            meta: {
                title: '所有文章'
            }
        },
        {
            path: 'add',
            name: 'addArticle',
            component: () => import('@/views/article/MyEditor.vue'),
            meta: {
                title: '编写文章'
            }
        },
        {
            path: 'class',
            name: 'class',
            component: () => import('@/views/article/manageClass.vue'),
            meta: {
                title: '分类标签'
            }
        }
    ]
}
