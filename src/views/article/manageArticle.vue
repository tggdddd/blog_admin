<route>
    {
        meta: {
            enabled: false
        }
    }
    </route>

<template>
    <page-main>
        <el-table v-loading="loading" :data="tableData" style="width: 100%;">
            <el-table-column label="ID" prop="id" />
            <el-table-column label="标题" prop="title" />
            <el-table-column label="作者" prop="author" />
            <el-table-column label="分类" prop="tags">
                <template #default="scope">
                    <el-tag v-for="(item,key) in scope.row.tags" :key="key" :color="item.color">{{ item.tag }}</el-tag>
                </template>
            </el-table-column>
            <el-table-column label="发布时间" prop="date" />
            <el-table-column label="阅读" prop="browse" />
            <el-table-column label="评分" prop="grade">
                <template #default="scope">
                    <div>{{ isNaN(scope.row.grade.cGrade/scope.row.grade.count)?0:(scope.row.grade.cGrade/scope.row.grade.count) }}</div>
                </template>
            </el-table-column>
            <el-table-column align="right">
                <template #header>
                    <el-input v-model="search" size="small" placeholder="搜索标题" @change="searchTag" />
                </template>
                <template #default="scope">
                    <el-button size="small" @click="handleView(scope.$index, scope.row)">查看</el-button>
                    <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                    <el-popconfirm confirm-button-text="确定" cancel-button-text="取消" :icon="InfoFilled" icon-color="#626AEF" title="确定删除吗?" @confirm="handleDelete(scope.$index, scope.row)" @cancel="cancelEvent">
                        <template #reference>
                            <el-button size="small" type="danger">删除</el-button>
                        </template>
                    </el-popconfirm>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination style="justify-content: right;" background layout="sizes, prev, pager, next" :current-page="currentPage" :total="total" :page-size="pageSize" :page-sizes="[10, 20, 30, 40,50]" @current-change="handleCurrentChange" @size-change="handleSizeChange" />
        <!-- 拟态框 查看文章 -->
        <el-dialog v-model.visible="dialogFormVisible" v-loading="viewLoading" title="文章内容" draggable>
            <div v-html="form.content" />
        </el-dialog>
    </page-main>
</template>

<script>
import api from '@/api'
import apiUrl from '@/api/url'
import router from '@/router'
export default {
    data() {
        return {
            dialogFormVisible: false,
            currentPage: 1,
            pageSize: 10,
            viewLoading: false,
            total: 100,
            tableData: [{
                id: '1',
                title: '这是一个标题',
                content: '内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容',
                author: '作者',
                avatar: 'https://cravatar.cn/avatar/5ddb574b3352a3d58166f2d102fb6fcc?s=24&d=mm&r=g',
                date: '2022-11-12',
                browse: '12',
                tags: ['JAVA', 'spring'],
                grade: {
                    count: '',
                    cGrade: ''
                }
            }],
            form: {
                id: '1',
                title: '这是一个标题',
                content: '内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容',
                author: '作者',
                avatar: 'https://cravatar.cn/avatar/5ddb574b3352a3d58166f2d102fb6fcc?s=24&d=mm&r=g',
                date: '2022-11-12',
                browse: '12',
                tags: ['JAVA', 'spring']
            },
            search: '',
            loading: true
        }
    },
    mounted() {
        this.getArticle()
        this.getArticleTotal()
    },
    methods: {
        // 获取搜索结果文章列表的总数
        getArticleByTitleTotal() {
            // 获取本页文章列表
            api.get(apiUrl.searchArticlesByTitleTotal, {
                params: {
                    pageSize: this.pageSize,
                    pageNum: this.currentPage,
                    title: this.search
                }
            }).then(response => {
                this.total = response.data
            }).catch(error => {
                ElMessage.error(error.msg)
            })
        },
        getArticleByTtile() {
            // 获取搜索结果文章列表
            this.loading = true
            api.get(apiUrl.searchArticlesByTitle, {
                params: {
                    pageSize: this.pageSize,
                    pageNum: this.currentPage,
                    title: this.search
                }
            }).then(response => {
                this.tableData = response.data
                this.loading = false
            }).catch(error => {
                ElMessage.error(error.msg)
                this.loading = false
            })
        },
        // 搜索操作
        searchTag() {
            this.getArticleByTtile()
            this.currentPage = 1
            this.getArticleByTitleTotal()
        },

        // 编辑操作
        handleEdit(index, row) {
            router.push({ path: '/modify/article/' + row.id })
        },
        // 查看操作
        handleView(index, row) {
            this.dialogFormVisible = true
            this.viewLoading = true
            api.get(apiUrl.articleDetail, { params: { id: row.id } }).then(response => {
                this.form = response.data
                this.viewLoading = false
            }).catch(error => {
                this.viewLoading = false
                ElMessage.error('获取文章内容失败!', error.msg)
            })
        },
        // 删除操作
        handleDelete(index, row) {
            this.loading = true
            api.post(apiUrl.deleteArticle, {
                id: row.id
            }).then(() => {
                ElMessage.success('删除成功')
                this.getArticle()
                this.total -= 1
            }).catch(error => {
                ElMessage.error(error.msg)
                this.loading = false
            })
        },
        // 获取文章列表
        getArticle() {
            this.loading = true
            // 获取本页文章列表
            api.get(apiUrl.articles, {
                params: {
                    pageSize: this.pageSize,
                    pageNum: this.currentPage
                }
            }).then(response => {
                this.tableData = response.data
                this.loading = false
            }).catch(error => {
                ElMessage.error(error.msg)
                this.loading = false
            })
        },
        // 获取文章列表的总数
        getArticleTotal() {
            // 获取本页文章列表
            api.get(apiUrl.articlesTotal, {
                params: {
                    pageSize: this.pageSize,
                    pageNum: this.currentPage
                }
            }).then(response => {
                this.total = response.data
            }).catch(error => {
                ElMessage.error(error.msg)
            })
        },
        // 修改每页显示的数量
        handleSizeChange(number) {
            this.pageSize = number
            this.currentPage = 1
            this.getArticle()
        },
        // 修改页数
        handleCurrentChange(number) {
            this.currentPage = number
            this.getArticle()
        }
    }
}
</script>
