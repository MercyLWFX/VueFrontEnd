<template>
    <el-card style="width: 800px;min-height:630px;margin: 0 auto">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="竞赛名称" prop="name">
                <el-input v-model="ruleForm.name"></el-input>
            </el-form-item>
            <el-form-item label="比赛地址" prop="address">
                <el-input v-model="ruleForm.address"></el-input>
            </el-form-item>
            <el-form-item label="报名时间" required>
                <el-col :span="11">
                    <el-form-item prop="date1">
                        <el-date-picker type="date" placeholder="选择报名开始时间" value-format="yyyy-MM-dd" v-model="ruleForm.start" style="width: 100%;"></el-date-picker>
                    </el-form-item>
                </el-col>
            </el-form-item>
            <el-form-item label="结束时间" required>
                <el-col :span="11">
                    <el-form-item prop="date1">
                        <el-date-picker type="date" placeholder="选择报名结束时间" value-format="yyyy-MM-dd" v-model="ruleForm.end" style="width: 100%;"></el-date-picker>
                    </el-form-item>
                </el-col>
            </el-form-item>
            <el-form-item label="竞赛性质" prop="types">
                <el-select v-model="ruleForm.types" placeholder="请选择比赛性质">
                    <el-option label="创业大赛" value="创业大赛"></el-option>
                    <el-option label="营销策划" value="营销策划"></el-option>
                    <el-option label="金融比赛" value="金融比赛"></el-option>
                    <el-option label="广告创意" value="广告创意"></el-option>
                    <el-option label="设计比赛" value="设计比赛"></el-option>
                    <el-option label="IT应用开发" value="IT应用开发"></el-option>
                    <el-option label="文学演讲" value="文学演讲"></el-option>
                    <el-option label="播音主持" value="播音主持"></el-option>
                    <el-option label="动漫书画" value="动漫书画"></el-option>
                    <el-option label="影视摄影" value="影视摄影"></el-option>
                    <el-option label="学科学术" value="学科学术"></el-option>
                    <el-option label="科技大赛" value="科技大赛"></el-option>
                    <el-option label="公益大赛" value="公益大赛"></el-option>
                    <el-option label="武道武术" value="武道武术"></el-option>
                    <el-option label="体育竞赛" value="体育竞赛"></el-option>
                    <el-option label="选秀唱歌" value="选秀唱歌"></el-option>
                    <el-option label="游戏竞技" value="游戏竞技"></el-option>
                    <el-option label="其他比赛" value="其他比赛"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="主办方" prop="master">
                <el-input v-model="ruleForm.master"></el-input>
            </el-form-item>
            <el-upload
                    class="upload-demo"
                    drag
                    action="http://localhost:9090/file/upload"
                    :on-success="handleAvatarSuccess"
                    style="position: relative;left: 100px"
                    multiple>
                <i class="el-icon-upload"></i>
                <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                <div class="el-upload__tip" slot="tip" style="margin: 0 auto">比赛宣传图</div>
            </el-upload>
            <el-form-item label="海报地址">
                <el-input v-model="ruleForm.imgurl"></el-input>
            </el-form-item>
            <el-form-item label="详情信息" prop="detail">
                <el-input type="textarea" v-model="ruleForm.detail"></el-input>
            </el-form-item>

            <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
                <el-button @click="resetForm('ruleForm')">重置</el-button>
            </el-form-item>
        </el-form>
    </el-card>
</template>

<script>
    export default {
        name:'ReleaseExam',
        data() {
            return {
                ruleForm: {
                    name: '',
                    address: '',
                    start: '',
                    end: '',
                    types: '',
                    master: '',
                    imgurl: '',
                    detail: '',
                },
                rules: {
                    name:[
                        { required: true, message: '请输入活动名称', trigger: 'blur' },
                        { min: 3, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                    ],
                    address: [
                        { required: true, message: '请输入活动区域', trigger: 'blur' }
                    ],
                    start: [
                        { type: 'date', required: true, message: '请选择开始日期', trigger: 'change' }
                    ],
                    end: [
                        { type: 'date', required: true, message: '请选择结束时间', trigger: 'change' }
                    ],
                    types: [
                        { required: true, message: '请至少选择一个活动性质', trigger: 'change' }
                    ],
                    master: [
                        { required: true, message: '请输入比赛主办方', trigger: 'blur' }
                    ],
                    detail: [
                        { required: true, message: '请填写详情信息', trigger: 'blur' }
                    ]
                }
            };
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.request.post("/competition/insert", this.ruleForm).then(res => {
                            if (res.code === '200') {
                                this.$message.success("保存成功")
                                this.ruleForm={}
                            } else {
                                this.$message.error(res.msg)
                            }
                        })
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.ruleForm={};
            },
            handleAvatarSuccess(res) {
                this.ruleForm.imgurl = res
            },
        }
    }
</script>