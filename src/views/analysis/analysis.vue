<route>
    {
        meta: {
            enabled: false
        }
    }
    </route>

<template>
    <div>
        <page-main class="banner">
            <h1>脚踏实地，笃志前行</h1>
            <h3>尊敬的管理员，欢迎来到博客后台管理系统</h3>
            <el-button :size="large" color="#626aef" :dark="isDark">写文章</el-button>
        </page-main>
        <page-main style="background: rgb(242 243 245);">
            <div>
                <div>
                    <div>站内内容统计：</div>
                </div>
                <div>
                    <div>{{ statistics.articleTotal }}篇文章</div>
                </div>
                <div>
                    <div>{{ statistics.visitTotal }}次访问</div>
                </div>
                <div>
                    <div>{{ statistics.commentTotal }}条评论</div>
                </div>
            </div>
        </page-main>
    </div>
</template>

<script setup>
import {
    onMounted
} from 'vue'
import api from '@/api'
import apiUrl from '../../api/url'
import { ElMessage } from 'element-plus'
const statistics = ref({
    articleTotal: 0,
    visitTotal: 0,
    commentTotal: 0
})
onMounted(() => {
    api.get(apiUrl.statistics).then(res => {
        statistics.value.articleTotal = res.data.articleTotal
        statistics.value.visitTotal = res.data.visitTotal
        statistics.value.commentTotal = res.data.commentTotal
    }).catch(error => {
        ElMessage(error)
    })
})
</script>

<style scoped>
div {
    border: 1px solid #d6d6d6;
    border-collapse: collapse;
    padding: 3px;
    border-radius: 10px;
    line-height: 30px;
    font-size: 15px;
    padding-left: 20px;
}
.banner {
    background-color: rgb(215 231 221);
}
.banner h1,
.banner h3 {
    vertical-align: middle;
    text-align: center;
    color: #8a2be280;
}
.banner .el-button {
    display: block;
    margin: auto;
}
</style>
