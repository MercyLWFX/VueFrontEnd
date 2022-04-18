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
            <el-table-column prop="id" sortable label="id" width="60">
            </el-table-column>
            <el-table-column prop="name" label="比赛名称" width="140">
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
    </div>
</template>

<script>
    export default {
        name: "PublishScore",
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