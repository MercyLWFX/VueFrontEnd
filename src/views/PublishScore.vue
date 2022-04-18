<template>
    <div>
        <el-table :data="tableData"
                  border stripe
                  :header-cell-class-name="headerBg"
                  max-height="480px"
                  @selection-change="handleSelectionChange">

            <el-table-column
                    type="selection"
                    width="55">
            </el-table-column>
            <el-table-column prop="id" sortable label="id" width="350">
            </el-table-column>
            <el-table-column prop="name" label="比赛名称" width="640">
            </el-table-column>
            <el-table-column  label="操作">
                <template slot-scope="scope">
                    <el-button type="primary" @click="publish(scope.row.id)">公布竞赛成绩</el-button>
                    <el-button type="danger"  @click="statistics(scope.row.id)">成绩统计</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div style="padding: 10px 0">
            <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="pageNum"
                    :page-sizes="[2, 5, 10, 20]"
                    :page-size="pageSize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="total">
            </el-pagination>
        </div>

        <el-dialog title="参赛成员" :visible.sync="vis" width="40%">
            <el-table :data="userInfo" border stripe>
                <el-table-column prop="avatarUrl" label="头像" width="80">
                    <template slot-scope="scope">
                        <el-avatar size="medium" :src="scope.row.avatarUrl"></el-avatar>
                    </template>
                </el-table-column>
                <el-table-column prop="username" label="用户名">
                </el-table-column>
                <el-table-column label="成绩">
                    <template slot-scope="scope">
                        <el-input placeholder="请输入内容" v-model="scope.row.score" ></el-input>
                    </template>
                </el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button @click="showInfo(scope.row.id)">查看参赛人员信息</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-button type="danger" @click="pushScore()">提交</el-button>
        </el-dialog>
        <el-dialog title="成绩统计" :visible.sync="viss" width="30%">
            平均分<el-input  disabled v-model="scoreInfo.avg" ></el-input>
            最高分<el-input  disabled v-model="scoreInfo.max" ></el-input>
            最低分<el-input  disabled v-model="scoreInfo.min" ></el-input>
        </el-dialog>
        <el-dialog title="基本信息" :visible.sync="visss" width="70%">
            <el-card style="width: 800px;min-height:630px;margin: 0 auto;">
                <el-form :model="ruleForm" ref="ruleForm"  label-width="100px" class="demo-ruleForm">
                    <el-form-item label="姓名" prop="name">
                        <el-input disabled v-model="ruleForm.name"></el-input>
                    </el-form-item>
                    <el-form-item label="民族" prop="nation">
                        <el-input disabled v-model="ruleForm.nation"></el-input>
                    </el-form-item>
                    <el-form-item label="性别">
                        <el-input disabled v-model="ruleForm.sex"></el-input>
                    </el-form-item>
                    <el-form-item label="出生年月日">
                        <el-input disabled v-model="ruleForm.birthday"></el-input>
                    </el-form-item>
                    <el-form-item label="身份证号" prop="idcard">
                        <el-input disabled v-model="ruleForm.idcard"></el-input>
                    </el-form-item>
                    <el-form-item label="通讯地址" prop="address">
                        <el-input disabled v-model="ruleForm.address"></el-input>
                    </el-form-item>
                    <el-form-item label="邮编" prop="postCode">
                        <el-input disabled v-model="ruleForm.postCode"></el-input>
                    </el-form-item>
                    <el-form-item label="手机号" prop="phone" >
                        <el-input disabled v-model="ruleForm.phone"></el-input>
                    </el-form-item>
                    <el-form-item  label="电子邮件" prop="email" >
                        <el-input disabled v-model="ruleForm.email"></el-input>
                    </el-form-item>
                    <el-form-item label="在读学校" prop="school">
                        <el-input disabled v-model="ruleForm.school"></el-input>
                    </el-form-item>
                    <el-form-item label="学位层次" prop="educationalLevel">
                        <el-input disabled v-model="ruleForm.educationalLevel"></el-input>
                    </el-form-item>
                    <el-form-item label="毕业院校" prop="graduated">
                        <el-input disabled v-model="ruleForm.graduated"></el-input>
                    </el-form-item>
                    <el-form-item label="毕业时间">
                        <el-input disabled v-model="ruleForm.graduatedDate"></el-input>
                    </el-form-item>
                    <el-form-item label="专业" prop="major">
                        <el-input disabled v-model="ruleForm.major" ></el-input>
                    </el-form-item>
                    <el-form-item label="工作单位名称" prop="workplace">
                        <el-input disabled v-model="ruleForm.workplace" placeholder="没有请填无"></el-input>
                    </el-form-item>
                    <el-form-item label="工作单位地址" prop="workAddress">
                        <el-input disabled v-model="ruleForm.workAddress" placeholder="没有请填无"></el-input>
                    </el-form-item>
                    <el-form-item label="职务" prop="job">
                        <el-input disabled v-model="ruleForm.job" placeholder="没有请填无"></el-input>
                    </el-form-item>
                    <el-button @click="visss=false">关闭</el-button>
                </el-form>
            </el-card>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "PublishScore",
        data() {
            return {
                tableData: [],
                score:null,
                examId:null,
                total: 0,
                pageNum: 1,
                pageSize: 5,
                examName: null,
                dialogFormVisible: false,
                multipleSelection: [],
                drawer: false,
                vis: false,
                viss:false,
                visss:false,
                scoreInfo:{
                    avg:null,
                    min:null,
                    max:null
                },
                direction: 'rtl',
                form: {
                    id: null,
                    name: null,
                    start: null,
                    end: null,
                    types: null,
                    master:null,
                    imgurl:null,
                    detail:null,
                    address:null,
                    userId:null
                },
                headerBg: 'headerBg',
                category:{},
                detail:null,
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
                },
                userInfo:[],
                ruleForm:{}
            }
        },
        created() {
            this.load()
        },
        methods: {
            statistics(val){

                this.request.get("/sign/statistics",{
                    params:{
                        examId: val
                    }
                }).then(res=>{
                    if (res.code==="200"){
                        // console.log(res.data)
                        this.scoreInfo=res.data
                        console.log(this.scoreInfo)
                        this.viss=true
                    }
                })
            },
            showInfo(id){
                this.request.get("/form/"+ id).then(res => {
                    if (res.code === '200') {
                        console.log(res)
                        this.ruleForm=res.data
                        this.visss=true
                    } else {
                        this.$message.error(res.msg)
                    }
                })
            },

            pushScore(){
                this.userInfo.examId=this.examId
                this.userInfo.forEach((e)=>{
                    e.examId=this.examId
                })
                // console.log(this.userInfo)
                this.request.post("/sign/scores",this.userInfo).then(res => {
                   if (res.code==='200'){
                       this.$message.success("提交成功")
                       this.vis=false
                   }else {
                       this.$message.error("系统错误，请稍后再试")
                   }
                })
                this.userInfo=[]

            },
            publish(val){
                this.examId=val
                this.request.get("/sign/publish", {
                    params: {
                        examId: val
                    }
                }).then(res => {
                    console.log(11111111111111111111111111111111111111111111111111111111)
                    console.log(res)
                    if (res.data.length!=0){
                        this.userInfo=res.data[0].competitions
                        this.vis=true
                    }else {
                        this.$message.error("暂未有有人参加本次竞赛，请稍后重试")
                        this.vis=false
                    }

                    // console.log(this.userInfo)
                })
            },
            handleAvatarSuccess(res) {
                this.form.imgurl = res
            },
            handleClose(done) {
                this.$confirm('确认关闭？')
                    .then(_ => {
                        done();
                    })
                    .catch(_ => {});
            },
            load() {
                this.request.get("/competition/pages", {
                    params: {
                        pageNum: this.pageNum,
                        pageSize: this.pageSize,
                        name: this.name
                    }
                }).then(res => {
                    console.log(res)
                    this.tableData = res.data.records
                    this.total = res.total
                })

                this.request.get("/classes").then(res => {
                    this.category=res.data
                })
            },
            //发送请求
            handleSizeChange(pageSize) {
                // console.log(pageSize)
                this.pageSize = pageSize
                this.load()
            },
            // 改变页面数据个数
            handleCurrentChange(pageNum) {
                // console.log(pageNum)
                this.pageNum = pageNum
                this.load()
            },
            //当前页数
            searchByName() {
                this.load()
            },
            //按钮的点击事件
            //    选择框的数据转换
            reset() {
                this.examName = null
                this.load()
            },
            handleAdd() {
                this.dialogFormVisible = true
                this.form = {}
            },
            save() {
                console.log(this.form)
                this.request.post("/competition/insert", this.form).then(res => {
                    if (res.code=='200') {
                        this.$message.success("保存成功")
                        this.dialogFormVisible = false
                        this.form = {}
                        this.load()
                    } else {
                        this.$message.error(res.msg)
                    }
                })
            },
            //保存和修改
            handleEdit(value) {
                // console.log(value)
                this.form = value
                this.dialogFormVisible = true
            },
            del(id) {
                console.log(id)
                this.request.delete("/exam/del/" + id).then(res => {
                    if (res.code === '200') {
                        this.$message.success("删除成功")
                        this.load()
                        this.dialogFormVisible = false
                    } else {
                        this.$message.error("删除失败")
                    }
                })
            },
            //    删除

            handleSelectionChange(val) {
                this.multipleSelection = val
            },
            //    批量删除
            delBatch() {
                let ids = this.multipleSelection.map(v => v.id)  // [{}, {}, {}] => [1,2,3]
                this.request.post("/exam/batchdel", ids).then(res => {
                    if (res.code === '200') {
                        this.$message.success("批量删除成功")
                        this.load()
                    } else {
                        this.$message.error("批量删除失败")
                    }
                })
            },
            filterHandler(value, row, column) {
                const property = column['property'];
                return row[property] === value;
            }
        },

    }
</script>

<style>
    .headerBg {
        background: #eee !important;
    }
</style>