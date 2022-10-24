<route>
    {
        meta: {
            enabled: false
        }
    }
    </route>

<template>
    <page-main>
        <imageUpload @url.stop @on-success="handleUpload" />
        <el-card v-if="url">
            <a :href="url" target="_blank">{{ url }}</a>
        </el-card>
    </page-main>
</template>

<script>
import imageUpload from '@/components/ImageUpload/index.vue'
import { ElMessage } from 'element-plus'
export default {
    components: {
        imageUpload
    },
    data() {
        return {
            url: ''
        }
    },
    methods: {
        handleUpload(res) {
            if (res.code == '200') {
                ElMessage.success('上传成功!')
                this.url = res.data
                ElMessage.success(res.data)
            } else {
                ElMessage.error(res.msg)
            }
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
