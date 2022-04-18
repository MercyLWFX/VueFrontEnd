<template>
    <div>
        <div style="margin: 10px 0">
            <el-input style="width: 200px" placeholder="部门查询" suffix-icon="el-icon-search"
                      v-model="categoryName"></el-input>

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

        <el-table :data="tableData" border stripe :header-cell-class-name="headerBg" max-height="480px"
                  @selection-change="handleSelectionChange">

            <el-table-column
                    type="selection"
                    width="55">
            </el-table-column>
            <el-table-column prop="categoryId" sortable label="id" width="60">
            </el-table-column>
            <el-table-column prop="categoryName" label="发起部门名称" width="100">
            </el-table-column>
            <el-table-column prop="classification" label="归属分类" width="100">
            </el-table-column>
            <el-table-column prop="ascription" label="部门归属类别代码" width="120">
            </el-table-column>
            <el-table-column prop="description" label="部门描述">
            </el-table-column>

            <el-table-column label="操作" width="300" align="center">
                <template slot-scope="scope">
                    <el-button type="primary" @click="doExam(scope.row.exams)">已发布的考试 <i class="el-icon-s-order"></i>
                    </el-button>
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
            <el-form label-width="80px" size="small">
                <el-form-item label="id">
                    <el-input v-model="form.categoryId" disabled autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="部门名称">
                    <el-input v-model="form.categoryName" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="部门类别">
                    <el-input v-model="form.classification" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="部门归属类别代码">
                    <el-input v-model="form.ascription" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="部门描述">
                    <el-input type="textarea" v-model="form.description" autocomplete="off"></el-input>
                </el-form-item>

            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="save">确 定</el-button>
            </div>
        </el-dialog>
        <el-dialog title="考试信息" :visible.sync="vis" width="30%">
            <el-table :data="exam" border stripe>
                <el-table-column prop="examName" label="考试名称">
                </el-table-column>
                <el-table-column prop="classes" label="资格类别">
                </el-table-column>
            </el-table>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "QClass",
        data() {
            return {
                tableData: [],
                total: 0,
                pageNum: 1,
                pageSize: 5,
                categoryName: null,
                dialogFormVisible: false,
                multipleSelection: [],
                form: {
                    categoryId: null,
                    categoryName: null,
                    classification: null,
                    ascription: null,
                    description: null,
                },
                headerBg: 'headerBg',
                exam: [],
                vis: false
            }
        },
        created() {
            this.load()
        },
        methods: {
            load() {
                this.request.get("/classes/pages", {
                    params: {
                        pageNum: this.pageNum,
                        pageSize: this.pageSize,
                        categoryName: this.categoryName
                    }
                }).then(res => {
                    console.log(res)
                    if (res.code === '200'){
                        this.tableData = res.data.records
                        this.total = res.data.total
                    }

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
                this.categoryName = null
                this.load()
            },
            handleAdd() {
                this.dialogFormVisible = true
                this.form = {}
            },
            save() {
                console.log(this.form)
                this.request.post("/classes/insert", this.form).then(res => {
                    if (res.code == '200') {
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
                this.request.delete("/classes/del/" + id).then(res => {
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
                this.request.post("/classes/batchdel", ids).then(res => {
                    if (res.code === '200') {
                        this.$message.success("批量删除成功")
                        this.load()
                    } else {
                        this.$message.error("批量删除失败")
                    }
                })
            },
            doExam(ascription){
                this.exam=ascription
                this.vis=true
            }
        },

    }
</script>

<style>
    .headerBg {
        background: #eee !important;
    }
</style>