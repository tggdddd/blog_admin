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
            <el-table-column label="标签" prop="tag">
                <template #default="scope">
                    <el-tag :color="scope.row.color">{{ scope.row.tag }}</el-tag>
                </template>
            </el-table-column>
            <el-table-column label="id" prop="id" />
            <el-table-column label="颜色" prop="color">
                <template #default="scope">
                    <el-button :color="scope.row.color">{{ scope.row.color }}</el-button>
                </template>
            </el-table-column>>
            <el-table-column align="right">
                <template #header>
                    <el-input v-model="search" size="small" placeholder="搜索标签" @change="searchTag" />
                </template>
                <template #default="scope">
                    <el-button size="small" @click="handleEdit(scope.$index, scope.row)">修改</el-button>
                    <el-popconfirm confirm-button-text="确定" cancel-button-text="取消" :icon="InfoFilled" icon-color="#626AEF" title="这将会让关联删除标签，确定要删除吗?" @confirm="handleDelete(scope.$index, scope.row)" @cancel="cancelEvent">
                        <template #reference>
                            <el-button size="small" type="danger">删除</el-button>
                        </template>
                    </el-popconfirm>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination style="justify-content: right;" background layout="sizes, prev, pager, next" :current-page="currentPage" :total="total" :page-size="pageSize" :page-sizes="[10, 20, 30, 40,50]" @current-change="handleCurrentChange" @size-change="handleSizeChange" />
        <!-- 拟态框 -->
        <el-dialog v-model.visible="dialogFormVisible" title="标签修改" draggable>
            <el-form :model="form">
                <el-form-item label="标签">
                    <el-tag :color="form.color">{{ form.tag }}</el-tag>
                </el-form-item>
                <el-form-item label="标签名">
                    <el-input v-model="form.tag" maxlength="20" autocomplete="off" />
                </el-form-item>
                <el-form-item label="颜色选择">
                    <el-color-picker v-model="form.color" show-alpha :predefine="predefineColors" @active-change="activeChange" />
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
export default {
    data() {
        return {
            dialogFormVisible: false,
            currentPage: 1,
            pageSize: 10,
            total: 100,
            tableData: [{
                tag: 'JAVA',
                id: '1',
                color: '#123456'
            }],
            form: {
                tag: 'JAVA',
                id: '1',
                color: '#123456'
            },
            search: '',
            loading: true,
            predefineColors: [
                '#409EFF',
                '#67C23A',
                '#E6A23C',
                '#F56C6C',
                '#909399',
                '#000000',
                '#F2F6FC'
            ]
        }
    },
    computed: {
        filterTableData() {
            return this.tableData.filter(data => !this.search || data.tag.toLowerCase().includes(this.search.toLowerCase())).slice(this.pageSize * (this.currentPage - 1), this.pageSize * (this.currentPage - 1) + this.pageSize)
        }
    },
    mounted() {
        this.getTags()
    },
    methods: {
        // 颜色选择器实时更新
        activeChange(color) {
            this.form.color = color
        },
        // 更新操作
        updateDate() {
            api.post(apiUrl.updateTag, this.form).then(() => {
                ElMessage.success('标签已修改')
                this.dialogFormVisible = false
                this.getTags()
            }).catch(error => {
                ElMessage.error(error.msg)
                this.dialogFormVisible = false
            })
        },
        // 编辑操作
        handleEdit(index, row) {
            this.form.id = row.id
            this.form.color = row.color
            this.form.tag = row.tag
            this.dialogFormVisible = true
        },
        // 删除按钮
        handleDelete(index, row) {
            this.loading = true
            api.post(apiUrl.deleteTag, {
                id: row.id
            }).then(() => {
                ElMessage.success('删除成功')
                this.getTags()
            }).catch(error => {
                ElMessage.error(error.msg)
                this.loading = false
            })
        },
        // 搜索操作
        searchTag() {
            this.currentPage = 1
        },
        // 获取所有标签
        getTags() {
            this.loading = true
            api.get(apiUrl.tags).then(response => {
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

<style>
.el-tag {
    color: #ffffffc2;
}
.el-form-item {
    width: 50%;
    margin-left: auto;
    margin-right: auto;
}
</style>
