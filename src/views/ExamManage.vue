<template>
    <div>
        <div style="margin: 10px 0">
            <el-input style="width: 200px" placeholder="部门查询" suffix-icon="el-icon-search"
                      v-model="examName"></el-input>

            <el-button class="ml-5" type="primary" @click="searchByName">搜索</el-button>
            <el-button class="ml-5" type="warning" @click="reset">重置</el-button>
        </div>

        <div style="margin: 10px 0">
            <el-button type="primary" @click="handleAdd">新增 <i class="el-icon-circle-plus-outline"></i>
            </el-button>
            <el-popconfirm
                    class="ml-5"
                    confirm-button-text='确定吗'
                    cancel-button-text='再想想'
                    icon="el-icon-info"
                    icon-color="red"
                    title="您确定批量删除这些数据吗？"
                    @confirm="delBatch"
            >
                <el-button type="danger" slot="reference">批量删除 <i class="el-icon-remove-outline"></i>
                </el-button>
            </el-popconfirm>
            <!--            <el-button type="primary" class="ml-5" @click="exp">导出 <i class="el-icon-top"></i></el-button>-->
        </div>

        <el-table :data="tableData"
                  border stripe
                  :header-cell-class-name="headerBg"
                  max-height="480px"
                  @selection-change="handleSelectionChange">

            <el-table-column
                    type="selection"
                    width="55">
            </el-table-column>
            <el-table-column prop="id" sortable label="id" width="60">
            </el-table-column>
            <el-table-column prop="name" label="比赛名称" width="140">
            </el-table-column>
<!--            <el-table-column-->
<!--                    prop="classes"-->
<!--                    label="资格类别"-->
<!--                    width="100"-->
<!--                    :filters="[{text: '准入类', value: '准入类'}, {text: '水平评价类', value: '水平评价类'}]"-->
<!--                    :filter-method="filterHandler"-->
<!--            >-->
<!--            </el-table-column>-->
            <el-table-column prop="start" label="开始时间" width="120">
            </el-table-column>
            <el-table-column prop="end" label="结束时间">
            </el-table-column>
            <el-table-column prop="types" label="比赛性质">
            </el-table-column>
            <el-table-column prop="master" label="主办方">
            </el-table-column>
            <el-table-column prop="imgurl" label="图片地址">
            </el-table-column>
            <el-table-column prop="detail" label="详情信息">
                <template slot-scope="scope">
                    <el-button @click="checkDetail(scope.row.detail)">点击查看详情</el-button>
                </template>
            </el-table-column>
            <el-table-column prop="address" label="比赛地址" >
            </el-table-column>
            <el-table-column label="操作" width="200" align="center">
                <template slot-scope="scope">
                    <el-button type="success" @click="handleEdit(scope.row)">编辑 <i class="el-icon-edit"></i>
                    </el-button>
                    <el-popconfirm
                            class="ml-5"
                            confirm-button-text='确定吗'
                            cancel-button-text='再想想'
                            icon="el-icon-info"
                            icon-color="red"
                            title="您确定删除吗？"
                            @confirm="del(scope.row.id)"
                    >
                        <el-button type="danger" slot="reference">删除 <i class="el-icon-remove-outline"></i>
                        </el-button>
                    </el-popconfirm>
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
        <el-dialog title="基本信息" :visible.sync="dialogFormVisible" width="30%">
            <el-form :model="form" :rules="rules" ref="ruleForm"  size="small" class="demo-ruleForm">
                <el-form-item label="竞赛名称" prop="name">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="比赛地址" prop="address">
                    <el-input v-model="form.address"></el-input>
                </el-form-item>
                <el-form-item label="报名时间" required>
                    <el-col :span="11">
                        <el-form-item prop="date1">
                            <el-date-picker type="date" placeholder="选择报名开始时间" value-format="yyyy-MM-dd" v-model="form.start" style="width: 100%;"></el-date-picker>
                        </el-form-item>
                    </el-col>
                </el-form-item>
                <el-form-item label="结束时间" required>
                    <el-col :span="11">
                        <el-form-item prop="date1">
                            <el-date-picker type="date" placeholder="选择报名结束时间" value-format="yyyy-MM-dd" v-model="form.end" style="width: 100%;"></el-date-picker>
                        </el-form-item>
                    </el-col>
                </el-form-item>
                <el-form-item label="竞赛性质" prop="types">
                    <el-select v-model="form.types" placeholder="请选择比赛性质">
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
                    <el-input v-model="form.master"></el-input>
                </el-form-item>
                <el-upload
                        class="upload-demo"
                        drag
                        action="http://localhost:9090/file/upload"
                        :on-success="handleAvatarSuccess"
                        style="position: relative;left: 60px"
                        multiple>
                    <i class="el-icon-upload"></i>
                    <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                    <div class="el-upload__tip" slot="tip" style="margin: 0 auto">比赛宣传图</div>
                </el-upload>
                <el-form-item label="海报地址">
                    <el-input v-model="form.imgurl"></el-input>
                </el-form-item>
                <el-form-item label="详情信息" prop="detail">
                    <el-input type="textarea" v-model="form.detail"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="save">确 定</el-button>
            </div>
        </el-dialog>
        <el-radio-group v-model="direction">
            <el-radio label="rtl">竞赛详情信息</el-radio>
        </el-radio-group>
        <el-drawer
                title="详情"
                :visible.sync="drawer"
                :direction="direction"
                :before-close="handleClose">
            <span style="font: 14px 'Microsoft YaHei'">{{detail}}</span>
        </el-drawer>
    </div>
</template>

<script>
    export default {
        name: "ExamManage",
        data() {
            return {
                tableData: [],
                total: 0,
                pageNum: 1,
                pageSize: 5,
                examName: null,
                dialogFormVisible: false,
                multipleSelection: [],
                drawer: false,
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
                }
            }
        },
        created() {
            this.load()
        },
        methods: {
            checkDetail(val){
              this.detail=val
                this.drawer=true
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
                this.request.get("/competition/page", {
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