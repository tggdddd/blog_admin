let apiUrl = {
    // 文章artice
    articleDetail: '/article/detail',
    articles: '/article/pull',
    articlesTotal: '/article/pull/sum',
    searchArticlesByTitle: '/article/search/',
    hotTopic: '/article/getHotTopics',
    reply: '/reply',
    tags: '/tag/all',
    searchByTag: '/linkTag/search',
    searchByTagTotal: '/linkTag/search/sum',
    articleGrade: '/grade/get',
    articleClass: '/linkTag/getClass',
    addComment: '/comment/add',
    getComment: '/comment/pull',
    grade: '/grade/update',
    carousel: '/carousel/pull',
    statistics: '/statistics',
    carouselDelete: '/carousel/delete',
    carouselAdd: '/carousel/add',
    carouselUpdate: '/carousel/update',
    getCommentTotal: '/comment/pullTotal',
    commentDelete: '/comment/delete',
    login: '/member/login',
    deleteTag: '/tag/delete',
    updateTag: '/tag/update'
}
export default apiUrl
