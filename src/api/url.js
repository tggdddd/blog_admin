let apiUrl = {
    // 文章artice
    articleDetail: '/article/detail',
    articles: '/article/pull',
    articlesTotal: '/article/pull/sum',
    searchArticlesByTitle: '/article/search',
    searchArticlesByTitleTotal: '/article/search/sum',
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
    updateTag: '/tag/update',
    addTag: '/tag/add',
    addArticle: '/article/add',
    deleteArticle: '/article/delete',
    updateArticle: '/article/update',
    addDraft: '/draft/add',
    deleteDraft: '/draft/delete',
    drafts: '/draft/pull',
    draftDetail: '/draft/detail',
    updateDraft: '/draft/update',
    loginOut: '/member/loginOut',
    editPassword: '/member/editPassword',
    themes: '/theme/all',
    addTheme: 'theme/add',
    updateTheme: 'theme/update',
    deleteTheme: 'theme/delete'

}
export default apiUrl
