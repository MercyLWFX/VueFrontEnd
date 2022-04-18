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

        <el-table :data="tableData" border stripe :header-cell-class-name="headerBg" max-height="480px"
                  @selection-change="handleSelectionChange">

            <el-table-column
                    type="selection"
                    width="55">
            </el-table-column>
            <el-table-column prop="id" sortable label="id" width="60">
            </el-table-column>
            <el-table-column prop="examName" label="发起部门名称" width="140">
            </el-table-column>
            <el-table-column
                    prop="classes"
                    label="资格类别"
                    width="100"
                    :filters="[{text: '准入类', value: '准入类'}, {text: '水平评价类', value: '水平评价类'}]"
                    :filter-method="filterHandler"
            >
            </el-table-column>
            <el-table-column prop="dept" label="发起部门" width="120">
            </el-table-column>
            <el-table-column prop="basis" label="设定依据">
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
            <el-form label-width="80px" size="small">
                <el-form-item label="id">
                    <el-input v-model="form.id" disabled autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="资格证书名称">
                    <el-input v-model="form.examName" autocomplete="off"></el-input>
                </el-form-item>

                <el-form-item label="考试类别代码">
                    <el-select v-model="form.ascription" placeholder="分配角色" clearable>
                        <el-option
                                v-for="item in category"
                                :key="item.categoryId"
                                :label="item.classification"
                                :value="item.ascription">
                        </el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="资格类别">
                    <el-input v-model="form.classes" autocomplete="off"></el-input>
                </el-form-item>


                <el-form-item label="实施部门">
                    <el-input v-model="form.dept" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="设定依据">
                    <el-input type="textarea" v-model="form.basis" autocomplete="off"></el-input>
                </el-form-item>

            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="save">确 定</el-button>
            </div>
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
                examName: null,
                dialogFormVisible: false,
                multipleSelection: [],
                form: {
                    id: null,
                    examName: null,
                    ascription: null,
                    classes: null,
                    dept: null,
                    basis:null
                },
                headerBg: 'headerBg',
                category:{}
            }
        },
        created() {
            this.load()
        },
        methods: {
            load() {
                this.request.get("/exam/pages", {
                    params: {
                        pageNum: this.pageNum,
                        pageSize: this.pageSize,
                        examName: this.examName
                    }
                }).then(res => {
                    // console.log(res)
                    this.tableData = res.records
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
                this.request.post("/exam/insert", this.form).then(res => {
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