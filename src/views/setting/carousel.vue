<route>
    {
        meta: {
            enabled: false
        }
    }
    </route>

<template>
    <page-main>
        <el-table :data="tableData" style="width: 100%;">
            <el-table-column label="略缩图" prop="src">
                <template #default="scope">
                    <el-image :src="scope.row.src" fit="cover" :preview-src-list="scope.row.src" :initial-index="0" />
                </template>
            </el-table-column>
            <el-table-column label="id" prop="id" />
            <el-table-column label="目标地址" prop="href" />
            <el-table-column label="图片源" prop="src" />
            <el-table-column label="位置" prop="pos" />
            <el-table-column align="right">
                <!-- <template #header>
                    <el-input v-model="search" size="small" placeholder="搜索文章" />
                </template> -->
                <template #default="scope">
                    <el-button size="small" @click="handleEdit(scope.$index, scope.row)">增加</el-button>
                    <el-button size="small" @click="handleEdit(scope.$index, scope.row)">修改</el-button>
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
                    src: 'http://attach.bbs.miui.com/forum/month_1012/10120514509c7244b23f4a2fa5.jpg',
                    href: 'http://baidu.com',
                    id: '123',
                    pos: '1'
                },
                {
                    src: 'http://attach.bbs.miui.com/forum/month_1012/10120514509c7244b23f4a2fa5.jpg',
                    href: 'http://baidu.com',
                    id: '123',
                    pos: '1'
                },
                {
                    src: 'http://attach.bbs.miui.com/forum/month_1012/10120514509c7244b23f4a2fa5.jpg',
                    href: 'http://baidu.com',
                    id: '123',
                    pos: '1'
                },
                {
                    src: 'http://attach.bbs.miui.com/forum/month_1012/10120514509c7244b23f4a2fa5.jpg',
                    href: 'http://baidu.com',
                    id: '123',
                    pos: '1'
                }
            ],
            search: ''
        }
    },
    computed: {

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

