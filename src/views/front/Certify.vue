<template>
    <div style="margin: 0 auto;height: 700px;width: 800px;background-color: #fafafa">
        <el-steps align-center :active="active" finish-status="success">
            <el-step title="步骤1" description="请提交《企业法人营业执照》或者《个体工商户营业执照》"></el-step>
            <el-step title="步骤2" description="请提交《企业认证公函》"></el-step>
            <el-step title="步骤3" description="请提交《商标注册证》或《代理授权书》等"></el-step>
            <el-step title="步骤4" description="请提交税务登记证"></el-step>
        </el-steps>
        <el-card class="box-card" style="min-height: 500px;width: 500px;margin: 0 auto" v-if="active===0">
            <div slot="header" class="clearfix">
                <el-button style="float: left; padding: 3px 0" @click="pre" type="text">上一步</el-button>
                <el-button style="float: right; padding: 3px 0" @click="next" type="text">下一步</el-button>
            </div>
            <el-upload
                    style="text-align: center"
                    class="upload-demo"
                    drag
                    action="http://localhost:9090/file/upload"
                    multiple
                    :limit="4"
                    accept=".jpg"
                    :headers="myHeaders"
                    :on-success="handleAvatarSuccess1"
            >
                <i class="el-icon-upload"></i>
                <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                <div class="el-upload__tip" slot="tip">只能上传jpg文件</div>
            </el-upload>
            <el-input disabled style="margin: 0 auto;text-align: center" v-model="form.businessLicence"
                      placeholder="文件上传链接"></el-input>
        </el-card>
        <el-card class="box-card" style="min-height: 500px;width: 500px;margin: 0 auto" v-if="active===1">
            <div slot="header" class="clearfix">
                <el-button style="float: left; padding: 3px 0" @click="pre" type="text">上一步</el-button>
                <el-button style="float: right; padding: 3px 0" @click="next" type="text">下一步</el-button>
            </div>
            <el-upload
                    style="text-align: center"
                    class="upload-demo"
                    drag
                    action="http://localhost:9090/file/upload"
                    :headers="myHeaders"
                    handleAvatarSuccess3
                    multiple
                    :limit="4"
                    accept=".jpg"
                    :on-success="handleAvatarSuccess2"
            >
                <i class="el-icon-upload"></i>
                <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                <div class="el-upload__tip" slot="tip">只能上传jpg文件</div>
            </el-upload>
            <el-input disabled style="margin: 0 auto;text-align: center" v-model="form.certificationLetter"
                      placeholder="文件上传链接"></el-input>
        </el-card>
        <el-card class="box-card" style="min-height: 500px;width: 500px;margin: 0 auto" v-if="active===2">
            <div slot="header" class="clearfix">
                <el-button style="float: left; padding: 3px 0" @click="pre" type="text">上一步</el-button>
                <el-button style="float: right; padding: 3px 0" @click="next" type="text">下一步</el-button>
            </div>
            <el-upload
                    style="text-align: center"
                    class="upload-demo"
                    drag
                    action="http://localhost:9090/file/upload"
                    :headers="myHeaders"
                    :on-success="handleAvatarSuccess3"
                    multiple
                    :limit="4"
                    accept=".jpg"
            >
                <i class="el-icon-upload"></i>
                <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                <div class="el-upload__tip" slot="tip">只能上传jpg文件</div>
            </el-upload>
            <el-input disabled style="margin: 0 auto;text-align: center" v-model="form.registrationCertificate"
                      placeholder="文件上传链接"></el-input>
        </el-card>
        <el-card class="box-card" style="min-height: 500px;width: 500px;margin: 0 auto" v-if="active===3">
            <div slot="header" class="clearfix">
                <el-button style="float: left; padding: 3px 0" @click="pre" type="text">上一步</el-button>
                <el-button style="float: right; padding: 3px 0" @click="next" type="text">下一步</el-button>
            </div>
            <el-upload
                    style="text-align: center"
                    class="upload-demo"
                    drag
                    action="http://localhost:9090/file/upload"
                    :headers="myHeaders"
                    :on-success="handleAvatarSuccess4"
                    multiple
                    :limit="4"
                    accept=".jpg"
            >
                <i class="el-icon-upload"></i>
                <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                <div class="el-upload__tip" slot="tip">只能上传jpg文件</div>
            </el-upload>
            <el-input disabled style="margin: 0 auto;text-align: center" v-model="form.taxCertificate"
                      placeholder="文件上传链接"></el-input>
            <el-button @click="submitCertify" size="big" style="margin-top: 60px;margin-left: 40%" type="danger">提交
            </el-button>
        </el-card>

    </div>
</template>

<script>
    export default {
        data() {
            return {
                active: 0,
                form: {
                    businessLicence: null,
                    certificationLetter: null,
                    registrationCertificate: null,
                    taxCertificate: null,

                },
                myHeaders: {token:JSON.parse(localStorage.getItem("token"))},
            };
        },
        methods: {
            next() {
                if (this.active++ > 2) this.active = 0;
            },
            pre() {
                --this.active
                if (this.active < 0) this.active = 0;
            },
            handleAvatarSuccess1(res) {
                this.form.businessLicence = res
            },
            handleAvatarSuccess2(res) {
                this.form.certificationLetter = res
            },
            handleAvatarSuccess3(res) {
                this.form.registrationCertificate = res
            },
            handleAvatarSuccess4(res) {
                this.form.taxCertificate = res
            },
            submitCertify() {
                if (this.form.businessLicence == null || this.form.certificationLetter == null || this.form.registrationCertificate == null || this.form.taxCertificate == null) {
                    this.$message.error("上传的图片不可以为空")
                } else if (JSON.parse(localStorage.getItem("user")).rolename === "ROLE_USER") {
                    this.request.post("/certify/submit", this.form).then(res => {
                        if (res.code === '200') {
                            this.$message.success("提交成功")
                            // this.form = {}
                        } else {
                            this.$message.error("保存失败")
                        }
                    })
                } else {
                    this.$message.warning("你已经是企业用户，不要重复提交")
                }

            }
        }
    }
</script>

<style scoped>

</style>