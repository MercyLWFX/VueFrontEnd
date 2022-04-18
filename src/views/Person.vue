<!--<template>-->
<!--    <el-card style="width: 500px;">-->
<!--        <el-form label-width="80px" size="small" >-->
<!--            <el-upload-->
<!--                    class="avatar-uploader"-->
<!--                    action="http://localhost:9090/file/upload"-->
<!--                    :show-file-list="false"-->
<!--                    :on-success="handleAvatarSuccess"-->
<!--            >-->
<!--                <img v-if="form.avatarUrl" :src="form.avatarUrl" class="avatar">-->
<!--                <i v-else class="el-icon-plus avatar-uploader-icon"></i>-->
<!--            </el-upload>-->
<!--            <el-form-item label="用户名">-->
<!--                <el-input v-model="form.username" autocomplete="off"></el-input>-->
<!--            </el-form-item>-->
<!--            <el-form-item label="邮箱">-->
<!--                <el-input v-model="form.email" autocomplete="off"></el-input>-->
<!--            </el-form-item>-->
<!--            <el-form-item label="电话">-->
<!--                <el-input v-model="form.phone" autocomplete="off"></el-input>-->
<!--            </el-form-item>-->
<!--            <el-form-item label="账户余额">-->
<!--                <el-input v-model="form.money" autocomplete="off"></el-input>-->
<!--            </el-form-item>-->
<!--            <el-form-item label="账户余额">-->
<!--                <el-input v-model="form.nickname" autocomplete="off"></el-input>-->
<!--            </el-form-item>-->
<!--            <el-form-item>-->
<!--                <el-button type="primary" @click="save">确 定</el-button>-->
<!--            </el-form-item>-->
<!--        </el-form>-->
<!--    </el-card>-->
<!--</template>-->

<!--<script>-->
<!--    export default {-->
<!--        name: "",-->
<!--        data() {-->
<!--            return {-->
<!--                form: {-->
<!--                    /*id: null,-->
<!--                    username: null,-->
<!--                    phone: null,-->
<!--                    email: null,-->
<!--                    money: null,-->
<!--                    roleid: null,-->
<!--                    nickname:null,-->
<!--                    address:null,-->
<!--                    avatarUrl:null,-->
<!--                    age:null,-->
<!--                    sex:null,-->
<!--                    birth:null,-->
<!--                    hobby:null,*/-->
<!--                },-->
<!--                user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : {},-->
<!--            }-->
<!--        },-->
<!--        created() {-->
<!--            this.request.get("/user/person/" + this.user.username).then(res => {-->
<!--                if (res.code === '200') {-->
<!--                    this.form = res.data-->
<!--                }-->
<!--            })-->
<!--        },-->
<!--        methods: {-->
<!--            async getUser() {-->
<!--                return (await this.request.get("/user/username/" + this.user.username)).data-->
<!--            },-->
<!--            save() {-->
<!--                this.request.post("/user/insert", this.form).then(res => {-->
<!--                    if (res) {-->
<!--                        this.$message.success("保存成功")-->

<!--                        // 更新浏览器存储的用户信息-->
<!--                        this.getUser().then(res => {-->
<!--                            res.token = JSON.parse(localStorage.getItem("user")).token-->
<!--                            localStorage.setItem("user", JSON.stringify(res))-->
<!--                        })-->

<!--                    } else {-->
<!--                        this.$message.error("保存失败")-->
<!--                    }-->
<!--                })-->
<!--            },-->
<!--            handleAvatarSuccess(res) {-->
<!--                this.form.avatarUrl = res-->
<!--            },-->
<!--        },-->
<!--    }-->
<!--</script>-->

<!--<style scoped>-->
<!--    .avatar-uploader {-->
<!--        text-align: center;-->
<!--        padding-bottom: 10px;-->
<!--    }-->

<!--    .avatar-uploader .el-upload {-->
<!--        border: 1px dashed #d9d9d9;-->
<!--        border-radius: 6px;-->
<!--        cursor: pointer;-->
<!--        position: relative;-->
<!--        overflow: hidden;-->
<!--    }-->

<!--    .avatar-uploader .el-upload:hover {-->
<!--        border-color: #409EFF;-->
<!--    }-->

<!--    .avatar-uploader-icon {-->
<!--        font-size: 28px;-->
<!--        color: #8c939d;-->
<!--        width: 138px;-->
<!--        height: 138px;-->
<!--        line-height: 138px;-->
<!--        text-align: center;-->
<!--    }-->

<!--    .avatar {-->
<!--        width: 138px;-->
<!--        height: 138px;-->
<!--        display: block;-->
<!--    }-->
<!--</style>-->

<template>
    <el-card style="width: 500px;">
        <el-form label-width="80px" size="small">
            <el-upload
                    class="avatar-uploader"
                    action="http://localhost:9090/file/upload"
                    :show-file-list="false"
                    :on-success="handleAvatarSuccess"
                    :headers="myHeaders"
            >
                <img v-if="form.avatarUrl" :src="form.avatarUrl" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
            <el-form-item label="用户名">
                <el-input v-model="form.username" disabled autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="邮箱">
                <el-input v-model="form.email" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="电话">
                <el-input v-model="form.phone" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="账户余额">
                <el-input v-model="form.money" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="昵称">
                <el-input v-model="form.nickname" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="save">确 定</el-button>
            </el-form-item>
        </el-form>
    </el-card>
</template>

<script>
    export default {
        name: "person",

        data() {
            return {
                form: {
                    /*id: null,
                    username: null,
                    phone: null,
                    email: null,
                    money: null,
                    roleid: null,
                    nickname:null,
                    address:null,
                    avatarUrl:null,
                    age:null,
                    sex:null,
                    birth:null,
                    hobby:null,*/
                },
                user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : {},
                myHeaders: {token:JSON.parse(localStorage.getItem("token"))},
            }
        },
        created() {
            this.request.get("/user/person/" + this.user.username).then(res => {
                if (res.code === '200') {
                    this.form = res.data
                }
            })
        },
        methods: {
            async getUser() {
                return (await this.request.get("/user/username/" + this.user.username)).data
            },
            save() {
                this.request.post("/user/insert", this.form).then(res => {
                    if (res) {
                        this.$message.success("保存成功")


                        //触发父级更新user的方法
                        this.$emit("refreshUser")

                        // 更新浏览器存储的用户信息
                        this.getUser().then(res => {
                            res.token = JSON.parse(localStorage.getItem("user")).token
                            localStorage.setItem("user", JSON.stringify(res))
                        })

                    } else {
                        this.$message.error("保存失败")
                    }
                })
            },
            handleAvatarSuccess(res) {
                this.form.avatarUrl = res
            },

        },
        mounted() {
            console.log(this.myHeaders)
            // this.myHeaders = JSON.parse(localStorage.getItem("token"))
            // console.log(this.myHeaders)
        }
    }
</script>

<style scoped>
    .avatar-uploader {
        text-align: center;
        padding-bottom: 10px;
    }

    .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }

    .avatar-uploader .el-upload:hover {
        border-color: #409EFF;
    }

    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 138px;
        height: 138px;
        line-height: 138px;
        text-align: center;
    }

    .avatar {
        width: 138px;
        height: 138px;
        display: block;
    }
</style>