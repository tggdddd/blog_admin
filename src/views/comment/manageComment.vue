<route>
    {
        meta: {
            enabled: false
        }
    }
    </route>

<template>
    <page-main>
        <el-table :data="filterTableData" style="width: 100%;">
            <el-table-column label="文章" prop="article" />
            <el-table-column label="读者昵称" prop="name" />
            <el-table-column label="读者描述" prop="descript" />
            <el-table-column label="读者邮箱" prop="email" />
            <el-table-column label="评论时间" prop="date" />
            <el-table-column align="right">
                <template #header>
                    <el-input v-model="search" size="small" placeholder="搜索文章" />
                </template>
                <template #default="scope">
                    <el-button size="small" @click="handleEdit(scope.$index, scope.row)">回复</el-button>
                    <el-popconfirm
                        confirm-button-text="确定"
                        cancel-button-text="取消"
                        :icon="InfoFilled"
                        icon-color="#626AEF"
                        title="确定删除吗?"
                        @confirm="confirmEvent"
                        @cancel="cancelEvent"
                    >
                        <template #reference>
                            <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                        </template>
                    </el-popconfirm>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination
            hide-on-single-page
            background layout="prev, pager, next"
            :current-page="currentPage"
            :total="total"
            :page-size="pageSize"
            style="justify-content: center;"
            @current-change="handleCurrentChange"
        />
    </page-main>
</template>

<script>
export default {
    data() {
        return {
            currentPage: 1,
            pageSize: 2,
            total: 100,
            tableData: [
                {
                    article: '1',
                    name: '这是一个标题',
                    descript: '内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容',
                    email: '作者',
                    date: 'https://cravatar.cn/avatar/5ddb574b3352a3d58166f2d102fb6fcc?s=24&d=mm&r=g'
                },
                {
                    article: '1',
                    name: '这是一个标题',
                    descript: '内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容',
                    email: '作者',
                    date: 'https://cravatar.cn/avatar/5ddb574b3352a3d58166f2d102fb6fcc?s=24&d=mm&r=g'
                },
                {
                    article: '1',
                    name: '这是一个标题',
                    descript: '内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容',
                    email: '作者',
                    date: 'https://cravatar.cn/avatar/5ddb574b3352a3d58166f2d102fb6fcc?s=24&d=mm&r=g'
                },
                {
                    article: '1',
                    name: '这是一个标题',
                    descript: '内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容',
                    email: '作者',
                    date: 'https://cravatar.cn/avatar/5ddb574b3352a3d58166f2d102fb6fcc?s=24&d=mm&r=g'
                }
            ],
            search: ''
        }
    },
    computed: {
        filterTableData() {
            return this.tableData.filter(data => !this.search.value || data.article.toLowerCase().includes(this.search.value.toLowerCase()))
        }
    },
    methods: {
        handleEdit(index, row) {
            console.log(index, row)
        },
        handleDelete(index, row) {
            console.log(index, row)
        },
        handleCurrentChange() {
            console.log('"幻夜"')
        }
    }
}
</script>

