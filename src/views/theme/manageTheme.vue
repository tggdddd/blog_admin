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
            <el-table-column align="right">
                <template #header>
                    <el-input
                        v-model="search"
                        size="small"
                        placeholder="搜索主题名"
                        @change="searchTag"
                    />
                </template>
                <template #default="scope">
                    <el-button size="small" @click="handleEdit(scope.$index, scope.row)">
                        修改
                    </el-button>
                    <el-popconfirm
                        confirm-button-text="确定"
                        cancel-button-text="取消"
                        :icon="InfoFilled"
                        icon-color="#626AEF"
                        title="这可能是用户的精心设计，确定要删除吗?"
                        @confirm="handleDelete(scope.$index, scope.row)"
                        @cancel="cancelEvent"
                    >
                        <template #reference>
                            <el-button size="small" type="danger">删除</el-button>
                        </template>
                    </el-popconfirm>
                </template>
            </el-table-column>
            <el-table-column label="ID" prop="id" />
            <el-table-column label="主题名" prop="name" />
            <el-table-column label="作者" prop="author" />
            <el-form-item label="喜爱人数" prop="love" />
            <el-table-column label="LOGO文字颜色" prop="--nav-main-text-color" />
            <el-table-column
                label="导航栏激活背景颜色"
                prop="--el-menu-active-color"
            />
            <el-table-column label="导航栏边框颜色" prop="--el-border-color" />
            <el-table-column label="底部背景颜色" prop="--footer-bg-color" />
            <el-table-column label="背景颜色" prop="--body-bg-color" />
            <el-table-column label="面板背景色" prop="--el-fill-color-blank" />
            <el-table-column label="边框颜色" prop="--el-border-color-light" />
            <el-table-column label="按钮颜色" prop="--el-color-primary" />
            <el-table-column label="按钮文字的颜色" prop="--el-color-white" />
            <el-table-column label="标签文字的颜色" prop="--tag-text-color" />
            <el-table-column label="标题文字颜色" prop="--el-text-color-primary" />
            <el-table-column label="内容文字颜色" prop="--content-text-color" />
            <el-table-column
                label="内容描述文字颜色"
                prop="--content-descript-text-color"
            />
            <el-table-column label="评论区背景颜色" prop="--comment-bg-color" />
            <el-table-column label="评论区描述文字颜色" prop="--comment-text-color" />
            <el-table-column
                label="评论区内容文字颜色"
                prop="--comment-content-color"
            />
            <el-table-column
                label="底部描述文字颜色"
                prop="--article-describe-text-color"
            />
            <el-table-column label="分隔线文字颜色" prop="--article-divider-color" />
            <el-table-column label="分隔线颜色" prop="--article-diver-color" />
        </el-table>
        <el-pagination
            style="justify-content: right;"
            background
            layout="sizes, prev, pager, next"
            :current-page="currentPage"
            :total="total"
            :page-size="pageSize"
            :page-sizes="[10, 20, 30, 40, 50]"
            @current-change="handleCurrentChange"
            @size-change="handleSizeChange"
        />
        <!-- 拟态框 -->
        <el-dialog v-model.visible="dialogFormVisible" title="主题修改" draggable>
            <el-form :model="form">
                <el-form-item label="主题名">
                    <el-input v-model="form['name']" />
                </el-form-item>
                <el-form-item label="作者">
                    <el-input v-model="form['author']" />
                </el-form-item>
                <el-form-item label="喜爱人数">
                    <el-input v-model="form['love']" />
                </el-form-item>
                <el-form-item label="LOGO文字颜色">
                    <el-input v-model="form['--nav-main-text-color']" />
                </el-form-item>
                <el-form-item label="导航栏激活背景颜色">
                    <el-input v-model="form['--el-menu-active-color']" />
                </el-form-item>
                <el-form-item label="导航栏边框颜色">
                    <el-input v-model="form['--el-border-color']" />
                </el-form-item>
                <el-form-item label="底部背景颜色">
                    <el-input v-model="form['--footer-bg-color']" />
                </el-form-item>
                <el-form-item label="背景颜色">
                    <el-input v-model="form['--body-bg-color']" />
                </el-form-item>
                <el-form-item label="面板背景色">
                    <el-input v-model="form['--el-fill-color-blank']" />
                </el-form-item>
                <el-form-item label="边框颜色">
                    <el-input v-model="form['--el-border-color-light']" />
                </el-form-item>
                <el-form-item label="按钮颜色">
                    <el-input v-model="form['--el-color-primary']" />
                </el-form-item>
                <el-form-item label="按钮文字的颜色">
                    <el-input v-model="form['--el-color-white']" />
                </el-form-item>
                <el-form-item label="标签文字的颜色">
                    <el-input v-model="form['--tag-text-color']" />
                </el-form-item>
                <el-form-item label="标题文字颜色">
                    <el-input v-model="form['--el-text-color-primary']" />
                </el-form-item>
                <el-form-item label="内容文字颜色">
                    <el-input v-model="form['--content-text-color']" />
                </el-form-item>
                <el-form-item label="内容描述文字颜色">
                    <el-input v-model="form['--content-descript-text-color']" />
                </el-form-item>
                <el-form-item label="评论区背景颜色">
                    <el-input v-model="form['--comment-bg-color']" />
                </el-form-item>
                <el-form-item label="评论区描述文字颜色">
                    <el-input v-model="form['--comment-text-color']" />
                </el-form-item>
                <el-form-item label="评论区内容文字颜色">
                    <el-input v-model="form['--comment-content-color']" />
                </el-form-item>
                <el-form-item label="底部描述文字颜色">
                    <el-input v-model="form['--article-describe-text-color']" />
                </el-form-item>
                <el-form-item label="分隔线文字颜色">
                    <el-input v-model="form['--article-divider-color']" />
                </el-form-item>
                <el-form-item label="分隔线颜色">
                    <el-input v-model="form['--article-diver-color']" />
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
            tableData: [],
            form: {},
            search: '',
            loading: true
        }
    },
    computed: {
        filterTableData() {
            return this.tableData
                .filter(
                    data =>
                        !this.search ||
                        data.name.toLowerCase().includes(this.search.toLowerCase())
                )
                .slice(
                    this.pageSize * (this.currentPage - 1),
                    this.pageSize * (this.currentPage - 1) + this.pageSize
                )
        }
    },
    mounted() {
        this.getThemes()
    },
    methods: {
        // 更新操作
        updateDate() {
            api
                .post(apiUrl.updateTheme, this.form)
                .then(() => {
                    ElMessage.success('主题已修改')
                    this.dialogFormVisible = false
                    this.getThemes()
                })
                .catch(error => {
                    ElMessage.error(error.msg)
                    this.dialogFormVisible = false
                })
        },
        // 编辑操作
        handleEdit(index, row) {
            this.form = row
            console.log(this.form)
            this.dialogFormVisible = true
        },
        // 删除按钮
        handleDelete(index, row) {
            this.loading = true
            api
                .post(apiUrl.deleteTheme, {
                    id: row.id
                })
                .then(() => {
                    ElMessage.success('删除成功')
                    this.getThemes()
                })
                .catch(error => {
                    ElMessage.error(error.msg)
                    this.loading = false
                })
        },
        // 搜索操作
        searchTheme() {
            this.currentPage = 1
        },
        // 获取所有主题
        getThemes() {
            this.loading = true
            api
                .get(apiUrl.themes)
                .then(response => {
                    this.tableData = response.data
                    this.total = this.tableData.length
                    this.loading = false
                })
                .catch(error => {
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
