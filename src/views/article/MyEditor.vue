<template>
    <div style="height: 100%;">
        <div class="button">
            <el-button type="success" @click="toPublic()">发布文章</el-button>
            <el-button type="warning" @click="save()">保存草稿</el-button>
        </div>
        <div style="border: 1px solid #ccc; margin-top: 10px;">
            <!-- 工具栏 -->
            <Toolbar
                style="border-bottom: 1px solid #ccc;"
                :editor="editor"
                :default-config="toolbarConfig"
            />
            <!-- 编辑器 -->
            <Editor
                v-model="html"
                style="height: 400px; overflow-y: hidden;"
                :default-config="editorConfig"
                @onChange="onChange"
                @onCreated="onCreated"
            />
        </div>
        <div style="margin-top: 10px;">
            <div readonly v-html="html" />
        </div>
    </div>
</template>
<script>
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'

export default {
    name: 'MyEditor',
    components: { Editor, Toolbar },
    data() {
        return {
            editor: null,
            html: '<p>hello&nbsp;world</p>',
            toolbarConfig: {
                // toolbarKeys: [ /* 显示哪些菜单，如何排序、分组 */ ],
                // excludeKeys: [ /* 隐藏哪些菜单 */ ],
            },
            editorConfig: {
                placeholder: '请输入内容...',
                // autoFocus: false,

                // 所有的菜单配置，都要在 MENU_CONF 属性下
                MENU_CONF: {}
            }
        }
    },
    mounted() {
        // 模拟 ajax 请求，异步渲染编辑器
        setTimeout(() => {
            this.html = '<p>Ajax 异步设置内容 HTML</p>'
        }, 1500)
    },
    beforeUnmount() {
        const editor = this.editor
        if (editor == null) return
        editor.destroy() // 组件销毁时，及时销毁 editor ，重要！！！
    },
    methods: {
        onCreated(editor) {
            this.editor = Object.seal(editor) // 【注意】一定要用 Object.seal() 否则会报错
        },
        onChange(editor) {
            console.log('onChange', editor.getHtml()) // onChange 时获取编辑器最新内容
        },
        insertTextHandler() {
            const editor = this.editor
            if (editor == null) return
            editor.insertText(' hello ')
        },
        toPublic() {
            // 发布文章
            const editor = this.editor
            if (editor == null) return
            console.log(editor.getHtml())
        },
        // 保存草稿
        save() {
            const editor = this.editor
            if (editor == null) return
            editor.disable()
        }
    }
}
</script>
<style scoped>
.button {
    margin: 20px;
    position: relative;
    width: 100%;
    height: 20px;
}
.button .el-button {
    float: right;
    margin-right: 25px;
}
</style>

<style src="@wangeditor/editor/dist/css/style.css"></style>
