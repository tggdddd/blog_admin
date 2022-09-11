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
            <el-table-column label="标签" prop="class">
                <template #default="scope">
                    <el-tag :color="scope.row.color">{{ scope.row.class }}</el-tag>
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
                    <el-input v-model="search" size="small" placeholder="搜索标签" />
                </template>
                <template #default="scope">
                    <el-button size="small" @click="handleEdit(scope.$index, scope.row)">修改</el-button>
                    <el-popconfirm confirm-button-text="确定" cancel-button-text="取消" :icon="InfoFilled" icon-color="#626AEF" title="确定删除吗?" @confirm="confirmEvent" @cancel="cancelEvent">
                        <template #reference>
                            <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                        </template>
                    </el-popconfirm>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination hide-on-single-page background layout="prev, pager, next" :current-page="currentPage" :total="total" :page-size="pageSize" style="justify-content: center;" @current-change="handleCurrentChange" />
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
                    class: 'JAVA',
                    id: '1',
                    color: '#123456'
                },
                {
                    class: 'spring',
                    id: '1',
                    color: '#123456'
                }
            ],
            search: ''
        }
    },
    computed: {
        filterTableData() {
            return this.tableData.filter(data => !this.search.value || data.class.toLowerCase().includes(this.search.value.toLowerCase()))
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
