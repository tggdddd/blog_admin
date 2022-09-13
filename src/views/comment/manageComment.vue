<route>
    {
        meta: {
            enabled: false
        }
    }
    </route>

<template>
    <page-main>
        <el-table v-loading="loading" :data="filterTableData" style="width: 100%;">
            <el-table-column label="文章ID" prop="articleId" />
            <el-table-column label="所属文章" prop="title" />
            <el-table-column label="读者昵称" prop="name" />
            <el-table-column label="评论内容" prop="content" />
            <el-table-column label="读者邮箱" prop="email" />
            <el-table-column label="评论时间" prop="date" />
            <el-table-column label="读者描述" prop="describe" />
            <el-table-column align="right">
                <template #header>
                    <el-input v-model="search" type="number" size="small" placeholder="文章Id" @change="searchComment" />
                </template>
                <template #default="scope">
                    <el-button size="small" @click="handleEdit(scope.$index, scope.row)">回复</el-button>
                    <el-popconfirm confirm-button-text="确定" cancel-button-text="取消" :icon="InfoFilled" icon-color="#626AEF" title="确定删除吗?" @confirm="handleDelete(scope.$index, scope.row)" @cancel="cancelEvent">
                        <template #reference>
                            <el-button size="small" type="danger">删除</el-button>
                        </template>
                    </el-popconfirm>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination style="justify-content: right;" background layout="sizes, prev, pager, next" :current-page="currentPage" :total="total" :page-size="pageSize" :page-sizes="[10, 20, 30, 40,50]" @current-change="handleCurrentChange" @size-change="handleSizeChange" />
        <!-- 拟态框 -->
        <el-dialog v-model.visible="dialogFormVisible" title="回复评论" draggable>
            <el-form :model="form">
                <el-form-item label="回复昵称">
                    <el-input v-model="form.name" maxlength="20" autocomplete="off" />
                </el-form-item>
                <el-form-item label="使用的邮箱">
                    <el-input v-model="form.email" maxlength="20" type="email" autocomplete="off" />
                </el-form-item>
                <el-form-item label="回复内容">
                    <el-input v-model="form.content" :autosize="{ minRows: 4, maxRows: 5 }" type="textarea" />
                </el-form-item>
            </el-form>
            <template #footer>
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="updateDate">发 送</el-button>
            </template>
        </el-dialog>
    </page-main>
</template>

<script>
import api from '@/api'
import apiUrl from '@/api/url'
import {
    ElMessage
} from 'element-plus'
export default {
    data() {
        return {
            dialogFormVisible: false,
            currentPage: 1,
            pageSize: 10,
            total: 100,
            tableData: [{
                id: '',
                email: '',
                name: '',
                describe: '',
                content: '',
                date: '',
                parentId: '',
                articleId: '',
                article: ''
            }],
            form: {
                articleId: 1,
                email: '1425187931@qq.com',
                name: '博主',
                content: '',
                describe: '作者的回复',
                parentId: 1
            },
            search: '',
            loading: true
        }
    },
    computed: {
        filterTableData() {
            return this.tableData
        }
    },
    mounted() {
        this.getCommentTotal()
        this.getComment()
    },
    methods: {
        // 搜索
        searchComment() {
            this.getComment()
            this.getCommentTotal()
        },
        // 回复按钮
        updateDate() {
            api.post(apiUrl.addComment, this.form).then(() => {
                ElMessage.success('消息已发送')
                this.dialogFormVisible = false
                this.getComment()
                this.total = this.total + 1
            }).catch(error => {
                ElMessage.error(error.msg)
                this.dialogFormVisible = false
            })
        },
        // 回复按钮
        handleEdit(index, row) {
            this.form.parentId = row.id
            this.articleId = row.articleId
            this.form.content = '@' + row.name + ' '
            this.dialogFormVisible = true
        },
        // 删除按钮
        handleDelete(index, row) {
            this.loading = true
            api.post(apiUrl.commentDelete, {
                commentId: row.id
            }).then(() => {
                ElMessage.success('删除成功')
                this.getComment()
            }).catch(() => {
                ElMessage.error('删除失败')
                this.loading = false
            })
        },
        // 获取评论内容
        getComment() {
            this.loading = true
            api.get(apiUrl.getComment, {
                params: {
                    pageSize: this.pageSize,
                    pageNum: this.currentPage,
                    articleId: this.search
                }
            }).then(response => {
                this.tableData = response.data
                this.loading = false
            }).catch(error => {
                ElMessage.error(error.msg)
                this.loading = false
            })
        },
        // 获取评论内容的总数
        getCommentTotal() {
            api.get(apiUrl.getCommentTotal, {
                pageSize: this.pageSize,
                pageNum: this.currentPage,
                articleId: this.search
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
            this.getComment()
        },
        // 修改页数
        handleCurrentChange(number) {
            this.currentPage = number
            this.getComment()
        }
    }
}
</script>
