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
            <el-table-column label="略缩图" prop="src">
                <template #default="scope">
                    <el-image :src="scope.row.src" fit="cover" :preview-src-list="scope.row.src" :initial-index="0" />
                </template>
            </el-table-column>
            <!-- <el-table-column label="id" prop="id" /> -->
            <el-table-column label="目标地址" prop="href" />
            <el-table-column label="图片地址" prop="src" />
            <el-table-column label="播放位置" prop="priority" />
            <el-table-column align="right">
                <template #header>
                    <el-button type="warning" size="small" @click="handleAdd()">增加</el-button>
                </template>
                <template #default="scope">
                    <el-button size="small" @click="handleEdit(scope.$index, scope.row)">修改</el-button>
                    <el-popconfirm confirm-button-text="确定" cancel-button-text="取消" :icon="InfoFilled" icon-color="#626AEF" title="确定删除吗?" @confirm="handleDelete(scope.$index, scope.row)" @cancel="cancelEvent">
                        <template #reference>
                            <el-button size="small" type="danger">删除</el-button>
                        </template>
                    </el-popconfirm>
                </template>
            </el-table-column>
        </el-table>

        <!-- 拟态框 -->
        <el-dialog v-model.visible="dialogFormVisible" title="轮播图" draggable>
            <el-form :model="form">
                <el-form-item label="图片地址">
                    <el-input v-model="form.src" maxlength="200" autocomplete="off" />
                </el-form-item>
                <el-form-item label="跳转地址">
                    <el-input v-model="form.href" maxlength="200" autocomplete="off" />
                </el-form-item>
                <el-form-item label="播放位置">
                    <el-input v-model="form.priority" maxlength="10" placeholder="请输入数字" autocomplete="off" type="number" />
                </el-form-item>
            </el-form>
            <template #footer>
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="updateDate">确 定</el-button>
            </template>
        </el-dialog>
    </page-main>
</template>

<script>
import api from '@/api'
import apiUrl from '../../api/url'
import {
    ElMessage
} from 'element-plus'
export default {
    data() {
        return {
            dialogFormVisible: false,
            loading: true,
            operateIsAdd: true,
            form: {
                src: 'http://attach.bbs.miui.com/forum/month_1012/10120514509c7244b23f4a2fa5.jpg',
                href: 'http://baidu.com',
                id: '123',
                priority: '1'
            },
            tableData: [{
                src: 'http://attach.bbs.miui.com/forum/month_1012/10120514509c7244b23f4a2fa5.jpg',
                href: 'http://baidu.com',
                id: '123',
                priority: '1'
            }]
        }
    },
    mounted() {
        this.getCarousel()
    },
    methods: {
        updateDate() {
            let url = this.operateIsAdd ? apiUrl.carouselAdd : apiUrl.carouselUpdate
            api.post(url, this.form).then(data => {
                if (data.code == 200) {
                    ElMessage.success('操作成功')
                } else {
                    ElMessage.error('操作失败')
                }
                this.getCarousel()
            }).catch(error => {
                ElMessage.error(error)
            })
            this.dialogFormVisible = false
        },
        // 增加处理
        handleAdd() {
            this.operateIsAdd = true
            this.form = {}
            this.dialogFormVisible = true
        },
        // 编辑处理
        handleEdit(index, row) {
            this.operateIsAdd = false
            this.form = row
            this.dialogFormVisible = true
        },
        // 删除处理
        handleDelete(index, row) {
            api.post(apiUrl.carouselDelete, {
                id: row.id
            }, {}).then(data => {
                if (data.code == 200) {
                    ElMessage.success('删除成功')
                } else {
                    ElMessage.error('删除失败')
                }
                this.getCarousel()
            })
        },
        // 获取轮播图数据
        getCarousel() {
            this.loading = true
            api.get(apiUrl.carousel).then(data => {
                this.tableData = data.data
                this.loading = false
            }).catch(error => {
                console.log(error)
            })
        }
    }
}
</script>

<style scoped>
.el-form-item {
    width: 80%;
    margin-left: auto;
    margin-right: auto;
}
</style>
