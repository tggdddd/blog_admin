<route>
    {
        meta: {
            enabled: false
        }
    }
    </route>

<template>
    <page-main>
        <div v-loading="loading" class="list">
            <el-popover
                v-for="(item, index) in tableData"
                :key="index"
                placement="top"
                width="160"
                trigger="hover"
            >
                <div style="text-align: center; margin: 0;">
                    <el-popconfirm
                        confirm-button-text="确定"
                        cancel-button-text="取消"
                        :icon="InfoFilled"
                        icon-color="#626AEF"
                        title="确定删除吗?"
                        @confirm="handleDelete(item.key)"
                        @cancel="cancelEvent"
                    >
                        <template #reference>
                            <el-button size="small" type="danger">删除</el-button>
                        </template>
                    </el-popconfirm>
                    <el-button
                        size="small"
                        type="warning"
                        @click="copy(baseUrl + '/' + item.key)"
                    >
                        复制
                    </el-button>
                </div>

                <template #reference>
                    <el-image
                        :src="baseUrl + '/' + item.key + '-Abridge'"
                        fit="cover"
                        :preview-src-list="[baseUrl + '/' + item.key]"
                        :initial-index="0"
                        class="block"
                    />
                </template>
            </el-popover>
        </div>
        <el-button type="warning" class="addBtn" @click="handleAdd()">
            增 加
        </el-button>
        <!-- 拟态框 -->
        <el-dialog v-model.visible="dialogFormVisible" title="图片上传" draggable>
            <ImageAdd />
            <template #footer>
                <el-button
                    @click="
                        dialogFormVisible = false;
                        getImages();
                    "
                >
                    关 闭
                </el-button>
            </template>
        </el-dialog>
        <textarea id="copy" class="opacity0" />
    </page-main>
</template>

<script>
import api from '@/api'
import apiUrl from '../../api/url'
import { ElMessage } from 'element-plus'
import ImageAdd from './imageAdd.vue'
export default {
    components: {
        ImageAdd
    },
    data() {
        return {
            dialogFormVisible: false,
            loading: true,
            operateIsAdd: true,
            baseUrl: '',
            tableData: [
                {
                    fileName: ''
                }
            ]
        }
    },
    mounted() {
        this.getImages()
    },
    methods: {
        // 复制
        copy(content) {
            var input = document.getElementById('copy')
            input.value = content
            input.select() // 选中文本
            document.execCommand('copy')
            ElMessage.success('复制成功')
        },
        // 增加处理
        handleAdd() {
            this.operateIsAdd = true
            this.form = {}
            this.dialogFormVisible = true
        },
        // 删除处理
        handleDelete(fileName) {
            api
                .post(apiUrl.deleteImage, {
                    fileName: fileName
                })
                .then(data => {
                    if (data.code == 200) {
                        ElMessage.success('删除成功')
                        this.getImages()
                    } else {
                        ElMessage.error('删除失败')
                    }
                })
        },
        // 获取图片数据
        getImages() {
            this.loading = true
            api
                .get(apiUrl.imageList)
                .then(data => {
                    this.baseUrl = data.data.url
                    this.tableData = data.data.list
                    this.loading = false
                })
                .catch(error => {
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
.block {
    padding: 10px;
}
.addBtn {
    right: 20px;
    position: absolute;
    bottom: 20px;
}
.opacity0 {
    opacity: 0;
    width: 1px;
    height: 1px;
}
</style>
