<template>
    <el-card style="width: 800px;min-height:630px;margin: 0 auto;">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm"  label-width="100px" class="demo-ruleForm">
            <el-form-item label="姓名" prop="name" required>
                <el-input v-model="ruleForm.name"></el-input>
            </el-form-item>
            <el-form-item label="民族" prop="nation" required>
                <el-select v-model="ruleForm.nation" placeholder="请选择民族">
                    <el-option label="阿昌族" value="阿昌族"></el-option>
                    <el-option label="鄂温克族" value="鄂温克族"></el-option>
                    <el-option label="傈僳族" value="傈僳族"></el-option>
                    <el-option label="水族" value="水族"></el-option>
                    <el-option label="白族" value="白族"></el-option>
                    <el-option label="高山族" value="高山族"></el-option>
                    <el-option label="仡佬族" value="仡佬族"></el-option>
                    <el-option label="满族" value="满族"></el-option>
                    <el-option label="保安族" value="保安族"></el-option>
                    <el-option label="塔塔尔族" value="塔塔尔族"></el-option>
                    <el-option label="布朗族" value="布朗族"></el-option>
                    <el-option label="哈尼族" value="哈尼族"></el-option>
                    <el-option label="毛南族" value="毛南族"></el-option>
                    <el-option label="土家族" value="土家族"></el-option>
                    <el-option label="布依族" value="布依族"></el-option>
                    <el-option label="哈萨克族" value="哈萨克族"></el-option>
                    <el-option label="门巴族" value="门巴族"></el-option>
                    <el-option label="土族" value="土族"></el-option>
                    <el-option label="朝鲜族" value="朝鲜族"></el-option>
                    <el-option label="汉族" value="汉族"></el-option>
                    <el-option label="蒙古族" value="蒙古族"></el-option>
                    <el-option label="佤族" value="佤族"></el-option>
                    <el-option label="达斡尔族" value="达斡尔族"></el-option>
                    <el-option label="赫哲族" value="赫哲族"></el-option>
                    <el-option label="苗族" value="苗族"></el-option>
                    <el-option label="维吾尔族" value="维吾尔族"></el-option>
                    <el-option label="傣族" value="傣族"></el-option>
                    <el-option label="回族" value="回族"></el-option>
                    <el-option label="仫佬族" value="仫佬族"></el-option>
                    <el-option label="乌孜别克族" value="乌孜别克族"></el-option>
                    <el-option label="德昂族" value="德昂族"></el-option>
                    <el-option label="基诺族" value="基诺族"></el-option>
                    <el-option label="纳西族" value="纳西族"></el-option>
                    <el-option label="锡伯族" value="锡伯族"></el-option>
                    <el-option label="东乡族" value="东乡族"></el-option>
                    <el-option label="京族" value="京族"></el-option>
                    <el-option label="怒族" value="怒族"></el-option>
                    <el-option label="瑶族" value="瑶族"></el-option>
                    <el-option label="侗族" value="侗族"></el-option>
                    <el-option label="景颇族" value="景颇族"></el-option>
                    <el-option label="普米族" value="普米族"></el-option>
                    <el-option label="彝族" value="彝族"></el-option>
                    <el-option label="独龙族" value="独龙族"></el-option>
                    <el-option label="柯尔克孜族" value="柯尔克孜族"></el-option>
                    <el-option label="羌族" value="羌族"></el-option>
                    <el-option label="裕固族" value="裕固族"></el-option>
                    <el-option label="俄罗斯族" value="俄罗斯族"></el-option>
                    <el-option label="拉祜族" value="拉祜族"></el-option>
                    <el-option label="撒拉族" value="撒拉族"></el-option>
                    <el-option label="藏族" value="藏族"></el-option>
                    <el-option label="鄂伦春族" value="鄂伦春族"></el-option>
                    <el-option label="黎族" value="黎族"></el-option>
                    <el-option label="畲族" value="畲族"></el-option>
                    <el-option label="壮族" value="壮族"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="性别" required>
                <el-radio v-model="ruleForm.sex" label="男">男</el-radio>
                <el-radio v-model="ruleForm.sex" label="女">女</el-radio>
            </el-form-item>
            <br>
            <el-form-item label="出生年月日" required>
                <el-col :span="11">
                    <el-form-item prop="birthday">
                        <el-date-picker type="date" placeholder="选择时间" v-model="ruleForm.birthday"
                                        format="yyyy-MM-dd" value-format="yyyy-MM-dd" style="width: 100%;"@change="birthday"></el-date-picker>
                    </el-form-item>
                </el-col>
            </el-form-item>
            <el-form-item label="身份证号" prop="idcard" required>
                <el-input v-model="ruleForm.idcard"></el-input>
            </el-form-item>

            <el-form-item label="通讯地址" prop="address" required>
                <el-input v-model="ruleForm.address"></el-input>
            </el-form-item>
            <el-form-item label="邮编" prop="postCode">
                <el-input v-model="ruleForm.postCode"></el-input>
            </el-form-item>
            <el-form-item label="手机号" prop="phone" required>
                <el-input v-model="ruleForm.phone"></el-input>
            </el-form-item>
            <el-form-item label="电子邮件" prop="email" required>
                <el-input v-model="ruleForm.email"></el-input>
            </el-form-item>
            <el-form-item label="在读学校" prop="school">
                <el-input v-model="ruleForm.school" placeholder="没有请填无"></el-input>
            </el-form-item>
            <el-form-item label="学位层次" prop="educationalLevel" required>
                <el-select v-model="ruleForm.educationalLevel" placeholder="请选择">
                    <el-option label="专科" value="专科"></el-option>
                    <el-option label="本科" value="本科"></el-option>
                    <el-option label="硕士" value="硕士"></el-option>
                    <el-option label="博士" value="博士"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="毕业院校" prop="graduated" required>
                <el-input v-model="ruleForm.graduated"></el-input>
            </el-form-item>
            <el-form-item label="毕业时间" required>
                <el-col :span="11">
                    <el-form-item prop="graduatedDate">
                        <el-date-picker type="date" placeholder="选择时间" format="yyyy-MM-dd" value-format="yyyy-MM-dd"
                                        v-model="ruleForm.graduatedDate" style="width: 100%;" @change="graduatedDate"></el-date-picker>
                    </el-form-item>
                </el-col>
            </el-form-item>
            <el-form-item label="专业" prop="major" required>
                <el-input v-model="ruleForm.major" ></el-input>
            </el-form-item>
            <el-form-item label="工作单位名称" prop="workplace">
                <el-input v-model="ruleForm.workplace" placeholder="没有请填无"></el-input>
            </el-form-item>
            <el-form-item label="工作单位地址" prop="workAddress">
                <el-input v-model="ruleForm.workAddress" placeholder="没有请填无"></el-input>
            </el-form-item>
            <el-form-item label="职务" prop="job">
                <el-input v-model="ruleForm.job" placeholder="没有请填无"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submit('ruleForm')">保存</el-button>
                <el-button @click="resetForm('ruleForm')">重置</el-button>
            </el-form-item>
        </el-form>
    </el-card>
</template>

<script>
    export default {
        name: 'ApplicationForm',
        data() {
            var checkEmail = (rule, value, callback) => {
                var regEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                if (value === '') {
                    callback(new Error("邮箱不能为空"))
                } else if (regEmail.test(value)) {
                    callback();
                } else {
                    callback(new Error("请输入合法的邮箱"));
                }
            };
            return {
                ruleForm: {
                    name: '',
                    nation: '',
                    idcard: '',
                    sex: '',
                    birthday: '',
                    address: '',
                    postCode: '',
                    phone: null,
                    graduatedDate:null,
                    graduated:'',
                    email: '',
                    school: '',
                    educationalLevel: '',
                    major: '',
                    workplace: '',
                    workAddress: '',
                    job: '',
                },
                rules: {
                    name: [
                        {required: true, message: '请输入姓名', trigger: 'blur'},
                    ],
                    nation: [
                        {required: true, message: '请选择民族', trigger: 'blur'},
                    ],
                    sex: [
                        {required: true, message: '请选择性别', trigger: 'blur'},
                    ],
                    address: [
                        {required: true, message: '请输入通讯地址', trigger: 'blur'}
                    ],
                    birthday: [
                        {type: 'string', required: true, message: '请选择出生日期', trigger: 'change'}
                    ],
                    graduatedDate: [
                        {type: 'string', required: true, message: '请选择毕业日期', trigger: 'change'}
                    ],
                    email: [
                        {validator: checkEmail, trigger: "blur"},
                    ],
                    phone: [
                        // {type: 'number',required: true,message: '请输入手机号',trigger: 'blur'},
                        { pattern: /^1[3456789]\d{9}$/, message: '手机号码格式不正确', trigger: 'blur' }
                    ],
                    idcard: [
                        { required: true, message: '请填写证件号码', trigger: 'blur' },
                        {
                            pattern: /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}$)/,
                            message: '证件号码格式有误！',
                            trigger: 'blur'
                        }
                    ],
                },
                value2: '',
                user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : {}
            };
        },
        created() {
            this.load()
        },
        methods: {
            load(){
                this.request.get("/form/"+ this.user.id).then(res => {
                    if (res.code === '200') {
                        console.log(res)
                        this.ruleForm=res.data
                    } else {
                        this.$message.error(res.msg)
                    }
                })
            },
            submit(formName) {
                console.log(this.ruleForm)
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.request.post("/form/insert", this.ruleForm).then(res => {
                            if (res.code === '200') {
                                this.$message.success("保存成功")
                            } else {
                                this.$message.error(res.msg)
                            }
                        })
                    } else {
                        console.log('请求出错');
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.ruleForm = {};
            },
            graduatedDate(date){
                this.ruleForm.graduatedDate = date
            },
            birthday(date){
                this.ruleForm.birthday=date
            }
        }
    }
</script>