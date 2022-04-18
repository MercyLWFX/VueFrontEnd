<template>
    <el-card style="width: 500px">
        <el-form label-width="120px" size="small" :model="formData" :rules="rules" ref="formData">

            <el-form-item label="原密码" prop="password">
                <el-input v-model="formData.password" autocomplete="off" show-password></el-input>
            </el-form-item>
            <el-form-item label="新密码" prop="newPassword">
                <el-input v-model="formData.newPassword" autocomplete="off" show-password></el-input>
            </el-form-item>
            <el-form-item label="确认新密码" prop="confirmPassword">
                <el-input v-model="formData.confirmPassword" autocomplete="off" show-password></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="save('formData')">确 定</el-button>
            </el-form-item>
        </el-form>
    </el-card>
</template>

<script>
    export default {
        name: "password",
        data() {
            var validatePass = (rule, value, callback) => {
                // console.log(value)
                if (value === '') {
                    callback(new Error('请输入密码'));
                } else {
                    if (this.user.confirmPassword !== '') {
                        this.$refs.formData.validateField('confirmPassword');

                    }
                    callback();
                }
            };
            var validatePass2 = (rule, value, callback) => {
                console.log(value)
                if (value === '') {
                    callback(new Error('请再次输入密码'));
                } else if (value !== this.formData.newPassword) {
                    console.log(value)
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            };
            return {
                formData: {
                    password: '',
                    confirmPassword: '',
                    newPassword: ''
                },
                user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : {},
                rules: {
                    password: [
                        {validator: validatePass, trigger: 'blur'},
                    ],
                    confirmPassword: [
                        {validator: validatePass2, trigger: 'blur'},
                        {min: 5, message: '长度大于等于 5 个字符', trigger: 'blur'}
                    ],
                    newPassword: [
                        {validator: validatePass, trigger: 'blur'},
                        {min: 5, message: '长度大于等于 5 个字符', trigger: 'blur'}
                    ],

                }
            }
        },
        created() {
            this.formData.username = this.user.username
        },
        methods: {
            save(forName) {
                this.$refs.formData.validate((valid) => {
                    if (valid) {
                        const newForm = {
                            password: '',
                            newPassword: '',
                            username: ''
                        }
                        newForm.password = this.formData.password;
                        newForm.newPassword = this.formData.newPassword;
                        newForm.username = this.formData.username;
                        this.request.post("/user/password", newForm).then(res => {
                            if (res.code === '200') {
                                this.$message.success("修改成功")
                                this.$store.commit("logout")
                            } else {
                                this.$message.error(res.msg)
                            }
                        })
                    }
                })
            },
        }
    }
</script>

<style>
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
