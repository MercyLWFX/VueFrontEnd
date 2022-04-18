<template>
<div style="max-height: 400px">
    <el-form label-width="80px"  size="small">
        <el-form-item label="文章标题">
            <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="文章内容">
            <mavon-editor ref="md" v-model="form.content" :ishljs="true" @imgAdd="imgAdd"/>
        </el-form-item>
    </el-form>
    <div style="position: absolute;left: 55%">
        <el-button @click="form = {}">取 消</el-button>
        <el-button type="primary" @click="save">确 定</el-button>
    </div>
</div>
</template>

<script>
    import axios from "axios";
    export default {
        name: "CommunityArticles",
        data(){
            return{
                dialogFormVisible: false,
                form:{}
            }
        },
        methods:{
            save() {
                this.request.post("/article", this.form).then(res => {
                    if (res.code === '200') {
                        this.$message.success("保存成功")
                        this.form = {}
                    } else {
                        this.$message.error("保存失败")
                    }
                })
            },
            // 绑定@imgAdd event
            imgAdd(pos, $file) {
                let $vm = this.$refs.md
                // 第一步.将图片上传到服务器.
                const formData = new FormData();
                formData.append('file', $file);
                axios({
                    url: 'http://localhost:9090/file/upload',
                    method: 'post',
                    data: formData,
                    headers: {'Content-Type': 'multipart/form-data'},
                }).then((res) => {
                    // 第二步.将返回的url替换到文本原位置![...](./0) -> ![...](url)
                    $vm.$img2Url(pos, res.data);
                })
            },
        }
    }
</script>

<style scoped>

</style>