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
            <el-table-column label="发布时间" prop="date" />
            <el-table-column label="标题" prop="title" />
            <el-table-column label="作者" prop="author" />
            <el-table-column label="阅读" prop="read" />
            <el-table-column label="分类" prop="class">
                <template #default="scope">
                    <el-tag v-for="(item,key) in scope.row.class" :key="key">{{ item }}</el-tag>
                </template>
            </el-table-column>
            <el-table-column align="right">
                <template #header>
                    <el-input v-model="search" size="small" placeholder="搜索标题" />
                </template>
                <template #default="scope">
                    <el-button size="small" @click="handleEdit(scope.$index, scope.row)">查看</el-button>
                    <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
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
                    id: '1',
                    title: '这是一个标题',
                    content: '内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容',
                    author: '作者',
                    avatar: 'https://cravatar.cn/avatar/5ddb574b3352a3d58166f2d102fb6fcc?s=24&d=mm&r=g',
                    date: '2022-11-12',
                    read: '12',
                    class: ['JAVA', 'spring']
                },
                {
                    id: '1',
                    title: '这是一个标题',
                    content: '内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容',
                    author: '作者',
                    avatar: 'https://cravatar.cn/avatar/5ddb574b3352a3d58166f2d102fb6fcc?s=24&d=mm&r=g',
                    date: '2022-11-12',
                    read: '12',
                    class: ['JAVA', 'spring']
                },
                {
                    id: '1',
                    title: '这是一个标题',
                    content: '内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容',
                    author: '作者',
                    avatar: 'https://cravatar.cn/avatar/5ddb574b3352a3d58166f2d102fb6fcc?s=24&d=mm&r=g',
                    date: '2022-11-12',
                    read: '12',
                    class: ['JAVA', 'spring']
                },
                {
                    id: '1',
                    title: '这是一个标题',
                    content: '内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容',
                    author: '作者',
                    avatar: 'https://cravatar.cn/avatar/5ddb574b3352a3d58166f2d102fb6fcc?s=24&d=mm&r=g',
                    date: '2022-11-12',
                    read: '12',
                    class: ['JAVA', 'spring']
                }
            ],
            search: ''
        }
    },
    computed: {
        filterTableData() {
            return this.tableData.filter(data => !this.search.value || data.titlte.toLowerCase().includes(this.search.value.toLowerCase()))
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

