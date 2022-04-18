<template>
    <div>
        <div style="margin: 10px 0">
            <el-input style="width: 200px" placeholder="按名称查询" suffix-icon="el-icon-search"
                      v-model="username"></el-input>
            <el-input style="width: 200px" placeholder="按邮箱查询" suffix-icon="el-icon-message" v-model="email"
                      class="ml-5"></el-input>

            <el-select v-model="form.rolename" placeholder="按角色查询" clearable class="ml-5">
                <el-option
                        v-for="item in roles"
                        :key="item.roleid"
                        :label="item.name"
                        :value="item.flag">
                </el-option>
            </el-select>
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
            <el-button type="primary" class="ml-5" @click="exp">导出 <i class="el-icon-top"></i></el-button>
        </div>

        <el-table :data="tableData" border stripe :header-cell-class-name="headerBg" max-height="480px"
                  @selection-change="handleSelectionChange">

                <el-table-column
                        type="selection"
                        width="55">
                </el-table-column>
                <el-table-column prop="id" label="id" width="120">
                </el-table-column>
                <el-table-column prop="username" label="用户名" width="140">
                </el-table-column>
                <el-table-column prop="nickname" label="昵称" width="120">
                </el-table-column>
                <el-table-column prop="rolename" label="角色">
                    <template slot-scope="scope">
                        <el-tag type="primary" v-if="scope.row.rolename==='ROLE_ADMIN'">管理员</el-tag>
                        <el-tag type="primary" v-if="scope.row.rolename==='ROLE_COMPANY'">企业成员</el-tag>
                        <el-tag type="primary" v-if="scope.row.rolename==='ROLE_USER'">普通用户</el-tag>
                    </template>
                </el-table-column>
                <el-table-column prop="phone" label="电话">
                </el-table-column>
                <el-table-column prop="email" label="邮箱">
                </el-table-column>
                <el-table-column prop="money" label="账户余额">
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
        <el-dialog title="用户信息" :visible.sync="dialogFormVisible" width="30%">
            <el-form label-width="80px" size="small">
                <el-form-item label="用户名">
                    <el-input v-model="form.username" disabled autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="角色">
                    <el-select v-model="form.rolename" placeholder="分配角色" clearable>
                        <el-option
                                v-for="item in roles"
                                :key="item.id"
                                :label="item.name"
                                :value="item.flag">
                        </el-option>
                    </el-select>
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
        name: "User",
        data() {
            return {
                tableData: [],
                total: 0,
                pageNum: 1,
                pageSize: 5,
                username: null,
                email: null,
                roles: [],
                roleid: null,
                dialogFormVisible: false,
                multipleSelection: [],
                form: {
                    id: 0,
                    username: null,
                    phone: null,
                    email: null,
                    money: null,
                    rolename: null
                },
                headerBg: 'headerBg',
            }
        },
        created() {
            this.load()
        },
        methods: {
            load() {
                this.request.get("/user/pages", {
                    params: {
                        pageNum: this.pageNum,
                        pageSize: this.pageSize,
                        username: this.username,
                        email: this.email,
                        rolename: this.rolename
                    }
                }).then(res => {
                    // console.log(res)
                    this.tableData = res.records
                    this.total = res.total
                })

                this.request.get("/role").then(res => {
                    this.roles=res.data
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
                this.username = null
                this.email = null
                this.role = null
                this.rolename = null
                this.load()
            },
            handleAdd() {
                this.dialogFormVisible = true
                this.form = {}
            },
            save() {
                console.log(this.form)
                this.request.post("/user/insert", this.form).then(res => {
                    if (res) {
                        this.$message.success("保存成功")
                        this.dialogFormVisible = false
                        this.form={}
                        this.load()
                    } else {
                        this.$message.error("保存失败")
                    }

                })

            },
            //保存和修改
            handleEdit(value) {
                // console.log(value)
                this.form=value
                this.dialogFormVisible = true
            },
            del(id) {
                console.log(id)
                this.request.delete("/user/del/" + id).then(res => {
                    if (res) {
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
                let ids = this.multipleSelection.map(v => v.id)  //建一个对象的数组转为一个类似于[1,2,3]的数字
                console.log(ids)
                this.request.post("/user/batchdel", ids).then(res => {
                    if (res) {
                        this.$message.success("批量删除成功")
                        this.load()
                    } else {
                        this.$message.error("批量删除失败")
                    }

                })

            },
            exp(){
               window.open("http://localhost:9090/user/export")
            }
        },

    }
</script>

<style>
    .headerBg {
        background: #eee !important;
    }
</style>