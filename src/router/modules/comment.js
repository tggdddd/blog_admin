const Layout = () => import('@/layout/index.vue')

export default {
    path: '/comment',
    component: Layout,
    redirect: '/comment/all',
    name: 'comment',
    meta: {
        title: '评论',
        icon: 'ep:chat-line-square'
    },
    children: [
        {
            path: 'all',
            name: 'allComment',
            component: () => import('@/views/comment/manageComment.vue'),
            meta: {
                title: '所有评论'
            }
        } 
    ]
}
