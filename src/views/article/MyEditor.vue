<route>
    {
        meta: {
            enabled: false
        }
    }
    </route>

<template>
    <page-main v-loading="loading">
        <div class="container">
            <!-- 结果显示 -->
            <div style="margin-top: 10px;" class="viewHtml">
                <div readonly v-html="html" />
            </div>
            <div class="inputArea">
                <div style="border: 1px solid #ccc; margin-top: 10px;">
                    <!-- 工具栏 -->
                    <Toolbar style="border-bottom: 1px solid #ccc;" :editor="editor" :default-config="toolbarConfig" />
                    <!-- 编辑器 -->
                    <Editor v-model="html" class="editor" :default-config="editorConfig" @onChange="onChange" @onCreated="onCreated" />
                </div>
            </div>
        </div>
        <!-- 操作按钮 -->
        <div class="button">
            <el-button type="success" @click="toPublic()">发布文章</el-button>
            <el-button type="warning" @click="save()">保存草稿</el-button>
        </div>
        <!-- 发布文章拟态框 -->
        <el-dialog v-model.visible="dialogFormVisible" title="请选择标签" draggable>
            <template #default>
                <el-form :model="form">
                    <el-form-item label="标题">
                        <el-input v-model="form.title" maxlength="20" autocomplete="off" />
                    </el-form-item>
                    <el-form-item label="作者">
                        <el-input v-model="form.author" maxlength="20" type="email" autocomplete="off" />
                    </el-form-item>
                    <el-form-item label="标签">
                        <el-select
                            v-model="form.tagsId"
                            multiple
                            placeholder="请 选 择"
                            filterable
                            style="width: 80%;"
                        >
                            <el-option
                                v-for="item in tags"
                                :key="item.id"
                                :label="item.tag"
                                :value="item.id"
                            />
                        </el-select>
                        <el-button type="info" style="margin-left: 20px;" @click="addTag">新增</el-button>
                    </el-form-item>
                    <el-form-item>
                        <div v-for="item in form.tagsId" :key="item">
                            <el-tag :color="getTag(item).color">{{ getTag(item).tag }}</el-tag>
                        </div>
                    </el-form-item>
                </el-form>
            </template>
            <template #footer>
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="updateDate">发 送</el-button>
            </template>
        </el-dialog>
        <!-- 新增标签拟态框 -->
        <el-dialog v-model.visible="dialogTagFormVisible" title="新增标签" draggable append-to-body>
            <el-form :model="tagForm">
                <el-form-item label="标签">
                    <el-tag :color="tagForm.color">{{ tagForm.tag }}</el-tag>
                </el-form-item>
                <el-form-item label="标签名">
                    <el-input v-model="tagForm.tag" maxlength="20" autocomplete="off" />
                </el-form-item>
                <el-form-item label="颜色选择">
                    <el-color-picker v-model="tagForm.color" show-alpha :predefine="predefineColors" @active-change="activeChange" />
                </el-form-item>
            </el-form>
            <template #footer>
                <el-button @click="dialogTagFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="updateTagDate">发 送</el-button>
            </template>
        </el-dialog>

        <!-- 保存草稿拟态框 -->
        <el-dialog v-model.visible="dialogVisible" title="请确定标题" draggable>
            <template #default>
                <el-form :model="form">
                    <el-form-item label="标题">
                        <el-input v-model="form.title" maxlength="200" autocomplete="off" />
                    </el-form-item>
                    <el-form-item label="作者">
                        <el-input v-model="form.author" maxlength="20" type="email" autocomplete="off" />
                    </el-form-item>
                </el-form>
            </template>
            <template #footer>
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveConfirm">保 存</el-button>
            </template>
        </el-dialog>
    </page-main>
</template>

<script>
import {
    Editor,
    Toolbar
} from '@wangeditor/editor-for-vue'
import api from '@/api'
import apiUrl from '@/api/url'
export default {
    name: 'MyEditor',
    components: {
        Editor,
        Toolbar
    },
    data() {
        return {
            dialogVisible: false,
            loading: false,
            predefineColors: [
                '#409EFF',
                '#67C23A',
                '#E6A23C',
                '#F56C6C',
                '#909399',
                '#000000',
                '#F2F6FC'
            ],
            dialogTagFormVisible: false,
            editor: null,
            dialogFormVisible: false,
            html: '',
            toolbarConfig: {
                // toolbarKeys: [ /* 显示哪些菜单，如何排序、分组 */ ],
                // excludeKeys: [ /* 隐藏哪些菜单 */ ],
            },
            editorConfig: {
                placeholder: '请输入内容...',
                // autoFocus: false,

                // 所有的菜单配置，都要在 MENU_CONF 属性下
                MENU_CONF: {}
            },
            form: {
                id: '-1',
                title: '',
                content: '',
                author: '',
                avatar: '',
                tagsId: []
            },
            tags: [],
            tagForm: {
                tag: '',
                color: ''
            }
        }
    },
    watch: {
        html() {
            let view = document.querySelector('.viewHtml')
            view.scrollTop = view.scrollHeight
        }
    },
    mounted() {
        if (this.$route.query.id != undefined) {
            this.loading = true
            api.get(apiUrl.draftDetail, {
                params: {
                    id: this.$route.query.id
                }
            }).then(response => {
                this.html = response.data.content
                this.form.title = response.data.title
                this.form.author = response.data.author
                this.form.id = response.data.id
                this.loading = false
            }).catch(error => {
                this.loading = false
                ElMessage.error('草稿获取失败', error.msg)
                this.Tagsloading = false
            })
        }
    },
    beforeUnmount() {
        const editor = this.editor
        if (editor == null) return
        editor.destroy() // 组件销毁时，及时销毁 editor ，重要！！！
    },
    methods: {
        // 文章上传操作
        updateDate() {
            // 更新操作
            api.post(apiUrl.addArticle, this.form).then(() => {
                ElMessage.success('操作成功！')
                this.dialogFormVisible = false
            }).catch(error => {
                ElMessage.error(error.msg)
                this.dialogFormVisible = false
            })
        },
        // 标签新增上传操作
        updateTagDate() {
            api.post(apiUrl.addTag, this.tagForm).then(() => {
                ElMessage.success('标签已添加')
                this.dialogTagFormVisible = false
                this.getTags()
            }).catch(error => {
                ElMessage.error(error.msg)
                this.dialogTagFormVisible = false
            })
        },
        // 颜色选择器实时更新
        activeChange(color) {
            this.tagForm.color = color
        },
        // 增加标签按钮
        addTag() {
            this.dialogTagFormVisible = true
        },
        // 根据选择的标签的id获得标签信息
        getTag(id) {
            let res = this.tags.filter(data => {
                return data.id == id
            })
            return res[0]
        },
        onCreated(editor) {
            this.editor = Object.seal(editor) // 【注意】一定要用 Object.seal() 否则会报错
        },
        onChange() {
            // console.log(editor)
            // console.log('onChange', editor.getHtml()) // onChange 时获取编辑器最新内容
        },
        toPublic() {
            // 发布文章
            this.form.content = this.html
            this.dialogFormVisible = true
            this.getTags()
        },
        // 保存草稿按钮
        save() {
            this.form.content = this.html
            this.dialogVisible = true
        },
        // 确定保存草稿
        saveConfirm() {
            this.dialogVisible = false
            this.loading = true
            let url = apiUrl.addDraft
            this.date = null
            if (this.$route.query.id != undefined) {
                url = apiUrl.updateDraft
            }
            api.post(url, this.form).then(response => {
                this.tags = response.data
                this.loading = false
                ElMessage.success('保存成功')
            }).catch(() => {
                ElMessage.error('保存失败')
                this.loading = false
            })
        },
        // 获取所有标签
        getTags() {
            this.Tagsloading = true
            api.get(apiUrl.tags).then(response => {
                this.tags = response.data
                this.Tagsloading = false
            }).catch(error => {
                ElMessage.error(error.msg)
                this.Tagsloading = false
            })
        }
    }
}
</script>

<style scoped>
/* stylelint-disable value-no-vendor-prefix */
.button {
    position: absolute;
    width: 100%;
    top: 0;
    right: 0;
}
.button .el-button {
    float: right;
    margin-right: 25px;
}
.inputArea {
    flex: 1;
    height: 100%;
    overflow-y: scroll;
}
.container {
    overflow: hidden;
    position: absolute;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    overflow-y: scroll;
    height: -webkit-fill-available;
    width: -webkit-fill-available;
}
.viewHtml {
    flex: 1;
    border: 10px double azure;
    overflow: scroll;
}
.page-main {
    height: -webkit-fill-available;
    width: -webkit-fill-available;
    position: absolute;
}
.editor {
    height: 225px;
}
.el-tag {
    color: #ffffffc2;
}
</style>
<!-- editoer的css -->
<style>
* {
    box-sizing: border-box;
}
div[role="application"] {
    height: -webkit-fill-available !important;
    width: -webkit-fill-availablee !important;
}
</style>
<style src="@wangeditor/editor/dist/css/style.css"></style>
