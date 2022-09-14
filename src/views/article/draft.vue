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
            <el-table-column label="标题" prop="title" />
            <el-table-column label="作者" prop="author" />
            <el-table-column label="保存时间" prop="date" />
            <el-table-column align="right">
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
                date: '2022-11-12'
            }],
            form: {
                id: '1',
                title: '这是一个标题',
                content: '',
                author: '作者',
                avatar: 'https://cravatar.cn/avatar/5ddb574b3352a3d58166f2d102fb6fcc?s=24&d=mm&r=g',
                date: '2022-11-12'
            },
            search: '',
            loading: true
        }
    },
    mounted() {
        this.getDraft()
    },
    methods: {
        // 编辑操作
        handleEdit(index, row) {
            router.push({ path: '/article/add', query: { id: row.id } })
        },
        // 查看操作
        handleView(index, row) {
            this.viewLoading = true
            this.dialogFormVisible = true
            api.get(apiUrl.draftDetail, { params: { id: row.id } }).then(response => {
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
            api.post(apiUrl.deleteDraft, {
                id: row.id
            }).then(() => {
                ElMessage.success('删除成功')
                this.getDraft()
            }).catch(error => {
                ElMessage.error(error.msg)
                this.loading = false
            })
        },
        // 获取草稿列表
        getDraft() {
            this.loading = true
            api.get(apiUrl.drafts).then(response => {
                this.tableData = response.data
                this.total = this.tableData.length
                this.loading = false
            }).catch(error => {
                ElMessage.error(error.msg)
                this.loading = false
            })
        },
        // 修改每页显示的数量
        handleSizeChange(number) {
            this.pageSize = number
            this.currentPage = 1
        },
        // 修改页数
        handleCurrentChange(number) {
            this.currentPage = number
        }
    }
}
</script>
